"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Search,
  Filter,
  Download,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  RefreshCw,
  FileText,
  MoreVertical,
  ArrowUp,
  Users,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import {
  handleExport,
  handleRefund,
  handleView,
  handlePrint,
} from "@/utils/adminHandlers";

export default function PaymentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  const transactions = [
    {
      id: "TXN001",
      student: "John Doe",
      email: "john.doe@email.com",
      course: "Mathematics Advanced",
      amount: 9999,
      currency: "INR",
      status: "completed",
      method: "Credit Card",
      date: "2024-03-15",
      time: "10:30 AM",
      transactionId: "txn_123456789",
      invoice: "INV-2024-001",
    },
    {
      id: "TXN002",
      student: "Jane Smith",
      email: "jane.smith@email.com",
      course: "Physics Fundamentals",
      amount: 8999,
      currency: "INR",
      status: "pending",
      method: "UPI",
      date: "2024-03-15",
      time: "09:15 AM",
      transactionId: "txn_123456790",
      invoice: "INV-2024-002",
    },
    {
      id: "TXN003",
      student: "Mike Johnson",
      email: "mike.j@email.com",
      course: "Chemistry Basics",
      amount: 7999,
      currency: "INR",
      status: "failed",
      method: "Net Banking",
      date: "2024-03-14",
      time: "04:45 PM",
      transactionId: "txn_123456791",
      invoice: "INV-2024-003",
    },
    {
      id: "TXN004",
      student: "Sarah Williams",
      email: "sarah.w@email.com",
      course: "Biology Masterclass",
      amount: 10999,
      currency: "INR",
      status: "completed",
      method: "Debit Card",
      date: "2024-03-14",
      time: "02:30 PM",
      transactionId: "txn_123456792",
      invoice: "INV-2024-004",
    },
    {
      id: "TXN005",
      student: "Tom Brown",
      email: "tom.brown@email.com",
      course: "English Literature",
      amount: 6999,
      currency: "INR",
      status: "refunded",
      method: "Credit Card",
      date: "2024-03-13",
      time: "11:00 AM",
      transactionId: "txn_123456793",
      invoice: "INV-2024-005",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      case "refunded":
        return <RefreshCw className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const stats = {
    totalRevenue: 2456789,
    completedPayments: 1234,
    pendingPayments: 56,
    failedPayments: 12,
    refundedAmount: 98765,
    avgTransactionValue: 8456,
  };

  return (
    <AdminLayout title="Payments Management">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Payments Management</h1>
            <p className="text-gray-500 mt-1">
              Track transactions and manage payments
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport("payments", transactions)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
            <button
              onClick={() => alert("Opening refund request form...")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Refund Request
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">
                  ₹{(stats.totalRevenue / 100000).toFixed(1)}L
                </p>
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +18.5%
                </p>
              </div>
              <Wallet className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.completedPayments}
                </p>
                <p className="text-gray-500 text-sm mt-2">95.4% success rate</p>
              </div>
              <CheckCircle className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.pendingPayments}
                </p>
                <p className="text-yellow-600 text-sm mt-2">Needs attention</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Transaction</p>
                <p className="text-2xl font-bold mt-1">
                  ₹{stats.avgTransactionValue.toLocaleString()}
                </p>
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +5.2%
                </p>
              </div>
              <ShoppingCart className="w-10 h-10 text-purple-500" />
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
                placeholder="Search transactions..."
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
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
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Transaction ID
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Student
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Course
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Method
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Date & Time
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-sm">{transaction.id}</p>
                        <p className="text-xs text-gray-500">
                          {transaction.invoice}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium">{transaction.student}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm">{transaction.course}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium">
                        ₹{transaction.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm">{transaction.method}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(transaction.status)}`}
                      >
                        {getStatusIcon(transaction.status)}
                        <span className="ml-1">{transaction.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm">{transaction.date}</p>
                        <p className="text-xs text-gray-500">
                          {transaction.time}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(transaction.id, "payment")}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handlePrint(transaction.id, "payment")}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <FileText className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => {
                            if (transaction.status === "completed") {
                              handleRefund(transaction.id, transaction.amount);
                            } else {
                              alert("Only completed payments can be refunded");
                            }
                          }}
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

        {/* Payment Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">45%</p>
                  <p className="text-sm text-gray-500">₹1.1M</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 text-green-600 mr-3" />
                  <span className="font-medium">UPI</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">35%</p>
                  <p className="text-sm text-gray-500">₹860K</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="font-medium">Net Banking</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">20%</p>
                  <p className="text-sm text-gray-500">₹491K</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Refunds</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Tom Brown</p>
                  <p className="text-sm text-gray-500">English Literature</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">-₹6,999</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Alice Cooper</p>
                  <p className="text-sm text-gray-500">Mathematics Advanced</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">-₹9,999</p>
                  <p className="text-sm text-gray-500">5 days ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Bob Martin</p>
                  <p className="text-sm text-gray-500">Physics Fundamentals</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">-₹8,999</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
