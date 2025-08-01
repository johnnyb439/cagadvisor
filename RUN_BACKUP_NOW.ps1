# Quick backup runner
Write-Host "Starting CAG Website Backup..." -ForegroundColor Green
Write-Host "Passphrase: BACKUPNOW" -ForegroundColor Yellow
Write-Host "When asked about GitHub, type: YES_REPLACE_GITHUB" -ForegroundColor Yellow
Write-Host ""

# Run the backup script
& ".\secure-backup.ps1"