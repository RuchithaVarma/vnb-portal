"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Star, Clock, Users, BookOpen, Play, Award, GraduationCap, ChevronRight, Sparkles } from 'lucide-react';

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses', icon: <BookOpen size={20} /> },
    { id: 'academic', name: 'Academic', icon: <GraduationCap size={20} /> },
    { id: 'competitive', name: 'Competitive Exams', icon: <Award size={20} /> },
    { id: 'skill', name: 'Skill Development', icon: <Sparkles size={20} /> }
  ];

  const courses = [
    {
      id: 1,
      title: 'Olympiad Exams Preparation',
      category: 'competitive',
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
      title: 'Telugu Language Mastery',
      category: 'skill',
      instructor: 'Dr. Priya Nair',
      rating: 4.7,
      students: 6782,
      duration: '6 months',
      price: 5000,
      originalPrice: 7000,
      image: '/api/placeholder/400/250',
      level: 'Basic & Advanced',
      lessons: 75,
      description: 'Learn Telugu from scratch to advanced level with live interactive sessions'
    },
    {
      id: 4,
      title: 'Phonics for Kids',
      category: 'skill',
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
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our Courses
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Discover world-class courses designed by India's best teachers. Learn live, interact, and excel.
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for courses, instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button className="px-6 py-3 bg-white text-[var(--primary)] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Filter size={20} />
                Filters
              </button>
            </div>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category.id
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
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
            <option>Most Popular</option>
            <option>Highest Rated</option>
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-br from-[var(--primary)]/20 to-orange-200/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="text-[var(--primary)]/40" size={64} />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full">
                    {course.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-semibold rounded-full">
                    {course.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="text-[var(--primary)]" size={16} />
                  </button>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-current" size={16} />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">₹{course.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 line-through">₹{course.originalPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{course.lessons} lessons</p>
                    <p className="text-xs text-gray-400">by {course.instructor}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href={`/courses/${course.id}`} className="flex-1 btn-primary text-center py-2">
                    Enroll Now
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <BookOpen size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-lg font-semibold hover:bg-orange-50 transition-colors">
            Load More Courses
          </button>
        </div>
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
