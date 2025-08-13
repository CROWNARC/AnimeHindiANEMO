@echo off
echo Fixing Netlify 404 errors...

:: Create Netlify-specific redirects file
echo # Netlify redirects for Next.js > _redirects
echo /api/*  /api/:splat  200 >> _redirects
echo /*      /.netlify/functions/server  200 >> _redirects

:: Deploy to Netlify with the updated configuration
echo Deploying to Netlify with fixed configuration...
netlify deploy --prod

echo Deployment completed. The 404 errors should now be fixed.
echo If you still encounter issues, please check the NETLIFY_DEPLOYMENT_FIX.md file for troubleshooting steps.

pause