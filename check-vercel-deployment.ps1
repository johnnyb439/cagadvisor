# Script to check Vercel deployment status
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Vercel Deployment Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if site is accessible
Write-Host "Checking live site status..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://caglive.vercel.app" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "[OK] Site is live and responding!" -ForegroundColor Green
        Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    }
} catch {
    Write-Host "[ERROR] Site is not accessible" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Visit https://vercel.com/dashboard to check deployment logs" -ForegroundColor White
Write-Host "2. Visit https://caglive.vercel.app to test the live site" -ForegroundColor White
Write-Host ""
Write-Host "If deployment hasn't started:" -ForegroundColor Yellow
Write-Host "- Check if GitHub integration is connected in Vercel" -ForegroundColor White
Write-Host "- Manually trigger deployment from Vercel dashboard" -ForegroundColor White