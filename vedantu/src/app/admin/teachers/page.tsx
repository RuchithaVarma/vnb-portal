"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Edit,
  Loader2,
  ImagePlus,
  X,
  Camera,
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
import { Teacher } from "@/types";


export default function TeachersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const photoFileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [formState, setFormState] = useState<Partial<Teacher>>({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    qualification: "",
    experience: "",
    rating: 0,
    students: 0,
    revenue: 0,
    courses: 0,
    status: "active",
    nextClass: "",
    avatar: "",
    color: "from-blue-500 to-cyan-400",
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      setFormState(selectedTeacher);
      setPhotoPreview((selectedTeacher as any).photo || "");
    } else {
      setFormState({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        qualification: "",
        experience: "",
        rating: 0,
        students: 0,
        revenue: 0,
        courses: 0,
        status: "active",
        nextClass: "",
        avatar: "",
        color: "from-blue-500 to-cyan-400",
      });
      setPhotoPreview("");
    }
  }, [selectedTeacher]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) { height = Math.round((height * MAX_WIDTH) / width); width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width = Math.round((width * MAX_HEIGHT) / height); height = MAX_HEIGHT; }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d")?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setPhotoPreview(dataUrl);
        setFormState((prev) => ({ ...prev, photo: dataUrl } as any));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setPhotoPreview("");
    setFormState((prev) => ({ ...prev, photo: "" } as any));
    if (photoFileInputRef.current) photoFileInputRef.current.value = "";
  };

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const data = await getItems<Teacher>("teachers");
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id?: string) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this teacher?")) {
      try {
        await deleteItem("teachers", id);
        alert("Teacher deleted successfully!");
        fetchTeachers();
      } catch (error) {
        alert("Failed to delete teacher.");
      }
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const initials = formState.name ? formState.name.split(" ").map(n => n[0]).join("") : "T";
    const payload = {
      ...formState,
      students: Number(formState.students),
      revenue: Number(formState.revenue),
      courses: Number(formState.courses),
      rating: Number(formState.rating),
      avatar: initials,
      photo: photoPreview || (formState as any).photo || "",
      joinedDate: formState.joinedDate || new Date().toISOString().split('T')[0],
    };

    setIsSaving(true);
    try {
      if (selectedTeacher?.id) {
        await updateItem("teachers", selectedTeacher.id, payload);
        alert("Teacher updated successfully!");
      } else {
        await addItem("teachers", payload);
        alert("Teacher added successfully!");
      }
      setIsModalOpen(false);
      fetchTeachers();
    } catch (error) {
      alert("Failed to save teacher.");
    } finally {
      setIsSaving(false);
    }
  };

  const stats = {
    totalTeachers: teachers.length,
    activeTeachers: teachers.filter(t => (t.status || "active") === "active").length,
    onLeave: teachers.filter(t => t.status === "on_leave").length,
    inactive: teachers.filter(t => t.status === "inactive").length,
    avgRating: teachers.length > 0 ? (teachers.reduce((acc, t) => acc + (t.rating || 0), 0) / teachers.length).toFixed(1) : "0",
    totalRevenue: teachers.reduce((acc, t) => acc + (t.revenue || 0), 0),
  };

  const getStatusColor = (status: string) => {
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

  const avgRatingNum = Number(stats.avgRating);

  return (
    <AdminLayout title="Teachers Management">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Teachers Management</h1>
            <p className="text-gray-500 mt-1">
              Manage your teaching staff and track their performance {loading && "(Loading...)"}
            </p>
          </div>
          <button
            onClick={() => { setSelectedTeacher(null); setIsModalOpen(true); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
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
                <p className="text-2xl font-bold mt-1">{stats.activeTeachers}</p>
                <p className="text-gray-500 text-sm mt-2">Active</p>
              </div>
              <UserCheck className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold mt-1">{avgRatingNum.toFixed(1)}</p>
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i <= Math.floor(avgRatingNum) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
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
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teachers.map((teacher, idx) => (
            <div
              key={teacher.id || idx}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 overflow-hidden">
                    {(teacher as any).photo ? (
                      <img src={(teacher as any).photo} alt={teacher.name} className="w-full h-full object-cover" />
                    ) : (
                      teacher.avatar || "T"
                    )}
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
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(teacher.status || "active")}`}
                >
                  <span className="ml-1">
                    {(teacher.status || "active").replace("_", " ")}
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{teacher.email || "N/A"}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{teacher.phone || "N/A"}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    {teacher.students || 0} students
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    {teacher.courses || 0} courses
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">{teacher.rating || 0}</span>
                  <span className="text-gray-500 ml-1">rating</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₹{(teacher.revenue || 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">revenue</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Next Class</span>
                  <span className="text-sm font-medium">
                    {teacher.nextClass || "N/A"}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => { setSelectedTeacher(teacher); setIsModalOpen(true); }}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Details
                  </button>
                  <button
                    onClick={() => teacher.id && handleDeleteItem(teacher.id)}
                    className="px-3 py-2 border rounded-lg hover:bg-red-50 text-red-600"
                  >
                    <XCircle className="w-4 h-4" />
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
                <h3 className="text-xl font-bold">{selectedTeacher ? "Edit Teacher" : "Add Teacher"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500">&times;</button>
              </div>
              <form onSubmit={handleSaveItem} className="space-y-4">
                {/* Photo Upload */}
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={photoFileInputRef}
                    onChange={handlePhotoUpload}
                  />
                  <div className="relative">
                    <div
                      onClick={() => photoFileInputRef.current?.click()}
                      className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl cursor-pointer overflow-hidden ring-4 ring-blue-100 hover:ring-blue-300 transition-all"
                    >
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span>{formState.name ? formState.name.split(" ").map(n => n[0]).join("") : "?"}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => photoFileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1.5 hover:bg-blue-700 shadow"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                    {photoPreview && (
                      <button
                        type="button"
                        onClick={clearPhoto}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2 cursor-pointer hover:text-blue-500" onClick={() => photoFileInputRef.current?.click()}>
                    Click to upload photo
                  </p>
                </div>
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
                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                    <input
                      type="text"
                      value={formState.specialization || ""}
                      onChange={(e) => setFormState({ ...formState, specialization: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <input
                      type="text"
                      placeholder="e.g., 5 years"
                      value={formState.experience || ""}
                      onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Students</label>
                    <input
                      type="number"
                      value={formState.students || 0}
                      onChange={(e) => setFormState({ ...formState, students: Number(e.target.value) })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Courses</label>
                    <input
                      type="number"
                      value={formState.courses || 0}
                      onChange={(e) => setFormState({ ...formState, courses: Number(e.target.value) })}
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
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
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
