"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  Clock,
  BookOpen,
  Award,
  GraduationCap,
  Sparkles,
  CheckCircle,
  Lock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getItems } from "@/lib/firestoreService";
import { Course } from "@/types";
import {
  filterKidsCourses,
  getEnrollmentText,
  getCourseBadgeColor,
} from "@/utils/courseUtils";

const iconMap = {
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
};

export default function PrimaryCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [visibleCourses, setVisibleCourses] = useState(6);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Fetch courses from Firestore
    const fetchCourses = async () => {
      try {
        const data = await getItems("courses");
        setCourses(data as Course[]);

        // Debug logging
        console.log("🔥 Primary Courses - Firebase Courses Data:", data);
        console.log(
          "👶 Kids Courses Filtered:",
          filterKidsCourses(data as Course[]),
        );

        // Log course details for debugging
        (data as Course[]).forEach((course, index) => {
          console.log(`Primary Course Check ${index + 1}:`, {
            title: course.title,
            grades: course.grades,
            category: course.category,
            isKidsCourse: filterKidsCourses([course]).length > 0,
          });
        });
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Filter for kids courses
  const kidsCourses = filterKidsCourses(courses);

  // Check if user has access to a course
  const hasCourseAccess = (courseTitle: string) => {
    if (!isAuthenticated || !user) return false;
    if (user.paymentStatus !== "paid") return false;

    const enrolledCourse = user.course;
    if (!enrolledCourse) return false;

    const normalizedEnrolled = enrolledCourse.toLowerCase().trim();
    const normalizedCourse = courseTitle.toLowerCase().trim();

    return (
      normalizedCourse.includes(normalizedEnrolled) ||
      normalizedEnrolled.includes(normalizedCourse)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white py-20 relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-white opacity-5 rounded-full filter blur-xl -translate-x-1/2 -translate-y-1/2"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                Courses for{" "}
                <span className="bg-white text-purple-600 px-4 py-1 rounded-2xl shadow-lg">
                  Kids
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-medium mb-8 text-white/90 leading-relaxed max-w-3xl mx-auto">
                Fun, interactive, and educational courses designed specifically
                for young learners. Build strong foundations with our expert
                teachers!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Access Message */}
      {isAuthenticated && user?.role === "student" && (
        <div className="container mx-auto px-4 py-6">
          <div
            className={`p-4 rounded-lg ${
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
        </div>
      )}

      {/* Course Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Kids Courses
            <span className="text-gray-500 font-normal ml-2">
              ({kidsCourses.length} courses)
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kidsCourses.slice(0, visibleCourses).map((course) => {
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
                  {/* Dynamic Background Gradient for kids courses */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${course.color || "from-pink-400 to-purple-600"} opacity-90`}
                  >
                    {/* Animated overlay patterns */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                          "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                          "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Fun floating animated elements for kids */}
                    <motion.div
                      className="absolute top-4 right-4 w-8 h-8 bg-white/25 rounded-full backdrop-blur-sm"
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.4, 0.9, 0.4],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0,
                      }}
                    />
                    <motion.div
                      className="absolute bottom-6 left-6 w-6 h-6 bg-white/20 rounded-full backdrop-blur-sm"
                      animate={{
                        y: [0, -12, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.8,
                      }}
                    />
                    <motion.div
                      className="absolute top-12 left-8 w-4 h-4 bg-white/30 rounded-full backdrop-blur-sm"
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 180, 360],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                    />

                    {/* Star animations for kids theme */}
                    <motion.div
                      className="absolute top-8 right-12 text-yellow-300"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                        rotate: [0, 15, -15, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Star size={16} fill="currentColor" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-8 right-8 text-yellow-200"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.9, 0.4],
                        rotate: [0, -20, 20, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    >
                      <Star size={12} fill="currentColor" />
                    </motion.div>
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
                                  <svg class="w-16 h-16 text-white/60" fill="currentColor" viewBox="0 0 24 24">
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
                      /* Animated Icon Fallback for kids */
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
                              className: "text-white/90 drop-shadow-lg",
                            },
                          )
                        ) : (
                          <BookOpen
                            size={64}
                            className="text-white/90 drop-shadow-lg"
                          />
                        )}
                        {/* Double pulsing ring effect for kids */}
                        <motion.div
                          className="absolute inset-0 border-2 border-white/40 rounded-full scale-150"
                          animate={{
                            scale: [1.5, 2.2, 1.5],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 border border-white/20 rounded-full scale-150"
                          animate={{
                            scale: [1.5, 2.5, 1.5],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                          }}
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Kids course category badge */}
                  <div className="absolute top-3 left-3">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-700 shadow-lg border border-purple-200"
                    >
                      {course.category || "Kids Course"}
                    </motion.div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-purple-600 transition-colors tracking-tight">
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
                            className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-md"
                          >
                            {feature}
                          </span>
                        ))}
                        {course.features.length > 3 && (
                          <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-md">
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
                          className="flex-1 w-full py-4 text-center block bg-gradient-to-r from-purple-600 to-pink-500 hover:to-purple-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-purple-600/30 transition-all duration-300"
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
        {visibleCourses < kidsCourses.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCourses((prev) => prev + 3)}
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Load More Courses
            </button>
          </div>
        )}

        {/* Empty State */}
        {kidsCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Kids Courses Available
            </h3>
            <p className="text-gray-500">
              Check back soon for new courses designed for young learners!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
