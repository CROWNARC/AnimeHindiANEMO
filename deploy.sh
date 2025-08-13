#!/bin/bash

# Build the Next.js application
npm run build

# Deploy to Netlify
echo "Deploying to Netlify..."
echo "To deploy manually, install Netlify CLI with: npm install netlify-cli -g"
echo "Then run: netlify deploy --prod"