"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Calendar,
  Video,
  Award,
  ShoppingCart,
  CreditCard,
  FileText,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  BarChart,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserCheck,
  UserX,
  PlayCircle,
  PauseCircle,
  Star,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Globe,
  Zap,
  Target,
  Headphones,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  // Mock data
  const stats = {
    totalRevenue: 2456789,
    totalStudents: 12456,
    totalCourses: 156,
    activeTeachers: 234,
    monthlyGrowth: 12.5,
    completionRate: 85.2,
  };

  const recentTransactions = [
    {
      id: 1,
      student: "John Doe",
      course: "Mathematics Advanced",
      amount: 999,
      date: "2024-03-15",
      status: "completed",
    },
    {
      id: 2,
      student: "Jane Smith",
      course: "Physics Fundamentals",
      amount: 799,
      date: "2024-03-15",
      status: "completed",
    },
    {
      id: 3,
      student: "Mike Johnson",
      course: "Chemistry Basics",
      amount: 599,
      date: "2024-03-14",
      status: "pending",
    },
    {
      id: 4,
      student: "Sarah Williams",
      course: "Biology Masterclass",
      amount: 1299,
      date: "2024-03-14",
      status: "completed",
    },
    {
      id: 5,
      student: "Tom Brown",
      course: "English Literature",
      amount: 499,
      date: "2024-03-13",
      status: "failed",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Mathematics Advanced",
      students: 1234,
      revenue: 123456,
      rating: 4.8,
      status: "active",
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      students: 987,
      revenue: 98765,
      rating: 4.6,
      status: "active",
    },
    {
      id: 3,
      title: "Chemistry Basics",
      students: 756,
      revenue: 65432,
      rating: 4.5,
      status: "draft",
    },
    {
      id: 4,
      title: "Biology Masterclass",
      students: 543,
      revenue: 87654,
      rating: 4.9,
      status: "active",
    },
    {
      id: 5,
      title: "English Literature",
      students: 432,
      revenue: 43210,
      rating: 4.4,
      status: "archived",
    },
  ];

  const menuItems = [
    // { id: "dashboard", label: "Dashboard", icon: BarChart, href: "/admin" },
    { id: "students", label: "Students", icon: Users, href: "/admin/students" },
    { id: "courses", label: "Courses", icon: BookOpen, href: "/admin/courses" },
    {
      id: "teachers",
      label: "Teachers",
      icon: UserCheck,
      href: "/admin/teachers",
    },
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
      href: "/admin/payments",
    },
    // {
    //   id: "schedule",
    //   label: "Schedule",
    //   icon: Calendar,
    //   href: "/admin/schedule",
    // },
    // {
    //   id: "analytics",
    //   label: "Analytics",
    //   icon: TrendingUp,
    //   href: "/admin/analytics",
    // },
    // { id: "reports", label: "Reports", icon: FileText, href: "/admin/reports" },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">
                ₹{stats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-blue-100 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />+{stats.monthlyGrowth}%
                this month
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Students</p>
              <p className="text-3xl font-bold mt-2">
                {stats.totalStudents.toLocaleString()}
              </p>
              <p className="text-green-100 mt-2 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                +234 new this month
              </p>
            </div>
            <Users className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Active Courses</p>
              <p className="text-3xl font-bold mt-2">{stats.totalCourses}</p>
              <p className="text-purple-100 mt-2 flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                12 new courses
              </p>
            </div>
            <BookOpen className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Active Teachers</p>
              <p className="text-3xl font-bold mt-2">{stats.activeTeachers}</p>
              <p className="text-orange-100 mt-2 flex items-center">
                <UserCheck className="w-4 h-4 mr-1" />
                89% satisfaction
              </p>
            </div>
            <UserCheck className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <BarChart className="w-16 h-16 text-gray-400" />
            <p className="ml-4 text-gray-500">Revenue Chart</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Course Distribution</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <PieChart className="w-16 h-16 text-gray-400" />
            <p className="ml-4 text-gray-500">Distribution Chart</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Student</th>
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{transaction.student}</td>
                  <td className="py-3 px-4">{transaction.course}</td>
                  <td className="py-3 px-4">₹{transaction.amount}</td>
                  <td className="py-3 px-4">{transaction.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Students Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left py-3 px-4">Student</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Phone</th>
                <th className="text-left py-3 px-4">Courses</th>
                <th className="text-left py-3 px-4">Joined</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                        JD
                      </div>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-gray-500">ID: STD00{i}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">john.doe@example.com</td>
                  <td className="py-3 px-4">+91 98765 4321{i}</td>
                  <td className="py-3 px-4">3 Courses</td>
                  <td className="py-3 px-4">2024-03-1{i}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courses Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === "active"
                      ? "bg-green-100 text-green-800"
                      : course.status === "draft"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {course.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Students</span>
                  <span className="font-medium">{course.students}</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue</span>
                  <span className="font-medium">
                    ₹{course.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium ml-1">{course.rating}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  View Details
                </button>
                <button className="p-2 border rounded-lg hover:bg-gray-50">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Management</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment
          </button>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Today's Revenue</p>
              <p className="text-xl font-bold">₹45,678</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-xl font-bold">₹12,345</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Failed</p>
              <p className="text-xl font-bold">₹3,456</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Refunded</p>
              <p className="text-xl font-bold">₹7,890</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Transaction ID</th>
                <th className="text-left py-3 px-4">Student</th>
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Method</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">
                    #TRX00{transaction.id}4567
                  </td>
                  <td className="py-3 px-4">{transaction.student}</td>
                  <td className="py-3 px-4">{transaction.course}</td>
                  <td className="py-3 px-4 font-medium">
                    ₹{transaction.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-1" />
                      Card
                    </span>
                  </td>
                  <td className="py-3 px-4">{transaction.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="w-4 h-4" />
                      </button>
                      {transaction.status === "pending" && (
                        <button className="text-green-600 hover:text-green-700">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "students":
        return renderStudents();
      case "courses":
        return renderCourses();
      case "payments":
        return renderPayments();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 fixed h-full z-10`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1
              className={`font-bold text-xl text-gray-800 ${!sidebarOpen && "hidden"}`}
            >
              EduAdmin Pro
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@edu.com</p>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
