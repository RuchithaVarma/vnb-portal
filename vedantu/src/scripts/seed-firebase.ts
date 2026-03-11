import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, writeBatch } from "firebase/firestore";

// Firebase configuration - using the same config from the project
const firebaseConfig = {
  apiKey: "AIzaSyAcCgHfU9nXzz0GxSGbcvMrQwQ5FFAq1aQ",
  authDomain: "brilliantroots-27ce3.firebaseapp.com",
  projectId: "brilliantroots-27ce3",
  storageBucket: "brilliantroots-27ce3.firebasestorage.app",
  messagingSenderId: "429371611993",
  appId: "1:429371611993:web:df4f67b279c69683db8a48",
  measurementId: "G-37477X5F69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample data for collections
const courses = [
  { 
    title: "JEE/NEET Preparation", 
    color: "from-red-400 to-pink-500",
    grades: "Class 11-12",
    features: ["Live Classes", "Doubt Solving", "Test Series"],
    duration: "12 months",
    price: 49999,
    enrolled: 2500,
    rating: 4.8
  },
  { 
    title: "CBSE School Tuition", 
    color: "from-blue-400 to-cyan-500",
    grades: "Class 1-12",
    features: ["All Subjects", "NCERT Based", "Board Prep"],
    duration: "10 months",
    price: 29999,
    enrolled: 3200,
    rating: 4.7
  },
  { 
    title: "Coding for Kids", 
    color: "from-purple-400 to-indigo-500",
    grades: "Class 1-8",
    features: ["Scratch", "Python", "Web Dev"],
    duration: "6 months",
    price: 19999,
    enrolled: 1800,
    rating: 4.9
  }
];

const stats = [
  { value: "2.1Cr+", label: "Hours of Learning", color: "from-orange-400 to-red-400" },
  { value: "10K+", label: "Students Scored 90%+", color: "from-yellow-400 to-orange-400" },
  { value: "500+", label: "Expert Teachers", color: "from-blue-400 to-purple-400" },
  { value: "100+", label: "Cities Covered", color: "from-green-400 to-teal-400" }
];

const teachers = [
  { 
    name: "Dr. Rajesh Kumar", 
    subject: "Physics", 
    qualification: "IIT Delhi, PhD", 
    experience: "15+ years", 
    color: "from-blue-400 to-cyan-400"
  },
  { 
    name: "Prof. Anita Sharma", 
    subject: "Mathematics", 
    qualification: "IIT Bombay, M.Tech", 
    experience: "12+ years", 
    color: "from-purple-400 to-pink-400"
  },
  { 
    name: "Mr. Vikram Singh", 
    subject: "Chemistry", 
    qualification: "IIT Kanpur, B.Tech", 
    experience: "10+ years", 
    color: "from-green-400 to-teal-400"
  }
];

// Function to seed a collection
async function seedCollection(collectionName: string, data: any[]) {
  console.log(`Seeding ${collectionName}...`);
  const batch = writeBatch(db);
  
  data.forEach((item) => {
    const docRef = doc(collection(db, collectionName));
    batch.set(docRef, {
      ...item,
      id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  });
  
  try {
    await batch.commit();
    console.log(`✅ Successfully seeded ${collectionName} with ${data.length} documents`);
  } catch (error) {
    console.error(`❌ Error seeding ${collectionName}:`, error);
    throw error;
  }
}

// Main seed function
async function seedDatabase() {
  console.log('🚀 Starting Firebase database seeding...\n');
  
  try {
    // Seed all collections
    await seedCollection("courses", courses);
    await seedCollection("stats", stats);
    await seedCollection("teachers", teachers);
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Collections created:');
    console.log('  - courses: 3 documents');
    console.log('  - stats: 4 documents');
    console.log('  - teachers: 3 documents');
    console.log('\n🔥 Firebase project: brilliantroots-27ce3');
    
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seed
seedDatabase();
