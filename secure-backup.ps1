# Secure Backup Script with Passphrase Protection
# Author: CAG Development Team
# Date: 2025-08-01

param(
    [Parameter(Mandatory=$false)]
    [switch]$TestMode = $false
)

# Configuration
$SourcePath = "C:\0_1_A_Dev\0_2_ClaudeCode_Live Project\cleared-advisory-group-website-local-backups\checkpoint_20250731_200444"
$OneDriveBackupPath = "C:\Users\JohnnyBeast\OneDrive - Miysis Alliance\Backup\1AUG25"
$LocalBackupPath = "C:\0_1_A_Dev\Backup"
$GitHubRepo = "https://github.com/johnnyb439/cagadvisor"

# Secure passphrase (you should change this)
$RequiredPassphrase = "BACKUPNOW"

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CAG Website Secure Backup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Passphrase verification
$passphrase = Read-Host -AsSecureString "Enter backup passphrase"
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($passphrase)
$PlainPassphrase = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

if ($PlainPassphrase -ne $RequiredPassphrase) {
    Write-Host "ERROR: Invalid passphrase!" -ForegroundColor Red
    exit 1
}

Write-Host "[OK] Passphrase verified" -ForegroundColor Green
Write-Host ""

# Function to manage OneDrive backups (delete every third)
function Manage-OneDriveBackups {
    param($Path)
    
    Write-Host "Managing OneDrive backups..." -ForegroundColor Yellow
    
    if (Test-Path $Path) {
        $backups = Get-ChildItem -Path $Path -Directory | Sort-Object CreationTime
        $count = $backups.Count
        
        if ($count -ge 3) {
            # Delete every third backup, keeping the newest
            for ($i = 2; $i -lt $count; $i += 3) {
                $backupToDelete = $backups[$i]
                if ($TestMode) {
                    Write-Host "  [TEST MODE] Would delete: $($backupToDelete.Name)" -ForegroundColor DarkGray
                } else {
                    Write-Host "  Deleting old backup: $($backupToDelete.Name)" -ForegroundColor DarkYellow
                    Remove-Item -Path $backupToDelete.FullName -Recurse -Force
                }
            }
        }
    }
}

# Function to manage local backups (delete all previous)
function Manage-LocalBackups {
    param($Path)
    
    Write-Host "Managing local backups..." -ForegroundColor Yellow
    
    if (Test-Path $Path) {
        if ($TestMode) {
            Write-Host "  [TEST MODE] Would delete all contents of: $Path" -ForegroundColor DarkGray
        } else {
            Write-Host "  Clearing previous local backups..." -ForegroundColor DarkYellow
            Get-ChildItem -Path $Path -Recurse | Remove-Item -Recurse -Force
        }
    }
}

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

# Manage old OneDrive backups first
Manage-OneDriveBackups -Path $OneDriveBackupPath

# Copy to OneDrive
if ($TestMode) {
    Write-Host "  [TEST MODE] Would copy to: $oneDriveBackupFullPath" -ForegroundColor DarkGray
} else {
    Write-Host "  Copying to OneDrive..." -ForegroundColor Yellow
    robocopy "$SourcePath" "$oneDriveBackupFullPath" /E /XD node_modules .next .git /XF *.log /R:3 /W:5 /MT:16 /NP | Out-Null
    Write-Host "  [OK] OneDrive backup complete" -ForegroundColor Green
}

# Step 2: Local Backup
Write-Host ""
Write-Host "Step 2: Local Backup" -ForegroundColor Green

if (-not (Test-Path $LocalBackupPath)) {
    New-Item -ItemType Directory -Path $LocalBackupPath -Force | Out-Null
}

# Manage old local backups
Manage-LocalBackups -Path $LocalBackupPath

$localBackupFullPath = Join-Path $LocalBackupPath $backupName

# Copy to local
if ($TestMode) {
    Write-Host "  [TEST MODE] Would copy to: $localBackupFullPath" -ForegroundColor DarkGray
} else {
    Write-Host "  Copying to local backup..." -ForegroundColor Yellow
    robocopy "$SourcePath" "$localBackupFullPath" /E /XD node_modules .next .git /XF *.log /R:3 /W:5 /MT:16 /NP | Out-Null
    Write-Host "  [OK] Local backup complete" -ForegroundColor Green
}

# Step 3: GitHub Push (only if not in test mode)
Write-Host ""
Write-Host "Step 3: GitHub Sync" -ForegroundColor Green

if ($TestMode) {
    Write-Host "  [TEST MODE] Skipping GitHub push" -ForegroundColor DarkGray
} else {
    Write-Host "  Do you want to push to GitHub? This will REPLACE everything in the repository!" -ForegroundColor Yellow
    Write-Host "  Repository: $GitHubRepo" -ForegroundColor Cyan
    $confirm = Read-Host "  Type 'YES_REPLACE_GITHUB' to confirm"
    
    if ($confirm -eq "YES_REPLACE_GITHUB") {
        Write-Host "  Preparing GitHub push..." -ForegroundColor Yellow
        
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
        git add .
        git commit -m "Backup: $backupName - Complete replacement"
        git push origin master --force
        
        Pop-Location
        
        Write-Host "  [OK] GitHub push complete" -ForegroundColor Green
    } else {
        Write-Host "  [CANCELLED] GitHub push cancelled" -ForegroundColor Yellow
    }
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Backup Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "OneDrive: $oneDriveBackupFullPath" -ForegroundColor Green
Write-Host "Local: $localBackupFullPath" -ForegroundColor Green
if (-not $TestMode -and $confirm -eq "YES_REPLACE_GITHUB") {
    Write-Host "GitHub: Pushed to $GitHubRepo" -ForegroundColor Green
}
Write-Host ""
Write-Host "[COMPLETE] Backup process complete!" -ForegroundColor Green

# Clean up secure string
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)