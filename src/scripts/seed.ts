// Seed script for Multi Skills Academy - Vedic Mathematics
// This script populates the database with initial data

const courses = [
  {
    id: '1',
    name: 'Vedic Maths Foundation',
    description: 'Learn the basics of Vedic Mathematics with 16 sutras and 13 sub-sutras.',
    duration: '3 months',
    price: 4999,
    level: 'beginner',
    topics: ['Ekadhikena Purvena', 'Nikhilam Navatashcaramam Dashatah', 'Urdhva-Tiryagbhyam', 'Paravartya Yojayet'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Advanced Vedic Techniques',
    description: 'Master advanced techniques for complex calculations and competitive exams.',
    duration: '6 months',
    price: 9999,
    level: 'advanced',
    topics: ['Anurupyena', 'Sankalana-vyavakalanabhyam', 'Puranapuranabhyam', 'Calana-Kalanabhyam'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Speed Mathematics',
    description: 'Improve your calculation speed with mental math techniques.',
    duration: '2 months',
    price: 2999,
    level: 'intermediate',
    topics: ['Multiplication shortcuts', 'Division techniques', 'Square and cube roots', 'Percentage calculations'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Vedic Maths for Kids',
    description: 'Fun and engaging Vedic Mathematics course designed for children.',
    duration: '4 months',
    price: 3999,
    level: 'beginner',
    topics: ['Number patterns', 'Fun with multiplication', 'Easy division', 'Mathematical games'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Competitive Exam Prep',
    description: 'Specialized course for competitive exam preparation using Vedic Maths.',
    duration: '5 months',
    price: 7999,
    level: 'advanced',
    topics: ['Time-saving techniques', 'Quantitative aptitude', 'Data interpretation', 'Problem-solving strategies'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Mental Math Mastery',
    description: 'Become a mental math expert with comprehensive Vedic techniques.',
    duration: '8 months',
    price: 12999,
    level: 'advanced',
    topics: ['Advanced multiplication', 'Complex divisions', 'Algebraic applications', 'Geometric calculations'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const tests = [
  {
    id: '1',
    name: 'Basic Addition & Subtraction',
    description: 'Test your skills in Vedic addition and subtraction techniques.',
    duration: 20,
    price: 199,
    totalQuestions: 30,
    instructions: 'Use Ekadhikena Purvena and Nikhilam sutras for faster calculations.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Multiplication Mastery',
    description: 'Advanced multiplication problems using Vedic sutras.',
    duration: 20,
    price: 299,
    totalQuestions: 25,
    instructions: 'Apply Urdhva-Tiryagbhyam and other multiplication sutras.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Division Techniques',
    description: 'Test your division skills with Vedic methods.',
    duration: 20,
    price: 349,
    totalQuestions: 20,
    instructions: 'Use Nikhilam and Paravartya methods for division.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Square Roots & Cubes',
    description: 'Calculate square roots and cubes using Vedic maths.',
    duration: 20,
    price: 399,
    totalQuestions: 15,
    instructions: 'Apply Dwandwa Yoga and other methods for roots.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Algebraic Equations',
    description: 'Solve algebraic equations using Vedic techniques.',
    duration: 20,
    price: 499,
    totalQuestions: 20,
    instructions: 'Use Paravartya and other algebraic sutras.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Comprehensive Test',
    description: 'Complete test covering all Vedic maths topics.',
    duration: 20,
    price: 599,
    totalQuestions: 50,
    instructions: 'Apply all learned techniques to solve mixed problems.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const achievements = [
  {
    id: '1',
    title: 'Vedic Beginner',
    description: 'Complete your first Vedic Maths lesson',
    icon: '🌟',
    unlocked: false,
  },
  {
    id: '2',
    title: 'Speed Calculator',
    description: 'Solve 10 problems in under 2 minutes',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: '3',
    title: 'Sutra Master',
    description: 'Master all 16 Vedic Sutras',
    icon: '📚',
    unlocked: false,
  },
  {
    id: '4',
    title: 'Test Champion',
    description: 'Score 90% or higher in any test',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: '5',
    title: 'Mental Math Expert',
    description: 'Complete 100 mental math problems',
    icon: '🧠',
    unlocked: false,
  },
];

const stats = [
  {
    label: 'Students Enrolled',
    value: '10,000+',
    color: 'from-blue-500 to-purple-600',
  },
  {
    label: 'Success Rate',
    value: '95%',
    color: 'from-green-500 to-teal-600',
  },
  {
    label: 'Expert Teachers',
    value: '50+',
    color: 'from-orange-500 to-red-600',
  },
  {
    label: 'Courses Completed',
    value: '5,000+',
    color: 'from-pink-500 to-purple-600',
  },
];

// Simple console output for now (can be connected to database later)
async function seedData() {
  console.log('🌱 Seeding Multi Skills Academy data...\n');
  
  console.log('📚 Courses:');
  courses.forEach((course, index) => {
    console.log(`${index + 1}. ${course.name} - ₹${course.price}`);
  });
  
  console.log('\n📝 Tests:');
  tests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.name} - ₹${test.price} (${test.totalQuestions} questions)`);
  });
  
  console.log('\n🏆 Achievements:');
  achievements.forEach((achievement, index) => {
    console.log(`${index + 1}. ${achievement.title} ${achievement.icon}`);
  });
  
  console.log('\n📊 Statistics:');
  stats.forEach((stat, index) => {
    console.log(`${index + 1}. ${stat.label}: ${stat.value}`);
  });
  
  console.log('\n✅ Seeding complete! Data ready for Multi Skills Academy.');
  console.log('💡 Note: This is a demo seed script. Connect to your database to persist data.');
}

// Run the seed function
seedData().catch(console.error);
