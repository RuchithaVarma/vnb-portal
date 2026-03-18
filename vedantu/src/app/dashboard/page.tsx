"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  BookOpen,
  Award,
  Calendar,
  TrendingUp,
  CheckCircle,
  LogOut,
  CreditCard,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/signin");
  };

  // Generate a student ID from their applicationId or email
  const studentId = user?.applicationId
    ? user.applicationId
    : user
      ? `BR${user.email.slice(0, 3).toUpperCase()}${Math.abs(user.email.charCodeAt(0) * 997) % 10000}`
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

  const enrolledCourse = user.course || "—";
  const hasPayment = user.paymentStatus === "paid";

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
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-semibold text-sm">{studentId}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Enrolled Course Banner */}
        <div className="bg-gradient-to-r from-[var(--primary)] to-orange-500 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">
                Your Enrolled Course
              </p>
              <h2 className="text-2xl font-bold">{enrolledCourse}</h2>
              {user.preferredTiming && (
                <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {user.preferredTiming}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 items-start md:items-end">
              {hasPayment ? (
                <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-sm font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  Payment Confirmed
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-300/30 rounded-full px-4 py-1.5 text-sm font-semibold">
                  ⚠ Payment Pending
                </span>
              )}
              {user.paymentAmount && (
                <span className="text-white/80 text-sm flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />₹
                  {user.paymentAmount.toLocaleString("en-IN")} paid
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <span className="text-sm text-green-600 font-semibold">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
            <p className="text-gray-600 text-sm">Classes Attended</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="text-green-600" size={24} />
              </div>
              <span className="text-sm text-gray-400 font-semibold">—</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">—</h3>
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
            <h3 className="text-2xl font-bold text-gray-900">—</h3>
            <p className="text-gray-600 text-sm">Upcoming Classes</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <span className="text-sm text-gray-400 font-semibold">—</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">—</h3>
            <p className="text-gray-600 text-sm">Current Grade</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Course Detail */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Your Course
              </h2>
              <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {enrolledCourse}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Brilliant Roots Learning Program
                    </p>
                    {user.username && (
                      <p className="text-xs text-gray-400 mt-1">
                        Login:{" "}
                        <code className="bg-gray-100 px-1.5 py-0.5 rounded">
                          {user.username}
                        </code>
                      </p>
                    )}
                  </div>
                  {hasPayment && (
                    <span className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Enrolled
                    </span>
                  )}
                </div>

                {/* Progress bar placeholder */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Course Progress</span>
                    <span>0% — Just started!</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[var(--primary)] to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: "2%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {user.preferredTiming && (
                    <p className="text-sm text-gray-600">
                      🕐 Classes:{" "}
                      <span className="font-medium">
                        {user.preferredTiming}
                      </span>
                    </p>
                  )}
                  {hasPayment ? (
                    <Link
                      href="/courses"
                      className="text-sm text-[var(--primary)] hover:underline font-medium"
                    >
                      Access Course Materials →
                    </Link>
                  ) : (
                    <button className="text-sm text-[var(--primary)] hover:underline font-medium">
                      View Schedule →
                    </button>
                  )}
                </div>
              </div>

              {/* Profile summary */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-3 text-sm">
                  Your Profile
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {user.email && (
                    <div>
                      <p className="text-gray-400 text-xs">Email</p>
                      <p className="text-gray-700 font-medium truncate">
                        {user.email}
                      </p>
                    </div>
                  )}
                  {user.phone && (
                    <div>
                      <p className="text-gray-400 text-xs">Phone</p>
                      <p className="text-gray-700 font-medium">{user.phone}</p>
                    </div>
                  )}
                  {user.grade && (
                    <div>
                      <p className="text-gray-400 text-xs">Grade</p>
                      <p className="text-gray-700 font-medium">
                        Grade {user.grade}
                      </p>
                    </div>
                  )}
                  {user.parentName && (
                    <div>
                      <p className="text-gray-400 text-xs">Parent/Guardian</p>
                      <p className="text-gray-700 font-medium">
                        {user.parentName}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {hasPayment ? (
                  <Link
                    href="/courses"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    <BookOpen size={20} />
                    <span>Access My Course</span>
                  </Link>
                ) : (
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    <BookOpen size={20} />
                    <span>Complete Payment First</span>
                  </button>
                )}
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

            {/* Getting Started */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Getting Started</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700">Application submitted</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700">Payment confirmed</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-gray-400 text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Attend your first class
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-gray-400 text-xs font-bold">4</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Complete your first assignment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
