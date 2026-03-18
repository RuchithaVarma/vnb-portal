// Test and Fix Script for User Data Storage
// This script helps verify and fix user data storage issues

import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "./src/lib/firebase.js";

// Test user data with all required fields
const testUserData = {
  name: "Test Student",
  email: "test@brilliantroots.com",
  phone: "9876543200",
  grade: "10",
  role: "student",
  username: "teststudent",
  password: "Brilliant@123",
  course: "Mathematics",
  preferredTiming: "Evening",
  parentName: "Test Parent",
  paymentStatus: "pending",
  paymentAmount: 5000,
  paymentDate: null,
  applicationId: "BRTEST123",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

async function testUserStorage() {
  console.log("Testing user data storage...");

  try {
    // Test 1: Check if Firebase is properly initialized
    console.log("✅ Firebase initialized successfully");

    // Test 2: Try to write a test document
    const testDocRef = doc(db, "users", "test_user_" + Date.now());
    await setDoc(testDocRef, testUserData);
    console.log("✅ Successfully wrote test user data to Firestore");

    // Test 3: Try to read the document back
    const docSnap = await getDoc(testDocRef);
    if (docSnap.exists()) {
      console.log("✅ Successfully read test user data from Firestore");
      console.log("Stored data:", docSnap.data());
    } else {
      console.log("❌ Failed to read test user data");
    }

    // Test 4: Check existing users
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);
    console.log(`\n📊 Current users in collection: ${snapshot.docs.length}`);

    snapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`\nUser ${index + 1}:`);
      console.log(`  ID: ${doc.id}`);
      console.log(`  Name: ${data.name || "N/A"}`);
      console.log(`  Email: ${data.email || "N/A"}`);
      console.log(`  Phone: ${data.phone || "N/A"}`);
      console.log(`  Grade: ${data.grade || "N/A"}`);
      console.log(`  Role: ${data.role || "N/A"}`);
      console.log(`  Password: ${data.password ? "✓ Stored" : "✗ Not stored"}`);
      console.log(`  Application ID: ${data.applicationId || "N/A"}`);
      console.log(`  Created: ${data.createdAt || "N/A"}`);
    });
  } catch (error) {
    console.error("❌ Error during test:", error);
    console.error("Error details:", error.message);

    // Check if it's a permissions issue
    if (error.message.includes("permission-denied")) {
      console.log("\n🔒 This appears to be a Firebase permissions issue.");
      console.log(
        "Please check your Firestore security rules in the Firebase console.",
      );
      console.log("For testing, you can use these rules:\n");
      console.log(
        "rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if true;\n    }\n  }\n}",
      );
    }
  }
}

// Function to fix missing fields in existing users
async function fixExistingUsers() {
  console.log("\n🔧 Checking and fixing existing users...");

  try {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);

    for (const docSnapshot of snapshot.docs) {
      const data = docSnapshot.data();
      const needsUpdate = {};

      // Check for required fields
      const requiredFields = {
        role: "student",
        applicationId:
          data.applicationId ||
          "BR" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        updatedAt: new Date().toISOString(),
      };

      // Check which fields are missing
      Object.keys(requiredFields).forEach((field) => {
        if (!data[field]) {
          needsUpdate[field] = requiredFields[field];
        }
      });

      // Update if needed
      if (Object.keys(needsUpdate).length > 0) {
        console.log(
          `Updating user ${docSnapshot.id} with missing fields:`,
          needsUpdate,
        );
        await setDoc(
          doc(db, "users", docSnapshot.id),
          { ...data, ...needsUpdate },
          { merge: true },
        );
        console.log(`✅ Updated user ${docSnapshot.id}`);
      }
    }

    console.log("✅ Finished fixing existing users");
  } catch (error) {
    console.error("❌ Error fixing users:", error);
  }
}

// Function to test both users and students collections
async function testBothCollections() {
  console.log("\n🔄 Testing data storage in both collections...");

  const testUid = "test_" + Date.now();
  const testData = {
    name: "Test Student",
    email: `test${Date.now()}@example.com`,
    phone: "9876543210",
    role: "student",
    grade: "Class 8",
    course: "Class 7 & 8",
    preferredTiming: "Morning (10:00 AM - 12:00 PM)",
    parentName: "Test Parent",
    paymentStatus: "pending",
    paymentAmount: 15000,
    applicationId:
      "BR" + Math.random().toString(36).substring(2, 9).toUpperCase(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    // Store in users collection
    console.log("\n1. Storing in users collection...");
    await setDoc(doc(db, "users", testUid), testData);
    console.log("✅ Stored in users collection");

    // Store in students collection
    console.log("\n2. Storing in students collection...");
    const studentData = {
      studentName: testData.name,
      parentName: testData.parentName,
      studentClass: testData.grade,
      email: testData.email,
      phone: testData.phone,
      course: testData.course,
      slot: testData.preferredTiming,
      role: testData.role,
      createdAt: new Date().toISOString(),
      courseFee: testData.paymentAmount,
    };
    await setDoc(doc(db, "students", testUid), studentData);
    console.log("✅ Stored in students collection");

    // Verify both collections
    console.log("\n3. Verifying users collection...");
    const userDoc = await getDoc(doc(db, "users", testUid));
    if (userDoc.exists()) {
      console.log("✅ Found in users collection");
      console.log(`   Role: ${userDoc.data().role}`);
      console.log(`   Application ID: ${userDoc.data().applicationId}`);
    }

    console.log("\n4. Verifying students collection...");
    const studentDoc = await getDoc(doc(db, "students", testUid));
    if (studentDoc.exists()) {
      console.log("✅ Found in students collection");
      console.log(`   Course: ${studentDoc.data().course}`);
      console.log(`   Slot: ${studentDoc.data().slot}`);
    }

    console.log("\n✅ Both collections test passed!");
  } catch (error) {
    console.error("❌ Error testing both collections:", error);
  }
}

// Run the tests
testUserStorage()
  .then(() => {
    fixExistingUsers();
    testBothCollections();
  })
  .catch((error) => {
    console.error("Script failed:", error);
  });
