"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  GraduationCap,
  Sparkles,
  Languages,
  Calculator,
  Brain,
  Trophy,
  Volume2,
  Mic,
  Lock,
  CheckCircle,
  Palette,
  Music,
  Gamepad2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getItems } from "@/lib/firestoreService";
import { Course } from "@/types";
import {
  filterCoursesByCategory,
  getEnrollmentText,
  getCourseBadgeColor,
  isKidsCourse,
  filterCoursesByRole,
  shouldShowKidsCourses,
} from "@/utils/courseUtils";

const iconMap = {
  Award,
  BookOpen,
  Calculator,
  Brain,
  Trophy,
  Volume2,
  Mic,
  GraduationCap,
  Languages,
  Palette,
  Music,
  Gamepad2,
  Sparkles,
};

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCourses, setVisibleCourses] = useState(6);
  const [courses, setCourses] = useState<Course[]>([]);
  const { user, isAuthenticated } = useAuth();

  // Smart course categorization function
  const getCourseCategory = (course: Course): string => {
    // First check if category is explicitly set
    if (course.category) return course.category;

    // Infer category from title and other fields
    const title = course.title.toLowerCase();
    const grades = course.grades.toLowerCase();

    // Academic courses
    if (
      title.includes("class") ||
      grades.includes("class") ||
      title.includes("tuition") ||
      title.includes("academic")
    ) {
      return "academic";
    }

    // Skill courses
    if (
      title.includes("vedic") ||
      title.includes("abacus") ||
      title.includes("phonics") ||
      title.includes("skill")
    ) {
      return "skill";
    }

    // Language courses
    if (
      title.includes("telugu") ||
      title.includes("english") ||
      title.includes("language") ||
      title.includes("speaking")
    ) {
      return "languages";
    }

    // Competitive exams
    if (
      title.includes("olympiad") ||
      title.includes("jee") ||
      title.includes("neet") ||
      title.includes("competitive")
    ) {
      return "competitive";
    }

    // Default to academic for courses with class grades
    if (grades.includes("class")) return "academic";

    return "general"; // fallback category
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) {
        // Use setTimeout to avoid synchronous setState in effect
        setTimeout(() => setSelectedCategory(cat), 0);
      }
    }

    // Fetch courses from Firestore
    const fetchCourses = async () => {
      try {
        const data = await getItems("courses");
        setCourses(data as Course[]);

        // Debug logging
        console.log("🔥 Firebase Courses Data:", data);
        console.log("📊 Selected Category:", selectedCategory);

        // Log course categories
        const courseCategories = (data as Course[]).map((course) => ({
          title: course.title,
          category: course.category,
          inferredCategory: getCourseCategory(course),
        }));
        console.log("📚 Course Categories:", courseCategories);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [selectedCategory]);

  // Check if user has access to a course
  const hasCourseAccess = (courseTitle: string) => {
    if (!isAuthenticated || !user) return false;

    // Check if payment is confirmed
    if (user.paymentStatus !== "paid") return false;

    // Check if this is the user's enrolled course
    const enrolledCourse = user.course;
    if (!enrolledCourse) return false;

    // Match course titles (handle variations)
    const normalizedEnrolled = enrolledCourse.toLowerCase().trim();
    const normalizedCourse = courseTitle.toLowerCase().trim();

    // Check for exact match or partial match
    return (
      normalizedCourse.includes(normalizedEnrolled) ||
      normalizedEnrolled.includes(normalizedCourse) ||
      (normalizedEnrolled.includes("class") &&
        normalizedCourse.includes("class")) ||
      (normalizedEnrolled.includes("vedic") &&
        normalizedCourse.includes("vedic")) ||
      (normalizedEnrolled.includes("telugu") &&
        normalizedCourse.includes("telugu")) ||
      (normalizedEnrolled.includes("abacus") &&
        normalizedCourse.includes("abacus")) ||
      (normalizedEnrolled.includes("phonics") &&
        normalizedCourse.includes("phonics")) ||
      (normalizedEnrolled.includes("olympiad") &&
        normalizedCourse.includes("olympiad"))
    );
  };

  // Dynamic categories based on user role
  const getCategoriesForRole = () => {
    const baseCategories = [
      { id: "all", name: "All Courses", icon: <BookOpen size={20} /> },
      { id: "academic", name: "Academic", icon: <GraduationCap size={20} /> },
      {
        id: "competitive",
        name: "Competitive Exams",
        icon: <Award size={20} />,
      },
      { id: "skill", name: "Skill Development", icon: <Sparkles size={20} /> },
      { id: "languages", name: "Languages", icon: <Languages size={20} /> },
    ];

    // Add kids courses only if user should see them
    if (shouldShowKidsCourses(user?.role, user?.grade)) {
      baseCategories.push({
        id: "kids",
        name: "Courses for Kids",
        icon: <Star size={20} />,
      });
    }

    return baseCategories;
  };

  const categories = getCategoriesForRole();

  // Enhanced filtered courses with better categorization
  const filteredCourses = filterCoursesByCategory(
    courses,
    selectedCategory,
  ).filter((course) => {
    // If student is logged in, only show their related course
    if (isAuthenticated && user?.role === "student" && user.course) {
      const enrolledValue = user.course.toLowerCase();
      const courseTitle = course.title.toLowerCase();

      // Mapping logic: check if the course title relates to the enrolled course value
      if (enrolledValue === "vedic-maths" && courseTitle.includes("vedic"))
        return true;
      if (enrolledValue === "telugu" && courseTitle.includes("telugu"))
        return true;
      if (enrolledValue === "phonics" && courseTitle.includes("phonics"))
        return true;
      if (enrolledValue === "abacus" && courseTitle.includes("abacus"))
        return true;
      if (enrolledValue === "olympiad" && courseTitle.includes("olympiad"))
        return true;
      if (enrolledValue === "jee" && courseTitle.includes("jee")) return true;
      if (enrolledValue === "neet" && courseTitle.includes("neet")) return true;

      // Tuition categories for general subjects
      if (
        ["mathematics", "science", "english", "coding"].includes(
          enrolledValue,
        ) &&
        courseTitle.includes("tuition")
      ) {
        return true;
      }

      // If no specific mapping, check for simple inclusion
      if (courseTitle.includes(enrolledValue)) return true;

      return false; // Hide non-related courses for students
    }

    // Enhanced category filtering for non-students or non-logged-in users
    const courseCategory = getCourseCategory(course);
    const isKids = isKidsCourse(course);

    if (selectedCategory === "all") {
      // Hide kids courses from the main "All Courses" tab to differentiate
      return !isKids;
    }
    
    if (selectedCategory === "kids") {
      return isKids;
    }

    // For other categories (academic, skill, etc.), only show if NOT a kids course
    return courseCategory === selectedCategory && !isKids;
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
                Explore Our{" "}
                <span className="bg-white text-[var(--primary)] px-4 py-1 rounded-2xl shadow-lg">
                  Courses
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-medium mb-8 text-white/90 leading-relaxed">
                Discover world-class course bundles designed by India&apos;s
                best teachers. Learn live, interact, and excel with structure.
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
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
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
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
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
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                  }}
                >
                  <BookOpen size={90} className="text-white drop-shadow-2xl" />
                </motion.div>
                <Sparkles
                  className="absolute top-10 right-10 text-yellow-300 animate-pulse"
                  size={24}
                />
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-[var(--primary)] text-white"
                    : "text-gray-600 hover:bg-gray-100"
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
        {/* Student Access Message */}
        {isAuthenticated && user?.role === "student" && (
          <div
            className={`mb-8 p-4 rounded-lg ${
              user.paymentStatus === "paid"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-yellow-50 border border-yellow-200 text-yellow-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {user.paymentStatus === "paid" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
              <div>
                <p className="font-semibold">
                  {user.paymentStatus === "paid"
                    ? `You have access to your enrolled course: ${user.course}`
                    : `Complete your payment for "${user.course}" to access course materials`}
                </p>
                {user.paymentStatus !== "paid" && (
                  <p className="text-sm mt-1">
                    Contact support or check your email for payment instructions
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === "all"
              ? "All Courses"
              : categories.find((c) => c.id === selectedCategory)?.name}
            <span className="text-gray-500 font-normal ml-2">
              ({filteredCourses.length} courses)
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.slice(0, visibleCourses).map((course) => {
            const hasAccess = hasCourseAccess(course.title);
            const isEnrolled = user?.course === course.title;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4 }}
                className={`bg-white rounded-3xl shadow-sm border overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full relative transform hover:scale-105 hover:-translate-y-2 ${
                  !hasAccess && isAuthenticated
                    ? "opacity-75 border-gray-200"
                    : "border-gray-100"
                }`}
              >
                {/* Access Badge */}
                {isAuthenticated && (
                  <div className="absolute top-4 right-4 z-10">
                    {hasAccess ? (
                      <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <CheckCircle size={12} />
                        Enrolled
                      </span>
                    ) : isEnrolled ? (
                      <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                        ⚠ Payment Pending
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                        <Lock size={12} />
                        Not Enrolled
                      </span>
                    )}
                  </div>
                )}
                {/* Course Image/Graphics */}
                <div className="relative h-48 overflow-hidden">
                  {/* Dynamic Background Gradient based on course color */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${course.color || "from-blue-400 to-purple-600"} opacity-90`}
                  >
                    {/* Animated overlay patterns */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                          "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                          "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Floating animated elements */}
                    <motion.div
                      className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0,
                      }}
                    />
                    <motion.div
                      className="absolute bottom-6 left-6 w-6 h-6 bg-white/15 rounded-full backdrop-blur-sm"
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.2, 0.6, 0.2],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />
                    <motion.div
                      className="absolute top-12 left-8 w-4 h-4 bg-white/25 rounded-full backdrop-blur-sm"
                      animate={{
                        y: [0, -6, 0],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />
                  </div>

                  {/* Course Image or Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {course.image &&
                    course.image !== "/images/courses/default.jpg" ? (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full h-full"
                      >
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to gradient if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-full h-full flex items-center justify-center">
                                  <svg class="w-16 h-16 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                                  </svg>
                                </div>
                              `;
                            }
                          }}
                        />
                        {/* Overlay gradient for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </motion.div>
                    ) : (
                      /* Animated Icon Fallback */
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                      >
                        {iconMap[course.icon as keyof typeof iconMap] ? (
                          React.createElement(
                            iconMap[course.icon as keyof typeof iconMap],
                            {
                              size: 64,
                              className: "text-white/80 drop-shadow-lg",
                            },
                          )
                        ) : (
                          <BookOpen
                            size={64}
                            className="text-white/80 drop-shadow-lg"
                          />
                        )}
                        {/* Pulsing ring effect */}
                        <motion.div
                          className="absolute inset-0 border-2 border-white/30 rounded-full scale-150"
                          animate={{
                            scale: [1.5, 2, 1.5],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Course category badge */}
                  <div className="absolute top-3 left-3">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-lg"
                    >
                      {course.category || "General"}
                    </motion.div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors tracking-tight">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 font-medium">
                    {course.description || ""}
                  </p>

                  {/* Course Features */}
                  {course.features && course.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {course.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                          >
                            {feature}
                          </span>
                        ))}
                        {course.features.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                            +{course.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Grades Badge */}
                  {course.grades && (
                    <div className="mb-4">
                      <span
                        className={`inline-block text-xs px-3 py-1 rounded-full font-medium border ${getCourseBadgeColor(course)}`}
                      >
                        {course.grades}
                      </span>
                    </div>
                  )}

                  {/* Micro Details Row */}
                  <div className="flex items-center gap-3 mb-6 text-xs font-bold text-gray-500">
                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-xl text-amber-600 border border-amber-100">
                      <Star className="fill-current" size={14} />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-1.5 rounded-xl text-blue-600 border border-blue-100">
                      <Users size={14} />
                      <span>{getEnrollmentText(course)}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-purple-50 px-2.5 py-1.5 rounded-xl text-purple-600 border border-purple-100">
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Divider node */}
                  <div className="flex items-center justify-between mb-6 pt-5 border-t border-gray-100 mt-auto">
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                        Fee
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-gray-900 tracking-tighter">
                          ₹{course.price.toLocaleString()}
                        </span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-400 line-through font-bold">
                            ₹{course.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {course.originalPrice && (
                        <div className="inline-block bg-green-50 text-green-600 text-[10px] font-black px-2 py-1 rounded-md border border-green-100 mb-1">
                          Save{" "}
                          {Math.round(
                            (1 - course.price / course.originalPrice) * 100,
                          )}
                          %
                        </div>
                      )}
                      <p className="text-xs text-gray-500 font-black uppercase tracking-widest">
                        {course.lessons || "12"} Live Sessions
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {hasAccess ? (
                      <>
                        <Link
                          href={`/courses/${course.id}/learn`}
                          className="flex-1 w-full py-4 text-center block bg-gradient-to-r from-green-600 to-green-700 hover:to-green-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-green-600/30 transition-all duration-300"
                        >
                          Continue Learning
                        </Link>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <BookOpen size={20} />
                        </button>
                      </>
                    ) : isEnrolled ? (
                      <>
                        <button
                          disabled
                          className="flex-1 w-full py-4 text-center block bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl opacity-75 cursor-not-allowed"
                        >
                          Payment Pending
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <BookOpen size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/register"
                          className="flex-1 w-full py-4 text-center block bg-gradient-to-r from-[var(--primary)] to-orange-500 hover:to-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
                        >
                          Enroll Now
                        </Link>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <BookOpen size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        {visibleCourses < filteredCourses.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCourses((prev) => prev + 3)}
              className="px-8 py-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Load More Courses
            </button>
          </div>
        )}

        {/* No Courses Found State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={40} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Courses Found
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedCategory === "all"
                  ? "No courses are available at the moment. Please check back later!"
                  : `No courses found in "${categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}". Try browsing other categories or check back soon.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  View All Courses
                </button>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Brilliant Roots Courses?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-[var(--primary)]" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Teachers
              </h3>
              <p className="text-gray-600">
                Learn from India's best educators with years of experience
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[var(--primary)]" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Live Interactive Classes
              </h3>
              <p className="text-gray-600">
                Real-time doubt resolution and peer learning
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-[var(--primary)]" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Proven Results
              </h3>
              <p className="text-gray-600">
                Join millions of students who have achieved their dreams
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
