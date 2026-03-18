#!/bin/bash

# Set PATH for Node.js and npm
export PATH="/usr/local/bin:$PATH"

echo "🚀 Starting build process..."

# Clean previous builds
rm -rf .next out

# Install dependencies
echo "📦 Installing dependencies..."
/usr/local/bin/npm ci || {
  echo "❌ Failed to install dependencies"
  exit 1
}

# Build the project
echo "🔨 Building project..."
/usr/local/bin/npm run build || {
  echo "❌ Build failed"
  exit 1
}

# Check if out directory exists
if [ -d "out" ]; then
  echo "✅ Build completed successfully!"
  echo "📁 Output directory contents:"
  ls -la out/
else
  echo "❌ Output directory 'out' was not created"
  exit 1
fi
