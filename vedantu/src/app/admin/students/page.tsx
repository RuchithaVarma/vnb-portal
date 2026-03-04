"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
  Download,
  CheckCircle,
  MoreVertical,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import {
  handleExport,
  handleDelete,
  handleEdit,
  handleView,
  handleAddNew,
} from "@/utils/adminHandlers";

export default function StudentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 98765 43210",
      grade: "10th",
      courses: 5,
      enrolledDate: "2024-01-15",
      lastActive: "2024-03-15",
      status: "active",
      progress: 75,
      fees: "Paid",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+91 98765 43211",
      grade: "12th",
      courses: 3,
      enrolledDate: "2024-02-20",
      lastActive: "2024-03-14",
      status: "active",
      progress: 82,
      fees: "Paid",
      avatar: "JS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@email.com",
      phone: "+91 98765 43212",
      grade: "11th",
      courses: 4,
      enrolledDate: "2024-01-10",
      lastActive: "2024-03-10",
      status: "inactive",
      progress: 45,
      fees: "Pending",
      avatar: "MJ",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.w@email.com",
      phone: "+91 98765 43213",
      grade: "9th",
      courses: 6,
      enrolledDate: "2024-01-05",
      lastActive: "2024-03-15",
      status: "active",
      progress: 91,
      fees: "Paid",
      avatar: "SW",
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom.brown@email.com",
      phone: "+91 98765 43214",
      grade: "10th",
      courses: 2,
      enrolledDate: "2024-03-01",
      lastActive: "2024-03-12",
      status: "new",
      progress: 15,
      fees: "Pending",
      avatar: "TB",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "new":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFeesColor = (fees) => {
    return fees === "Paid" ? "text-green-600" : "text-orange-600";
  };

  return (
    <AdminLayout title="Students Management">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Students Management</h1>
            <p className="text-gray-500 mt-1">
              Manage student enrollment and track progress
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport("students", students)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => handleAddNew("student")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <p className="text-2xl font-bold mt-1">1,234</p>
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% this month
                </p>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Now</p>
                <p className="text-2xl font-bold mt-1">892</p>
                <p className="text-gray-500 text-sm mt-2">72.3% of total</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">New This Month</p>
                <p className="text-2xl font-bold mt-1">156</p>
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.5%
                </p>
              </div>
              <Calendar className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Progress</p>
                <p className="text-2xl font-bold mt-1">68%</p>
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5.2%
                </p>
              </div>
              <Award className="w-10 h-10 text-orange-500" />
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
                placeholder="Search students..."
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
              <option value="inactive">Inactive</option>
              <option value="new">New</option>
            </select>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Student
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Grade
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Courses
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Progress
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Fees
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {student.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-500">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm">{student.grade}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm">{student.courses} courses</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`text-sm font-medium ${getFeesColor(student.fees)}`}
                      >
                        {student.fees}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleView(student.id.toString(), "student")
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() =>
                            handleEdit(student.id.toString(), "student")
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(student.id.toString(), "student")
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
            <div className="space-y-3">
              {students
                .filter((s) => s.progress >= 80)
                .slice(0, 3)
                .map((student, index) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.grade}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{student.progress}%</p>
                      <p className="text-sm text-gray-500">progress</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    John Doe enrolled in Math Course
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Sarah Smith completed Physics module
                  </p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Mike Johnson started Chemistry course
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
