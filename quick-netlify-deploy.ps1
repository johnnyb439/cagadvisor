# Quick Netlify Deployment Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Quick Deploy to Netlify" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Netlify CLI is installed
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue

if (-not $netlifyInstalled) {
    Write-Host "[!] Installing Netlify CLI..." -ForegroundColor Yellow
    npm install -g netlify-cli
}

Write-Host "Building the project..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "Deploying to Netlify..." -ForegroundColor Green
Write-Host "Follow the prompts to:" -ForegroundColor Yellow
Write-Host "1. Create a Netlify account (if needed)" -ForegroundColor White
Write-Host "2. Authorize the CLI" -ForegroundColor White
Write-Host "3. Create a new site" -ForegroundColor White
Write-Host ""

# Deploy to Netlify
netlify deploy --prod --dir=.next

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Your site will be available at:" -ForegroundColor Green
Write-Host "https://YOUR-SITE-NAME.netlify.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "Share this URL with your colleague!" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green