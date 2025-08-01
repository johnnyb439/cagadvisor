# Vercel Environment Variables Setup Helper
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Vercel Environment Setup Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "IMPORTANT: Manual Steps Required!" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open your browser and go to:" -ForegroundColor White
Write-Host "   https://vercel.com/johnny-bouphavongs-projects/cagadvisor/settings/environment-variables" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Add these environment variables:" -ForegroundColor White
Write-Host ""

$envVars = @(
    @{Key="NEXTAUTH_URL"; Value="https://cagadvisor.vercel.app"},
    @{Key="NEXTAUTH_SECRET"; Value="cag2025secureverceldeploymentkey"},
    @{Key="AUTH_SECRET"; Value="cag2025secureverceldeploymentkey"},
    @{Key="NODE_ENV"; Value="production"}
)

foreach ($var in $envVars) {
    Write-Host "   Key: " -NoNewline -ForegroundColor Gray
    Write-Host $var.Key -ForegroundColor Green
    Write-Host "   Value: " -NoNewline -ForegroundColor Gray
    Write-Host $var.Value -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "3. After adding all variables:" -ForegroundColor White
Write-Host "   - Go to the Deployments tab" -ForegroundColor Gray
Write-Host "   - Click the three dots (...) on the latest deployment" -ForegroundColor Gray
Write-Host "   - Select 'Redeploy'" -ForegroundColor Gray
Write-Host ""

Write-Host "4. Demo Users Available:" -ForegroundColor White
Write-Host "   Email: demo@cagadvisor.com" -ForegroundColor Green
Write-Host "   Password: demo123" -ForegroundColor Green
Write-Host ""
Write-Host "   Email: admin@cagadvisor.com" -ForegroundColor Green
Write-Host "   Password: admin123" -ForegroundColor Green
Write-Host ""

# Copy environment variables to clipboard
$clipboardText = @"
NEXTAUTH_URL=https://cagadvisor.vercel.app
NEXTAUTH_SECRET=cag2025secureverceldeploymentkey
AUTH_SECRET=cag2025secureverceldeploymentkey
NODE_ENV=production
"@

$clipboardText | Set-Clipboard
Write-Host "[INFO] Environment variables have been copied to your clipboard!" -ForegroundColor Cyan
Write-Host ""

Write-Host "Press Enter to open Vercel settings in your browser..." -ForegroundColor Yellow
Read-Host

# Open Vercel settings
Start-Process "https://vercel.com/johnny-bouphavongs-projects/cagadvisor/settings/environment-variables"