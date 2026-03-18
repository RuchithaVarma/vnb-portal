// Test Firestore permissions and connectivity
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function testFirestoreConnection() {
  console.log("Testing Firestore connection...");
  
  try {
    // Test 1: Write to a test document
    const testDocRef = doc(db, "test", "connection-test-" + Date.now());
    const testData = {
      timestamp: new Date().toISOString(),
      message: "Connection test",
      test: true
    };
    
    await setDoc(testDocRef, testData);
    console.log("✅ Firestore write successful");
    
    // Test 2: Read the document back
    const docSnap = await getDoc(testDocRef);
    if (docSnap.exists()) {
      console.log("✅ Firestore read successful");
      console.log("Test data:", docSnap.data());
    } else {
      console.error("❌ Firestore read failed - document not found");
    }
    
    // Test 3: Try to write to users collection
    const usersTestRef = doc(db, "users", "test-user-" + Date.now());
    const userTestData = {
      name: "Test User",
      email: "test@example.com",
      role: "student",
      test: true,
      createdAt: new Date().toISOString()
    };
    
    await setDoc(usersTestRef, userTestData);
    console.log("✅ Users collection write successful");
    
    // Verify the user data
    const userDocSnap = await getDoc(usersTestRef);
    if (userDocSnap.exists()) {
      console.log("✅ Users collection read successful");
      console.log("User test data:", userDocSnap.data());
    } else {
      console.error("❌ Users collection read failed");
    }
    
    return true;
  } catch (error: any) {
    console.error("❌ Firestore test failed:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    
    if (error.code === "permission-denied") {
      console.error("\n🔒 PERMISSION DENIED - Check Firestore security rules!");
      console.error("Current rules may not allow write access.");
      console.error("Update rules in Firebase Console → Firestore → Rules");
    }
    
    return false;
  }
}

// Run the test if this file is imported
if (typeof window !== 'undefined') {
  // Auto-run in browser environment
  setTimeout(() => {
    console.log("Running Firestore connection test...");
    testFirestoreConnection();
  }, 1000);
}

export { testFirestoreConnection as default };
