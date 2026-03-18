"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCircle2, 
  BookOpen, 
  Award, 
  Baby, 
  Calendar, 
  Clock, 
  Phone, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight,
  Target
} from 'lucide-react';
import Link from 'next/link';

const counselors = [
  {
    id: 1,
    name: "Dr. Meena Patel",
    role: "Senior Academic Counselor",
    specialty: "Academic",
    experience: "12+ Years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    description: "Expert in Class 6-10 CBSE/ICSE curriculum and board exam prep strategies.",
    topics: ["Board Prep", "Subject Selection", "Study Schedules"],
    rating: 4.9
  },
  {
    id: 2,
    name: "Ms. Sarah Johnson",
    role: "Child Psychology & Early Education",
    specialty: "Early",
    experience: "8+ Years",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
    description: "Specializes in Age 3-8 learning habits, focus building, and interactive education.",
    topics: ["Phonics", "Focus Building", "Gamified Learning"],
    rating: 4.8
  },
  {
    id: 3,
    name: "Mr. Rajiv Kumar",
    role: "Skill & Logic Development Head",
    specialty: "Skill",
    experience: "10+ Years",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    description: "Guides parents on Abacus, Vedic Maths benefits and Mental Math tracks.",
    topics: ["Vedic Maths", "Abacus", "Brain Gym"],
    rating: 4.8
  }
];

export default function CounselingPage() {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCounselor, setSelectedCounselor] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const coursesList = [
    { id: 'Class 7 & 8', name: 'Class 7 & 8', specialty: 'Academic', icon: BookOpen, color: 'from-red-400 to-pink-500' },
    { id: 'Class 5 & 6', name: 'Class 5 & 6', specialty: 'Academic', icon: BookOpen, color: 'from-blue-400 to-cyan-500' },
    { id: 'Class 3 & 4', name: 'Class 3 & 4', specialty: 'Academic', icon: BookOpen, color: 'from-purple-400 to-indigo-500' },
    { id: 'Vedic Maths', name: 'Vedic Maths', specialty: 'Skill', icon: Target, color: 'from-green-400 to-teal-500' },
    { id: 'Abacus', name: 'Abacus Long Term', specialty: 'Skill', icon: Target, color: 'from-pink-400 to-rose-500' },
    { id: 'Phonics', name: 'Phonics (Age 3-8)', specialty: 'Early', icon: Baby, color: 'from-yellow-400 to-orange-500' },
    { id: 'Telugu', name: 'Telugu (Basics/Adv)', specialty: 'Skill', icon: Target, color: 'from-indigo-400 to-purple-500' },
    { id: 'Olympiad', name: 'Olympiad Prep', specialty: 'Academic', icon: BookOpen, color: 'from-orange-400 to-pink-500' }
  ];

  const filteredCounselors = selectedCategory 
    ? counselors.filter(c => c.specialty === coursesList.find(cat => cat.id === selectedCategory)?.specialty)
    : counselors;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-4"
          >
            <UserCircle2 className="text-cyan-400" size={20} />
            <span className="text-xs font-black uppercase tracking-widest text-cyan-200">Free Counseling Sessions</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Talk to Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Expert Counselors</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            Get personalized guidance for your child's education journey, subject focus, and skill tracks depending on their requirements.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Selections */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 1: Category */}
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-black">1</span>
                What course are you looking for?
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {coursesList.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(isSelected ? null : cat.id);
                        setSelectedCounselor(null); 
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden group flex flex-col items-center justify-center text-center ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50/50 shadow-md' 
                          : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-md'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-2 shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-xs tracking-tight line-clamp-2 h-8 flex items-center justify-center Leading-tight">
                        {cat.name}
                      </h3>
                      
                      {isSelected && (
                        <CheckCircle2 size={18} className="text-blue-600 absolute top-2 right-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Counselor Grid */}
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-black">2</span>
                Choose your Expert
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredCounselors.map((counselor) => {
                    const isSelected = selectedCounselor === counselor.id;

                    return (
                      <motion.div
                        key={counselor.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`p-6 bg-white rounded-3xl border-2 cursor-pointer transition-all duration-300 flex flex-col h-full ${
                          isSelected 
                            ? 'border-blue-600 bg-blue-50/30 shadow-md' 
                            : 'border-gray-100 hover:border-blue-200 hover:shadow-md'
                        }`}
                        onClick={() => setSelectedCounselor(counselor.id)}
                      >
                        <div className="flex items-start gap-4">
                          <img 
                            src={counselor.image} 
                            alt={counselor.name} 
                            className="w-16 h-16 rounded-2xl object-cover bg-gray-100 border border-gray-50 flex-shrink-0 shadow-sm"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 bg-cyan-50 px-2 py-0.5 rounded-lg text-cyan-600 text-[10px] font-black uppercase tracking-wider mb-1 inline-flex">
                              <Award size={12} />
                              {counselor.experience} Exp
                            </div>
                            <h3 className="font-black text-gray-900 text-base mb-0.5">{counselor.name}</h3>
                            <p className="text-xs text-blue-600 font-bold mb-2">{counselor.role}</p>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 font-medium my-3 leading-relaxed">
                          {counselor.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-gray-100">
                          {counselor.topics.map((topic, i) => (
                            <span key={i} className="text-[10px] bg-gray-50 text-gray-600 px-2 py-1 rounded-full font-bold border border-gray-100">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Callback Request Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl sticky top-24">
              <h3 className="text-lg font-black text-gray-900 mb-2">Request a Callback</h3>
              <p className="text-xs text-gray-400 font-bold mb-6">We'll assign selected experts on connect</p>

              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 shadow-md">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-black text-gray-900 mb-1">Request Received!</h4>
                  <p className="text-xs text-gray-500 font-medium">An expert will call you shortly on your registered number.</p>
                </motion.div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5 block">Parent Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter Parent Name" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5 block">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type="tel" 
                        required
                        placeholder="Mobile Number" 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-gray-500 uppercase tracking-wider mb-1.5 block">Prefered Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <select 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium appearance-none"
                      >
                        <option>Morning (10 AM - 12 PM)</option>
                        <option>Afternoon (12 PM - 4 PM)</option>
                        <option>Evening (4 PM - 7 PM)</option>
                      </select>
                    </div>
                  </div>

                  {selectedCounselor && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3"
                    >
                      <MessageSquare className="text-blue-600" size={20} />
                      <div className="text-xs text-gray-600 font-bold">
                        Linked with: <span className="text-gray-900 font-black">{counselors.find(c => c.id === selectedCounselor)?.name}</span>
                      </div>
                    </motion.div>
                  )}

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    Request Callback
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
