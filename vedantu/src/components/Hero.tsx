"use client";
import { useState } from 'react';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('school');

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-16 md:py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slideInLeft">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md animate-fadeIn">
              <Sparkles className="text-[var(--primary)]" size={20} />
              <span className="text-sm font-semibold text-gray-700">India's #1 Learning Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight">
              Learn with <span className="gradient-text">Joy & Excellence</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Live interactive classes with India's best teachers. Personalized learning that makes education fun and effective for every child.
            </p>

            {/* Tabs with enhanced styling */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('school')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'school'
                    ? 'bg-[var(--primary)] text-white shadow-xl scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }`}
              >
                📚 School Tuition
              </button>
              <button
                onClick={() => setActiveTab('competitive')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'competitive'
                    ? 'bg-[var(--primary)] text-white shadow-xl scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }`}
              >
                🎯 JEE/NEET
              </button>
              <button
                onClick={() => setActiveTab('kids')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'kids'
                    ? 'bg-[var(--primary)] text-white shadow-xl scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }`}
              >
                🧒 Courses for Kids
              </button>
            </div>

            {/* CTAs with enhanced animations */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="btn-primary flex items-center gap-2 shadow-xl">
                Book FREE Trial <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-3 bg-white text-[var(--primary)] border-2 border-[var(--primary)] rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105">
                Explore Courses
              </button>
            </div>

            {/* Trust Indicators with animations */}
            <div className="flex items-center gap-6 pt-6 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-semibold">4.8/5 Rating</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-2xl font-bold text-[var(--primary)]">2.1Cr+</p>
                <p className="text-sm text-gray-600">Learning Hours</p>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced with real image */}
          <div className="relative animate-slideInRight">
            {/* Main image card */}
            <div className="relative bg-white rounded-3xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/happy-learning-kids.png"
                  alt="Happy children learning together"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-[var(--accent)] text-[var(--foreground)] px-6 py-3 rounded-full font-bold shadow-xl animate-bounce">
                🎉 100% Live Classes
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[var(--primary)] text-white px-6 py-3 rounded-full font-bold shadow-xl animate-pulse">
                ✨ Expert Teachers
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -z-10 bottom-10 left-10 w-64 h-64 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
