"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  PlayCircle,
  Users,
  Star,
  TrendingUp,
  Download,
  Clock,
  DollarSign,
  Award,
  Video,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import {
  handleExport,
  handleDelete,
  handleEdit,
  handleView,
  handleAddNew,
} from "@/utils/adminHandlers";

export default function CoursesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Mathematics Advanced",
      category: "Mathematics",
      instructor: "Dr. Rajesh Kumar",
      students: 1234,
      rating: 4.8,
      price: 9999,
      duration: "3 months",
      status: "active",
      enrolledDate: "2024-01-15",
      revenue: 123456,
      lessons: 45,
      completedLessons: 38,
      thumbnail: "/math-course.jpg",
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      category: "Science",
      instructor: "Prof. Sarah Williams",
      students: 987,
      rating: 4.6,
      price: 8999,
      duration: "2 months",
      status: "active",
      enrolledDate: "2024-02-01",
      revenue: 98765,
      lessons: 36,
      completedLessons: 30,
      thumbnail: "/physics-course.jpg",
    },
    {
      id: 3,
      title: "Chemistry Basics",
      category: "Science",
      instructor: "Dr. Michael Chen",
      students: 756,
      rating: 4.5,
      price: 7999,
      duration: "2 months",
      status: "draft",
      enrolledDate: "2024-02-15",
      revenue: 0,
      lessons: 30,
      completedLessons: 25,
      thumbnail: "/chemistry-course.jpg",
    },
    {
      id: 4,
      title: "Biology Masterclass",
      category: "Science",
      instructor: "Prof. Emily Johnson",
      students: 543,
      rating: 4.9,
      price: 10999,
      duration: "3 months",
      status: "active",
      enrolledDate: "2024-01-10",
      revenue: 87654,
      lessons: 48,
      completedLessons: 42,
      thumbnail: "/biology-course.jpg",
    },
    {
      id: 5,
      title: "English Literature",
      category: "Languages",
      instructor: "Dr. James Wilson",
      students: 432,
      rating: 4.4,
      price: 6999,
      duration: "2 months",
      status: "archived",
      enrolledDate: "2023-12-01",
      revenue: 43210,
      lessons: 24,
      completedLessons: 24,
      thumbnail: "/english-course.jpg",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "draft":
        return <AlertCircle className="w-4 h-4" />;
      case "archived":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Courses Management">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Courses Management</h1>
            <p className="text-gray-500 mt-1">
              Manage course content and track performance
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport("courses", courses)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => handleAddNew("course")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Courses</p>
                <p className="text-2xl font-bold mt-1">156</p>
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12 this month
                </p>
              </div>
              <BookOpen className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Courses</p>
                <p className="text-2xl font-bold mt-1">134</p>
                <p className="text-gray-500 text-sm mt-2">86% of total</p>
              </div>
              <PlayCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <p className="text-2xl font-bold mt-1">12.4K</p>
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +18.5%
                </p>
              </div>
              <Users className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold mt-1">4.7</p>
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i <= 4 ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <Award className="w-10 h-10 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="languages">Languages</option>
              <option value="programming">Programming</option>
            </select>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <div className="w-48 h-32 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white" />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.category}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(course.status)}`}
                    >
                      {getStatusIcon(course.status)}
                      <span className="ml-1">{course.status}</span>
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    by {course.instructor}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                      <span>₹{course.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Video className="w-4 h-4 mr-2" />
                    <span>
                      {course.completedLessons}/{course.lessons} lessons
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    Revenue: ₹{course.revenue.toLocaleString()}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleView(course.id.toString(), "course")}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleEdit(course.id.toString(), "course")}
                    className="px-3 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id.toString(), "course")}
                    className="px-3 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">
              Top Performing Courses
            </h3>
            <div className="space-y-3">
              {courses
                .sort((a, b) => b.students - a.students)
                .slice(0, 3)
                .map((course, index) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-gray-500">
                          {course.instructor}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{course.students} students</p>
                      <p className="text-sm text-gray-500">
                        ₹{(course.revenue / 1000).toFixed(0)}K revenue
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Course Categories</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Mathematics</span>
                <span className="text-sm font-medium">45 courses</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Science</span>
                <span className="text-sm font-medium">38 courses</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Languages</span>
                <span className="text-sm font-medium">27 courses</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Programming</span>
                <span className="text-sm font-medium">32 courses</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Arts & Music</span>
                <span className="text-sm font-medium">14 courses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
