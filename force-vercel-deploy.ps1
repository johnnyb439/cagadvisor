# Force Vercel Deployment Script
Write-Host "========================================" -ForegroundColor Red
Write-Host "   FORCE VERCEL DEPLOYMENT" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red
Write-Host ""

# Check if vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "[!] Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "Current Status:" -ForegroundColor Cyan
Write-Host "- GitHub has the latest code with auth fixes" -ForegroundColor Green
Write-Host "- Vercel needs to pull and rebuild" -ForegroundColor Yellow
Write-Host ""

Write-Host "Option 1: Deploy via CLI (Recommended)" -ForegroundColor Green
Write-Host "Running vercel deployment..." -ForegroundColor Yellow
Write-Host ""

# Set environment variables for deployment
$env:VERCEL_ORG_ID = "team_NzXqgjNifejNTtxL3gqpJhH5"
$env:VERCEL_PROJECT_ID = "prj_7kSxpF8sXrZN6DFzL8BQoXvW9Gzf"

Write-Host "Deploying to production..." -ForegroundColor Yellow
vercel --prod --yes

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Option 2: Manual Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If CLI deployment fails, do this manually:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://vercel.com/johnny-bouphavongs-projects/cagadvisor" -ForegroundColor White
Write-Host "2. Click on 'Settings' tab" -ForegroundColor White
Write-Host "3. Scroll to 'Git' section" -ForegroundColor White
Write-Host "4. Click 'Disconnect' and then 'Connect' GitHub again" -ForegroundColor White
Write-Host "5. Or go to Deployments tab and click 'Redeploy'" -ForegroundColor White
Write-Host ""
Write-Host "Demo Credentials:" -ForegroundColor Green
Write-Host "Email: demo@cagadvisor.com / Password: demo123" -ForegroundColor Cyan
Write-Host "Email: admin@cagadvisor.com / Password: admin123" -ForegroundColor Cyan