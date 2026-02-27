"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { BookOpen, Award, Calendar, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  // Generate a simple student ID based on user email
  const studentId = user
    ? `VED${user.email.slice(0, 3).toUpperCase()}123456`
    : "";

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to access your dashboard
          </h1>
          <Link href="/signin" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Continue your learning journey
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-semibold">{studentId}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <span className="text-sm text-green-600 font-semibold">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">24</h3>
            <p className="text-gray-600 text-sm">Classes Attended</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="text-green-600" size={24} />
              </div>
              <span className="text-sm text-green-600 font-semibold">+8%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">89%</h3>
            <p className="text-gray-600 text-sm">Average Score</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <span className="text-sm text-gray-600 font-semibold">
                This week
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">6</h3>
            <p className="text-gray-600 text-sm">Upcoming Classes</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <span className="text-sm text-green-600 font-semibold">+15%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">A+</h3>
            <p className="text-gray-600 text-sm">Current Grade</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Your Courses
              </h2>
              <div className="space-y-4">
                {[
                  {
                    name: "Mathematics - Grade 10",
                    progress: 75,
                    nextClass: "Today, 4:00 PM",
                    teacher: "Dr. Sarah Johnson",
                  },
                  {
                    name: "Physics - Grade 10",
                    progress: 60,
                    nextClass: "Tomorrow, 3:00 PM",
                    teacher: "Prof. Mike Chen",
                  },
                  {
                    name: "Chemistry - Grade 10",
                    progress: 45,
                    nextClass: "Friday, 5:00 PM",
                    teacher: "Dr. Emily Davis",
                  },
                ].map((course, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {course.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Teacher: {course.teacher}
                        </p>
                      </div>
                      <span className="text-sm text-[var(--primary)] font-medium">
                        {course.progress}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-gradient-to-r from-[var(--primary)] to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Next class: {course.nextClass}
                      </p>
                      <button className="text-sm text-[var(--primary)] hover:underline font-medium">
                        Join Class →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors">
                  <BookOpen size={20} />
                  <span>Book New Class</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Award size={20} />
                  <span>View Certificates</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar size={20} />
                  <span>Study Schedule</span>
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">🏆</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Math Champion</p>
                    <p className="text-xs text-gray-600">Scored 95% in test</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Perfect Attendance
                    </p>
                    <p className="text-xs text-gray-600">30 days streak</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">🎯</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Quick Learner</p>
                    <p className="text-xs text-gray-600">Completed 5 modules</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
