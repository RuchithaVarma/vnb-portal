"use client";

import React, { useState } from "react";
import {
  BarChart,
  PieChart,
  DollarSign,
  Users,
  BookOpen,
  Activity,
  Download,
  ArrowUp,
  ArrowDown,
  Minus,
  Star,
  Clock,
  Target,
  PlayCircle,
  Award,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const metrics = {
    revenue: {
      current: 2456789,
      previous: 2078901,
      growth: 18.2,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    students: {
      current: 12456,
      previous: 10987,
      growth: 13.4,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    courses: {
      current: 156,
      previous: 142,
      growth: 9.9,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    engagement: {
      current: 78.5,
      previous: 74.2,
      growth: 5.8,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  };

  const coursePerformance = [
    {
      name: "Mathematics Advanced",
      students: 1234,
      completion: 85,
      revenue: 234567,
      rating: 4.8,
    },
    {
      name: "Physics Fundamentals",
      students: 987,
      completion: 78,
      revenue: 198765,
      rating: 4.6,
    },
    {
      name: "Chemistry Basics",
      students: 756,
      completion: 92,
      revenue: 154321,
      rating: 4.7,
    },
    {
      name: "Biology Masterclass",
      students: 543,
      completion: 88,
      revenue: 123456,
      rating: 4.9,
    },
    {
      name: "English Literature",
      students: 432,
      completion: 76,
      revenue: 98765,
      rating: 4.4,
    },
  ];

  const topPerformers = {
    teachers: [
      {
        name: "Dr. Rajesh Kumar",
        students: 1234,
        revenue: 234567,
        rating: 4.9,
      },
      {
        name: "Prof. Sarah Williams",
        students: 987,
        revenue: 198765,
        rating: 4.8,
      },
      { name: "Dr. Michael Chen", students: 756, revenue: 154321, rating: 4.7 },
    ],
    students: [
      { name: "John Doe", courses: 5, completed: 4, score: 95 },
      { name: "Jane Smith", courses: 4, completed: 4, score: 92 },
      { name: "Mike Johnson", courses: 6, completed: 5, score: 89 },
    ],
  };

  const engagementMetrics = [
    { metric: "Daily Active Users", value: "3,456", change: 12.5, trend: "up" },
    {
      metric: "Avg. Session Duration",
      value: "45 min",
      change: -5.2,
      trend: "down",
    },
    {
      metric: "Course Completion Rate",
      value: "78.5%",
      change: 8.3,
      trend: "up",
    },
    {
      metric: "Video Watch Time",
      value: "12,345 hrs",
      change: 15.7,
      trend: "up",
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <ArrowDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <AdminLayout title="Analytics Dashboard">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Track your platform performance and insights
            </p>
          </div>
          <div className="flex space-x-2">
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(metrics).map(([key, metric]) => {
            const icons: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
              revenue: DollarSign,
              students: Users,
              courses: BookOpen,
              engagement: Activity,
            };
            const Icon = icons[key];

            return (
              <div key={key} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${metric.bgColor} rounded-lg`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <span
                    className={`flex items-center text-sm font-medium ${metric.color}`}
                  >
                    {metric.growth > 0 ? "+" : ""}
                    {metric.growth}%
                    {metric.growth > 0 ? (
                      <ArrowUp className="w-4 h-4 ml-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 ml-1" />
                    )}
                  </span>
                </div>
                <h3 className="text-2xl font-bold">
                  {key === "revenue"
                    ? `₹${metric.current.toLocaleString()}`
                    : key === "engagement"
                      ? `${metric.current}%`
                      : metric.current.toLocaleString()}
                </h3>
                <p className="text-gray-500 text-sm mt-1 capitalize">{key}</p>
                <p className="text-gray-400 text-xs mt-2">
                  from{" "}
                  {key === "revenue"
                    ? `₹${metric.previous.toLocaleString()}`
                    : key === "engagement"
                      ? `${metric.previous}%`
                      : metric.previous.toLocaleString()}{" "}
                  last period
                </p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Revenue Trend</h3>
              <div className="flex space-x-2">
                {["revenue", "students", "courses"].map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      selectedMetric === metric
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <BarChart className="w-16 h-16 text-gray-400" />
              <p className="ml-4 text-gray-500">Revenue Chart Visualization</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Course Categories</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <PieChart className="w-16 h-16 text-gray-400" />
              <p className="ml-4 text-gray-500">Category Distribution</p>
            </div>
          </div>
        </div>

        {/* Course Performance Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">Course Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Course Name</th>
                  <th className="text-left py-3 px-4">Students</th>
                  <th className="text-left py-3 px-4">Completion Rate</th>
                  <th className="text-left py-3 px-4">Revenue</th>
                  <th className="text-left py-3 px-4">Rating</th>
                  <th className="text-left py-3 px-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {coursePerformance.map((course, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{course.name}</td>
                    <td className="py-3 px-4">
                      {course.students.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${course.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{course.completion}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      ₹{course.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1">{course.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center text-green-600">
                        <ArrowUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">+15%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Engagement Metrics & Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Engagement Metrics</h3>
            <div className="space-y-4">
              {engagementMetrics.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      {index === 0 && (
                        <Users className="w-5 h-5 text-blue-600" />
                      )}
                      {index === 1 && (
                        <Clock className="w-5 h-5 text-blue-600" />
                      )}
                      {index === 2 && (
                        <Target className="w-5 h-5 text-blue-600" />
                      )}
                      {index === 3 && (
                        <PlayCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.metric}</p>
                      <p className="text-sm text-gray-500">Last 30 days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold mr-3">
                      {item.value}
                    </span>
                    <div
                      className={`flex items-center ${getTrendColor(item.trend)}`}
                    >
                      {getTrendIcon(item.trend)}
                      <span className="text-sm ml-1">
                        {item.change > 0 ? "+" : ""}
                        {item.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Top Performers</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-3">Teachers</p>
                <div className="space-y-2">
                  {topPerformers.teachers.map((teacher, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
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
                <p className="text-sm text-gray-500 mb-3">Students</p>
                <div className="space-y-2">
                  {topPerformers.students.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                          {index + 1}
                        </span>
                        <span className="text-sm">{student.name}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {student.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Real-time Activity</h3>
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                user: "John Doe",
                action: "Enrolled in Mathematics Advanced",
                time: "2 min ago",
                type: "enrollment",
              },
              {
                user: "Jane Smith",
                action: "Completed Physics Quiz",
                time: "5 min ago",
                type: "completion",
              },
              {
                user: "Mike Johnson",
                action: "Started Chemistry Basics",
                time: "8 min ago",
                type: "start",
              },
              {
                user: "Sarah Williams",
                action: "Rated Biology Masterclass",
                time: "12 min ago",
                type: "rating",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      activity.type === "enrollment"
                        ? "bg-blue-100"
                        : activity.type === "completion"
                          ? "bg-green-100"
                          : activity.type === "start"
                            ? "bg-yellow-100"
                            : "bg-purple-100"
                    }`}
                  >
                    {activity.type === "enrollment" && (
                      <Users className="w-4 h-4 text-blue-600" />
                    )}
                    {activity.type === "completion" && (
                      <Award className="w-4 h-4 text-green-600" />
                    )}
                    {activity.type === "start" && (
                      <PlayCircle className="w-4 h-4 text-yellow-600" />
                    )}
                    {activity.type === "rating" && (
                      <Star className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
