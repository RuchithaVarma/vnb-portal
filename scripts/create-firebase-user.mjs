import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(app);

const ADMIN_EMAIL = "rawpowders@gmail.com";
const ADMIN_PASSWORD = "welcome123";

async function createFirebaseUser() {
  try {
    console.log("🔧 Creating Firebase user...");
    
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    const user = userCredential.user;
    
    console.log("✅ Firebase user created successfully!");
    console.log("📧 Email:", ADMIN_EMAIL);
    console.log("🔑 Password:", ADMIN_PASSWORD);
    console.log("🆔 UID:", user.uid);
    console.log("\n🎯 You can now login with these credentials!");
    
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("ℹ️  User already exists in Firebase Authentication");
      console.log("📧 Email:", ADMIN_EMAIL);
      console.log("🔑 Try password: welcome123");
      console.log("🆔 Or check the existing user's UID in Firebase Console");
    } else {
      console.error("❌ Error creating user:", error.message);
    }
    process.exit(1);
  }
}

createFirebaseUser();
