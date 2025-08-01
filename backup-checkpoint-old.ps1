# Backup Checkpoint Script
# Usage: Just type "SAVE CHECKPOINT" and I'll run this script

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$source = "C:\0_1_A_Dev\0_2_ClaudeCode_Live Project\cleared-advisory-group-website-local"

# Backup locations
$oneDriveRoot = "C:\Users\JohnnyBeast\OneDrive - Miysis Alliance\Backup\31JUL25"
$localBackupRoot = "C:\0_1_A_Dev\0_2_ClaudeCode_Live Project\cleared-advisory-group-website-local-backups"

# Create backup folder names
$checkpointName = "checkpoint_$timestamp"
$oneDriveDestination = "$oneDriveRoot\$checkpointName"
$localDestination = "$localBackupRoot\$checkpointName"

# Create local backup directory if it doesn't exist
if (!(Test-Path $localBackupRoot)) {
    New-Item -ItemType Directory -Path $localBackupRoot -Force | Out-Null
    Write-Host "Created local backup directory: $localBackupRoot" -ForegroundColor Yellow
}

Write-Host "`nSAVING CHECKPOINT..." -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan

# Delete previous local backups to save space
Write-Host "`nCleaning up old local backups..." -ForegroundColor Yellow
$existingBackups = Get-ChildItem -Path $localBackupRoot -Directory -Filter "checkpoint_*" -ErrorAction SilentlyContinue
if ($existingBackups) {
    $backupCount = $existingBackups.Count
    Write-Host "   Found $backupCount old backup(s). Removing..." -ForegroundColor Gray
    $existingBackups | Remove-Item -Recurse -Force
    Write-Host "   ✓ Old backups removed!" -ForegroundColor Green
} else {
    Write-Host "   No old backups found." -ForegroundColor Gray
}

# Backup to OneDrive (no deletion - unlimited space)
Write-Host "`n1. Backing up to OneDrive..." -ForegroundColor Green
Write-Host "   Location: $oneDriveDestination" -ForegroundColor Gray
Copy-Item -Path $source -Destination $oneDriveDestination -Recurse -Force -Exclude "node_modules", ".next", "nul", "backups"
Write-Host "   ✓ OneDrive backup completed!" -ForegroundColor Green

# Backup to local directory
Write-Host "`n2. Backing up to local directory..." -ForegroundColor Green
Write-Host "   Location: $localDestination" -ForegroundColor Gray
Copy-Item -Path $source -Destination $localDestination -Recurse -Force -Exclude "node_modules", ".next", "nul", "backups"
Write-Host "   ✓ Local backup completed!" -ForegroundColor Green

Write-Host "`n===========================================" -ForegroundColor Cyan
Write-Host "CHECKPOINT SAVED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "Checkpoint name: $checkpointName" -ForegroundColor Cyan
Write-Host "`nBackup locations:" -ForegroundColor Yellow
Write-Host "  - OneDrive: $oneDriveDestination (kept all versions)" -ForegroundColor Gray
Write-Host "  - Local: $localDestination (previous deleted to save space)" -ForegroundColor Gray