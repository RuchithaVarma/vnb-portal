import { db } from "../lib/firebase";
import {
  collection,
  doc,
  writeBatch,
} from "firebase/firestore";

const kidsCourses = [
  {
    title: 'Fun with Numbers',
    ageGroup: '3-5',
    category: 'Math',
    grades: '3-5 years',
    instructor: 'Ms. Priya Sharma',
    rating: 4.9,
    enrolled: 3420,
    duration: '2 months',
    price: 2999,
    originalPrice: 4999,
    icon: 'Calculator',
    color: 'from-blue-400 to-blue-600',
    lessons: 24,
    description: 'Learn numbers through fun games and activities',
    features: ['Interactive Games', 'Visual Learning', 'Fun Worksheets'],
    isKidsCourse: true
  },
  {
    title: 'Creative Art & Craft',
    ageGroup: '6-8',
    category: 'Art',
    grades: '6-8 years',
    instructor: 'Ms. Anita Desai',
    rating: 4.8,
    enrolled: 2890,
    duration: '3 months',
    price: 3999,
    originalPrice: 6999,
    icon: 'Palette',
    color: 'from-purple-400 to-purple-600',
    lessons: 36,
    description: 'Explore creativity through drawing, painting, and crafts',
    features: ['Live Drawing Sessions', 'Craft Projects', 'Art Appreciation'],
    isKidsCourse: true
  },
  {
    title: 'Music & Rhythm',
    ageGroup: '6-12',
    category: 'Music',
    grades: '6-12 years',
    instructor: 'Mr. Rajiv Kumar',
    rating: 4.7,
    enrolled: 1567,
    duration: '4 months',
    price: 5999,
    originalPrice: 9999,
    icon: 'Music',
    color: 'from-pink-400 to-pink-600',
    lessons: 48,
    description: 'Learn basics of music, rhythm, and instruments',
    features: ['Vocal Training', 'Rhythm Exercises', 'Instrument Basics'],
    isKidsCourse: true
  },
  {
    title: 'Coding for Kids',
    ageGroup: '9-12',
    category: 'Technology',
    grades: '9-12 years',
    instructor: 'Tech Expert Rohan',
    rating: 4.9,
    enrolled: 4234,
    duration: '3 months',
    price: 7999,
    originalPrice: 12999,
    icon: 'Gamepad2',
    color: 'from-green-400 to-green-600',
    lessons: 36,
    description: 'Introduction to coding through games and animations',
    features: ['Block Programming', 'Game Development', 'Animation Basics'],
    isKidsCourse: true
  },
  {
    title: 'English Story Time',
    ageGroup: '3-8',
    category: 'Language',
    grades: '3-8 years',
    instructor: 'Ms. Sarah Johnson',
    rating: 4.8,
    enrolled: 5678,
    duration: '2 months',
    price: 3499,
    originalPrice: 5999,
    icon: 'BookOpen',
    color: 'from-orange-400 to-orange-600',
    lessons: 24,
    description: 'Improve English through interactive storytelling',
    features: ['Story Sessions', 'Vocabulary Building', 'Reading Practice'],
    isKidsCourse: true
  },
  {
    title: 'Science Explorers',
    ageGroup: '9-12',
    category: 'Science',
    grades: '9-12 years',
    instructor: 'Dr. Meena Patel',
    rating: 4.7,
    enrolled: 2345,
    duration: '4 months',
    price: 6999,
    originalPrice: 10999,
    icon: 'Sparkles',
    color: 'from-teal-400 to-teal-600',
    lessons: 48,
    description: 'Discover science through fun experiments',
    features: ['Live Experiments', 'Science Projects', 'Concept Videos'],
    isKidsCourse: true
  }
];

async function migrate() {
  console.log("🚀 Starting migration of kids courses to Firestore...");
  const batch = writeBatch(db);
  
  kidsCourses.forEach((course) => {
    const docRef = doc(collection(db, "courses"));
    batch.set(docRef, {
      ...course,
      id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  });

  try {
    await batch.commit();
    console.log(`✅ Successfully migrated ${kidsCourses.length} kids courses to Firestore!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error migrating courses:", error);
    process.exit(1);
  }
}

migrate();
