"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Lock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

const courses = [
  { id: 'Class 7 & 8', name: 'Class 7 & 8', price: 15000, color: 'from-purple-500 to-indigo-600' },
  { id: 'Class 5 & 6', name: 'Class 5 & 6', price: 10000, color: 'from-blue-500 to-cyan-600' },
  { id: 'Class 3 & 4', name: 'Class 3 & 4', price: 8000, color: 'from-green-500 to-teal-600' },
  { id: 'Vedic Maths', name: 'Vedic Maths', price: 1500, color: 'from-orange-500 to-amber-600' },
  { id: 'Abacus', name: 'Abacus Long Term', price: 6000, color: 'from-pink-500 to-rose-600' },
  { id: 'Phonics', name: 'Phonics (Kids)', price: 10000, color: 'from-violet-500 to-purple-600' },
  { id: 'Telugu', name: 'Telugu (Basics & Adv)', price: 4000, color: 'from-indigo-500 to-blue-600' },
  { id: 'Olympiad', name: 'Olympiad Prep', price: 12000, color: 'from-red-500 to-pink-600' }
];

const timeSlots = [
  "Morning (10:00 AM - 12:00 PM)",
  "Afternoon (02:00 PM - 04:00 PM)",
  "Evening (05:00 PM - 07:00 PM)"
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    studentClass: '',
    email: '',
    phone: '',
    course: '',
    slot: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedCourse = courses.find(c => c.id === formData.course);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Automatically log student in underneath (simulated)
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.studentName,
        role: 'student'
      }));
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/50 flex items-center justify-center p-4 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-2xl p-8 relative z-20"
      >
        {/* Stepper Header */}
        {!isSuccess && (
          <div className="flex justify-between items-center mb-10 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-100 w-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 transition-all duration-300 z-0"
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>

            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm relative z-10 border-2 transition-colors duration-300 ${
                  step >= num 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {step > num ? <CheckCircle2 size={16} /> : num}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Personal Details */}
          {step === 1 && !isSuccess && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Student Registration</h1>
                <p className="text-sm text-gray-500 font-bold">Provide detail layout credentials</p>
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 uppercase mb-1.5 block">Student's Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    placeholder="Student full name" 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 uppercase mb-1.5 block">Parent's Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    placeholder="Parent/Guardian Name" 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 uppercase mb-1.5 block">Student's Class</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    required
                    value={formData.studentClass}
                    onChange={(e) => setFormData({...formData, studentClass: e.target.value})}
                    placeholder="e.g., Class 6" 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 uppercase mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Email (Used for Login)" 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 uppercase mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Mobile Number" 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
                  />
                </div>
              </div>

              <button 
                onClick={handleNext}
                disabled={!formData.studentName || !formData.parentName || !formData.studentClass || !formData.email || !formData.phone}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Courses
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {/* Step 2: Course & Slot Select */}
          {step === 2 && !isSuccess && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Select Course & Slot</h2>
                <p className="text-sm text-gray-500 font-bold">Pick timings fit your routine</p>
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 uppercase mb-2 block">Choose Course</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border rounded-xl bg-gray-50/50">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => setFormData({...formData, course: course.id})}
                      className={`p-3 rounded-xl border-2 text-left transition-all text-xs font-bold relative ${
                        formData.course === course.id 
                          ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                          : 'border-gray-100 bg-white hover:border-blue-200'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${course.color} absolute top-2 right-2`}></div>
                      {course.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 uppercase mb-2 block">Preferred Time Slot</label>
                <div className="space-y-2">
                  {timeSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFormData({...formData, slot: slot})}
                      className={`w-full p-3 rounded-xl border-2 text-left transition-all text-xs font-bold flex items-center justify-between ${
                        formData.slot === slot 
                          ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                          : 'border-gray-100 bg-white hover:border-blue-200'
                      }`}
                    >
                      <span>{slot}</span>
                      {formData.slot === slot && <CheckCircle2 size={16} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!formData.course || !formData.slot}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Selections
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Checkout Sim */}
          {step === 3 && !isSuccess && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Simulated Payment</h2>
                <p className="text-sm text-gray-500 font-bold">Safe approval process structures</p>
              </div>

              <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-500">Selected Course</span>
                  <span className="text-sm font-black text-gray-900">{selectedCourse?.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-500">Preferred Slot</span>
                  <span className="text-xs font-black text-gray-700">{formData.slot}</span>
                </div>
                <hr className="my-2 opacity-50" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-gray-900">Total Amount</span>
                  <span className="text-base font-black text-blue-600">₹{selectedCourse?.price}</span>
                </div>
              </div>

              <div className="p-4 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 bg-white/50">
                <CreditCard size={32} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-600">Secure Sandboxed Gateway</span>
                <p className="text-[10px] text-gray-400 text-center">No real currency will be deducted during test approvals.</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleBack}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs disabled:opacity-50"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:opacity-90 text-white rounded-xl font-black text-xs uppercase tracking-widest disabled:opacity-50"
                >
                  {isProcessing ? 'Processing approvals...' : `Pay ₹${selectedCourse?.price}`}
                </button>
              </div>
            </motion.div>
          )}

          {/* Success State */}
          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4 space-y-4"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-md">
                <ShieldCheck size={36} />
              </div>
              
              <div>
                <h1 className="text-2xl font-black text-gray-900">Payment Successful!</h1>
                <p className="text-xs text-gray-500 font-bold mt-1">Automatic account creation complete</p>
              </div>

              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 text-left space-y-2 relative overflow-hidden">
                <Sparkles size={48} className="absolute -bottom-4 -right-4 opacity-10 text-blue-600" />
                <h3 className="text-xs font-black text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Lock size={14} /> Student Credentials
                </h3>
                <div>
                  <label className="text-[10px] font-black text-gray-400">LOGIN ID (Email)</label>
                  <p className="text-sm font-black text-gray-900">{formData.email}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400">PASSWORD</label>
                  <p className="text-sm font-black text-green-600">Brilliant@123</p>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 font-bold">
                A copy of credentials has been dispatched back into your simulated inbox.
              </p>

              <Link 
                href="/"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 mt-4 shadow-xl shadow-blue-500/10"
              >
                Go to Dashboard / Smart Learn
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
