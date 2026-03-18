// Script to add sample users to Firestore
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

// Your Firebase config (make sure this matches your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCkqQE8PzPjKcXkz5x9x9x9x9x9x9x9x",
  authDomain: "brilliant-roots.firebaseapp.com",
  projectId: "brilliant-roots",
  storageBucket: "brilliant-roots.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample users data
const sampleUsers = [
  {
    email: "student1@brilliantroots.com",
    password: "password123",
    name: "Rahul Kumar",
    phone: "9876543210",
    grade: "10",
    role: "student",
    username: "rahul2008",
    course: "Mathematics",
    preferredTiming: "Evening",
    parentName: "Rajesh Kumar",
    paymentStatus: "paid",
    paymentAmount: 5000,
    paymentDate: new Date("2024-01-15").toISOString(),
  },
  {
    email: "student2@brilliantroots.com",
    password: "password123",
    name: "Priya Sharma",
    phone: "9876543211",
    grade: "9",
    role: "student",
    username: "priya2009",
    course: "Science",
    preferredTiming: "Morning",
    parentName: "Amit Sharma",
    paymentStatus: "pending",
    paymentAmount: 4500,
    paymentDate: null,
  },
  {
    email: "student3@brilliantroots.com",
    password: "password123",
    name: "Amit Patel",
    phone: "9876543212",
    grade: "jee",
    role: "student",
    username: "amitjee",
    course: "JEE Preparation",
    preferredTiming: "Afternoon",
    parentName: "Suresh Patel",
    paymentStatus: "paid",
    paymentAmount: 8000,
    paymentDate: new Date("2024-02-01").toISOString(),
  },
];

async function addSampleUsers() {
  console.log("Starting to add sample users...");

  for (const user of sampleUsers) {
    try {
      // Generate application ID
      const applicationId =
        "BR" + Math.random().toString(36).substring(2, 9).toUpperCase();

      // Prepare user data
      const userData = {
        ...user,
        applicationId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store in Firestore (using email as document ID for testing)
      console.log(`Storing user data in Firestore for ${user.email}...`);
      await setDoc(
        doc(db, "users", user.email.replace(/[@.]/g, "_")),
        userData,
      );

      console.log(`✅ Successfully added user: ${user.name}`);
    } catch (error) {
      console.error(`❌ Error adding user ${user.email}:`, error);
    }
  }

  console.log("Finished adding sample users!");
}

// Check existing users
async function checkExistingUsers() {
  console.log("Checking existing users in Firestore...");

  try {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);

    console.log(`Found ${snapshot.docs.length} users in the collection:`);
    snapshot.docs.forEach((doc) => {
      console.log(`- ${doc.id}: ${doc.data().name} (${doc.data().email})`);
    });
  } catch (error) {
    console.error("Error checking users:", error);
  }
}

// Run the functions
checkExistingUsers().then(() => {
  addSampleUsers().then(() => {
    console.log("\nFinal check:");
    checkExistingUsers();
  });
});
