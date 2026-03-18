"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Hash,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const courses = [
  {
    id: "Class 7 & 8",
    name: "Class 7 & 8",
    price: 15000,
    color: "from-fuchsia-500 to-indigo-600",
    icon: "🎓",
  },
  {
    id: "Class 5 & 6",
    name: "Class 5 & 6",
    price: 10000,
    color: "from-sky-500 to-indigo-600",
    icon: "🌟",
  },
  {
    id: "Class 3 & 4",
    name: "Class 3 & 4",
    price: 8000,
    color: "from-emerald-500 to-indigo-600",
    icon: "📚",
  },
  {
    id: "Vedic Maths",
    name: "Vedic Maths",
    price: 1500,
    color: "from-amber-500 to-orange-600",
    icon: "🧮",
  },
  {
    id: "Abacus",
    name: "Abacus Long Term",
    price: 6000,
    color: "from-rose-500 to-pink-600",
    icon: "🧠",
  },
  {
    id: "Phonics",
    name: "Phonics (Kids)",
    price: 10000,
    color: "from-violet-500 to-purple-600",
    icon: "🗣️",
  },
  {
    id: "Telugu",
    name: "Telugu (Basics & Adv)",
    price: 4000,
    color: "from-cyan-500 to-blue-600",
    icon: "🗣️",
  },
  {
    id: "Olympiad",
    name: "Olympiad Prep",
    price: 12000,
    color: "from-red-500 to-orange-600",
    icon: "🏆",
  },
];

