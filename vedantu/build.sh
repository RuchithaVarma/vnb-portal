#!/bin/bash

echo "🚀 Starting build process..."

# Clean previous builds
rm -rf .next out

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

echo "✅ Build completed!"
