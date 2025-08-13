# AnimePurple Netlify Deployment PowerShell Script
Write-Host "AnimePurple Netlify Deployment Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Building the Next.js application..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "Step 2: Deploying to Netlify..." -ForegroundColor Yellow
npm run netlify-deploy

Write-Host ""
Write-Host "Deployment process completed!" -ForegroundColor Green
Write-Host "If you encountered any issues, please refer to NETLIFY_DEPLOYMENT.md or WINDOWS_DEPLOYMENT.md" -ForegroundColor White
Write-Host ""

Read-Host -Prompt "Press Enter to exit"