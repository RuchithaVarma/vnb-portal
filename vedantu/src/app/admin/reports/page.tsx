"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  Award,
  BarChart,
  Search,
  Filter,
  Eye,
  Printer,
  Share2,
  FileDown,
  Clock,
  CheckCircle,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const reports = [
    {
      id: 1,
      name: "Monthly Revenue Report",
      type: "financial",
      period: "March 2024",
      generated: "2024-03-15",
      size: "2.4 MB",
      format: "PDF",
      status: "ready",
    },
    {
      id: 2,
      name: "Student Enrollment Report",
      type: "enrollment",
      period: "Q1 2024",
      generated: "2024-04-01",
      size: "1.8 MB",
      format: "Excel",
      status: "ready",
    },
    {
      id: 3,
      name: "Course Performance Report",
      type: "academic",
      period: "March 2024",
      generated: "2024-03-31",
      size: "3.2 MB",
      format: "PDF",
      status: "generating",
    },
    {
      id: 4,
      name: "Teacher Performance Report",
      type: "performance",
      period: "March 2024",
      generated: "2024-03-31",
      size: "1.5 MB",
      format: "PDF",
      status: "ready",
    },
    {
      id: 5,
      name: "Attendance Report",
      type: "attendance",
      period: "March 2024",
      generated: "2024-04-01",
      size: "980 KB",
      format: "Excel",
      status: "ready",
    },
  ];

  const quickStats = {
    totalReports: 156,
    generatedThisMonth: 24,
    scheduledReports: 8,
    totalDownloads: 892,
  };

  const getReportIcon = (type) => {
    switch (type) {
      case "financial":
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case "enrollment":
        return <Users className="w-5 h-5 text-blue-600" />;
      case "academic":
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      case "performance":
        return <Award className="w-5 h-5 text-yellow-600" />;
      case "attendance":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800";
      case "generating":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout title="Reports Center">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Reports Center</h1>
            <p className="text-gray-500 mt-1">
              Generate and download various reports
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <FileDown className="w-4 h-4 mr-2" />
            Generate New Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Reports</p>
                <p className="text-2xl font-bold mt-1">
                  {quickStats.totalReports}
                </p>
                <p className="text-gray-500 text-sm mt-2">All time</p>
              </div>
              <FileText className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Generated This Month</p>
                <p className="text-2xl font-bold mt-1">
                  {quickStats.generatedThisMonth}
                </p>
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12%
                </p>
              </div>
              <Calendar className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Scheduled</p>
                <p className="text-2xl font-bold mt-1">
                  {quickStats.scheduledReports}
                </p>
                <p className="text-gray-500 text-sm mt-2">Auto-generated</p>
              </div>
              <Clock className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Downloads</p>
                <p className="text-2xl font-bold mt-1">
                  {quickStats.totalDownloads}
                </p>
                <p className="text-gray-500 text-sm mt-2">This month</p>
              </div>
              <Download className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <BarChart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Revenue Report</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Student Report</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Course Report</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Performance</p>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option value="all">All Reports</option>
              <option value="financial">Financial</option>
              <option value="enrollment">Enrollment</option>
              <option value="academic">Academic</option>
              <option value="performance">Performance</option>
            </select>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Report Name
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Type
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Period
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Generated
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Size
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
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        {getReportIcon(report.type)}
                        <div className="ml-3">
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-gray-500">
                            {report.format}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="capitalize text-sm">{report.type}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm">{report.period}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm">{report.generated}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm">{report.size}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {report.status === "ready" && (
                          <>
                            <button
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Download"
                            >
                              <Download className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              className="p-1 hover:bg-gray-100 rounded"
                              title="View"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                          </>
                        )}
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Print"
                        >
                          <Printer className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Scheduled Reports</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium">Monthly Revenue Report</p>
                  <p className="text-sm text-gray-500">
                    Every 1st of the month at 9:00 AM
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Weekly Enrollment Summary</p>
                  <p className="text-sm text-gray-500">
                    Every Monday at 8:00 AM
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
