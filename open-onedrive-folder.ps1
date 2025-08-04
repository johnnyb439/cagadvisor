# Open OneDrive Folder for Sharing
Write-Host "Opening your OneDrive project folder..." -ForegroundColor Green

$projectPath = "$env:USERPROFILE\OneDrive\CAG_Shared_Project"

# Open in File Explorer
Start-Process explorer.exe $projectPath

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   OneDrive Sharing Instructions" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Right-click on 'CAG_Shared_Project' folder" -ForegroundColor Yellow
Write-Host "2. Select 'Share'" -ForegroundColor Yellow
Write-Host "3. Choose 'Anyone with the link can edit'" -ForegroundColor Yellow
Write-Host "4. Click 'Copy link'" -ForegroundColor Yellow
Write-Host "5. Send the link to your colleague" -ForegroundColor Yellow
Write-Host ""
Write-Host "Your colleague needs to:" -ForegroundColor Green
Write-Host "- Install OneDrive for Mac" -ForegroundColor White
Write-Host "- Click your shared link" -ForegroundColor White
Write-Host "- Add to their OneDrive" -ForegroundColor White
Write-Host ""

# Copy instructions to clipboard
$instructions = @"
Instructions for Mac colleague:

1. Install OneDrive: https://apps.apple.com/app/onedrive/id823766827
2. Click the shared link I'm sending you
3. Sign in and click 'Add to my OneDrive'
4. Once synced, open Terminal:
   cd ~/OneDrive/CAG_Shared_Project
   npm install
   npm run dev

Any changes you make will sync automatically!
"@

$instructions | Set-Clipboard
Write-Host "[INFO] Instructions copied to clipboard!" -ForegroundColor Cyan
Write-Host "Paste these in your message to your colleague." -ForegroundColor Cyan