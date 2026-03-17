#!/bin/bash

echo "🔥 Starting Firebase Emulator..."
cd vedantu

# Start Firestore emulator in background
firebase emulators:start --only firestore &
EMULATOR_PID=$!

# Wait for emulator to start
echo "⏳ Waiting for emulator to start..."
sleep 5

# Run the seed script
echo "🌱 Running seed script..."
npx tsx src/scripts/seed.ts

# Stop the emulator
echo "🛑 Stopping emulator..."
kill $EMULATOR_PID

echo "✅ Done!"
