# Backup Checkpoint Script
# Usage: Just type "SAVE CHECKPOINT" and I'll run this script

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$source = "C:\0_1_A_Dev\0_2_ClaudeCode_Live Project\cleared-advisory-group-website-local"
$backupRoot = "C:\Users\JohnnyBeast\OneDrive - Miysis Alliance\Backup\31JUL25"
$destination = "$backupRoot\checkpoint_$timestamp"

Write-Host "Creating backup checkpoint at: $destination" -ForegroundColor Green
Copy-Item -Path $source -Destination $destination -Recurse -Force
Write-Host "Backup completed successfully!" -ForegroundColor Green
Write-Host "Checkpoint saved as: checkpoint_$timestamp" -ForegroundColor Cyan