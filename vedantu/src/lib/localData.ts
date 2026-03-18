import seedData from '@/data/seed-data.json';
import { Course } from '@/types';

// Map course titles to clean, consistent URL slugs
const courseIdMap: Record<string, string> = {
  "Class 7 & 8": "class-7-8",
  "Class 5 & 6": "class-5-6",
  "Class 3 & 4": "class-3-4",
  "Vedic Maths Long Term": "vedic-maths",
  "Telugu Basics": "telugu-basics",
  "Telugu Advanced": "telugu-advanced",
  "Phonics": "phonics",
  "Abacus Long Term": "abacus-long-term",
  "Abacus Crash Course": "abacus-crash-course",
};

function getCourseId(title: string): string {
  return courseIdMap[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getLocalCourses(): Course[] {
  return (seedData.courses as Course[]).map((course) => ({
    ...course,
    id: getCourseId(course.title),
  }));
}

export function getLocalCourse(id: string): Course | null {
  const courses = getLocalCourses();
  return courses.find(c => c.id === id) || null;
}

export type CourseExtra = {
  sessions: number;
  sessionDuration: string;
  classMode: string[];
  topics: string[];
  badge?: string;
  priceNote?: string;
  schedule?: string;
};

// Course-specific extra details used in the detailed breakdown section
export const courseExtras: Record<string, CourseExtra> = {
  'class-7-8': {
    sessions: 45,
    sessionDuration: '1 Hour Live Sessions',
    classMode: ['Group Classes', 'One-on-One Classes'],
    topics: ['Mathematics', 'Science', 'English Grammar', 'Social Studies', 'Critical Thinking'],
    badge: 'Most Popular',
    schedule: 'Mon / Wed / Fri',
  },
  'class-5-6': {
    sessions: 36,
    sessionDuration: '1 Hour Live Sessions',
    classMode: ['Group Classes', 'One-on-One Classes'],
    topics: ['Mathematics', 'EVS/Science', 'English', 'Hindi', 'Creative Thinking'],
    schedule: 'Tue / Thu / Sat',
  },
  'class-3-4': {
    sessions: 24,
    sessionDuration: 'Live Interactive Sessions',
    classMode: ['Group Classes', 'One-on-One Classes'],
    topics: ['Basic Arithmetic', 'English Reading', 'Science Basics', 'Mental Math Tricks'],
    badge: 'Crash Course',
    priceNote: 'Flat ₹5,000 • All-inclusive',
    schedule: 'Mon / Thu',
  },
  'vedic-maths': {
    sessions: 144,
    sessionDuration: '1 Hour Live Sessions',
    classMode: ['Group Classes', 'One-on-One Classes'],
    topics: ['Addition & Subtraction Tricks', 'Multiplication Shortcuts', 'Division Techniques', 'Square Roots', 'Advanced Sutras'],
    badge: 'Level Certification',
    priceNote: '₹1,500 – ₹2,500 / month',
    schedule: 'Mon / Wed / Fri (Weekly 3 Classes)',
  },
  'telugu-basics': {
    sessions: 75,
    sessionDuration: '1 Hour Live Sessions',
    classMode: ['Group Classes', 'One-on-One Classes'],
    topics: ['Telugu Alphabet (Varnamala)', 'Basic Vocabulary', 'Simple Sentences', 'Listening & Speaking', 'Reading Practice'],
    schedule: 'Daily / Weekly Options',
  },
  'telugu-advanced': {
    sessions: 75,
    sessionDuration: '1 Hour Live Sessions',
    classMode: ['Group Classes', 'One-on-One Classes'],
    topics: ['Advanced Grammar', 'Telugu Literature', 'Essay Writing', 'Fluent Conversation', 'Comprehension'],
    schedule: 'Daily / Weekly Options',
  },
  'phonics': {
    sessions: 48,
    sessionDuration: 'Interactive Live Sessions',
    classMode: ['Group Classes', 'One-on-One Classes'],
    topics: ['Letter Sounds', 'Blending & Segmenting', 'Sight Words', 'Reading Fluency', 'Pronunciation'],
    schedule: 'Mon / Wed / Fri',
  },
  'abacus-long-term': {
    sessions: 96,
    sessionDuration: 'Live Interactive Sessions',
    classMode: ['Group Classes'],
    topics: ['Abacus Basics', 'Addition on Abacus', 'Subtraction', 'Multiplication', 'Mental Arithmetic'],
    badge: 'All Levels',
    schedule: 'Twice a Week',
  },
  'abacus-crash-course': {
    sessions: 12,
    sessionDuration: 'Intensive Sessions',
    classMode: ['Group Classes', 'One-on-One Classes'],
    topics: ['Abacus Introduction', 'Core Operations', 'Speed Practice', 'Final Assessment'],
    badge: 'Fast Track',
    schedule: 'Daily for 1 Month',
  },
};

export function getLocalCourseExtra(id: string): CourseExtra | null {
  return courseExtras[id] || null;
}
