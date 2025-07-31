# Restore Checkpoint Script
# Usage: Just type "RESTORE CHECKPOINT" and I'll run this script

$backupRoot = "C:\Users\JohnnyBeast\OneDrive - Miysis Alliance\Backup\31JUL25"
$destination = "C:\0_1_A_Dev\0_2_ClaudeCode_Live Project\cleared-advisory-group-website-local"

# Get the most recent checkpoint
$latestCheckpoint = Get-ChildItem -Path $backupRoot -Directory -Filter "checkpoint_*" | 
    Sort-Object Name -Descending | 
    Select-Object -First 1

if ($latestCheckpoint) {
    $checkpointPath = $latestCheckpoint.FullName
    $checkpointName = $latestCheckpoint.Name
    
    Write-Host "Found latest checkpoint: $checkpointName" -ForegroundColor Cyan
    Write-Host "Restoring from: $checkpointPath" -ForegroundColor Yellow
    
    # Create a backup of current state before restoring
    $preRestoreBackup = "$backupRoot\pre_restore_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
    Write-Host "Creating safety backup of current state..." -ForegroundColor Gray
    Copy-Item -Path $destination -Destination $preRestoreBackup -Recurse -Force
    
    # Restore the checkpoint
    Write-Host "Restoring checkpoint..." -ForegroundColor Green
    Copy-Item -Path "$checkpointPath\*" -Destination $destination -Recurse -Force
    
    Write-Host "Restore completed successfully!" -ForegroundColor Green
    Write-Host "Previous state backed up to: pre_restore_*" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run 'npm install' to update dependencies" -ForegroundColor White
    Write-Host "2. Run 'npm run dev' to start the development server" -ForegroundColor White
} else {
    Write-Host "No checkpoints found in $backupRoot" -ForegroundColor Red
}