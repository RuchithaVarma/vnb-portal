"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, Users, Play, Award, Sparkles, Gamepad2, Palette, Music, Calculator, BookOpen, Trophy, Target } from 'lucide-react';

export default function KidsCoursesPage() {
  const [selectedAge, setSelectedAge] = useState('all');

  const ageGroups = [
    { id: 'all', name: 'All Ages', range: '3-17 years' },
    { id: '3-5', name: 'Tiny Tots', range: '3-5 years' },
    { id: '6-8', name: 'Little Explorers', range: '6-8 years' },
    { id: '9-12', name: 'Young Learners', range: '9-12 years' },
    { id: '13-17', name: 'Teens', range: '13-17 years' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Fun with Numbers',
      ageGroup: '3-5',
      category: 'Math',
      instructor: 'Ms. Priya Sharma',
      rating: 4.9,
      students: 3420,
      duration: '2 months',
      price: 2999,
      originalPrice: 4999,
      icon: <Calculator className="text-blue-500" size={24} />,
      color: 'from-blue-400 to-blue-600',
      lessons: 24,
      description: 'Learn numbers through fun games and activities',
      features: ['Interactive Games', 'Visual Learning', 'Fun Worksheets']
    },
    {
      id: 2,
      title: 'Creative Art & Craft',
      ageGroup: '6-8',
      category: 'Art',
      instructor: 'Ms. Anita Desai',
      rating: 4.8,
      students: 2890,
      duration: '3 months',
      price: 3999,
      originalPrice: 6999,
      icon: <Palette className="text-purple-500" size={24} />,
      color: 'from-purple-400 to-purple-600',
      lessons: 36,
      description: 'Explore creativity through drawing, painting, and crafts',
      features: ['Live Drawing Sessions', 'Craft Projects', 'Art Appreciation']
    },
    {
      id: 3,
      title: 'Music & Rhythm',
      ageGroup: '6-12',
      category: 'Music',
      instructor: 'Mr. Rajiv Kumar',
      rating: 4.7,
      students: 1567,
      duration: '4 months',
      price: 5999,
      originalPrice: 9999,
      icon: <Music className="text-pink-500" size={24} />,
      color: 'from-pink-400 to-pink-600',
      lessons: 48,
      description: 'Learn basics of music, rhythm, and instruments',
      features: ['Vocal Training', 'Rhythm Exercises', 'Instrument Basics']
    },
    {
      id: 4,
      title: 'Coding for Kids',
      ageGroup: '9-12',
      category: 'Technology',
      instructor: 'Tech Expert Rohan',
      rating: 4.9,
      students: 4234,
      duration: '3 months',
      price: 7999,
      originalPrice: 12999,
      icon: <Gamepad2 className="text-green-500" size={24} />,
      color: 'from-green-400 to-green-600',
      lessons: 36,
      description: 'Introduction to coding through games and animations',
      features: ['Block Programming', 'Game Development', 'Animation Basics']
    },
    {
      id: 5,
      title: 'English Story Time',
      ageGroup: '3-8',
      category: 'Language',
      instructor: 'Ms. Sarah Johnson',
      rating: 4.8,
      students: 5678,
      duration: '2 months',
      price: 3499,
      originalPrice: 5999,
      icon: <BookOpen className="text-orange-500" size={24} />,
      color: 'from-orange-400 to-orange-600',
      lessons: 24,
      description: 'Improve English through interactive storytelling',
      features: ['Story Sessions', 'Vocabulary Building', 'Reading Practice']
    },
    {
      id: 6,
      title: 'Science Explorers',
      ageGroup: '9-12',
      category: 'Science',
      instructor: 'Dr. Meena Patel',
      rating: 4.7,
      students: 2345,
      duration: '4 months',
      price: 6999,
      originalPrice: 10999,
      icon: <Sparkles className="text-teal-500" size={24} />,
      color: 'from-teal-400 to-teal-600',
      lessons: 48,
      description: 'Discover science through fun experiments',
      features: ['Live Experiments', 'Science Projects', 'Concept Videos']
    }
  ];

  const filteredCourses = selectedAge === 'all' 
    ? courses 
    : courses.filter(course => course.ageGroup === selectedAge);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 size={32} />
              <h1 className="text-4xl md:text-5xl font-bold">
                Courses for Kids
              </h1>
            </div>
            <p className="text-xl mb-8 text-white/90">
              Where learning meets fun! Interactive courses designed to spark curiosity and creativity in young minds.
            </p>
            
            {/* Age Group Selector */}
            <div className="flex flex-wrap gap-3">
              {ageGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setSelectedAge(group.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedAge === group.id
                      ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                  }`}
                >
                  <div className="text-sm font-bold">{group.name}</div>
                  <div className="text-xs opacity-80">{group.range}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Kids</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">100+</div>
              <div className="text-gray-600">Fun Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Parent Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedAge === 'all' ? 'All Kids Courses' : ageGroups.find(g => g.id === selectedAge)?.name + ' Courses'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Age-appropriate courses that make learning exciting and effective for your child
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Course Header */}
              <div className={`h-32 bg-gradient-to-br ${course.color} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {course.icon}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full">
                    {course.ageGroup} years
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {course.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.features.map((feature, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                
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
                    <p className="text-xs text-gray-400">{course.instructor}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href={`/kids/courses/${course.id}`} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Enroll Now
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Play size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Parents Love Vedantu Kids</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Age-Appropriate Learning</h3>
              <p className="text-gray-600">Curriculum designed by child development experts for each age group</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="text-pink-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Game-Based Learning</h3>
              <p className="text-gray-600">Interactive games and activities that make learning fun and engaging</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Skill Development</h3>
              <p className="text-gray-600">Focus on creativity, critical thinking, and problem-solving skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Child's Learning Adventure?</h2>
          <p className="text-xl mb-8 text-white/90">Book a FREE trial class and see the difference!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/trial" className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Book FREE Trial
            </Link>
            <Link href="/counseling" className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors">
              Talk to Counselor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
