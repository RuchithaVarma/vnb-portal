import { db } from "../lib/firebase";
import { collection, doc, setDoc, writeBatch, getDocs, deleteDoc } from "firebase/firestore";

// Clear existing data and seed fresh data
async function clearCollection(collectionName: string) {
  console.log(`Clearing existing data from ${collectionName}...`);
  const querySnapshot = await getDocs(collection(db, collectionName));
  const batch = writeBatch(db);
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  console.log(`Cleared ${collectionName}`);
}

const courses = [
  { 
    title: "JEE/NEET Preparation", 
    color: "from-red-400 to-pink-500",
    grades: "Class 11-12",
    features: ["Live Classes", "Doubt Solving", "Test Series"],
    duration: "12 months",
    price: 49999,
    enrolled: 2500,
    rating: 4.8,
    image: "/images/courses/jeeneet.jpg"
  },
  { 
    title: "CBSE School Tuition", 
    color: "from-blue-400 to-cyan-500",
    grades: "Class 1-12",
    features: ["All Subjects", "NCERT Based", "Board Prep"],
    duration: "10 months",
    price: 29999,
    enrolled: 3200,
    rating: 4.7,
    image: "/images/courses/cbse.jpg"
  },
  { 
    title: "Coding for Kids", 
    color: "from-purple-400 to-indigo-500",
    grades: "Class 1-8",
    features: ["Scratch", "Python", "Web Dev"],
    duration: "6 months",
    price: 19999,
    enrolled: 1800,
    rating: 4.9,
    image: "/images/courses/coding.jpg"
  },
  { 
    title: "Spoken English", 
    color: "from-green-400 to-teal-500",
    grades: "All Ages",
    features: ["Fluency", "Grammar", "Confidence"],
    duration: "3 months",
    price: 14999,
    enrolled: 2100,
    rating: 4.6,
    image: "/images/courses/english.jpg"
  },
  { 
    title: "Mathematics", 
    color: "from-yellow-400 to-orange-500",
    grades: "Class 1-12",
    features: ["Vedic Math", "Olympiad", "Advanced"],
    duration: "8 months",
    price: 24999,
    enrolled: 1900,
    rating: 4.8,
    image: "/images/courses/mathematics.jpg"
  },
  { 
    title: "Creative Arts", 
    color: "from-pink-400 to-rose-500",
    grades: "Class 1-8",
    features: ["Drawing", "Music", "Dance"],
    duration: "6 months",
    price: 17999,
    enrolled: 1500,
    rating: 4.7,
    image: "/images/courses/arts.jpg"
  }
];

const stats = [
  { value: "2.1Cr+", label: "Hours of Learning", color: "from-orange-400 to-red-400", icon: "⏱️" },
  { value: "10K+", label: "Students Scored 90%+", color: "from-yellow-400 to-orange-400", icon: "🏆" },
  { value: "500+", label: "Expert Teachers", color: "from-blue-400 to-purple-400", icon: "👨‍🏫" },
  { value: "100+", label: "Cities Covered", color: "from-green-400 to-teal-400", icon: "🌍" }
];

const features = [
  {
    title: "100% Live Interactive Classes",
    description: "Learn in real-time with two-way audio and video interaction",
    color: "from-red-400 to-pink-500",
    icon: "📹"
  },
  {
    title: "Small Batch Sizes",
    description: "Personal attention with limited students per batch",
    color: "from-blue-400 to-cyan-500",
    icon: "👥"
  },
  {
    title: "Flexible Timings",
    description: "Choose class schedules that fit your routine",
    color: "from-purple-400 to-indigo-500",
    icon: "📅"
  },
  {
    title: "Personalized Learning",
    description: "Customized study plans based on your strengths and weaknesses",
    color: "from-green-400 to-teal-500",
    icon: "🎯"
  },
  {
    title: "24/7 Doubt Support",
    description: "Get your doubts cleared anytime, anywhere",
    color: "from-yellow-400 to-orange-500",
    icon: "💬"
  },
  {
    title: "Regular Assessments",
    description: "Track progress with weekly tests and detailed reports",
    color: "from-pink-400 to-rose-500",
    icon: "📊"
  }
];

