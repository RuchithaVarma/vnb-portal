export interface Course {
  id?: string;
  title: string;
  description?: string;
  color: string;
  grades: string;
  features: string[];
  duration: string;
  price: number;
  originalPrice?: number;
  enrolled: number;
  rating: number;
  image: string;
  category?: string;
  ageGroup?: string;
  icon?: string;
  instructor?: string;
  students?: number;
  lessons?: number;
  completedLessons?: number;
  revenue?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  // Additional fields from Firebase
  isKidsCourse?: boolean;
  difficulty?: string;
  prerequisites?: string[];
  learningOutcomes?: string[];
  schedule?: string;
  certificate?: boolean;
}

export interface Stat {
  id?: string;
  value: string;
  label: string;
  color: string;
  icon: string;
}

export interface Teacher {
  id?: string;
  name: string;
  subject?: string; // specialization
  qualification?: string;
  experience: string;
  color?: string;
  image?: string;
  students?: number;
  rating?: number;
  email?: string;
  phone?: string;
  specialization?: string;
  revenue?: number;
  courses?: number;
  status?: string;
  joinedDate?: string;
  nextClass?: string;
  avatar?: string;
}

export interface Student {
  id?: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  courses: number;
  enrolledDate: string;
  lastActive: string;
  status: string; // active, inactive, new
  progress: number;
  fees: string; // Paid, Pending
  avatar: string;
}

export interface Testimonial {
  id?: string;
  name: string;
  achievement: string;
  score: string;
  quote: string;
  color: string;
  image: string;
  course: string;
}

export interface StudyMaterial {
  id?: string;
  title: string;
  color: string;
  count: string;
  downloads: string;
  icon: string;
}

export interface Feature {
  id?: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

export interface Topper {
  id?: string;
  name: string;
  rank: string;
  exam: string;
  score: string;
  image: string;
  story: string;
}
