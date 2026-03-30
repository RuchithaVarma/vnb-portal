"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Star, 
  Clock, 
  Users, 
  Play, 
  Award, 
  Sparkles, 
  Gamepad2, 
  Palette, 
  Music, 
  Calculator, 
  BookOpen, 
  Trophy, 
  Target 
} from 'lucide-react';
import { getItems } from "@/lib/firestoreService";
import { Course } from "@/types";
import { isKidsCourse as checkIsKidsCourse } from "@/utils/courseUtils";

const iconMap = {
  Award,
  BookOpen,
  Calculator,
  Brain: Trophy, // Fallback if needed
  Trophy,
  Volume2: Music, // Fallback
  Mic: Music, // Fallback
  GraduationCap: BookOpen, // Fallback
  Languages: BookOpen, // Fallback
  Palette,
  Music,
  Gamepad2,
  Sparkles,
};

export default function KidsCoursesPage() {
  const [selectedAge, setSelectedAge] = useState('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getItems("courses");
        const kidsCourses = (data as Course[]).filter(course => checkIsKidsCourse(course));
        setCourses(kidsCourses);
      } catch (error) {
        console.error("Error fetching kids courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const ageGroups = [
    { id: 'all', name: 'All Ages', range: '3-17 years' },
    { id: '3-5', name: 'Tiny Tots', range: '3-5 years' },
    { id: '6-8', name: 'Little Explorers', range: '6-8 years' },
    { id: '9-12', name: 'Young Learners', range: '9-12 years' },
    { id: '13-17', name: 'Teens', range: '13-17 years' }
  ];

  const filteredCourses = selectedAge === 'all' 
    ? courses 
    : courses.filter(course => {
        if (!course.ageGroup) return false;
        // Handle cases like "3-8" matching "3-5" or "6-8"
        const [min, max] = course.ageGroup.split('-').map(Number);
        const [selMin, selMax] = selectedAge.split('-').map(Number);
        return (min <= selMax && max >= selMin);
      });

  const renderIcon = (iconName: string | undefined) => {
    if (!iconName) return <BookOpen className="text-blue-500" size={24} />;
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || BookOpen;
    return <IconComponent className="text-blue-500" size={24} />;
  };

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 flex flex-col h-full relative group">
                {/* Course Header */}
                <div className={`h-40 bg-gradient-to-br ${course.color || 'from-purple-400 to-pink-600'} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/5"></div>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg relative z-10 border border-white/30">
                    {renderIcon(course.icon)}
                  </div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-black text-gray-800 rounded-full shadow-sm border border-gray-100">
                      {course.ageGroup || course.grades}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-black text-gray-800 rounded-full shadow-sm border border-gray-100">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors tracking-tight">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 font-medium line-clamp-2">
                    {course.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {course.features?.map((feature, index) => (
                      <span key={index} className="text-[10px] px-2.5 py-1 bg-gray-50 text-gray-500 font-bold rounded-lg border border-gray-100">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* Micro Details */}
                  <div className="flex items-center gap-3 mb-6 text-xs font-bold text-gray-500">
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-xl text-amber-600 border border-amber-100">
                      <Star className="fill-current" size={14} />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-xl text-blue-600 border border-blue-100">
                      <Users size={14} />
                      <span>{(course.enrolled || course.students || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-xl text-purple-600 border border-purple-100">
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Divider node */}
                  <div className="flex items-center justify-between mb-6 pt-5 border-t border-gray-100 mt-auto">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Fee</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-gray-900 tracking-tighter">₹{course.price.toLocaleString()}</span>
                        {course.originalPrice && <span className="text-xs text-gray-400 line-through font-bold">₹{course.originalPrice.toLocaleString()}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-800 font-black">{course.lessons} lessons</p>
                      <p className="text-[11px] text-gray-400 font-bold">by {course.instructor}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href="/register" className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white text-center py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-orange-400/20 transition-all">
                      Enroll Now
                    </Link>
                    <button className="px-4 py-2 border-2 border-gray-100 hover:border-purple-300 text-gray-700 hover:text-purple-600 rounded-xl transition-all">
                      <Play size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Parents Love Brilliant Roots Kids</h2>
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
