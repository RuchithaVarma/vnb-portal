#!/bin/bash

echo "🔥 Setting up Java 21 and importing data..."

# Set Java 21 path
export PATH="/usr/local/opt/openjdk@21/bin:$PATH"

# Start emulator in background
cd vedantu
firebase emulators:start --only firestore &
EMULATOR_PID=$!

# Wait for emulator to start
echo "⏳ Waiting for emulator to start..."
sleep 10

# Run import
echo "📥 Importing data..."
npx tsx src/scripts/import-data.ts

# Stop emulator
echo "🛑 Stopping emulator..."
kill $EMULATOR_PID

echo "✅ Done!"
