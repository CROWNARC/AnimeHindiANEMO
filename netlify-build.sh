#!/bin/bash

# Install dependencies
npm install

# Build Next.js app with proper configuration
npm run build

# Create Netlify-specific redirects
cat > ./_redirects << EOL
# Netlify redirects for Next.js
/api/*  /api/:splat  200
/*      /.netlify/functions/server  200
EOL

echo "Build completed with Netlify-specific configurations"