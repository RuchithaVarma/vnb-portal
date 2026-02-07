import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5_DFNmSNVvLF_OKaK7E2llulN8vYc8Zo",
  authDomain: "bloomsraw-e2af6.firebaseapp.com",
  projectId: "bloomsraw-e2af6",
  storageBucket: "bloomsraw-e2af6.firebasestorage.app",
  messagingSenderId: "308381166050",
  appId: "1:308381166050:web:ceb32b2e281f1f525331bb",
  measurementId: "G-N2E77KQ2P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ADMIN_EMAIL = "rawpowders@gmail.com";
const ADMIN_UID = "admin-user-001"; // Placeholder UID

async function setupAdminRole() {
  try {
    console.log("🔧 Setting up admin user role in Firestore...");
    
    // Check if user document already exists
    const userDocRef = doc(db, "users", ADMIN_UID);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log("ℹ️  User document already exists in Firestore");
      const userData = userDoc.data();
      if (userData.role === 'admin') {
        console.log("✅ User already has admin role");
      } else {
        // Update to admin role
        await setDoc(userDocRef, {
          email: ADMIN_EMAIL,
          role: 'admin',
          createdAt: userData.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        console.log("✅ Updated user to admin role");
      }
    } else {
      // Create new user document in Firestore
      await setDoc(userDocRef, {
        email: ADMIN_EMAIL,
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log("✅ Created admin user document in Firestore");
    }

    console.log("\n📋 NEXT STEPS:");
    console.log("1. Go to Firebase Console: https://console.firebase.google.com/");
    console.log("2. Select your project: bloomsraw-e2af6");
    console.log("3. Go to Authentication → Sign-in method");
    console.log("4. Enable 'Email/Password' authentication");
    console.log("5. Go to Authentication → Users");
    console.log("6. Click 'Add user'");
    console.log("7. Create user with:");
    console.log("   Email:", ADMIN_EMAIL);
    console.log("   Password: welcome");
    console.log("8. Copy the User UID from Firebase Console");
    console.log("9. Update the Firestore 'users' collection:");
    console.log("   - Delete the document with ID:", ADMIN_UID);
    console.log("   - Create a new document with the copied UID");
    console.log("   - Add fields: email, role: 'admin', createdAt, updatedAt");
    console.log("\nAlternatively, you can manually create the user in Firebase Console");
    console.log("and then run this script to set the admin role.");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting up admin role:", error);
    process.exit(1);
  }
}

setupAdminRole();
