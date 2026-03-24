'use client';

import { getLocalCourses, getLocalCourseExtra } from '@/lib/localData';
import { Star, Clock, Users, BookOpen, CheckCircle2, Award, ShieldCheck, Zap, ArrowRight, Play, Calendar, Video, GraduationCap, ChevronDown, Sparkles, MessageSquare, Download, ArrowLeft, Mic, Medal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CourseDetailClient({ id }: { id: string }) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const course = getLocalCourses().find(c => c.id === id);
  const extra = getLocalCourseExtra(id);
  const [activeTab, setActiveTab] = useState('curriculum');

  useEffect(() => {
    if (!loading && isAuthenticated && user?.role === 'student' && user.course && course) {
      const enrolledValue = user.course.toLowerCase();
      const courseTitle = course.title.toLowerCase();
      
      let hasAccess = false;
      
      // Mapping logic (Sync with courses/page.tsx)
      if (enrolledValue === "vedic-maths" && courseTitle.includes("vedic")) hasAccess = true;
      else if (enrolledValue === "telugu" && courseTitle.includes("telugu")) hasAccess = true;
      else if (enrolledValue === "phonics" && courseTitle.includes("phonics")) hasAccess = true;
      else if (enrolledValue === "abacus" && courseTitle.includes("abacus")) hasAccess = true;
      else if (enrolledValue === "olympiad" && courseTitle.includes("olympiad")) hasAccess = true;
      else if (enrolledValue === "jee" && courseTitle.includes("jee")) hasAccess = true;
      else if (enrolledValue === "neet" && courseTitle.includes("neet")) hasAccess = true;
      else if (["mathematics", "science", "english", "coding"].includes(enrolledValue) && courseTitle.includes("tuition")) hasAccess = true;
      else if (courseTitle.includes(enrolledValue)) hasAccess = true;
      
      if (!hasAccess) {
        router.push('/courses');
      }
    }
  }, [user, isAuthenticated, loading, course, router]);

  if (loading) {
     return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <h1 className="text-4xl font-black text-gray-900 mb-6">Course Not Found</h1>
        <Link href="/courses" className="text-[var(--primary)] font-black uppercase tracking-widest hover:gap-3 transition-all flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Premium Detail Hero */}
      <section className={`relative pt-32 pb-60 bg-gradient-to-br ${course.color} text-white overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] -mr-64 -mt-32 shadow-2xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black rounded-full blur-[120px] -ml-64 -mb-32 shadow-2xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
                {course.grades}
              </span>
              {extra?.badge && (
                <span className="px-5 py-2 bg-yellow-400 text-black rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  {extra.badge}
                </span>
              )}
              <div className="flex items-center gap-1.5 text-yellow-300">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-black">4.9 (2.5k+ Reviews)</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight drop-shadow-2xl">
              {course.title}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 font-medium leading-relaxed max-w-2xl">
              {course.description || "Master industry-standard skills with our flagship program designed by elite educators."}
            </p>

            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 shadow-xl">
                <Users className="text-orange-300" size={24} />
                <div className="text-left">
                  <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">Enrolled</p>
                  <p className="text-lg font-black">{course.students?.toLocaleString() || '12,450'}+ Students</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 shadow-xl">
                <Video className="text-blue-300" size={24} />
                <div className="text-left">
                  <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">Classes</p>
                  <p className="text-lg font-black">{extra?.sessions || '40'} Live Sessions</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mx-auto px-6 -mt-32 pb-32 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Left Column: Course Details */}
          <div className="lg:col-span-8 space-y-12">

            {/* Navigation Tabs */}
            <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-gray-100 flex flex-wrap gap-2 overflow-x-auto no-scrollbar">
              {['curriculum', 'features', 'mentor', 'faq'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab
                      ? "bg-[#0f172a] text-white shadow-xl scale-105"
                      : "text-gray-500 hover:bg-gray-50"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'curriculum' && (
                <motion.div
                  key="curriculum"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900">What You'll <span className="text-[var(--primary)]">Learn</span></h2>
                    <button className="flex items-center gap-2 text-xs font-black text-[var(--primary)] uppercase tracking-widest hover:gap-3 transition-all">
                      Download Syllabus <Download size={16} />
                    </button>
                  </div>
                  <div className="space-y-6">
                    {extra?.topics.map((topic, i) => (
                      <div key={i} className="group flex items-start gap-6 p-6 rounded-3xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                        <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-black group-hover:bg-[var(--primary)] transition-colors shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{topic}</h4>
                          <p className="text-sm text-gray-500 font-medium">Detailed breakdown of concepts, practical applications, and expert tips for mastering this module.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {course.features?.map((feature, i) => (
                    <div key={i} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all h-full">
                      <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-8 group-hover:scale-110 transition-transform shadow-sm">
                        <CheckCircle2 size={28} />
                      </div>
                      <h4 className="text-xl font-black text-gray-900 mb-4">{feature}</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">Dedicated focus on ensuring you master every aspect of this feature through hands-on practice.</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'mentor' && (
                <motion.div
                  key="mentor"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] opacity-10 rounded-full blur-[100px] -mr-32 -mt-32" />
                    <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                      <div className="w-48 h-48 rounded-[2rem] overflow-hidden border-4 border-white/10 shrink-0">
                        <img src="https://i.pravatar.cc/300?u=mentor" alt="Mentor" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 mb-6">
                          <Sparkles className="text-[var(--primary)]" size={14} />
                          Certified Expert Mentor
                        </div>
                        <h3 className="text-3xl font-black mb-4 uppercase">Dr. Ananya Verma</h3>
                        <p className="text-lg text-gray-400 font-medium mb-6 italic">"My goal is to simplify complex concepts and make learning an addictive experience for every student."</p>
                        <div className="flex flex-wrap gap-10">
                          <div>
                            <p className="text-2xl font-black text-[var(--primary)]">15+</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Yrs Experience</p>
                          </div>
                          <div>
                            <p className="text-2xl font-black text-[var(--primary)]">50k+</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Students Mentored</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Sticky Enrollment Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[3.5rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden relative"
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 left-0 w-full h-4 bg-gradient-to-r ${course.color}`} />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8">
                    <div className="bg-orange-50 text-[var(--primary)] px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-orange-100 animate-pulse">
                      Limited Seats left
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Clock size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Ending in 2d</span>
                    </div>
                  </div>

                  <div className="mb-10">
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1.5">Special Enrollment Fee</p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-black text-gray-900 tracking-tighter">₹{course.price.toLocaleString()}</span>
                      <span className="text-lg text-gray-400 line-through font-bold">₹{(course.price * 1.5).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-green-600 font-bold">You're saving 33% today!</p>
                  </div>

                  <div className="space-y-6 mb-12">
                    <div className="flex items-center gap-4 text-gray-700">
                      <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-[var(--primary)] shadow-sm">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Batches start</p>
                        <p className="font-bold text-sm tracking-tight">{extra?.schedule || 'Flexible'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-700">
                      <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-blue-500 shadow-sm">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Trust Factor</p>
                        <p className="font-bold text-sm tracking-tight">7-Day Moneyback Guarantee</p>
                      </div>
                    </div>
                  </div>

                  <Link 
                    href="/register"
                    className={`block w-full text-center py-6 rounded-3xl font-black text-white bg-gradient-to-r ${course.color} shadow-2xl shadow-orange-500/20 active:scale-95 transition-all mb-6 flex items-center justify-center gap-4 text-lg uppercase tracking-widest`}
                  >
                    Enroll Now
                    <ArrowRight size={24} />
                  </Link>

                  <div className="flex items-center justify-center gap-4">
                    <button className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">
                      <MessageSquare size={16} /> Chat with counselor
                    </button>
                  </div>
                </div>

                {/* Decorative glow */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-100 rounded-full blur-[100px] -z-10 opacity-30" />
              </motion.div>

              {/* Trust badges below card */}
              <div className="mt-8 flex justify-center gap-8 opacity-40">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Paytm_Logo_%28standalone%29.png/1200px-Paytm_Logo_%28standalone%29.png" alt="Paytm" className="h-6 object-contain grayscale" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6 object-contain grayscale" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Visa_logo.svg/2560px-Visa_logo.svg.png" alt="Visa" className="h-6 object-contain grayscale" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
