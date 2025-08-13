@echo off
echo AnimePurple Netlify Deployment Script
echo ====================================
echo.

echo Step 1: Building the Next.js application...
npm run build

echo.
echo Step 2: Deploying to Netlify...
npm run netlify-deploy

echo.
echo Deployment process completed!
echo If you encountered any issues, please refer to NETLIFY_DEPLOYMENT.md or WINDOWS_DEPLOYMENT.md
echo.

pause