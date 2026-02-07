#!/bin/bash

# setup-dev-infra.sh - Automates development environment setup

set -e

echo "🚀 Starting Blooms Energy Dev Setup..."

# 1. Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

# 2. Check for Yarn
if ! command -v yarn &> /dev/null; then
    echo "📦 Installing yarn..."
    npm install -g yarn
fi

# 3. Install dependencies
echo "📦 Installing dependencies..."
yarn install

# 4. Check Environment Variables
echo "🔑 Validating environment..."
node scripts/check-env.js

# 5. Seeding initial data (optional but recommended)
read -p "❓ Do you want to seed initial products into Firestore? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding products..."
    node scripts/seed-products.mjs
fi

echo "✅ Setup complete! You can now run 'yarn dev' to start the application."
