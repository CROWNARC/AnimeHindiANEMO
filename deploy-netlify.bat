@echo off
echo AnimePurple Netlify Deployment

:: Install dependencies
npm install

:: Build the application
npm run build

:: Create _redirects file
echo /* /.netlify/functions/server 200 > _redirects

:: Install Netlify CLI if not present
where netlify >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing Netlify CLI...
    npm install netlify-cli -g
)

:: Deploy to Netlify
echo Deploying to Netlify...
netlify deploy --prod --dir=.next

echo Deployment completed!
pause