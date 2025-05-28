# Deployment Guide for EasyIo.tech

This guide explains how to fix the 404 errors when deploying your React Router application to different hosting platforms.

## The Problem

When you deploy a Single Page Application (SPA) with client-side routing, the server doesn't know how to handle routes like `/login`, `/dashboard`, etc. Instead of serving your `index.html` file, it returns a 404 error.

## Solutions by Hosting Platform

### 1. Netlify
- **File**: `_redirects` (already created in `public/` and `dist/`)
- **Action**: Deploy your `dist` folder to Netlify
- **Note**: The `_redirects` file will automatically handle all routes

### 2. Vercel
- **File**: `vercel.json` (already created in root)
- **Action**: Deploy using Vercel CLI or GitHub integration
- **Command**: `vercel --prod`

### 3. Apache Server (cPanel, shared hosting)
- **File**: `.htaccess` (already created in `public/` and `dist/`)
- **Action**: Upload the `dist` folder contents to your web root
- **Note**: Make sure the `.htaccess` file is in the same directory as `index.html`

### 4. Firebase Hosting
- **File**: `firebase.json` (already created in root)
- **Commands**:
  ```bash
  npm install -g firebase-tools
  firebase login
  firebase init hosting
  firebase deploy
  ```

### 5. GitHub Pages
- **Action**: Use the `gh-pages` branch or GitHub Actions
- **Note**: GitHub Pages has limitations with client-side routing

### 6. AWS S3 + CloudFront
- **Action**: Configure CloudFront to redirect 404 errors to `index.html`
- **Error Pages**: Set 404 error to return `index.html` with 200 status

## Quick Fix Steps

### If you're using Netlify:
1. Make sure `dist/_redirects` exists (✅ already created)
2. Deploy the `dist` folder

### If you're using Apache/cPanel:
1. Make sure `dist/.htaccess` exists (✅ already created)
2. Upload all files from `dist/` to your web root directory
3. Ensure `.htaccess` is in the same folder as `index.html`

### If you're using Vercel:
1. Make sure `vercel.json` exists in root (✅ already created)
2. Deploy using Vercel

## Build and Deploy Commands

```bash
# Build the project
npm run build

# The built files will be in the 'dist' folder
# Upload the contents of 'dist' folder to your hosting service
```

## Testing Locally

To test if the routing works locally:
```bash
# Serve the built files
npm run preview

# Or use a simple HTTP server
npx serve dist
```

## Environment Variables

Make sure your hosting platform has the required environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Troubleshooting

1. **Still getting 404s?**
   - Check if the hosting configuration file is in the correct location
   - Verify the file is being uploaded/deployed

2. **Routes work but refresh gives 404?**
   - This confirms you need the hosting configuration files

3. **Assets not loading?**
   - Check if the base URL is correct in your build

## Files Created for You

✅ `public/_redirects` - For Netlify
✅ `public/.htaccess` - For Apache servers
✅ `dist/_redirects` - Copy for current build
✅ `dist/.htaccess` - Copy for current build
✅ `vercel.json` - For Vercel
✅ `netlify.toml` - For Netlify (alternative)
✅ `firebase.json` - For Firebase Hosting

Choose the appropriate file based on your hosting platform and deploy!
