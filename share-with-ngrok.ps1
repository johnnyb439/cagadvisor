# Share Local Development with ngrok
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Share Your Local Server with Colleague" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if ngrok is installed
$ngrokInstalled = Get-Command ngrok -ErrorAction SilentlyContinue

if (-not $ngrokInstalled) {
    Write-Host "[!] Installing ngrok..." -ForegroundColor Yellow
    
    # Download ngrok
    $ngrokUrl = "https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip"
    $zipPath = "$env:TEMP\ngrok.zip"
    
    Write-Host "Downloading ngrok..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $ngrokUrl -OutFile $zipPath
    
    Write-Host "Extracting ngrok..." -ForegroundColor Yellow
    Expand-Archive -Path $zipPath -DestinationPath "$env:USERPROFILE\ngrok" -Force
    
    # Add to PATH
    $env:Path += ";$env:USERPROFILE\ngrok"
    
    Write-Host "[OK] ngrok installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting ngrok tunnel..." -ForegroundColor Yellow
Write-Host "This will create a public URL for your local server" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Make sure your dev server is running on port 3004!" -ForegroundColor Red
Write-Host "If not, run 'npm run dev' in another terminal first" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Enter when ready..." -ForegroundColor Yellow
Read-Host

# Start ngrok
Write-Host "Creating public tunnel..." -ForegroundColor Green
ngrok http 3004

# Note: ngrok will show the public URL in its interface
# Share that URL with your colleague!