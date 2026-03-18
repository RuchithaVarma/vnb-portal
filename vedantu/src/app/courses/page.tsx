"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Users, BookOpen, Play, Award, GraduationCap, ChevronRight, Sparkles, Languages, Calculator, Brain, Trophy, Volume2, Mic } from 'lucide-react';

const iconMap = {
  Award,
  BookOpen,
  Calculator,
  Brain,
  Trophy,
  Volume2,
  Mic,
  GraduationCap,
  Languages
};

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCourses, setVisibleCourses] = useState(6);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      if (cat) setSelectedCategory(cat);
    }
  }, []);

  const categories = [
    { id: 'all', name: 'All Courses', icon: <BookOpen size={20} /> },
    { id: 'academic', name: 'Academic', icon: <GraduationCap size={20} /> },
    { id: 'competitive', name: 'Competitive Exams', icon: <Award size={20} /> },
    { id: 'skill', name: 'Skill Development', icon: <Sparkles size={20} /> },
    { id: 'languages', name: 'Languages', icon: <Languages size={20} /> }
  ];

  const courses = [
    {
      id: 1,
      title: 'Olympiad Exams Preparation',
      category: 'competitive',
      icon: 'Trophy',
      instructor: 'Dr. Ramesh Kumar',
      rating: 4.8,
      students: 15420,
      duration: '6 months',
      price: 12000,
      originalPrice: 15000,
      image: '/api/placeholder/400/250',
      level: 'Advanced',
      lessons: 120,
      description: 'Competitive exam preparation for young achievers with live classes and doubt resolution'
    },
    {
      id: 2,
      title: 'Vedic Maths (Basic to Advanced)',
      category: 'skill',
      icon: 'Calculator',
      instructor: 'Prof. Anjali Sharma',
      rating: 4.9,
      students: 8934,
      duration: '12 months',
      price: 1500,
      originalPrice: 2000,
      image: '/api/placeholder/400/250',
      level: 'All Levels',
      lessons: 45,
      description: 'Master speed calculation and mathematical tricks with Vedic techniques'
    },
    {
      id: 3,
      title: 'Telugu Language Basics',
      category: 'languages',
      icon: 'Languages',
      instructor: 'Dr. Priya Nair',
      rating: 4.7,
      students: 6782,
      duration: '3 months',
      price: 4000,
      originalPrice: 6000,
      image: '/api/placeholder/400/250',
      level: 'Beginner',
      lessons: 45,
      description: 'Learn Telugu from scratch covering alphabet, vocabulary, and simple sentences with live sessions.'
    },
    {
      id: 9, // Using a unique ID
      title: 'Telugu Language Advanced',
      category: 'languages',
      icon: 'Languages',
      instructor: 'Dr. Priya Nair',
      rating: 4.8,
      students: 4210,
      duration: '6 months',
      price: 6000,
      originalPrice: 8000,
      image: '/api/placeholder/400/250',
      level: 'Advanced',
      lessons: 75,
      description: 'Master advanced Telugu grammar, literature, and fluent conversation.'
    },
    {
      id: 4,
      title: 'Phonics for Kids',
      category: 'skill',
      icon: 'Volume2',
      instructor: 'Ms. Sneha Patel',
      rating: 4.6,
      students: 9876,
      duration: '6 months',
      price: 10000,
      originalPrice: 12000,
      image: '/api/placeholder/400/250',
      level: 'Beginner',
      lessons: 80,
      description: 'Comprehensive phonics course with live sessions and worksheets'
    },
    {
      id: 5,
      title: 'Abacus Crash Course',
      category: 'skill',
      icon: 'Brain',
      instructor: 'Tech Expert Rahul',
      rating: 4.8,
      students: 4532,
      duration: '3 months',
      price: 6000,
      originalPrice: 8000,
      image: '/api/placeholder/400/250',
      level: 'Beginner',
      lessons: 45,
      description: 'Intensive Abacus course for fast arithmetic and concentration improvement'
    },
    {
      id: 6,
      title: 'Class 7 & 8 Tuition',
      category: 'academic',
      icon: 'GraduationCap',
      instructor: 'Elite Faculty',
      rating: 4.9,
      students: 12450,
      duration: 'Academic Year',
      price: 15000,
      originalPrice: 20000,
      image: '/api/placeholder/400/250',
      level: 'Grades 7-8',
      lessons: 45,
      description: 'Comprehensive academic tuition covering Mathematics, Science, and English for Grades 7-8.'
    },
    {
      id: 7,
      title: 'Class 5 & 6 Tuition',
      category: 'academic',
      icon: 'GraduationCap',
      instructor: 'Elite Faculty',
      rating: 4.8,
      students: 9840,
      duration: 'Academic Year',
      price: 10000,
      originalPrice: 14000,
      image: '/api/placeholder/400/250',
      level: 'Grades 5-6',
      lessons: 36,
      description: 'Building strong foundations in Math, EVS/Science, and languages for Grades 5-6.'
    },
    {
      id: 8,
      title: 'Class 3 & 4 Tuition',
      category: 'academic',
      icon: 'GraduationCap',
      instructor: 'Elite Faculty',
      rating: 4.7,
      students: 7520,
      duration: 'Academic Year',
      price: 8000,
      originalPrice: 12000,
      image: '/api/placeholder/400/250',
      level: 'Grades 3-4',
      lessons: 24,
      description: 'Interactive and engaging classes for young learners covering basic arithmetic and reading.'
    }
  ];

  const filteredCourses = courses.filter(course => {
    return selectedCategory === 'all' || course.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary)] via-orange-500 to-orange-600 text-white py-20 relative overflow-hidden">
        {/* Animated Background Deco */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-white opacity-5 rounded-full filter blur-xl -translate-x-1/2 -translate-y-1/2"
        ></motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                Explore Our <span className="bg-white text-[var(--primary)] px-4 py-1 rounded-2xl shadow-lg">Courses</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium mb-8 text-white/90 leading-relaxed">
                Discover world-class course bundles designed by India's best teachers. Learn live, interact, and excel with structure.
              </p>
            </motion.div>
            
            {/* Right Column: Floating Graphics and Icons */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:flex relative h-full min-h-[300px] justify-center items-center"
            >
              {/* Box 1 */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-0 right-10 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 shadow-2xl flex items-center gap-4 z-20 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-inner">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="font-extrabold text-lg text-white">4.9/5</p>
                  <p className="text-xs text-white/70">Top Rated Programs</p>
                </div>
              </motion.div>

              {/* Box 2 */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-5 left-5 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 shadow-2xl flex items-center gap-4 z-20 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white shadow-inner">
                  <Users size={24} />
                </div>
                <div>
                  <p className="font-extrabold text-lg text-white">50k+</p>
                  <p className="text-xs text-white/70">Active Learners</p>
                </div>
              </motion.div>

              {/* Central Graphic Widget */}
              <div className="relative w-72 h-72 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-white filter blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <motion.div 
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                >
                  <BookOpen size={90} className="text-white drop-shadow-2xl" />
                </motion.div>
                <Sparkles className="absolute top-10 right-10 text-yellow-300 animate-pulse" size={24} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${selectedCategory === category.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'All Courses' : categories.find(c => c.id === selectedCategory)?.name}
            <span className="text-gray-500 font-normal ml-2">({filteredCourses.length} courses)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.slice(0, visibleCourses).map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full relative"
            >
              {/* Course Image/Graphics */}
              <div className="relative h-48 bg-gradient-to-br from-[var(--primary)]/5 to-orange-100/10 overflow-hidden">
                <motion.div 
                  className="absolute -top-12 -left-12 w-40 h-40 bg-gradient-to-br from-[var(--primary)]/30 to-pink-300/20 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br from-yellow-300/10 to-orange-400/20 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.25, 1], rotate: [0, -45, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  {(() => {
                    const Icon = (iconMap as any)[(course as any).icon] || BookOpen;
                    return <Icon className="text-[var(--primary)]/40" size={64} />;
                  })()}
                </div>
                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
                    {course.level}
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#0f172a] text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm border border-white/20">
                    {course.category}
                  </span>
                </div>
                
                <div className="absolute bottom-4 right-4">
                  <motion.button 
                    whileHover={{ scale: 1.15, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl hover:shadow-orange-200 transition-all duration-300 group"
                  >
                    <Play className="text-[var(--primary)] fill-current" size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors tracking-tight">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-medium">
                  {course.description}
                </p>

                {/* Micro Details Row */}
                <div className="flex items-center gap-3 mb-6 text-xs font-bold text-gray-500">
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-xl text-amber-600 border border-amber-100">
                    <Star className="fill-current" size={14} />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-1.5 rounded-xl text-blue-600 border border-blue-100">
                    <Users size={14} />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-purple-50 px-2.5 py-1.5 rounded-xl text-purple-600 border border-purple-100">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Divider node */}
                <div className="flex items-center justify-between mb-6 pt-5 border-t border-gray-100 mt-auto">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Fee</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-gray-900 tracking-tighter">₹{course.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-400 line-through font-bold">₹{course.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block bg-green-50 text-green-600 text-[10px] font-black px-2 py-1 rounded-md border border-green-100 mb-1">
                      Save {Math.round((1 - course.price / course.originalPrice) * 100)}%
                    </div>
                    <p className="text-xs text-gray-500 font-black uppercase tracking-widest">{course.lessons} Live Sessions</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href={`/courses?category=${course.category}`} className="flex-1">
                    <motion.button 
                      whileTap={{ scale: 0.94 }}
                      className="w-full py-4 bg-gradient-to-r from-[var(--primary)] to-orange-500 hover:to-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
                    >
                      Enroll Now
                    </motion.button>
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <BookOpen size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {visibleCourses < filteredCourses.length && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setVisibleCourses(prev => prev + 3)}
              className="px-8 py-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Load More Courses
            </button>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Brilliant Roots Courses?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-[var(--primary)]" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Teachers</h3>
              <p className="text-gray-600">Learn from India's best educators with years of experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[var(--primary)]" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Interactive Classes</h3>
              <p className="text-gray-600">Real-time doubt resolution and peer learning</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-[var(--primary)]" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">Join millions of students who have achieved their dreams</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
