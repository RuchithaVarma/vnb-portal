#!/bin/bash

echo "🔥 Starting Firebase Emulator..."
cd vedantu

# Start Firestore emulator in background
firebase emulators:start --only firestore &
EMULATOR_PID=$!

# Wait for emulator to start
echo "⏳ Waiting for emulator to start..."
sleep 5

# Run the import script
echo "📥 Importing data from seed-data.json..."
npx tsx src/scripts/import-data.ts

# Stop the emulator
echo "🛑 Stopping emulator..."
kill $EMULATOR_PID

echo "✅ Import completed!"
