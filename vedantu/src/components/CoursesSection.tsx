"use client";
import { BookOpen, GraduationCap, Code, Languages, Calculator, Palette, HelpCircle, type LucideIcon, Zap, CheckCircle, ChevronRight, Trophy, Volume2, Brain, Music, Gamepad2, Sparkles } from 'lucide-react';
import { getItems } from '@/lib/firestoreService';
import { getLocalCourses } from '@/lib/localData';
import { Course } from '@/types';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const iconMap: Record<string, LucideIcon> = {
  "Trophy": Trophy,
  "GraduationCap": GraduationCap,
  "Calculator": Calculator,
  "Languages": Languages,
  "Volume2": Volume2,
  "Brain": Brain,
  "BookOpen": BookOpen,
  "Palette": Palette,
  "Music": Music,
  "Gamepad2": Gamepad2,
  "Sparkles": Sparkles
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

import { isKidsCourse } from '@/utils/courseUtils';

const CoursesSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getItems<Course>("courses");
        if (data && data.length > 0) {
          // Filter out kids courses from home page general section
          const regularCourses = data.filter(c => !isKidsCourse(c));
          setCourses(regularCourses);
        } else {
          setCourses(getLocalCourses().filter(c => !isKidsCourse(c)));
        }
      } catch (error) {
        console.error("Failed to fetch courses for homepage:", error);
        setCourses(getLocalCourses().filter(c => !isKidsCourse(c)));
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-pink-50 px-6 py-2.5 rounded-full shadow-sm mb-6 border border-orange-100">
            <Zap className="text-[var(--primary)]" size={16} />
            <span className="font-bold text-gray-700 uppercase tracking-widest text-[10px]">Our Programs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Explore Our <span className="gradient-text">Learning Programs</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Personalized courses designed for every student's unique learning journey and academic success.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.slice(0, 6).map((course, idx) => {
            const Icon = (course.icon && (iconMap as any)[course.icon]) ? (iconMap as any)[course.icon] : BookOpen;
            const cardColor = course.color || 'from-orange-400 to-pink-500';
            
            return (
              <motion.div
                key={course.id || idx}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.01 }}
                className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 relative overflow-hidden flex flex-col h-full"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cardColor} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity`}></div>
                
                <div className="flex-1">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${cardColor} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-orange-100`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-[var(--primary)] transition-colors">{course.title}</h3>
                  <p className="text-xs text-[var(--primary)] font-bold mb-4 uppercase tracking-wider">{course.grades}</p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {course.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-gray-900">₹{course.price.toLocaleString()}</span>
                    {course.duration && <span className="text-xs text-gray-400 font-bold"> / {course.duration}</span>}
                  </div>
                  <Link 
                    href={`/courses?category=${course.category}`}
                    className={`px-5 py-2.5 rounded-xl text-white font-bold text-sm bg-gradient-to-r ${cardColor} hover:shadow-lg transition-all flex items-center gap-1 group/btn`}
                  >
                    Details
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-16 animate-fadeInUp flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/courses">
            <button className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              View All Courses
              <ChevronRight size={20} />
            </button>
          </Link>
          <Link href="/tests">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Explore Tests
              <ChevronRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
