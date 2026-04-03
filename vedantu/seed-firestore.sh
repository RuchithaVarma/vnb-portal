#!/bin/bash

# Firebase Firestore Seeder Script
# This script seeds Firestore with initial data to prevent connection errors

echo "🌱 Seeding Firestore with initial data..."

# Check if firebase-tools is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Navigate to the vedantu directory
cd "$(dirname "$0")"

# Use the emulator if in development
if [ "$NODE_ENV" = "development" ]; then
    echo "🔧 Using Firebase Emulator for development..."
    firebase emulators:start --only firestore --project brilliantroots-541a2 &
    EMULATOR_PID=$!
    
    # Wait for emulator to start
    sleep 5
    
    # Seed data using the emulator
    echo "📝 Seeding data to emulator..."
    node -e "
    const { initializeApp } = require('firebase/app');
    const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');
    const seedData = require('./src/data/seed-data.json');
    
    const app = initializeApp({
      projectId: 'brilliantroots-541a2',
    });
    
    const db = getFirestore(app);
    db.useEmulator('localhost', 8080);
    
    async function seed() {
      for (const [collectionName, items] of Object.entries(seedData)) {
        console.log(\`Seeding \${collectionName}...\`);
        for (const item of items) {
          await addDoc(collection(db, collectionName), {
            ...item,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      }
      console.log('✅ Seeding complete!');
      process.exit(0);
    }
    
    seed().catch(err => {
      console.error('❌ Seeding failed:', err);
      process.exit(1);
    });
    "
    
    # Stop the emulator
    kill $EMULATOR_PID
else
    echo "🌐 Seeding data to production Firestore..."
    # Use production Firestore
    node -e "
    const { initializeApp } = require('firebase/app');
    const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');
    require('dotenv').config();
    
    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });
    
    const db = getFirestore(app);
    
    async function seed() {
      try {
        const seedData = require('./src/data/seed-data.json');
        for (const [collectionName, items] of Object.entries(seedData)) {
          console.log(\`Seeding \${collectionName}...\`);
          for (const item of items) {
            await addDoc(collection(db, collectionName), {
              ...item,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          }
        }
        console.log('✅ Seeding complete!');
      } catch (error) {
        console.log('ℹ️  Data might already exist or there was an error:', error.message);
      }
      process.exit(0);
    }
    
    seed().catch(err => {
      console.error('❌ Seeding failed:', err);
      process.exit(1);
    });
    "
fi

echo "🎉 Firestore seeding process completed!"
