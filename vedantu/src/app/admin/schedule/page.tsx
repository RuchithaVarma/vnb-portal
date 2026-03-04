"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Users,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Edit,
  Trash2,
  Eye,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  MoreVertical,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

export default function ScheduleManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("week");
  const [searchTerm, setSearchTerm] = useState("");

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  const classes = [
    {
      id: 1,
      title: "Mathematics - Calculus Basics",
      teacher: "Dr. Rajesh Kumar",
      students: 45,
      time: "10:00 AM",
      duration: "60 min",
      date: "2024-03-16",
      status: "scheduled",
      type: "live",
      platform: "Zoom",
      link: "https://zoom.us/j/123456789",
      reminder: true,
    },
    {
      id: 2,
      title: "Physics - Quantum Mechanics",
      teacher: "Prof. Sarah Williams",
      students: 32,
      time: "02:00 PM",
      duration: "90 min",
      date: "2024-03-16",
      status: "live",
      type: "live",
      platform: "Google Meet",
      link: "https://meet.google.com/abc-defg-hij",
      reminder: true,
    },
    {
      id: 3,
      title: "Chemistry Lab Session",
      teacher: "Dr. Michael Chen",
      students: 28,
      time: "04:00 PM",
      duration: "120 min",
      date: "2024-03-16",
      status: "completed",
      type: "lab",
      platform: "On-site",
      link: "Room 301, Science Building",
      reminder: false,
    },
    {
      id: 4,
      title: "Biology - Human Anatomy",
      teacher: "Prof. Emily Johnson",
      students: 38,
      time: "11:00 AM",
      duration: "60 min",
      date: "2024-03-17",
      status: "scheduled",
      type: "recorded",
      platform: "YouTube",
      link: "https://youtube.com/watch?v=example",
      reminder: true,
    },
    {
      id: 5,
      title: "English Literature Discussion",
      teacher: "Dr. James Wilson",
      students: 25,
      time: "03:00 PM",
      duration: "45 min",
      date: "2024-03-17",
      status: "cancelled",
      type: "discussion",
      platform: "Teams",
      link: "https://teams.microsoft.com/meeting",
      reminder: false,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "live":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "live":
        return <Video className="w-4 h-4" />;
      case "lab":
        return <BookOpen className="w-4 h-4" />;
      case "recorded":
        return <PlayCircle className="w-4 h-4" />;
      case "discussion":
        return <Users className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const renderCalendarView = () => {
    const days = getDaysInMonth(selectedDate);
    const today = new Date().getDate();
    const currentMonth = selectedDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">{currentMonth}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                setSelectedDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() - 1,
                  ),
                )
              }
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50"
            >
              Today
            </button>
            <button
              onClick={() =>
                setSelectedDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() + 1,
                  ),
                )
              }
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700"
            >
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
              className={`bg-white p-3 min-h-[100px] ${
                day === today ? "bg-blue-50" : ""
              } ${day ? "hover:bg-gray-50" : ""}`}
            >
              {day && (
                <>
                  <div
                    className={`text-sm font-medium ${
                      day === today ? "text-blue-600" : "text-gray-900"
                    }`}
                  >
                    {day}
                  </div>
                  {day === 16 && (
                    <div className="mt-1 space-y-1">
                      <div className="text-xs p-1 bg-blue-100 text-blue-700 rounded truncate">
                        Math Class
                      </div>
                      <div className="text-xs p-1 bg-green-100 text-green-700 rounded truncate">
                        Physics Lab
                      </div>
                    </div>
                  )}
                  {day === 17 && (
                    <div className="mt-1 space-y-1">
                      <div className="text-xs p-1 bg-purple-100 text-purple-700 rounded truncate">
                        Biology
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const currentWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - date.getDay() + i + 1);
      return date;
    });

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-8 gap-px bg-gray-200">
          <div className="bg-gray-50 p-4"></div>
          {weekDays.map((day, index) => (
            <div key={index} className="bg-gray-50 p-4 text-center">
              <p className="text-sm font-medium text-gray-700">
                {weekDays[index]}
              </p>
              <p className="text-lg font-bold text-gray-900">{day.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((slot) => (
            <div key={slot} className="grid grid-cols-8 gap-px bg-gray-200">
              <div className="bg-white p-4 text-sm text-gray-500 text-center">
                {slot}
              </div>
              {weekDays.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-white p-2 min-h-[60px]">
                  {dayIndex === 1 && slot === "10:00 AM" && (
                    <div className="text-xs p-2 bg-blue-100 text-blue-700 rounded h-full">
                      <p className="font-medium truncate">Mathematics</p>
                      <p className="text-xs">Dr. Rajesh</p>
                    </div>
                  )}
                  {dayIndex === 1 && slot === "02:00 PM" && (
                    <div className="text-xs p-2 bg-green-100 text-green-700 rounded h-full">
                      <p className="font-medium truncate">Physics</p>
                      <p className="text-xs">Prof. Sarah</p>
                    </div>
                  )}
                  {dayIndex === 2 && slot === "11:00 AM" && (
                    <div className="text-xs p-2 bg-purple-100 text-purple-700 rounded h-full">
                      <p className="font-medium truncate">Biology</p>
                      <p className="text-xs">Prof. Emily</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => (
    <div className="space-y-4">
      {classes.map((classItem) => (
        <div
          key={classItem.id}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                {getTypeIcon(classItem.type)}
                <h3 className="font-semibold text-lg ml-2">
                  {classItem.title}
                </h3>
                <span
                  className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem.status)}`}
                >
                  {classItem.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {classItem.teacher}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {classItem.time} ({classItem.duration})
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {classItem.students} students
                </div>
                <div className="flex items-center text-gray-600">
                  <Video className="w-4 h-4 mr-2" />
                  {classItem.platform}
                </div>
              </div>

              <div className="mt-3 flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-600">{classItem.date}</span>
                {classItem.reminder && (
                  <span className="ml-4 flex items-center text-blue-600">
                    <Bell className="w-4 h-4 mr-1" />
                    Reminder set
                  </span>
                )}
              </div>
            </div>

            <div className="flex space-x-2 ml-4">
              {classItem.status === "scheduled" && (
                <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center">
                  <PlayCircle className="w-4 h-4 mr-1" />
                  Start
                </button>
              )}
              {classItem.status === "live" && (
                <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  End
                </button>
              )}
              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 border rounded-lg hover:bg-gray-50 text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {classItem.link && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-600">{classItem.link}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Join Class
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderDayView = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
        <div className="space-y-4">
          {timeSlots.map((slot) => (
            <div
              key={slot}
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="w-20 text-sm font-medium text-gray-600">
                {slot}
              </div>
              <div className="flex-1 ml-4">
                {slot === "10:00 AM" && (
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <p className="font-medium">Mathematics - Calculus Basics</p>
                    <p className="text-sm text-gray-600">Dr. Rajesh Kumar</p>
                  </div>
                )}
                {slot === "02:00 PM" && (
                  <div className="p-3 bg-green-100 rounded-lg">
                    <p className="font-medium">Physics - Quantum Mechanics</p>
                    <p className="text-sm text-gray-600">
                      Prof. Sarah Williams
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStats = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Classes</p>
              <p className="text-2xl font-bold mt-1">24</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Today's Classes</p>
              <p className="text-2xl font-bold mt-1">6</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold mt-1">5</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout title="Schedule Management">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Schedule Management</h1>
            <p className="text-gray-500 mt-1">
              Manage classes, sessions, and timetables
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Class
          </button>
        </div>

        {/* View Toggle */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex space-x-2">
              {["day", "week", "month", "list"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    viewMode === mode
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {mode} View
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Render Selected View */}
        {viewMode === "day" && renderDayView()}
        {viewMode === "month" && renderCalendarView()}
        {viewMode === "week" && renderWeekView()}
        {viewMode === "list" && renderListView()}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Today's Classes</p>
                <p className="text-2xl font-bold mt-1">8</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Live Now</p>
                <p className="text-2xl font-bold mt-1">2</p>
              </div>
              <Video className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <p className="text-2xl font-bold mt-1">234</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-2xl font-bold mt-1">5</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
