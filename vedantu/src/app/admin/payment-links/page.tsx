"use client";

import React, { useState, useEffect } from "react";
import {
  Link,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Copy,
  Mail,
  MessageSquare,
  QrCode,
  Download,
  Trash2,
  Eye,
  Edit,
  Ban,
  RefreshCw,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import PaymentLinkGenerator from "@/components/PaymentLinkGenerator";
import {
  getCoursePaymentLinks,
  deactivatePaymentLink,
  PaymentLinkData,
} from "@/lib/paymentLinks";
import { getLocalCourses } from "@/lib/localData";

export default function PaymentLinksManagement() {
  const [links, setLinks] = useState<PaymentLinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedLink, setSelectedLink] = useState<PaymentLinkData | null>(
    null,
  );

  const courses = getLocalCourses();

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      // For now, fetch all links. In production, you might want to filter
      const allLinks: PaymentLinkData[] = [];

      // Mock data for demonstration
      const mockLinks: PaymentLinkData[] = [
        {
          id: "pl_123456789",
          courseId: "vedic-maths",
          courseName: "Vedic Mathematics Complete Course",
          amount: 9999,
          currency: "INR",
          expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          maxUses: 1,
          currentUses: 0,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          customMessage: "Welcome to our Vedic Maths course!",
          createdBy: "admin_1",
        },
        {
          id: "pl_987654321",
          courseId: "phonics",
          courseName: "Phonics for Beginners",
          amount: 7999,
          currency: "INR",
          expiryDate: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          maxUses: 5,
          currentUses: 2,
          isActive: true,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          createdBy: "admin_1",
        },
      ];

      setLinks(mockLinks);
    } catch (error) {
      console.error("Error fetching payment links:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse =
      selectedCourse === "all" || link.courseId === selectedCourse;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && link.isActive) ||
      (selectedStatus === "inactive" && !link.isActive) ||
      (selectedStatus === "expired" &&
        link.expiryDate &&
        new Date(link.expiryDate) < new Date());

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getPaymentUrl = (linkId: string) => {
    return `${window.location.origin}/pay/${linkId}`;
  };

  const getStatusColor = (link: PaymentLinkData) => {
    if (!link.isActive) return "text-gray-500";
    if (link.expiryDate && new Date(link.expiryDate) < new Date())
      return "text-red-500";
    if (link.maxUses && link.currentUses >= link.maxUses)
      return "text-orange-500";
    return "text-green-500";
  };

  const getStatusIcon = (link: PaymentLinkData) => {
    if (!link.isActive) return <Ban className="w-4 h-4" />;
    if (link.expiryDate && new Date(link.expiryDate) < new Date())
      return <AlertCircle className="w-4 h-4" />;
    if (link.maxUses && link.currentUses >= link.maxUses)
      return <AlertCircle className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getStatusText = (link: PaymentLinkData) => {
    if (!link.isActive) return "Inactive";
    if (link.expiryDate && new Date(link.expiryDate) < new Date())
      return "Expired";
    if (link.maxUses && link.currentUses >= link.maxUses)
      return "Usage Limit Reached";
    return "Active";
  };

  const formatTimeRemaining = (expiryDate?: string) => {
    if (!expiryDate) return "No expiry";

    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h ${Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))}m`;
  };

  const stats = {
    totalLinks: links.length,
    activeLinks: links.filter((l) => l.isActive).length,
    totalRevenue: links.reduce((sum, l) => sum + l.amount * l.currentUses, 0),
    conversionRate:
      links.length > 0
        ? (
            (links.filter((l) => l.currentUses > 0).length / links.length) *
            100
          ).toFixed(1)
        : "0",
  };

  if (showGenerator) {
    return (
      <AdminLayout title="Create Payment Link">
        <div className="p-6">
          <button
            onClick={() => setShowGenerator(false)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            ← Back to Links
          </button>
          <PaymentLinkGenerator
            courseId={selectedLink?.courseId || courses[0]?.id || ""}
            courseName={selectedLink?.courseName || courses[0]?.title || ""}
            amount={selectedLink?.amount || courses[0]?.price || 0}
            onCreateLink={(newLink) => {
              setShowGenerator(false);
              fetchLinks();
            }}
          />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Payment Links Management">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Payment Links</h1>
            <p className="text-gray-500 mt-1">
              Create and manage payment links for quick enrollment
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedLink(null);
              setShowGenerator(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Link
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Links</p>
                <p className="text-2xl font-bold mt-1">{stats.totalLinks}</p>
              </div>
              <Link className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Links</p>
                <p className="text-2xl font-bold mt-1">{stats.activeLinks}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Revenue Generated</p>
                <p className="text-2xl font-bold mt-1">
                  ₹{(stats.totalRevenue / 100000).toFixed(1)}L
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.conversionRate}%
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-orange-500" />
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
                placeholder="Search links..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">
                      Link Details
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">
                      Course
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">
                      Amount
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">
                      Usage
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">
                      Expires In
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLinks.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-8 text-center text-gray-500"
                      >
                        No payment links found
                      </td>
                    </tr>
                  ) : (
                    filteredLinks.map((link) => (
                      <tr key={link.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-sm font-mono">
                              {link.id}
                            </p>
                            <p className="text-xs text-gray-500">
                              Created{" "}
                              {new Date(link.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-sm">
                              {link.courseName}
                            </p>
                            {link.customMessage && (
                              <p
                                className="text-xs text-gray-500 truncate max-w-[200px]"
                                title={link.customMessage}
                              >
                                {link.customMessage}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-semibold">
                            ₹{link.amount.toLocaleString()}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="text-sm">
                              {link.currentUses} / {link.maxUses || "∞"}
                            </p>
                            {link.maxUses && (
                              <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                                <div
                                  className="h-2 bg-blue-500 rounded-full"
                                  style={{
                                    width: `${(link.currentUses / link.maxUses) * 100}%`,
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div
                            className={`flex items-center gap-2 ${getStatusColor(link)}`}
                          >
                            {getStatusIcon(link)}
                            <span className="text-sm font-medium">
                              {getStatusText(link)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>{formatTimeRemaining(link.expiryDate)}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                copyToClipboard(getPaymentUrl(link.id))
                              }
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Copy Link"
                            >
                              <Copy className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() =>
                                window.open(getPaymentUrl(link.id), "_blank")
                              }
                              className="p-1 hover:bg-gray-100 rounded"
                              title="View Link"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedLink(link);
                                setShowGenerator(true);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Create Similar"
                            >
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            {!link.isActive && (
                              <button
                                onClick={() => {
                                  if (
                                    confirm(
                                      "Are you sure you want to deactivate this link?",
                                    )
                                  ) {
                                    deactivatePaymentLink(link.id).then(
                                      fetchLinks,
                                    );
                                  }
                                }}
                                className="p-1 hover:bg-gray-100 rounded"
                                title="Deactivate"
                              >
                                <Ban className="w-4 h-4 text-red-600" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
