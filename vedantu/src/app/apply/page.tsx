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
  CreditCard,
  Lock,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { emailService } from "@/utils/emailService";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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

interface PaymentData {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

// Course fee map
const COURSE_FEES: Record<string, number> = {
  "Mathematics": 4999,
  "Science": 4999,
  "English": 3999,
  "JEE Preparation": 9999,
  "NEET Preparation": 9999,
  "Foundation Course": 7999,
  "Coding & Programming": 5999,
  "Comprehensive Package": 14999,
};

// Generate a username like BRRuch4821
const generateUsername = (firstName: string): string => {
  const prefix = "BR" + firstName.slice(0, 4).toUpperCase();
  const suffix = Math.floor(1000 + Math.random() * 9000).toString();
  return prefix + suffix;
};

// Generate a random 8-char password
const generatePassword = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export default function StudentApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showGeneratedPassword, setShowGeneratedPassword] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [usernameCopied, setUsernameCopied] = useState(false);
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

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
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
      if (!formData.academicInfo.currentGrade) newErrors.currentGrade = "Grade is required";
      if (!formData.academicInfo.school) newErrors.school = "School name is required";
      if (!formData.academicInfo.board) newErrors.board = "Board is required";
      if (formData.academicInfo.subjects.length === 0) newErrors.subjects = "Select at least one subject";
    } else if (step === 3) {
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
      if (!formData.courseInfo.interestedCourse) newErrors.interestedCourse = "Select a course";
      if (!formData.courseInfo.preferredTiming) newErrors.preferredTiming = "Select preferred timing";
      if (!formData.courseInfo.learningGoals) newErrors.learningGoals = "Learning goals are required";
    } else if (step === 5) {
      if (!paymentData.cardName) newErrors.cardName = "Cardholder name is required";
      if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Enter a valid 16-digit card number";
      }
      if (!paymentData.expiry || !/^\d{2}\/\d{2}$/.test(paymentData.expiry)) {
        newErrors.expiry = "Enter expiry as MM/YY";
      }
      if (!paymentData.cvv || paymentData.cvv.length < 3) {
        newErrors.cvv = "Enter a valid CVV";
      }
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
    const errorKey = field;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: "" }));
    }
  };

  const handlePaymentChange = (field: keyof PaymentData, value: string) => {
    let formatted = value;
    if (field === "cardNumber") {
      formatted = value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim();
    }
    if (field === "expiry") {
      formatted = value.replace(/\D/g, "").slice(0, 4);
      if (formatted.length >= 3) {
        formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
      }
    }
    if (field === "cvv") {
      formatted = value.replace(/\D/g, "").slice(0, 4);
    }
    setPaymentData(prev => ({ ...prev, [field]: formatted }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const generateApplicationId = () => {
    return "APP" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    try {
      const appId = generateApplicationId();
      setApplicationId(appId);

      const username = generateUsername(formData.personalInfo.firstName);
      const password = generatePassword();
      setGeneratedUsername(username);
      setGeneratedPassword(password);

      const courseFee = COURSE_FEES[formData.courseInfo.interestedCourse] || 4999;

      let uid = "";
      try {
        // Create Firebase Auth account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.personalInfo.email,
          password
        );
        uid = userCredential.user.uid;
      } catch (authError: any) {
        if (authError.code === "auth/email-already-in-use") {
          setIsSubmitting(false);
          setErrors({ cardNumber: "This email is already registered. Please sign in instead." });
          return;
        }
        console.warn("Firebase Auth failed, falling back to local prototype mode:", authError);
        uid = "local_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
      }

      const userDataForDb = {
        uid,
        username,
        email: formData.personalInfo.email,
        role: "student",
        // Personal info
        firstName: formData.personalInfo.firstName,
        lastName: formData.personalInfo.lastName,
        name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
        phone: formData.personalInfo.phone,
        dateOfBirth: formData.personalInfo.dateOfBirth,
        address: formData.personalInfo.address,
        city: formData.personalInfo.city,
        state: formData.personalInfo.state,
        pincode: formData.personalInfo.pincode,
        // Academic info
        grade: formData.academicInfo.currentGrade,
        school: formData.academicInfo.school,
        board: formData.academicInfo.board,
        subjects: formData.academicInfo.subjects,
        previousScore: formData.academicInfo.previousScore,
        // Parent info
        parentName: formData.parentInfo.parentName,
        parentPhone: formData.parentInfo.parentPhone,
        parentEmail: formData.parentInfo.parentEmail,
        parentOccupation: formData.parentInfo.parentOccupation,
        // Course info
        interestedCourse: formData.courseInfo.interestedCourse,
        preferredTiming: formData.courseInfo.preferredTiming,
        learningGoals: formData.courseInfo.learningGoals,
        experience: formData.courseInfo.experience,
        // Payment info
        paymentStatus: "paid",
        paymentAmount: courseFee,
        paymentDate: new Date().toISOString(),
        // Meta
        applicationId: appId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        // Save full user document to Firestore `users` collection
        await setDoc(doc(db, "users", uid), userDataForDb);
      } catch (dbError) {
        console.warn("Firestore save failed, proceeding with local only:", dbError);
      }

      // Save to local fallback to ensure login works even without Firebase
      const localStudents = JSON.parse(localStorage.getItem('localStudents') || '[]');
      localStudents.push({
        ...userDataForDb,
        id: uid,
        password: password,
        isLocal: true
      });
      localStorage.setItem('localStudents', JSON.stringify(localStudents));

      // Send confirmation email (best effort)
      try {
        await emailService.sendApplicationConfirmation({
          studentName: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
          studentEmail: formData.personalInfo.email,
          parentEmail: formData.parentInfo.parentEmail,
          applicationId: appId,
          course: formData.courseInfo.interestedCourse,
        });
      } catch (err) {
        console.warn("Email notification failed (non-critical):", err);
      }

      setApplicationSubmitted(true);
    } catch (error: any) {
      console.error("Error during payment/registration:", error);
      setErrors({ cardNumber: "Registration failed due to an unexpected block. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text: string, type: "username" | "password") => {
    await navigator.clipboard.writeText(text);
    if (type === "username") {
      setUsernameCopied(true);
      setTimeout(() => setUsernameCopied(false), 2000);
    } else {
      setPasswordCopied(true);
      setTimeout(() => setPasswordCopied(false), 2000);
    }
  };

  // ─── SUCCESS SCREEN ───────────────────────────────────────────────
  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">You're enrolled! 🎉</h1>
            <p className="text-gray-600 mb-6">
              Payment successful for <span className="font-semibold text-[var(--primary)]">{formData.courseInfo.interestedCourse}</span>.
              Use the credentials below to log in.
            </p>

            {/* Credentials Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6 text-left">
              <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Your Login Credentials (save these!)
              </h2>

              {/* Username */}
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">Username</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 font-mono text-lg font-bold tracking-wider">
                    {generatedUsername}
                  </code>
                  <button
                    onClick={() => copyToClipboard(generatedUsername, "username")}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    {usernameCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Password</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 font-mono text-lg font-bold tracking-wider">
                    {showGeneratedPassword ? generatedPassword : "••••••••"}
                  </code>
                  <button
                    onClick={() => setShowGeneratedPassword(!showGeneratedPassword)}
                    className="p-2 text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg bg-white"
                  >
                    {showGeneratedPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(generatedPassword, "password")}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    {passwordCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <p className="mt-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                ⚠️ Save your password now — it won't be shown again. You can also log in using your email address.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center gap-2 w-full bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Go to Login
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div>
                <Link href="/" className="text-[var(--primary)] hover:underline text-sm">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP CONTENT ─────────────────────────────────────────────────
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
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(g => (
                      <option key={g} value={String(g)}>Grade {g}</option>
                    ))}
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
                {Object.keys(COURSE_FEES).map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              {errors.interestedCourse && <p className="mt-1 text-sm text-red-600">{errors.interestedCourse}</p>}
              {formData.courseInfo.interestedCourse && (
                <p className="mt-2 text-sm font-semibold text-[var(--primary)]">
                  Course Fee: ₹{(COURSE_FEES[formData.courseInfo.interestedCourse] ?? 4999).toLocaleString("en-IN")}
                </p>
              )}
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
                placeholder="Tell us about your learning goals..."
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

      case 5: {
        const courseFee = COURSE_FEES[formData.courseInfo.interestedCourse] ?? 4999;
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Payment</h3>
            <p className="text-gray-500 text-sm mb-4">Complete your enrollment by making the course payment.</p>

            {/* Order Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Order Summary</h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">{formData.courseInfo.interestedCourse}</span>
                <span className="font-semibold text-gray-900">₹{courseFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                <span>Preferred Timing</span>
                <span>{formData.courseInfo.preferredTiming}</span>
              </div>
              <hr className="border-blue-200 my-3" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-[var(--primary)]">₹{courseFee.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Card Details</span>
                <span className="ml-auto text-xs text-green-600 bg-green-50 border border-green-200 rounded px-2 py-0.5 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Secure Demo Payment
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                <input
                  type="text"
                  value={paymentData.cardName}
                  onChange={(e) => handlePaymentChange("cardName", e.target.value)}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                    errors.cardName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Name on card"
                />
                {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent font-mono tracking-wider ${
                      errors.cardNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                  <input
                    type="text"
                    value={paymentData.expiry}
                    onChange={(e) => handlePaymentChange("expiry", e.target.value)}
                    className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                      errors.expiry ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="MM/YY"
                  />
                  {errors.expiry && <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      value={paymentData.cvv}
                      onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                        errors.cvv ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="•••"
                    />
                  </div>
                  {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center">
              🔒 This is a demo payment — no real charge will be made. Enter any dummy card details.
            </p>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const STEP_LABELS = ["Personal Info", "Academic Info", "Parent Info", "Course Info", "Payment"];

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
            <span className="text-3xl font-bold gradient-text">Brilliant Roots</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Application Form</h1>
          <p className="text-gray-600">Join our learning community — Apply in 5 simple steps</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 shrink-0 ${
                    step < currentStep
                      ? "bg-green-500 text-white"
                      : step === currentStep
                      ? "bg-[var(--primary)] text-white ring-4 ring-[var(--primary)]/20"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STEP_LABELS.map(label => (
              <span key={label} className="text-xs text-gray-600 text-center" style={{ width: "20%" }}>{label}</span>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={currentStep === 5 ? handlePaymentSubmit : (e) => { e.preventDefault(); nextStep(); }}>
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

              {currentStep < 5 ? (
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
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Pay ₹{((COURSE_FEES[formData.courseInfo.interestedCourse]) ?? 4999).toLocaleString("en-IN")} & Enroll
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
              <span>Secure enrollment</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Instant credentials</span>
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
