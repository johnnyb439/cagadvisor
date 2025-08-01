# Manual Vercel Deployment Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Manual Vercel Deployment" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Checking for Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "[!] Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host ""
Write-Host "Starting Vercel deployment..." -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: When prompted:" -ForegroundColor Yellow
Write-Host "1. Link to existing project if asked" -ForegroundColor White
Write-Host "2. Choose 'caglive' as the project" -ForegroundColor White
Write-Host "3. Deploy to production" -ForegroundColor White
Write-Host ""

# Deploy to Vercel
vercel --prod

Write-Host ""
Write-Host "Deployment initiated!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Check deployment progress at: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Once deployed, visit: https://caglive.vercel.app" -ForegroundColor White