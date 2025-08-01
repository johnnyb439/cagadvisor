# Automated backup script that runs without prompts
param(
    [switch]$SkipGitHub = $false
)

# Configuration
$SourcePath = "C:\0_1_A_Dev\0_2_ClaudeCode_Live Project\cleared-advisory-group-website-local-backups\checkpoint_20250731_200444"
$OneDriveBackupPath = "C:\Users\JohnnyBeast\OneDrive - Miysis Alliance\Backup\1AUG25"
$LocalBackupPath = "C:\0_1_A_Dev\Backup"
$GitHubRepo = "https://github.com/johnnyb439/cagadvisor"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CAG Website Automated Backup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create timestamp for backup
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupName = "cag_backup_$timestamp"

Write-Host "Starting backup process..." -ForegroundColor Cyan
Write-Host "Backup name: $backupName" -ForegroundColor Cyan
Write-Host ""

# Step 1: OneDrive Backup
Write-Host "Step 1: OneDrive Backup" -ForegroundColor Green
$oneDriveBackupFullPath = Join-Path $OneDriveBackupPath $backupName

if (-not (Test-Path $OneDriveBackupPath)) {
    New-Item -ItemType Directory -Path $OneDriveBackupPath -Force | Out-Null
}

# Manage old OneDrive backups (delete every third)
Write-Host "  Managing OneDrive backups..." -ForegroundColor Yellow
if (Test-Path $OneDriveBackupPath) {
    $backups = Get-ChildItem -Path $OneDriveBackupPath -Directory | Sort-Object CreationTime
    $count = $backups.Count
    
    if ($count -ge 3) {
        for ($i = 2; $i -lt $count; $i += 3) {
            $backupToDelete = $backups[$i]
            Write-Host "  Deleting old backup: $($backupToDelete.Name)" -ForegroundColor DarkYellow
            Remove-Item -Path $backupToDelete.FullName -Recurse -Force
        }
    }
}

# Copy to OneDrive
Write-Host "  Copying to OneDrive..." -ForegroundColor Yellow
robocopy "$SourcePath" "$oneDriveBackupFullPath" /E /XD node_modules .next .git /XF *.log /R:3 /W:5 /MT:16 /NP /NFL /NDL /NJH /NJS
Write-Host "  [OK] OneDrive backup complete" -ForegroundColor Green

# Step 2: Local Backup
Write-Host ""
Write-Host "Step 2: Local Backup" -ForegroundColor Green

if (-not (Test-Path $LocalBackupPath)) {
    New-Item -ItemType Directory -Path $LocalBackupPath -Force | Out-Null
}

# Clear previous local backups
Write-Host "  Clearing previous local backups..." -ForegroundColor Yellow
if (Test-Path $LocalBackupPath) {
    Get-ChildItem -Path $LocalBackupPath -Recurse | Remove-Item -Recurse -Force
}

$localBackupFullPath = Join-Path $LocalBackupPath $backupName

# Copy to local
Write-Host "  Copying to local backup..." -ForegroundColor Yellow
robocopy "$SourcePath" "$localBackupFullPath" /E /XD node_modules .next .git /XF *.log /R:3 /W:5 /MT:16 /NP /NFL /NDL /NJH /NJS
Write-Host "  [OK] Local backup complete" -ForegroundColor Green

# Step 3: GitHub Push
if (-not $SkipGitHub) {
    Write-Host ""
    Write-Host "Step 3: GitHub Push" -ForegroundColor Green
    Write-Host "  Preparing to FORCE PUSH to GitHub..." -ForegroundColor Yellow
    Write-Host "  Repository: $GitHubRepo" -ForegroundColor Cyan
    
    Push-Location $SourcePath
    
    # Check if git is initialized
    if (-not (Test-Path ".git")) {
        git init
    }
    
    # Set remote
    $remoteExists = git remote | Where-Object { $_ -eq "origin" }
    if ($remoteExists) {
        git remote set-url origin $GitHubRepo
    } else {
        git remote add origin $GitHubRepo
    }
    
    # Force push to GitHub
    Write-Host "  Adding all files..." -ForegroundColor Yellow
    git add .
    
    Write-Host "  Creating commit..." -ForegroundColor Yellow
    git commit -m "Backup: $backupName - Complete replacement"
    
    Write-Host "  FORCE PUSHING to GitHub..." -ForegroundColor Red
    git push origin master --force
    
    Pop-Location
    
    Write-Host "  [OK] GitHub push complete" -ForegroundColor Green
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Backup Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "OneDrive: $oneDriveBackupFullPath" -ForegroundColor Green
Write-Host "Local: $localBackupFullPath" -ForegroundColor Green
if (-not $SkipGitHub) {
    Write-Host "GitHub: Force pushed to $GitHubRepo" -ForegroundColor Green
}
Write-Host ""
Write-Host "[COMPLETE] Backup process finished!" -ForegroundColor Green