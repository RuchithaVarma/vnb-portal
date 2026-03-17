"use client";

import React, { useState, useEffect } from "react";
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
} from "@/utils/adminHandlers";
import { getItems, addItem, updateItem, deleteItem } from "@/lib/firestoreService";
import { Course } from "@/types";

export default function CoursesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formState, setFormState] = useState<Partial<Course>>({
    title: "",
    color: "from-blue-500 to-purple-600",
    grades: "",
    features: [],
    duration: "",
    price: 0,
    enrolled: 0,
    rating: 0,
    image: "",
  });
  const [featuresInput, setFeaturesInput] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setFormState(selectedCourse);
      setFeaturesInput(selectedCourse.features.join("\n"));
    } else {
      setFormState({
        title: "",
        color: "from-blue-500 to-purple-600",
        grades: "",
        features: [],
        duration: "",
        price: 0,
        enrolled: 0,
        rating: 0,
        image: "",
      });
      setFeaturesInput("");
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getItems<Course>("courses");
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id?: string) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteItem("courses", id);
        alert("Course deleted successfully!");
        fetchCourses();
      } catch (error) {
        alert("Failed to delete course.");
      }
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFeatures = featuresInput.split("\n").filter((f) => f.trim() !== "");
    const payload = {
      ...formState,
      features: updatedFeatures,
      price: Number(formState.price),
      enrolled: Number(formState.enrolled),
      rating: Number(formState.rating),
    };

    try {
      if (selectedCourse?.id) {
        await updateItem("courses", selectedCourse.id, payload);
        alert("Course updated successfully!");
      } else {
        await addItem("courses", payload);
        alert("Course added successfully!");
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch (error) {
      alert("Failed to save course.");
    }
  };

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
              Manage course content and track performance {loading && "(Loading...)"}
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
              onClick={() => { setSelectedCourse(null); setIsModalOpen(true); }}
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
                <p className="text-2xl font-bold mt-1">{courses.length}</p>
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
                <p className="text-2xl font-bold mt-1">
                  {courses.filter(c => (c.status || "active") === "active").length}
                </p>
                <p className="text-gray-500 text-sm mt-2">Active</p>
              </div>
              <PlayCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <p className="text-2xl font-bold mt-1">
                  {courses.reduce((acc, c) => acc + (c.students || 0), 0).toLocaleString()}
                </p>
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
                <div className={`w-48 h-32 bg-gradient-to-r ${course.color || "from-blue-500 to-purple-600"} flex items-center justify-center`}>
                  <BookOpen className="w-16 h-16 text-white" />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.grades}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(course.status || "active")}`}
                    >
                      <span className="ml-1">{course.status || "active"}</span>
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    by {course.instructor || "Unassigned"}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{course.students || 0} students</span>
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
                      {course.completedLessons || 0}/{course.lessons || 0} lessons
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    Revenue: ₹{(course.revenue || 0).toLocaleString()}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => { setSelectedCourse(course); setIsModalOpen(true); }}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleDeleteItem(course.id)}
                    className="px-3 py-2 border rounded-lg hover:bg-red-50 text-red-600"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{selectedCourse ? "Edit Course" : "Add Course"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500">&times;</button>
              </div>
              <form onSubmit={handleSaveItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course Title</label>
                  <input
                    type="text"
                    required
                    value={formState.title || ""}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Grades</label>
                    <input
                      type="text"
                      placeholder="e.g., Class 11-12"
                      value={formState.grades || ""}
                      onChange={(e) => setFormState({ ...formState, grades: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g., 12 months"
                      value={formState.duration || ""}
                      onChange={(e) => setFormState({ ...formState, duration: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={formState.price || 0}
                      onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Enrolled</label>
                    <input
                      type="number"
                      value={formState.enrolled || 0}
                      onChange={(e) => setFormState({ ...formState, enrolled: Number(e.target.value) })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      max="5"
                      value={formState.rating || 0}
                      onChange={(e) => setFormState({ ...formState, rating: Number(e.target.value) })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Color Variant</label>
                  <select
                    value={formState.color || "from-blue-500 to-purple-600"}
                    onChange={(e) => setFormState({ ...formState, color: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="from-blue-500 to-purple-600">Blue-Purple</option>
                    <option value="from-red-400 to-pink-500">Red-Pink</option>
                    <option value="from-yellow-400 to-orange-500">Yellow-Orange</option>
                    <option value="from-green-400 to-teal-500">Green-Teal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Features (One per line)</label>
                  <textarea
                    rows={3}
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Live Classes&#10;Doubt Solving"
                  />
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