const toppers = [
  { 
    name: "Arjun Sharma", 
    rank: "AIR 1", 
    exam: "JEE Advanced 2025", 
    score: "100%",
    image: "/images/students/arjun.jpg",
    story: "Brilliant Roots helped me achieve my dream with their excellent faculty and structured approach."
  },
  { 
    name: "Priya Patel", 
    rank: "AIR 3", 
    exam: "NEET 2025", 
    score: "720/720",
    image: "/images/students/priya.jpg",
    story: "The regular tests and doubt clearing sessions were game-changers for my NEET preparation."
  },
  { 
    name: "Rahul Kumar", 
    rank: "99.8%ile", 
    exam: "Class 12 Boards", 
    score: "98.6%",
    image: "/images/students/rahul.jpg",
    story: "I improved my scores significantly with Brilliant Roots' personalized attention."
  },
  { 
    name: "Sneha Reddy", 
    rank: "State Topper", 
    exam: "Class 10 Boards", 
    score: "100%",
    image: "/images/students/sneha.jpg",
    story: "The teachers made complex topics easy to understand and always motivated me."
  }
];

const teachers = [
  { 
    name: "Dr. Rajesh Kumar", 
    subject: "Physics", 
    qualification: "IIT Delhi, PhD", 
    experience: "15+ years", 
    color: "from-blue-400 to-cyan-400",
    image: "/images/teachers/rajesh.jpg",
    students: 5000,
    rating: 4.9
  },
  { 
    name: "Prof. Anita Sharma", 
    subject: "Mathematics", 
    qualification: "IIT Bombay, M.Tech", 
    experience: "12+ years", 
    color: "from-purple-400 to-pink-400",
    image: "/images/teachers/anita.jpg",
    students: 4500,
    rating: 4.8
  },
  { 
    name: "Mr. Vikram Singh", 
    subject: "Chemistry", 
    qualification: "IIT Kanpur, B.Tech", 
    experience: "10+ years", 
    color: "from-green-400 to-teal-400",
    image: "/images/teachers/vikram.jpg",
    students: 3800,
    rating: 4.7
  },
  {
    name: "Dr. Sunita Rao",
    subject: "Biology",
    qualification: "AIIMS Delhi, MD",
    experience: "8+ years",
    color: "from-red-400 to-pink-400",
    image: "/images/teachers/sunita.jpg",
    students: 3200,
    rating: 4.9
  },
  {
    name: "Prof. Amit Verma",
    subject: "English",
    qualification: "Oxford University, M.Phil",
    experience: "20+ years",
    color: "from-indigo-400 to-purple-400",
    image: "/images/teachers/amit.jpg",
    students: 6000,
    rating: 4.8
  }
];

const testimonials = [
  {
    name: "Priya Sharma",
    achievement: "JEE Advanced AIR 45",
    score: "99.8%ile",
    quote: "Brilliant Roots's live classes and personalized doubt solving helped me crack JEE. The teachers are amazing and always available to help!",
    color: "from-blue-400 to-cyan-500",
    image: "/images/students/priya-testimonial.jpg",
    course: "JEE/NEET Preparation"
  },
  {
    name: "Arjun Patel",
    achievement: "NEET AIR 120",
    score: "720/720",
    quote: "The structured curriculum and regular tests kept me on track. I'm grateful to my Brilliant Roots teachers for their constant support.",
    color: "from-purple-400 to-pink-500",
    image: "/images/students/arjun-testimonial.jpg",
    course: "JEE/NEET Preparation"
  },
  {
    name: "Sneha Reddy",
    achievement: "Class 12 CBSE",
    score: "98.4%",
    quote: "I improved from 75% to 98% with Brilliant Roots! The interactive classes made learning fun and the study materials were excellent.",
    color: "from-green-400 to-teal-500",
    image: "/images/students/sneha-testimonial.jpg",
    course: "CBSE School Tuition"
  },
  {
    name: "Rahul Kumar",
    achievement: "Class 10 ICSE",
    score: "96.8%",
    quote: "Brilliant Roots helped me build strong fundamentals. The teachers explain concepts so clearly that even difficult topics become easy!",
    color: "from-orange-400 to-red-500",
    image: "/images/students/rahul-testimonial.jpg",
    course: "CBSE School Tuition"
  },
  {
    name: "Aanya Singh",
    achievement: "Coding Competition",
    score: "1st Place",
    quote: "The coding course at Brilliant Roots sparked my interest in programming. Now I'm building my own apps!",
    color: "from-pink-400 to-purple-500",
    image: "/images/students/aanya-testimonial.jpg",
    course: "Coding for Kids"
  }
];

