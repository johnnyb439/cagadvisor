# Connect VS Code to CodeSandbox
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Connecting VS Code to CodeSandbox" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Your Sandbox ID: epic-worker" -ForegroundColor Green
Write-Host ""

Write-Host "Steps to connect:" -ForegroundColor Yellow
Write-Host "1. Opening VS Code Command Palette..." -ForegroundColor White
Write-Host "2. You'll need to:" -ForegroundColor White
Write-Host "   - Sign in to CodeSandbox (if needed)" -ForegroundColor White
Write-Host "   - Open sandbox: epic-worker" -ForegroundColor White
Write-Host ""

# Open VS Code if not already open
$vscodePath = "C:\0_1_A_Dev\0_2_ClaudeCode_Live Project\cleared-advisory-group-website-local-backups\checkpoint_20250731_200444"
code $vscodePath

Start-Sleep -Seconds 2

Write-Host "Sending command to VS Code..." -ForegroundColor Yellow

# Try to trigger the command palette and CodeSandbox sign in
$wshell = New-Object -ComObject wscript.shell
$wshell.AppActivate('Visual Studio Code')
Start-Sleep -Milliseconds 500
$wshell.SendKeys('^+p')
Start-Sleep -Milliseconds 500
$wshell.SendKeys('CodeSandbox: Sign in')
Start-Sleep -Milliseconds 100
$wshell.SendKeys('{ENTER}')

Write-Host ""
Write-Host "✅ VS Code Command Palette opened!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Complete sign in if prompted" -ForegroundColor White
Write-Host "2. Press Ctrl+Shift+P again" -ForegroundColor White
Write-Host "3. Type: CodeSandbox: Open Sandbox" -ForegroundColor White
Write-Host "4. Enter: epic-worker" -ForegroundColor White
Write-Host ""
Write-Host "Once connected, Claude can edit files locally" -ForegroundColor Green
Write-Host "and they'll sync to CodeSandbox automatically!" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")