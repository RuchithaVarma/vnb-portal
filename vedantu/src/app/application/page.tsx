"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Calendar,
  BookOpen,
  Clock,
  CreditCard,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import testFirestoreConnection from "@/lib/test-firestore";

export default function ApplicationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  // Test Firestore connection on mount
  useEffect(() => {
    console.log("Application form mounted - testing Firestore connection...");
    testFirestoreConnection();
  }, []);

  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    grade: "",

    // Step 2: Course Selection
    course: "",
    preferredTiming: "",

    // Step 3: Parent/Guardian Information
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    parentOccupation: "",

    // Step 4: Additional Information
    address: "",
    city: "",
    state: "",
    postalCode: "",
    previousSchool: "",
    reasonForJoining: "",
    howDidYouHear: "",

    // Step 5: Payment
    paymentMethod: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const courses = [
    { value: "", label: "Select Course" },
    { value: "mathematics", label: "Mathematics (Class 1-12)" },
    { value: "science", label: "Science (Physics, Chemistry, Biology)" },
    { value: "english", label: "English Language & Literature" },
    { value: "vedic-maths", label: "Vedic Mathematics" },
    { value: "phonics", label: "Phonics for Kids" },
    { value: "abacus", label: "Abacus Training" },
    { value: "jee", label: "JEE Preparation" },
    { value: "neet", label: "NEET Preparation" },
    { value: "coding", label: "Coding for Kids" },
    { value: "telugu", label: "Telugu Language" },
  ];

  const timings = [
    { value: "", label: "Preferred Timing" },
    { value: "morning", label: "Morning (6 AM - 12 PM)" },
    { value: "afternoon", label: "Afternoon (12 PM - 5 PM)" },
    { value: "evening", label: "Evening (5 PM - 9 PM)" },
    { value: "weekend", label: "Weekend Only" },
    { value: "flexible", label: "Flexible Timing" },
  ];

  const grades = [
    { value: "", label: "Select Grade" },
    { value: "1", label: "Grade 1" },
    { value: "2", label: "Grade 2" },
    { value: "3", label: "Grade 3" },
    { value: "4", label: "Grade 4" },
    { value: "5", label: "Grade 5" },
    { value: "6", label: "Grade 6" },
    { value: "7", label: "Grade 7" },
    { value: "8", label: "Grade 8" },
    { value: "9", label: "Grade 9" },
    { value: "10", label: "Grade 10" },
    { value: "11", label: "Grade 11" },
    { value: "12", label: "Grade 12" },
    { value: "jee", label: "JEE Preparation" },
    { value: "neet", label: "NEET Preparation" },
  ];

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Phone number must be 10 digits";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!formData.grade) newErrors.grade = "Please select your grade";
    }

    if (step === 2) {
      if (!formData.course) newErrors.course = "Please select a course";
      if (!formData.preferredTiming)
        newErrors.preferredTiming = "Please select preferred timing";
    }

    if (step === 3) {
      if (!formData.parentName)
        newErrors.parentName = "Parent name is required";
      if (!formData.parentPhone) {
        newErrors.parentPhone = "Parent phone is required";
      } else if (!/^\d{10}$/.test(formData.parentPhone.replace(/\D/g, ""))) {
        newErrors.parentPhone = "Phone number must be 10 digits";
      }
      if (formData.parentEmail && !/\S+@\S+\.\S+/.test(formData.parentEmail)) {
        newErrors.parentEmail = "Parent email is invalid";
      }
    }

    if (step === 4) {
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
    }

    if (step === 5) {
      if (!formData.paymentMethod)
        newErrors.paymentMethod = "Please select payment method";
      if (!formData.agreeToTerms)
        newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Debug: Show what data we have before validation
    console.log("Current form data:", formData);

    if (!validateStep(5)) {
      console.error("Validation failed:", errors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Prepare all user data including application details
      const userData = {
        // Basic authentication info
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        grade: formData.grade,

        // Course information
        course: formData.course,
        preferredTiming: formData.preferredTiming,

        // Parent information
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        parentEmail: formData.parentEmail,
        parentOccupation: formData.parentOccupation,

        // Address information
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,

        // Additional information
        previousSchool: formData.previousSchool,
        reasonForJoining: formData.reasonForJoining,
        howDidYouHear: formData.howDidYouHear,

        // Payment information
        paymentMethod: formData.paymentMethod,
        paymentStatus: "pending",
        paymentAmount: getCourseFee(formData.course),
        paymentDate: null,

        // Application status
        applicationStatus: "submitted",
        applicationDate: new Date().toISOString(),
      };

      // Debug: Log the data being sent
      console.log("Submitting application with data:", userData);

      const result = await signup(userData);

      if (result.success) {
        console.log("Application submitted successfully");
        alert("Application submitted successfully!");
        router.push("/application-success");
      } else {
        console.error("Application submission failed:", result.error);
        setErrors({
          general:
            result.error || "Application submission failed. Please try again.",
        });
      }
    } catch (error: unknown) {
      console.error("Submit error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // ... (rest of the code remains the same)
  const getCourseFee = (course: string) => {
    const fees: { [key: string]: number } = {
      mathematics: 5000,
      science: 6000,
      english: 4000,
      "vedic-maths": 3000,
      phonics: 2500,
      abacus: 3500,
      jee: 10000,
      neet: 12000,
      coding: 4500,
      telugu: 3000,
    };
    return fees[course] || 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step
                  ? "bg-[var(--primary)] text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>
            {step < 5 && (
              <div
                className={`w-full h-1 mx-2 ${
                  currentStep > step ? "bg-[var(--primary)]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Personal Info</span>
        <span>Course</span>
        <span>Parent Info</span>
        <span>Address</span>
        <span>Payment</span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="9876543210"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="student@brilliantroots.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grade/Class *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all appearance-none ${
              errors.grade ? "border-red-500" : "border-gray-300"
            }`}
          >
            {grades.map((grade) => (
              <option key={grade.value} value={grade.value}>
                {grade.label}
              </option>
            ))}
          </select>
        </div>
        {errors.grade && (
          <p className="mt-1 text-sm text-red-600">{errors.grade}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Course Selection
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Course *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BookOpen className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all appearance-none ${
              errors.course ? "border-red-500" : "border-gray-300"
            }`}
          >
            {courses.map((course) => (
              <option key={course.value} value={course.value}>
                {course.label}
              </option>
            ))}
          </select>
        </div>
        {errors.course && (
          <p className="mt-1 text-sm text-red-600">{errors.course}</p>
        )}
        {formData.course && (
          <p className="mt-2 text-sm text-gray-600">
            Course Fee: ₹{getCourseFee(formData.course)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Timing *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="preferredTiming"
            value={formData.preferredTiming}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all appearance-none ${
              errors.preferredTiming ? "border-red-500" : "border-gray-300"
            }`}
          >
            {timings.map((timing) => (
              <option key={timing.value} value={timing.value}>
                {timing.label}
              </option>
            ))}
          </select>
        </div>
        {errors.preferredTiming && (
          <p className="mt-1 text-sm text-red-600">{errors.preferredTiming}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Parent/Guardian Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parent/Guardian Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                errors.parentName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Parent's full name"
            />
          </div>
          {errors.parentName && (
            <p className="mt-1 text-sm text-red-600">{errors.parentName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parent Phone *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                errors.parentPhone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="9876543210"
            />
          </div>
          {errors.parentPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.parentPhone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parent Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                errors.parentEmail ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="parent@email.com"
            />
          </div>
          {errors.parentEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.parentEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parent Occupation
          </label>
          <input
            type="text"
            name="parentOccupation"
            value={formData.parentOccupation}
            onChange={handleChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            placeholder="e.g., Engineer, Doctor, Teacher"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Address Information
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your complete address"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your city"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
              errors.state ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your state"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            placeholder="PIN code"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Previous School
        </label>
        <input
          type="text"
          name="previousSchool"
          value={formData.previousSchool}
          onChange={handleChange}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
          placeholder="Name of previous school (if any)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How did you hear about us?
        </label>
        <select
          name="howDidYouHear"
          value={formData.howDidYouHear}
          onChange={handleChange}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
        >
          <option value="">Select an option</option>
          <option value="google">Google Search</option>
          <option value="social">Social Media</option>
          <option value="friend">Friend/Referral</option>
          <option value="advertisement">Advertisement</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reason for joining
        </label>
        <textarea
          name="reasonForJoining"
          value={formData.reasonForJoining}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
          placeholder="Tell us why you want to join Brilliant Roots"
        />
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Payment Information
      </h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Course Fee Details</h3>
        <p className="text-blue-800">
          Selected Course:{" "}
          {courses.find((c) => c.value === formData.course)?.label ||
            "Not selected"}
        </p>
        <p className="text-2xl font-bold text-blue-900 mt-2">
          Total Fee: ₹{getCourseFee(formData.course)}
        </p>
        <p className="text-sm text-blue-700 mt-1">
          Payment status will be updated after successful payment
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Payment Method *
        </label>
        <div className="space-y-3">
          {[
            {
              value: "online",
              label: "Online Payment (Credit/Debit Card, UPI)",
              icon: CreditCard,
            },
            { value: "bank", label: "Bank Transfer", icon: CreditCard },
            { value: "cash", label: "Cash at Center", icon: CreditCard },
          ].map((method) => (
            <label
              key={method.value}
              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                checked={formData.paymentMethod === method.value}
                onChange={handleChange}
                className="mr-3"
              />
              <method.icon className="h-5 w-5 text-gray-400 mr-2" />
              <span>{method.label}</span>
            </label>
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
          />
          <span className="text-sm text-gray-600">
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-[var(--primary)] hover:underline"
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-[var(--primary)] hover:underline"
            >
              Privacy Policy
            </Link>
            . I understand that my admission is subject to verification and
            payment of fees.
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
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
            Application Form
          </h1>
          <p className="text-gray-600">
            Fill in your details to start your learning journey
          </p>
        </div>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step Content */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