const studyMaterials = [
  { 
    title: "NCERT Solutions", 
    color: "from-blue-400 to-cyan-500", 
    count: "All Classes",
    downloads: "50K+",
    icon: "📚"
  },
  { 
    title: "Previous Year Papers", 
    color: "from-purple-400 to-pink-500", 
    count: "2000+ Papers",
    downloads: "75K+",
    icon: "📄"
  },
  { 
    title: "Sample Papers", 
    color: "from-green-400 to-teal-500", 
    count: "500+ Papers",
    downloads: "60K+",
    icon: "📝"
  },
  { 
    title: "Important Questions", 
    color: "from-orange-400 to-red-500", 
    count: "10,000+ Qs",
    downloads: "80K+",
    icon: "❓"
  },
  { 
    title: "Revision Notes", 
    color: "from-yellow-400 to-orange-500", 
    count: "All Subjects",
    downloads: "90K+",
    icon: "📋"
  },
  { 
    title: "NCERT Books", 
    color: "from-indigo-400 to-purple-500", 
    count: "Free PDFs",
    downloads: "100K+",
    icon: "📖"
  }
];

const batches = [
  {
    courseId: "1",
    title: "JEE Advanced Batch 2025",
    timing: "Mon-Wed-Fri, 6:00 PM - 8:00 PM",
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    teacher: "Dr. Rajesh Kumar",
    enrolled: 45,
    capacity: 50,
    status: "active"
  },
  {
    courseId: "2",
    title: "Class 10 CBSE Batch",
    timing: "Tue-Thu-Sat, 5:00 PM - 7:00 PM",
    startDate: "2024-04-15",
    endDate: "2025-02-28",
    teacher: "Prof. Anita Sharma",
    enrolled: 38,
    capacity: 40,
    status: "active"
  },
  {
    courseId: "3",
    title: "Python for Beginners",
    timing: "Sat-Sun, 10:00 AM - 12:00 PM",
    startDate: "2024-04-20",
    endDate: "2024-10-20",
    teacher: "Prof. Amit Verma",
    enrolled: 25,
    capacity: 30,
    status: "active"
  }
];

const announcements = [
  {
    title: "New Batch Starting Soon",
    message: "JEE 2026 crash course starting from 15th April. Limited seats available!",
    date: "2024-03-25",
    type: "info",
    priority: "high"
  },
  {
    title: "Mock Test Results",
    message: "JEE Main Mock Test results are out. Check your performance dashboard.",
    date: "2024-03-24",
    type: "update",
    priority: "medium"
  },
  {
    title: "Holiday Notice",
    message: "Classes will remain suspended on 29th March due to Holi festival.",
    date: "2024-03-23",
    type: "holiday",
    priority: "low"
  }
];

async function seedCollection(collectionName: string, data: any[]) {
  console.log(`Seeding ${collectionName}...`);
  const batch = writeBatch(db);
  data.forEach((item) => {
    const docRef = doc(collection(db, collectionName));
    batch.set(docRef, { ...item, id: docRef.id, createdAt: new Date(), updatedAt: new Date() });
  });
  await batch.commit();
  console.log(`✅ Finished seeding ${collectionName} with ${data.length} documents.`);
}

async function runSeed() {
  console.log('🚀 Starting Firebase seeding for Vedantu Academy...\n');
  
  try {
    // Clear existing data
    const collections = ['courses', 'stats', 'features', 'results', 'teachers', 'testimonials', 'studyMaterials', 'batches', 'announcements'];
    for (const collection of collections) {
      await clearCollection(collection);
    }
    
    console.log('\n📝 Seeding fresh data...\n');
    
    // Seed all collections
    await seedCollection("courses", courses);
    await seedCollection("stats", stats);
    await seedCollection("features", features);
    await seedCollection("results", toppers);
    await seedCollection("teachers", teachers);
    await seedCollection("testimonials", testimonials);
    await seedCollection("studyMaterials", studyMaterials);
    await seedCollection("batches", batches);
    await seedCollection("announcements", announcements);
    
    console.log('\n🎉 All data seeded successfully to Firebase!');
    console.log('📊 Collections created:');
    console.log('  - courses (6 documents)');
    console.log('  - stats (4 documents)');
    console.log('  - features (6 documents)');
    console.log('  - results (4 documents)');
    console.log('  - teachers (5 documents)');
    console.log('  - testimonials (5 documents)');
    console.log('  - studyMaterials (6 documents)');
    console.log('  - batches (3 documents)');
    console.log('  - announcements (3 documents)');
    
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
}

// Run the seed function
runSeed();
