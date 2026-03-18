// Set NODE_ENV to development to connect to emulator
(process.env as any).NODE_ENV = "development";

import { db } from "../lib/firebase";
import {
  collection,
  doc,
  setDoc,
  writeBatch,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import seedData from "../data/seed-data.json";

// Clear existing data and seed fresh data
async function clearCollection(collectionName: string) {
  console.log(`🔍 Clearing existing data from ${collectionName}...`);
  const querySnapshot = await getDocs(collection(db, collectionName));
  const batch = writeBatch(db);
  let count = 0;
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
    count++;
  });
  if (count > 0) {
    await batch.commit();
    console.log(`✅ Cleared ${count} documents from ${collectionName}`);
  } else {
    console.log(`ℹ️ ${collectionName} was already empty`);
  }
}

async function seedCollection(collectionName: string, data: any[]) {
  console.log(`Seeding ${collectionName}...`);
  const batch = writeBatch(db);
  data.forEach((item) => {
    const docRef = doc(collection(db, collectionName));
    batch.set(docRef, {
      ...item,
      id: docRef.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
  await batch.commit();
  console.log(
    `✅ Finished seeding ${collectionName} with ${data.length} documents.`,
  );
}

async function runImport() {
  console.log("🚀 Starting Firebase data import for Vedantu Academy...\n");

  try {
    // Clear existing data
    const collections = Object.keys(seedData);
    for (const collection of collections) {
      await clearCollection(collection);
    }

    console.log("\n📝 Importing fresh data...\n");

    // Seed all collections from JSON data
    for (const [collectionName, data] of Object.entries(seedData)) {
      await seedCollection(collectionName, data as any[]);
    }

    console.log("\n🎉 All data imported successfully to Firebase!");
    console.log("📊 Final Status:");
    
    for (const collection of collections) {
      console.log(`  - ${collection}: ✅`);
    }

    // Explicitly exit the process
    process.exit(0);
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
}

// Run the import function
runImport();
