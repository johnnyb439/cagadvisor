# Test the backup script in safe mode
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Testing Backup Script (Safe Mode)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will run the backup script in TEST MODE" -ForegroundColor Yellow
Write-Host "No files will be deleted or copied" -ForegroundColor Yellow
Write-Host ""

# Run the secure backup script in test mode
& ".\secure-backup.ps1" -TestMode