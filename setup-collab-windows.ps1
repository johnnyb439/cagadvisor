# Windows Collaboration Setup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Setting Up Real-Time Collaboration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Option 1: VS Code Live Share
Write-Host "[1] VS Code Live Share Setup" -ForegroundColor Green
Write-Host "-----------------------------" -ForegroundColor Green
$hasVSCode = Get-Command code -ErrorAction SilentlyContinue

if ($hasVSCode) {
    Write-Host "Installing Live Share extension..." -ForegroundColor Yellow
    code --install-extension MS-vsliveshare.vsliveshare
    Write-Host "[OK] Live Share installed!" -ForegroundColor Green
    Write-Host "To use: Open VS Code > Click Live Share icon > Share" -ForegroundColor Cyan
} else {
    Write-Host "[!] VS Code not found. Download from: https://code.visualstudio.com" -ForegroundColor Red
}

Write-Host ""
Write-Host "[2] OneDrive Sync Setup" -ForegroundColor Green
Write-Host "-----------------------" -ForegroundColor Green

# Create OneDrive sync folder
$projectPath = Get-Location
$oneDrivePath = "$env:USERPROFILE\OneDrive\CAG_Shared_Project"

Write-Host "Setting up OneDrive sync..." -ForegroundColor Yellow
if (-not (Test-Path $oneDrivePath)) {
    New-Item -ItemType Directory -Path $oneDrivePath -Force | Out-Null
}

# Copy project to OneDrive
Write-Host "Copying project to OneDrive..." -ForegroundColor Yellow
robocopy "$projectPath" "$oneDrivePath" /E /XD node_modules .next .git /R:1 /W:1

Write-Host "[OK] Project copied to: $oneDrivePath" -ForegroundColor Green
Write-Host ""
Write-Host "To share with colleague:" -ForegroundColor Cyan
Write-Host "1. Open File Explorer" -ForegroundColor White
Write-Host "2. Navigate to: $oneDrivePath" -ForegroundColor White
Write-Host "3. Right-click folder > Share > Copy link" -ForegroundColor White
Write-Host "4. Send link to your Mac colleague" -ForegroundColor White

Write-Host ""
Write-Host "[3] Alternative: Dropbox Setup" -ForegroundColor Green
Write-Host "------------------------------" -ForegroundColor Green
Write-Host "1. Install Dropbox: https://www.dropbox.com/download" -ForegroundColor White
Write-Host "2. Move project to Dropbox folder" -ForegroundColor White
Write-Host "3. Share folder with colleague" -ForegroundColor White

Write-Host ""
Write-Host "[4] Quick Sync Status Check" -ForegroundColor Green
Write-Host "---------------------------" -ForegroundColor Green
Write-Host "OneDrive Status:" -ForegroundColor Yellow
$oneDriveProcess = Get-Process "OneDrive" -ErrorAction SilentlyContinue
if ($oneDriveProcess) {
    Write-Host "[OK] OneDrive is running" -ForegroundColor Green
} else {
    Write-Host "[!] OneDrive not running. Start it from Start Menu" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Share the OneDrive link with your colleague" -ForegroundColor White
Write-Host "2. Or use VS Code Live Share for instant collaboration" -ForegroundColor White
Write-Host "3. Or try CodeSandbox: https://codesandbox.io" -ForegroundColor White