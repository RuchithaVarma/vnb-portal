"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  Mail,
  BookOpen,
  User,
  Key,
  Eye,
  EyeOff,
  Copy,
  LogIn as LoginIcon,
} from "lucide-react";

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

export default function ApplicationStatus() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("id");
  
  const [searchId, setSearchId] = useState(applicationId || "");
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (applicationId) {
      searchApplication(applicationId);
    }
  }, [applicationId]);

  const searchApplication = async (id: string) => {
    if (!id.trim()) {
      setError("Please enter an application ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // In production, this would be an API call
      const storedApplications = JSON.parse(localStorage.getItem("studentApplications") || "[]");
      const foundApplication = storedApplications.find((app: Application) => app.id === id.toUpperCase());

      if (foundApplication) {
        setApplication(foundApplication);
      } else {
        setError("Application not found. Please check your application ID and try again.");
        setApplication(null);
      }
    } catch (error) {
      console.error("Error searching application:", error);
      setError("An error occurred while searching for your application.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchApplication(searchId);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-6 h-6" />;
      case "approved": return <CheckCircle className="w-6 h-6" />;
      case "rejected": return <XCircle className="w-6 h-6" />;
      default: return <AlertCircle className="w-6 h-6" />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "pending":
        return {
          title: "Application Under Review",
          description: "Our team is carefully reviewing your application. This typically takes 2-3 business days."
        };
      case "approved":
        return {
          title: "Application Approved!",
          description: "Congratulations! Your application has been approved. Check your credentials below to login."
        };
      case "rejected":
        return {
          title: "Application Not Approved",
          description: "We're sorry, but your application could not be approved at this time. You may reapply after 30 days."
        };
      default:
        return {
          title: "Unknown Status",
          description: "Please contact support for more information."
        };
    }
  };

  const handleLogin = () => {
    if (application?.credentials) {
      // Store credentials for login
      localStorage.setItem("pendingLogin", JSON.stringify({
        username: application.credentials.username,
        password: application.credentials.password,
        email: application.credentials.email
      }));
      // Redirect to login page
      window.location.href = "/signin";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">Back to Home</span>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Application Status</h1>
              <div></div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Section */}
          {!application && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Application Status</h2>
                <p className="text-gray-600">
                  Enter your application ID to track the status of your admission application
                </p>
              </div>

              <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter Application ID (e.g., APP123XYZ)"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Search Application
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Can't find your application ID? Check your email for the confirmation message.
                </p>
              </div>
            </div>
          )}

          {/* Application Status Display */}
          {application && (
            <div className="space-y-6">
              {/* Status Card */}
              <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border p-8 ${getStatusColor(application.status)}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {getStatusMessage(application.status).title}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {getStatusMessage(application.status).description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Application ID</p>
                    <p className="font-mono font-semibold text-lg">{application.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Submitted</p>
                    <p className="font-semibold">{new Date(application.submittedAt).toLocaleDateString()}</p>
                  </div>
                  {application.reviewedAt && (
                    <div>
                      <p className="text-gray-500">Reviewed</p>
                      <p className="font-semibold">{new Date(application.reviewedAt).toLocaleDateString()}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-semibold capitalize">{application.status}</p>
                  </div>
                </div>
              </div>

              {/* Student Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Student Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Name</label>
                      <p className="font-medium">
                        {application.personalInfo.firstName} {application.personalInfo.lastName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{application.personalInfo.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">{application.personalInfo.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Date of Birth</label>
                      <p className="font-medium">{application.personalInfo.dateOfBirth}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Grade</label>
                      <p className="font-medium">{application.academicInfo.currentGrade}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">School</label>
                      <p className="font-medium">{application.academicInfo.school}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Course</label>
                      <p className="font-medium">{application.courseInfo.interestedCourse}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Preferred Timing</label>
                      <p className="font-medium">{application.courseInfo.preferredTiming}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials Section (for approved applications) */}
              {application.status === "approved" && application.credentials && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      Your Login Credentials
                    </h3>
                    <button
                      onClick={() => setShowCredentials(!showCredentials)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                      {showCredentials ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showCredentials ? "Hide" : "Show"} Credentials
                    </button>
                  </div>

                  {showCredentials && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-blue-800 font-medium">Username</label>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="font-mono text-blue-900">{application.credentials.username}</p>
                              <button
                                onClick={() => copyToClipboard(application.credentials!.username)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm text-blue-800 font-medium">Password</label>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="font-mono text-blue-900">
                                {showPassword ? application.credentials.password : "••••••••"}
                              </p>
                              <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => copyToClipboard(application.credentials!.password)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm text-blue-800 font-medium">Email</label>
                            <p className="text-blue-900 mt-1">{application.credentials.email}</p>
                          </div>
                        </div>
                      </div>

                      {copied && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-sm text-green-600">Copied to clipboard!</p>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={handleLogin}
                          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                          <LoginIcon className="w-4 h-4" />
                          Login to Dashboard
                        </button>
                        <Link
                          href="/"
                          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          Go to Home
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Next Steps */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
                
                {application.status === "pending" && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-3 h-3 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Wait for Review</p>
                        <p className="text-sm text-gray-600">Our admissions team will review your application within 2-3 business days.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Mail className="w-3 h-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Check Your Email</p>
                        <p className="text-sm text-gray-600">You'll receive an email notification when there's an update on your application.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Search className="w-3 h-3 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Track Status</p>
                        <p className="text-sm text-gray-600">You can check your status anytime using your application ID: {application.id}</p>
                      </div>
                    </div>
                  </div>
                )}

                {application.status === "approved" && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Key className="w-3 h-3 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Save Your Credentials</p>
                        <p className="text-sm text-gray-600">Keep your login credentials safe for future access to your student dashboard.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <LoginIcon className="w-3 h-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Login to Dashboard</p>
                        <p className="text-sm text-gray-600">Access your courses, schedule, and learning materials through your student dashboard.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BookOpen className="w-3 h-3 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Start Learning</p>
                        <p className="text-sm text-gray-600">Begin your educational journey with Brilliant Roots!</p>
                      </div>
                    </div>
                  </div>
                )}

                {application.status === "rejected" && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <XCircle className="w-3 h-3 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Application Not Approved</p>
                        <p className="text-sm text-gray-600">We encourage you to review the application requirements and reapply after 30 days.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Mail className="w-3 h-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Contact Support</p>
                        <p className="text-sm text-gray-600">If you have questions about this decision, please contact our admissions team.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setApplication(null);
                    setSearchId("");
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Check Another Application
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
