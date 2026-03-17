"use client";
import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  GraduationCap,
  FileText,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { emailService } from "@/utils/emailService";

interface ApplicationData {
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
}

export default function StudentApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState<ApplicationData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    academicInfo: {
      currentGrade: "",
      school: "",
      board: "",
      subjects: [],
      previousScore: "",
    },
    parentInfo: {
      parentName: "",
      parentPhone: "",
      parentEmail: "",
      parentOccupation: "",
    },
    courseInfo: {
      interestedCourse: "",
      preferredTiming: "",
      learningGoals: "",
      experience: "",
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      // Personal Info Validation
      if (!formData.personalInfo.firstName) newErrors.firstName = "First name is required";
      if (!formData.personalInfo.lastName) newErrors.lastName = "Last name is required";
      if (!formData.personalInfo.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.personalInfo.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.personalInfo.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Phone number must be 10 digits";
      }
      if (!formData.personalInfo.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.personalInfo.address) newErrors.address = "Address is required";
      if (!formData.personalInfo.city) newErrors.city = "City is required";
      if (!formData.personalInfo.state) newErrors.state = "State is required";
      if (!formData.personalInfo.pincode) newErrors.pincode = "Pincode is required";
    } else if (step === 2) {
      // Academic Info Validation
      if (!formData.academicInfo.currentGrade) newErrors.currentGrade = "Grade is required";
      if (!formData.academicInfo.school) newErrors.school = "School name is required";
      if (!formData.academicInfo.board) newErrors.board = "Board is required";
      if (formData.academicInfo.subjects.length === 0) newErrors.subjects = "Select at least one subject";
    } else if (step === 3) {
      // Parent Info Validation
      if (!formData.parentInfo.parentName) newErrors.parentName = "Parent name is required";
      if (!formData.parentInfo.parentPhone) {
        newErrors.parentPhone = "Parent phone is required";
      } else if (!/^\d{10}$/.test(formData.parentInfo.parentPhone.replace(/\D/g, ""))) {
        newErrors.parentPhone = "Phone number must be 10 digits";
      }
      if (!formData.parentInfo.parentEmail) {
        newErrors.parentEmail = "Parent email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.parentInfo.parentEmail)) {
        newErrors.parentEmail = "Parent email is invalid";
      }
    } else if (step === 4) {
      // Course Info Validation
      if (!formData.courseInfo.interestedCourse) newErrors.interestedCourse = "Select a course";
      if (!formData.courseInfo.preferredTiming) newErrors.preferredTiming = "Select preferred timing";
      if (!formData.courseInfo.learningGoals) newErrors.learningGoals = "Learning goals are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (section: keyof ApplicationData, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    // Clear error when user starts typing
    const errorKey = field;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: "" }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const generateApplicationId = () => {
    return "APP" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Generate application ID
      const appId = generateApplicationId();
      setApplicationId(appId);

      // Store application data (in real app, this would be sent to backend/Firebase)
      const application = {
        id: appId,
        ...formData,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      // Store in localStorage for demo (replace with Firebase in production)
      const existingApplications = JSON.parse(localStorage.getItem("studentApplications") || "[]");
      existingApplications.push(application);
      localStorage.setItem("studentApplications", JSON.stringify(existingApplications));

      // Send confirmation email
      try {
        await emailService.sendApplicationConfirmation({
          studentName: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
          studentEmail: formData.personalInfo.email,
          parentEmail: formData.parentInfo.parentEmail,
          applicationId: appId,
          course: formData.courseInfo.interestedCourse
        });
      } catch (error) {
        console.error("Failed to send confirmation email:", error);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setApplicationSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 mb-2">Your Application ID:</p>
              <p className="text-2xl font-bold text-blue-900">{applicationId}</p>
            </div>
            <p className="text-gray-600 mb-8">
              Thank you for your interest! We've received your application and will review it shortly. 
              You can check your application status using the ID above.
            </p>
            <div className="space-y-4">
              <Link
                href={`/application-status?id=${applicationId}`}
                className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Check Application Status
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div>
                <Link href="/" className="text-[var(--primary)] hover:underline">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.personalInfo.firstName}
                    onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter first name"
                  />
                </div>
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="student@email.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="1234567890"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange("personalInfo", "dateOfBirth", e.target.value)}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  value={formData.personalInfo.address}
                  onChange={(e) => handleInputChange("personalInfo", "address", e.target.value)}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={3}
                  placeholder="Enter your complete address"
                />
              </div>
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  value={formData.personalInfo.city}
                  onChange={(e) => handleInputChange("personalInfo", "city", e.target.value)}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="City"
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  value={formData.personalInfo.state}
                  onChange={(e) => handleInputChange("personalInfo", "state", e.target.value)}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="State"
                />
                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                <input
                  type="text"
                  value={formData.personalInfo.pincode}
                  onChange={(e) => handleInputChange("personalInfo", "pincode", e.target.value)}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                    errors.pincode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="123456"
                />
                {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Academic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Grade *</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={formData.academicInfo.currentGrade}
                    onChange={(e) => handleInputChange("academicInfo", "currentGrade", e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.currentGrade ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Grade</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                    <option value="4">Grade 4</option>
                    <option value="5">Grade 5</option>
                    <option value="6">Grade 6</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
                {errors.currentGrade && <p className="mt-1 text-sm text-red-600">{errors.currentGrade}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Name *</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.academicInfo.school}
                    onChange={(e) => handleInputChange("academicInfo", "school", e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.school ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your school name"
                  />
                </div>
                {errors.school && <p className="mt-1 text-sm text-red-600">{errors.school}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Board *</label>
              <select
                value={formData.academicInfo.board}
                onChange={(e) => handleInputChange("academicInfo", "board", e.target.value)}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                  errors.board ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
                <option value="IB">IB</option>
                <option value="Cambridge">Cambridge</option>
                <option value="Other">Other</option>
              </select>
              {errors.board && <p className="mt-1 text-sm text-red-600">{errors.board}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subjects Interested *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Mathematics", "Science", "English", "Social Studies", "Physics", "Chemistry", "Biology", "Computer Science"].map((subject) => (
                  <label key={subject} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.academicInfo.subjects.includes(subject)}
                      onChange={(e) => {
                        const subjects = formData.academicInfo.subjects;
                        if (e.target.checked) {
                          handleInputChange("academicInfo", "subjects", [...subjects, subject]);
                        } else {
                          handleInputChange("academicInfo", "subjects", subjects.filter(s => s !== subject));
                        }
                      }}
                      className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <span className="text-sm text-gray-700">{subject}</span>
                  </label>
                ))}
              </div>
              {errors.subjects && <p className="mt-1 text-sm text-red-600">{errors.subjects}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Previous Academic Score (%)</label>
              <input
                type="text"
                value={formData.academicInfo.previousScore}
                onChange={(e) => handleInputChange("academicInfo", "previousScore", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                placeholder="e.g., 85%"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Parent/Guardian Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.parentInfo.parentName}
                  onChange={(e) => handleInputChange("parentInfo", "parentName", e.target.value)}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                    errors.parentName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter parent/guardian name"
                />
              </div>
              {errors.parentName && <p className="mt-1 text-sm text-red-600">{errors.parentName}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.parentInfo.parentPhone}
                    onChange={(e) => handleInputChange("parentInfo", "parentPhone", e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.parentPhone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="1234567890"
                  />
                </div>
                {errors.parentPhone && <p className="mt-1 text-sm text-red-600">{errors.parentPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.parentInfo.parentEmail}
                    onChange={(e) => handleInputChange("parentInfo", "parentEmail", e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.parentEmail ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="parent@email.com"
                  />
                </div>
                {errors.parentEmail && <p className="mt-1 text-sm text-red-600">{errors.parentEmail}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parent Occupation</label>
              <input
                type="text"
                value={formData.parentInfo.parentOccupation}
                onChange={(e) => handleInputChange("parentInfo", "parentOccupation", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                placeholder="Enter parent occupation"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Preferences</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interested Course *</label>
              <select
                value={formData.courseInfo.interestedCourse}
                onChange={(e) => handleInputChange("courseInfo", "interestedCourse", e.target.value)}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                  errors.interestedCourse ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a course</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="JEE Preparation">JEE Preparation</option>
                <option value="NEET Preparation">NEET Preparation</option>
                <option value="Foundation Course">Foundation Course</option>
                <option value="Coding & Programming">Coding & Programming</option>
                <option value="Comprehensive Package">Comprehensive Package</option>
              </select>
              {errors.interestedCourse && <p className="mt-1 text-sm text-red-600">{errors.interestedCourse}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Timing *</label>
              <select
                value={formData.courseInfo.preferredTiming}
                onChange={(e) => handleInputChange("courseInfo", "preferredTiming", e.target.value)}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                  errors.preferredTiming ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select preferred timing</option>
                <option value="Morning (6AM - 9AM)">Morning (6AM - 9AM)</option>
                <option value="Afternoon (12PM - 3PM)">Afternoon (12PM - 3PM)</option>
                <option value="Evening (4PM - 7PM)">Evening (4PM - 7PM)</option>
                <option value="Night (8PM - 10PM)">Night (8PM - 10PM)</option>
                <option value="Flexible">Flexible</option>
              </select>
              {errors.preferredTiming && <p className="mt-1 text-sm text-red-600">{errors.preferredTiming}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Learning Goals *</label>
              <textarea
                value={formData.courseInfo.learningGoals}
                onChange={(e) => handleInputChange("courseInfo", "learningGoals", e.target.value)}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                  errors.learningGoals ? "border-red-500" : "border-gray-300"
                }`}
                rows={4}
                placeholder="Tell us about your learning goals and what you hope to achieve..."
              />
              {errors.learningGoals && <p className="mt-1 text-sm text-red-600">{errors.learningGoals}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Previous Learning Experience</label>
              <textarea
                value={formData.courseInfo.experience}
                onChange={(e) => handleInputChange("courseInfo", "experience", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                rows={3}
                placeholder="Any previous online learning experience or tutoring?"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[var(--primary)]/20 to-orange-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="text-white" size={28} />
            </div>
            <span className="text-3xl font-bold gradient-text">
              Brilliant Roots
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Student Application Form
          </h1>
          <p className="text-gray-600">
            Join our learning community - Apply in just 4 simple steps
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step <= currentStep
                      ? "bg-[var(--primary)] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-full h-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? "bg-[var(--primary)]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-600">Personal Info</span>
            <span className="text-xs text-gray-600">Academic Info</span>
            <span className="text-xs text-gray-600">Parent Info</span>
            <span className="text-xs text-gray-600">Course Info</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center gap-2"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Secure application</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Quick review</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Expert guidance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