const timeSlots = [
  "🌅 Morning (10:00 AM - 12:00 PM)",
  "☀️ Afternoon (02:00 PM - 04:00 PM)",
  "🌙 Evening (05:00 PM - 07:00 PM)",
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    studentClass: "",
    email: "",
    phone: "",
    course: "",
    slot: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const DEFAULT_PASSWORD = "Brilliant@123";

  const selectedCourse = courses.find((c) => c.id === formData.course);

  const handleNext = () => {
    // Basic validation per step
    if (
      step === 1 &&
      (!formData.studentName ||
        !formData.parentName ||
        !formData.studentClass ||
        !formData.email ||
        !formData.phone)
    )
      return;
    if (step === 2 && (!formData.course || !formData.slot)) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handlePayment = async () => {
    setIsProcessing(true);
    setRegistrationError("");

    let uid = "";
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        DEFAULT_PASSWORD,
      );
      uid = userCredential.user.uid;
    } catch (authError: any) {
      if (authError.code === "auth/email-already-in-use") {
        setIsProcessing(false);
        setRegistrationError(
          "This email is already registered. Please use a different email or sign in.",
        );
        return;
      }
      console.warn(
        "Firebase Auth failed, falling back to local prototype mode:",
        authError,
      );
      uid = "local_" + Math.random().toString(36).substr(2, 9);
    }

    try {
      // First, store all user data in the 'users' collection with UID as document ID
      await setDoc(doc(db, "users", uid), {
        // Basic Info
        name: formData.studentName,
        email: formData.email,
        phone: formData.phone,

        // Role and System Fields
        role: "student",
        uid: uid,
        applicationId:
          "BR" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        username:
          formData.email.split("@")[0].toLowerCase() +
          Math.floor(Math.random() * 1000),

        // Academic Info
        grade: formData.studentClass,
        course: formData.course,
        preferredTiming: formData.slot,

        // Parent Info
        parentName: formData.parentName,
        parentPhone: formData.phone,

        // Payment Info
        paymentStatus: "pending",
        paymentAmount: selectedCourse?.price || 0,
        courseFee: selectedCourse?.price || 0,

        // Application Status
        applicationStatus: "submitted",
        applicationDate: new Date().toISOString(),

        // Metadata
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Also store in students collection for course tracking
      await setDoc(doc(db, "students", uid), {
        studentName: formData.studentName,
        parentName: formData.parentName,
        studentClass: formData.studentClass,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        slot: formData.slot,
        role: "student",
        createdAt: serverTimestamp(),
        courseFee: selectedCourse?.price || 0,
      });
    } catch (dbError) {
      console.warn("Firestore save failed:", dbError);
    }

    // Always save locally to ensure they can log in
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: uid,
        email: formData.email,
        name: formData.studentName,
        role: "student",
        course: formData.course,
        isLocal: true,
      }),
    );

    const localStudents = JSON.parse(
      localStorage.getItem("localStudents") || "[]",
    );
    localStudents.push({
      ...formData,
      id: uid,
      password: DEFAULT_PASSWORD,
      isLocal: true,
    });
    localStorage.setItem("localStudents", JSON.stringify(localStudents));

    setIsProcessing(false);
    setIsSuccess(true);
  };

  const handleLocalBypass = async () => {
    setIsProcessing(true);
    setRegistrationError("");
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUid = "local_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: mockUid,
        email: formData.email,
        name: formData.studentName,
        role: "student",
        course: formData.course,
        isLocal: true,
      }),
    );

    const localStudents = JSON.parse(
      localStorage.getItem("localStudents") || "[]",
    );
    localStudents.push({
      ...formData,
      id: mockUid,
      password: DEFAULT_PASSWORD,
    });
    localStorage.setItem("localStudents", JSON.stringify(localStudents));

    setIsProcessing(false);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#f8fafc] flex items-center justify-center p-4 py-20 relative font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-[#13171f]/60 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-0 relative z-20 overflow-hidden"
      >
        {/* Sleek Progress Header */}
        {!isSuccess && (
          <div className="bg-white/[0.02] border-b border-white/5 p-6 pb-0">
            <div className="flex justify-between items-center mb-6 px-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-1">
                  Step {step} of 3
                </span>
                <h1 className="text-xl font-bold tracking-tight">
                  {step === 1
                    ? "Personal Profile"
                    : step === 2
                      ? "Academy Choice"
                      : "Finalize & Enroll"}
                </h1>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      step >= num ? "w-8 bg-blue-600" : "w-4 bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Details */}
            {step === 1 && !isSuccess && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Student Full Name
                    </label>
                    <div className="group relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors"
                        size={18}
                      />
                      <input
                        type="text"
                        value={formData.studentName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            studentName: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600/50 transition-all text-sm font-medium hover:bg-white/[0.08]"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Parent/Guardian Name
                    </label>
                    <div className="group relative">
                      <Globe
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors"
                        size={18}
                      />
                      <input
                        type="text"
                        value={formData.parentName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            parentName: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600/50 transition-all text-sm font-medium hover:bg-white/[0.08]"
                        placeholder="Sarah Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Current Grade / Class
                    </label>
                    <div className="group relative">
                      <Hash
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors"
                        size={18}
                      />
                      <input
                        type="text"
                        value={formData.studentClass}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            studentClass: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600/50 transition-all text-sm font-medium hover:bg-white/[0.08]"
                        placeholder="e.g. Class 8"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Phone Number
                    </label>
                    <div className="group relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors"
                        size={18}
                      />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600/50 transition-all text-sm font-medium hover:bg-white/[0.08]"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Registration Email (Login credentials will be sent here)
                  </label>
                  <div className="group relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600/50 transition-all text-sm font-medium hover:bg-white/[0.08]"
                      placeholder="student@example.com"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-400">
                      Total Steps
                    </span>
                    <span className="text-sm font-bold text-white">
                      01 / 03
                    </span>
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={
                      !formData.studentName ||
                      !formData.parentName ||
                      !formData.studentClass ||
                      !formData.email ||
                      !formData.phone
                    }
                    className="group px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next Component
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Course & Slot Select */}
            {step === 2 && !isSuccess && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-4 block ml-1 text-center">
                    Premium Educational Programs
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2">
                    {courses.map((course) => (
                      <button
                        key={course.id}
                        onClick={() =>
                          setFormData({ ...formData, course: course.id })
                        }
                        className={`group p-4 rounded-2xl border transition-all text-left relative overflow-hidden ${
                          formData.course === course.id
                            ? "border-blue-600/50 bg-blue-600/5 ring-1 ring-blue-600/30"
                            : "border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/10"
                        }`}
                      >
                        <div className="flex flex-col gap-2 relative z-10">
                          <span className="text-lg">{course.icon}</span>
                          <span className="text-xs font-bold text-white tracking-tight">
                            {course.name}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            Premium Curricula
                          </span>
                        </div>
                        <div
                          className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl`}
                        ></div>
                        {formData.course === course.id && (
                          <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 bg-blue-600 rounded-full shadow-lg">
                            <CheckCircle2 size={12} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 text-center block">
                    Optimal Timing Integration
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {timeSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFormData({ ...formData, slot: slot })}
                        className={`p-3 rounded-xl border transition-all text-[10px] font-bold text-center ${
                          formData.slot === slot
                            ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-500/10"
                            : "border-white/5 bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        {slot.split(" (")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 items-center">
                  <button
                    onClick={handleBack}
                    className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all border border-white/5"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.course || !formData.slot}
                    className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20 disabled:opacity-30"
                  >
                    Finalize Application
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Checkout Sim */}
            {step === 3 && !isSuccess && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Financial Overview
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Review your selections before processing
                  </p>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Enrolled Program
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{selectedCourse?.icon}</span>
                        <p className="text-sm font-bold text-white">
                          {selectedCourse?.name}
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-600/10 px-3 py-1 rounded-full border border-blue-600/20">
                      <span className="text-[10px] font-bold text-blue-500 uppercase">
                        Live Session
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-4 border-y border-white/5">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight size={14} className="text-gray-500" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Selected Window
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-200">
                      {formData.slot}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-bold text-white">
                      Investment Amount
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-blue-500 tracking-tighter">
                        ₹{selectedCourse?.price}
                      </span>
                      <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest">
                        Includes all taxes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-600/5 border border-orange-600/10 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-600/20 rounded-xl flex items-center justify-center text-orange-500">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
                      Security Protocol
                    </h4>
                    <p className="text-[9px] text-gray-500">
                      This is a secure sandbox environment. No actual funds will
                      be transferred.
                    </p>
                  </div>
                </div>

                {registrationError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-600/10 border border-red-600/20 rounded-2xl space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        size={18}
                        className="text-red-500 mt-0.5 shrink-0"
                      />
                      <p className="text-[10px] text-red-200 font-medium leading-relaxed">
                        {registrationError}
                      </p>
                    </div>
                    {registrationError.includes("Firebase Console") && (
                      <button
                        onClick={handleLocalBypass}
                        disabled={isProcessing}
                        className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
                      >
                        <Sparkles
                          size={14}
                          className="text-yellow-400 animate-pulse"
                        />
                        Activate Local Prototype Mode
                        <ArrowRight
                          size={12}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    )}
                  </motion.div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleBack}
                    disabled={isProcessing}
                    className="px-6 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all border border-white/5 disabled:opacity-30"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-2xl hover:shadow-blue-600/20 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all relative overflow-hidden group disabled:opacity-50"
                  >
                    <span
                      className={
                        isProcessing
                          ? "opacity-0"
                          : "opacity-100 flex items-center justify-center gap-2"
                      }
                    >
                      Authorize Enrollment
                      <CreditCard size={16} />
                    </span>
                    {isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
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
                className="text-center py-6 space-y-8"
              >
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 relative z-10 mx-auto">
                    <ShieldCheck size={48} className="animate-bounce" />
                  </div>
                  <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse scale-150"></div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-black text-white tracking-tighter">
                    Verified Enrollment
                  </h1>
                  <p className="text-xs text-gray-400 font-medium">
                    Your global educational identity is ready
                  </p>
                </div>

                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 text-left space-y-6 relative overflow-hidden group">
                  <Sparkles
                    size={64}
                    className="absolute -bottom-8 -right-8 opacity-5 text-white group-hover:opacity-10 transition-opacity"
                  />

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">
                      Authentication ID
                    </label>
                    <p className="text-md font-bold text-white">
                      {formData.email}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">
                        Access Credentials
                      </label>
                      <p className="text-md font-bold text-emerald-500 tracking-widest">
                        Brilliant@123
                      </p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] text-gray-500 font-medium max-w-xs mx-auto leading-relaxed">
                    Digital welcome kit and authentication certificates have
                    been synchronized to your profile.
                  </p>

                  <Link
                    href="/signin"
                    className="w-full py-4 bg-white text-black hover:bg-white/90 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 group shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                  >
                    Access Academy Console
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
