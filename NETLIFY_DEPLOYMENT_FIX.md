# Fixing 404 Errors on Netlify Deployment

If you're seeing a "Page not found" error after deploying to Netlify, follow these steps to fix the issue.
## Prerequisites

1. Node.js (version 18 or later)
2. npm (comes with Node.js)
3. Netlify CLI

## Step-by-Step Fix

### 1. Install Netlify CLI (if not already installed)

```bash
npm install netlify-cli -g
```

### 2. Log in to Netlify

```bash
netlify login
```

### 3. Update Project Configuration

Make sure your `netlify.toml` file has the correct configuration:

```toml
[build]
  command = "npm run build"
  publish = ".next"
  functions = ".netlify/functions"

[build.environment]
  NETLIFY_NEXT_PLUGIN_SKIP = "false"
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/api/*"
  to = "/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server"
  status = 200
```

### 4. Create Redirects File

Create a `_redirects` file in your project root with:

```
/*    /.netlify/functions/server   200
```

### 5. Deploy

Run the deployment script:

```bash
.\netlify-build.bat
```

Or manually:

```bash
npm install
npm run build
netlify deploy --prod
```

## Troubleshooting

If you still encounter 404 errors:

1. Clear your browser cache
2. Check Netlify deployment logs for any build errors
3. Ensure all routes in your Next.js application are properly configured
4. Verify that the `@netlify/plugin-nextjs` plugin is properly installed

## Support

If issues persist, check:
- Netlify deployment status in your dashboard
- Build logs for any errors
- Next.js configuration in `next.config.mjs`