# Deploying to Netlify

This document provides instructions for deploying the AnimePurple application to Netlify.

## Prerequisites

- A Netlify account (sign up at [netlify.com](https://netlify.com) if you don't have one)
- Node.js and npm installed locally
- Git installed locally

## Deployment Options

### Option 1: Deploy via Netlify UI

1. Log in to your Netlify account
2. Click "New site from Git"
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify to access your repositories
5. Select the AnimePurple repository
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI globally:
   ```
   npm install netlify-cli -g
   ```

2. Log in to Netlify from the CLI:
   ```
   netlify login
   ```

3. Initialize your site (if not already done):
   ```
   netlify init
   ```

4. Deploy to production:
   ```
   netlify deploy --prod
   ```

## Environment Variables

Make sure to set the following environment variables in your Netlify site settings:

- `TMDB_API_KEY`: Your TMDB API key

## Troubleshooting

- If you encounter build errors, check the Netlify build logs for details
- Ensure all dependencies are correctly listed in package.json
- Verify that the netlify.toml configuration is correct

## Additional Resources

- [Netlify Docs for Next.js](https://docs.netlify.com/integrations/frameworks/next-js/overview/)
- [Next.js on Netlify](https://www.netlify.com/with/nextjs/)