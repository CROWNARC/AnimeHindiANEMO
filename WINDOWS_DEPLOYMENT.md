# Windows Deployment Guide for Netlify

This guide provides Windows-specific instructions for deploying the AnimePurple application to Netlify.

## Prerequisites

- A Netlify account (sign up at [netlify.com](https://netlify.com) if you don't have one)
- Node.js and npm installed on your Windows machine
- Git installed on your Windows machine

## Deployment Steps

### 1. Install Netlify CLI

The Netlify CLI has been added as a dev dependency to this project. You can use it through npm scripts or install it globally:

```powershell
npm install -g netlify-cli
```

### 2. Log in to Netlify

```powershell
npx netlify login
```

This will open a browser window for you to authenticate with your Netlify account.

### 3. Build the Project

```powershell
npm run build
```

### 4. Deploy to Netlify

Using the npm script:

```powershell
npm run netlify-deploy
```

Or directly with npx:

```powershell
npx netlify deploy --prod
```

Follow the prompts to complete the deployment process.

## Environment Variables

Make sure to set the following environment variables in your Netlify site settings:

- `TMDB_API_KEY`: Your TMDB API key

## Troubleshooting Windows-Specific Issues

- **Path Length Limitations**: Windows has path length limitations. If you encounter errors related to long paths, consider enabling long path support in Windows 10/11 or moving your project to a shorter path.

- **Line Endings**: Git on Windows might convert line endings. Use the following git config to prevent issues:
  ```powershell
  git config --global core.autocrlf false
  ```

- **Permission Issues**: If you encounter permission issues, try running your command prompt or PowerShell as Administrator.

## Quick Deployment

For a streamlined deployment process, you can use the following commands in sequence:

```powershell
npm run build
npm run netlify-deploy
```

This will build your Next.js application and deploy it to Netlify in production mode.