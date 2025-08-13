@echo off
echo Creating Netlify build configuration...

:: Install dependencies
npm install

:: Install Netlify CLI if not already installed
npm install netlify-cli -g

:: Build Next.js app
npm run build

:: Create Netlify-specific redirects file
echo # Netlify redirects for Next.js > _redirects
echo /*    /.netlify/functions/server   200 >> _redirects

:: Deploy to Netlify
netlify deploy --prod

echo Build and deployment completed with Netlify-specific configurations
pause