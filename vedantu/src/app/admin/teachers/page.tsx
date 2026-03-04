"use client";

import React, { useState } from "react";
import {
  Users,
  Star,
  DollarSign,
  Award,
  MessageSquare,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Eye,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  BookOpen,
  UserCheck,
  Video,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

export default function TeachersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const teachers = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@edu.com",
      phone: "+91 98765 43210",
      specialization: "Mathematics",
      experience: "15 years",
      rating: 4.9,
      students: 1234,
      revenue: 234567,
      courses: 5,
      status: "active",
      joinedDate: "2023-01-15",
      nextClass: "2024-03-16 10:00 AM",
      avatar: "RK",
    },
    {
      id: 2,
      name: "Prof. Sarah Williams",
      email: "sarah.williams@edu.com",
      phone: "+91 98765 43211",
      specialization: "Physics",
      experience: "12 years",
      rating: 4.8,
      students: 987,
      revenue: 198765,
      courses: 4,
      status: "active",
      joinedDate: "2023-02-20",
      nextClass: "2024-03-16 2:00 PM",
      avatar: "SW",
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      email: "michael.chen@edu.com",
      phone: "+91 98765 43212",
      specialization: "Chemistry",
      experience: "10 years",
      rating: 4.7,
      students: 756,
      revenue: 154321,
      courses: 3,
      status: "on_leave",
      joinedDate: "2023-03-10",
      nextClass: "2024-03-20 11:00 AM",
      avatar: "MC",
    },
    {
      id: 4,
      name: "Prof. Emily Johnson",
      email: "emily.johnson@edu.com",
      phone: "+91 98765 43213",
      specialization: "Biology",
      experience: "8 years",
      rating: 4.6,
      students: 543,
      revenue: 123456,
      courses: 3,
      status: "active",
      joinedDate: "2023-04-05",
      nextClass: "2024-03-16 3:00 PM",
      avatar: "EJ",
    },
    {
      id: 5,
      name: "Dr. James Wilson",
      email: "james.wilson@edu.com",
      phone: "+91 98765 43214",
      specialization: "English Literature",
      experience: "20 years",
      rating: 4.9,
      students: 432,
      revenue: 98765,
      courses: 2,
      status: "inactive",
      joinedDate: "2023-05-12",
      nextClass: "N/A",
      avatar: "JW",
    },
  ];

  const stats = {
    totalTeachers: 156,
    activeTeachers: 134,
    onLeave: 12,
    inactive: 10,
    avgRating: 4.7,
    totalRevenue: 2456789,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "on_leave":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "on_leave":
        return <Clock className="w-4 h-4" />;
      case "inactive":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Teachers Management">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Teachers Management</h1>
            <p className="text-gray-500 mt-1">
              Manage your teaching staff and track their performance
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Teacher
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Teachers</p>
                <p className="text-2xl font-bold mt-1">{stats.totalTeachers}</p>
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12 this month
                </p>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Now</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.activeTeachers}
                </p>
                <p className="text-gray-500 text-sm mt-2">86% of total</p>
              </div>
              <UserCheck className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold mt-1">{stats.avgRating}</p>
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i <= Math.floor(stats.avgRating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <Award className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">
                  ₹{(stats.totalRevenue / 100000).toFixed(1)}L
                </p>
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +18.5%
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-purple-500" />
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
                placeholder="Search teachers..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {teacher.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{teacher.name}</h3>
                    <p className="text-gray-500">{teacher.specialization}</p>
                    <p className="text-sm text-gray-400">
                      {teacher.experience} experience
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(teacher.status)}`}
                >
                  {getStatusIcon(teacher.status)}
                  <span className="ml-1">
                    {teacher.status.replace("_", " ")}
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{teacher.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{teacher.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    {teacher.students} students
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    {teacher.courses} courses
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">{teacher.rating}</span>
                  <span className="text-gray-500 ml-1">rating</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₹{teacher.revenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">revenue</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Next Class</span>
                  <span className="text-sm font-medium">
                    {teacher.nextClass}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </button>
                  <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Top Performers</p>
              <div className="space-y-2">
                {teachers.slice(0, 3).map((teacher, index) => (
                  <div
                    key={teacher.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                        {index + 1}
                      </span>
                      <span className="text-sm">{teacher.name}</span>
                    </div>
                    <span className="text-sm font-medium">
                      ₹{(teacher.revenue / 1000).toFixed(0)}K
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Highest Rated</p>
              <div className="space-y-2">
                {teachers
                  .filter((t) => t.rating >= 4.8)
                  .slice(0, 3)
                  .map((teacher) => (
                    <div
                      key={teacher.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{teacher.name}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium ml-1">
                          {teacher.rating}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Most Students</p>
              <div className="space-y-2">
                {teachers
                  .sort((a, b) => b.students - a.students)
                  .slice(0, 3)
                  .map((teacher) => (
                    <div
                      key={teacher.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{teacher.name}</span>
                      <span className="text-sm font-medium">
                        {teacher.students}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
