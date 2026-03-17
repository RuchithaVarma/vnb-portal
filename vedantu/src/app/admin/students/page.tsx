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

import { getItems, addItem, updateItem, deleteItem } from "@/lib/firestoreService";
import { Student } from "@/types";
import { useEffect } from "react";

export default function StudentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formState, setFormState] = useState<Partial<Student>>({
    name: "",
    email: "",
    phone: "",
    grade: "",
    courses: 0,
    status: "new",
    progress: 0,
    fees: "Pending",
    avatar: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      setFormState(selectedStudent);
    } else {
      setFormState({
        name: "",
        email: "",
        phone: "",
        grade: "",
        courses: 0,
        status: "new",
        progress: 0,
        fees: "Pending",
        avatar: "",
      });
    }
  }, [selectedStudent]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getItems<Student>("students");
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id?: string) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteItem("students", id);
        alert("Student deleted successfully!");
        fetchStudents();
      } catch (error) {
        alert("Failed to delete student.");
      }
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formState,
      courses: Number(formState.courses),
      progress: Number(formState.progress),
      avatar: formState.name ? formState.name.split(" ").map(n => n[0]).join("") : "S",
      enrolledDate: formState.enrolledDate || new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
    };

    try {
      if (selectedStudent?.id) {
        await updateItem("students", selectedStudent.id, payload);
        alert("Student updated successfully!");
      } else {
        await addItem("students", payload);
        alert("Student added successfully!");
      }
      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      alert("Failed to save student.");
    }
  };

  const getStatusColor = (status: string) => {
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

  const getFeesColor = (fees: string) => {
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
              Manage student enrollment and track progress {loading && "(Loading...)"}
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
              onClick={() => { setSelectedStudent(null); setIsModalOpen(true); }}
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
                <p className="text-2xl font-bold mt-1">{students.length}</p>
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
                <p className="text-2xl font-bold mt-1">
                  {students.filter(s => (s.status || "active") === "active").length}
                </p>
                <p className="text-gray-500 text-sm mt-2">Active</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">New This Month</p>
                <p className="text-2xl font-bold mt-1">
                  {students.filter(s => s.status === "new").length}
                </p>
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
                <p className="text-2xl font-bold mt-1">
                  {students.length > 0
                    ? Math.round(students.reduce((acc, s) => acc + (s.progress || 0), 0) / students.length)
                    : 0}%
                </p>
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
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Student</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Grade</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Courses</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Progress</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Fees</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student, idx) => (
                  <tr key={student.id || idx} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {student.avatar || "S"}
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.email}</p>
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
                      <span className={`text-sm font-medium ${getFeesColor(student.fees)}`}>
                        {student.fees}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => { setSelectedStudent(student); setIsModalOpen(true); }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => student.id && handleDeleteItem(student.id)}
                          className="p-1 hover:bg-red-50 text-red-600 rounded"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{selectedStudent ? "Edit Student" : "Add Student"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500">&times;</button>
              </div>
              <form onSubmit={handleSaveItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name || ""}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email || ""}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      value={formState.phone || ""}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Grade</label>
                    <input
                      type="text"
                      value={formState.grade || ""}
                      onChange={(e) => setFormState({ ...formState, grade: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={formState.status || "new"}
                      onChange={(e) => setFormState({ ...formState, status: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                      <option value="new">New</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fees</label>
                    <select
                      value={formState.fees || "Pending"}
                      onChange={(e) => setFormState({ ...formState, fees: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
                    <input
                      type="number"
                      max="100"
                      value={formState.progress || 0}
                      onChange={(e) => setFormState({ ...formState, progress: Number(e.target.value) })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
