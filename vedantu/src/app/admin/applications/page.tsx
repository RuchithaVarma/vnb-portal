"use client";
import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  BookOpen,
  GraduationCap,
  User,
  Download,
  Send,
  Key,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";
import { emailService } from "@/utils/emailService";

interface Application {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  academicInfo: {
    currentGrade: string;
    school: string;
    board: string;
    subjects: string[];
    previousScore: string;
  };
  parentInfo: {
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    parentOccupation: string;
  };
  courseInfo: {
    interestedCourse: string;
    preferredTiming: string;
    learningGoals: string;
    experience: string;
  };
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  credentials?: {
    username: string;
    password: string;
    email: string;
  };
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{username: string; password: string; email: string} | null>(null);

  const applicationsPerPage = 10;

  useEffect(() => {
    // Load applications from localStorage (replace with Firebase in production)
    const loadApplications = () => {
      try {
        const storedApplications = JSON.parse(localStorage.getItem("studentApplications") || "[]");
        setApplications(storedApplications);
        setFilteredApplications(storedApplications);
      } catch (error) {
        console.error("Error loading applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
  }, []);

  useEffect(() => {
    // Filter applications based on search and status
    let filtered = applications;

    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.personalInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.personalInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
    setCurrentPage(1);
  }, [applications, searchTerm, statusFilter]);

  const generateCredentials = (application: Application) => {
    // Generate username based on name and random number
    const username = `${application.personalInfo.firstName.toLowerCase()}${application.personalInfo.lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;
    
    // Generate random password
    const password = Math.random().toString(36).slice(-8) + Math.floor(Math.random() * 100);
    
    const credentials = {
      username,
      password,
      email: application.personalInfo.email
    };

    setGeneratedCredentials(credentials);
    return credentials;
  };

  const handleApprove = async (application: Application) => {
    const credentials = generateCredentials(application);
    
    // Update application status and credentials
    const updatedApplications = applications.map(app => {
      if (app.id === application.id) {
        return {
          ...app,
          status: "approved" as const,
          reviewedAt: new Date().toISOString(),
          reviewedBy: "Admin", // Replace with actual admin name
          credentials
        };
      }
      return app;
    });

    setApplications(updatedApplications);
    localStorage.setItem("studentApplications", JSON.stringify(updatedApplications));
    
    // Store credentials for student login
    const existingCredentials = JSON.parse(localStorage.getItem("studentCredentials") || "{}");
    existingCredentials[application.personalInfo.email] = credentials;
    localStorage.setItem("studentCredentials", JSON.stringify(existingCredentials));

    // Send approval email
    try {
      await emailService.sendApprovalEmail({
        studentName: `${application.personalInfo.firstName} ${application.personalInfo.lastName}`,
        studentEmail: application.personalInfo.email,
        parentEmail: application.parentInfo.parentEmail,
        applicationId: application.id,
        course: application.courseInfo.interestedCourse,
        credentials
      });
    } catch (error) {
      console.error("Failed to send approval email:", error);
    }

    setGeneratedCredentials(credentials);
    setShowCredentialModal(true);
  };

  const handleReject = async (application: Application) => {
    const updatedApplications = applications.map(app => {
      if (app.id === application.id) {
        return {
          ...app,
          status: "rejected" as const,
          reviewedAt: new Date().toISOString(),
          reviewedBy: "Admin", // Replace with actual admin name
        };
      }
      return app;
    });

    setApplications(updatedApplications);
    localStorage.setItem("studentApplications", JSON.stringify(updatedApplications));

    // Send rejection email
    try {
      await emailService.sendRejectionEmail({
        studentName: `${application.personalInfo.firstName} ${application.personalInfo.lastName}`,
        studentEmail: application.personalInfo.email,
        parentEmail: application.parentInfo.parentEmail,
        applicationId: application.id,
        course: application.courseInfo.interestedCourse
      });
    } catch (error) {
      console.error("Failed to send rejection email:", error);
    }
    
    setSelectedApplication(null);
  };

  const sendCredentialsEmail = (credentials: {username: string; password: string; email: string}) => {
    // In a real application, this would send an email
    // For demo, we'll just show an alert
    alert(`Credentials sent to ${credentials.email}\n\nUsername: ${credentials.username}\nPassword: ${credentials.password}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "approved": return <CheckCircle className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Pagination
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Applications</h1>
          <p className="text-gray-600">Review and manage student admission applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter(app => app.status === "pending").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === "approved").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {applications.filter(app => app.status === "rejected").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or application ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | "pending" | "approved" | "rejected")}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{application.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {application.personalInfo.firstName} {application.personalInfo.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{application.academicInfo.currentGrade}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.personalInfo.email}</div>
                      <div className="text-sm text-gray-500">{application.personalInfo.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.courseInfo.interestedCourse}</div>
                      <div className="text-sm text-gray-500">{application.courseInfo.preferredTiming}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {application.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(application)}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(application)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {application.status === "approved" && application.credentials && (
                        <button
                          onClick={() => {
                            setGeneratedCredentials(application.credentials!);
                            setShowCredentialModal(true);
                          }}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {indexOfFirstApplication + 1} to {Math.min(indexOfLastApplication, filteredApplications.length)} of{" "}
                {filteredApplications.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedApplication.status)}`}>
                    {getStatusIcon(selectedApplication.status)}
                    {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Applied on {new Date(selectedApplication.submittedAt).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    ID: {selectedApplication.id}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Name</label>
                      <p className="font-medium">
                        {selectedApplication.personalInfo.firstName} {selectedApplication.personalInfo.lastName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{selectedApplication.personalInfo.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">{selectedApplication.personalInfo.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Date of Birth</label>
                      <p className="font-medium">{selectedApplication.personalInfo.dateOfBirth}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-500">Address</label>
                      <p className="font-medium">
                        {selectedApplication.personalInfo.address}, {selectedApplication.personalInfo.city}, {selectedApplication.personalInfo.state} - {selectedApplication.personalInfo.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Current Grade</label>
                      <p className="font-medium">{selectedApplication.academicInfo.currentGrade}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">School</label>
                      <p className="font-medium">{selectedApplication.academicInfo.school}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Board</label>
                      <p className="font-medium">{selectedApplication.academicInfo.board}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Previous Score</label>
                      <p className="font-medium">{selectedApplication.academicInfo.previousScore || "Not specified"}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-500">Subjects</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedApplication.academicInfo.subjects.map((subject) => (
                          <span key={subject} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parent Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Parent/Guardian Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Parent Name</label>
                      <p className="font-medium">{selectedApplication.parentInfo.parentName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Parent Phone</label>
                      <p className="font-medium">{selectedApplication.parentInfo.parentPhone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Parent Email</label>
                      <p className="font-medium">{selectedApplication.parentInfo.parentEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Parent Occupation</label>
                      <p className="font-medium">{selectedApplication.parentInfo.parentOccupation || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                {/* Course Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Course Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Interested Course</label>
                      <p className="font-medium">{selectedApplication.courseInfo.interestedCourse}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Preferred Timing</label>
                      <p className="font-medium">{selectedApplication.courseInfo.preferredTiming}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-500">Learning Goals</label>
                      <p className="font-medium">{selectedApplication.courseInfo.learningGoals}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-500">Previous Experience</label>
                      <p className="font-medium">{selectedApplication.courseInfo.experience || "No previous experience"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {selectedApplication.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        handleReject(selectedApplication);
                        setSelectedApplication(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject Application
                    </button>
                    <button
                      onClick={() => {
                        handleApprove(selectedApplication);
                        setSelectedApplication(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve Application
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Credentials Modal */}
        {showCredentialModal && generatedCredentials && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Student Credentials</h2>
                <p className="text-gray-600 mt-2">Login credentials for the approved student</p>
              </div>

              <div className="p-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-blue-800 font-medium">Username</label>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="font-mono text-blue-900">{generatedCredentials.username}</p>
                        <button
                          onClick={() => navigator.clipboard.writeText(generatedCredentials.username)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-blue-800 font-medium">Password</label>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="font-mono text-blue-900">{generatedCredentials.password}</p>
                        <button
                          onClick={() => navigator.clipboard.writeText(generatedCredentials.password)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-blue-800 font-medium">Email</label>
                      <p className="text-blue-900 mt-1">{generatedCredentials.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-yellow-800 font-medium">Important:</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        Please share these credentials securely with the student. They can use these details to login to their student dashboard.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => sendCredentialsEmail(generatedCredentials)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Email
                  </button>
                  <button
                    onClick={() => setShowCredentialModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
