# Netlify Deployment Instructions

## Build Configuration

The site is configured for static export using Next.js `output: "export"` mode.

## Key Configuration Files

### netlify.toml
- **Base Directory**: `/` (root)
- **Build Command**: `cd vedantu && npm ci && npm run build`
- **Publish Directory**: `vedantu/out`
- **Node Version**: 20

### Next.js Configuration (vedantu/next.config.js)
- Static export enabled
- Output directory: `out`
- Images unoptimized for static hosting

## Troubleshooting

### Build Failures
1. Check that `vedantu/package.json` has the correct build script
2. Ensure TypeScript `noEmit` is set to `false` in `vedantu/tsconfig.json`
3. Verify no server-side code is being imported in client components

### Common Issues
- **"Deploy directory does not exist"**: Ensure the build command successfully creates the `out` directory
- **TypeScript errors**: Check that all imports are valid and types are correct
- **Static export issues**: Remove any API routes or server-side dependencies

## Deployment Process

1. Push changes to the main branch
2. Netlify automatically triggers a build
3. Build runs `npm ci` for clean dependency installation
4. Next.js generates static files in `out` directory
5. Files are deployed to Netlify CDN

## Environment Variables

No environment variables are required for the static build. All configuration is hardcoded in the source files.
