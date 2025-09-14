# Fix for FutuResume 404 Error on GitHub Pages

## Problem
The website https://webdevsha.github.io/FutuResume/ shows a 404 error because the GitHub Pages deployment is not configured correctly for a Vite/React application.

## Root Cause
The current `.github/workflows/static.yml` in the FutuResume repository is deploying the raw source code instead of the built application. Vite projects need to be built first to generate static files that can be served by GitHub Pages.

## Solution

### 1. Update the GitHub Actions Workflow
Replace the current `.github/workflows/static.yml` in the FutuResume repository with the corrected workflow found in this repository: `.github/workflows/deploy-vite-to-github-pages.yml`.

The key changes are:
- **Add Node.js setup and build step**: Install dependencies and run `npm run build`
- **Deploy the dist folder**: Upload `./dist` instead of the entire repository
- **Separate build and deploy jobs**: Better organization and error handling

### 2. Configure Vite Base Path
Update the `vite.config.ts` in the FutuResume repository to include the correct base path:

```typescript
export default defineConfig({
  // ... existing config
  base: process.env.NODE_ENV === 'production' ? '/FutuResume/' : '/',
});
```

### 3. Verify Package.json Scripts
Ensure the FutuResume repository has the correct build script in `package.json`:

```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

## Why This Fixes the Issue

1. **Proper Build Process**: The workflow now builds the Vite application, generating optimized static files
2. **Correct Asset Paths**: The base path configuration ensures all assets load correctly on GitHub Pages
3. **Static File Deployment**: Only the built files (from `dist/`) are deployed, not the source code

## Implementation Steps

1. Copy the corrected workflow from this repository to FutuResume
2. Update the vite.config.ts with the correct base path
3. Commit and push the changes to trigger a new deployment
4. Wait for the GitHub Actions workflow to complete
5. Visit https://webdevsha.github.io/FutuResume/ to verify the fix

## Additional Notes

- The workflow includes Node.js caching for faster builds
- The base path only applies in production, so local development remains unaffected
- The deployment uses the official GitHub Pages actions for reliability