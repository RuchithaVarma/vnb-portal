"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  BookOpen,
  Play,
  Award,
  Target,
  Brain,
  Heart,
  Stethoscope,
  Microscope,
  ChevronRight,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export default function NEETCoursePage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: "overview", name: "Overview", icon: <Target size={16} /> },
    { id: "courses", name: "Courses", icon: <BookOpen size={16} /> },
    { id: "faculty", name: "Faculty", icon: <Award size={16} /> },
    { id: "results", name: "Results", icon: <TrendingUp size={16} /> },
    { id: "features", name: "Features", icon: <CheckCircle size={16} /> },
  ];

  const courses = [
    {
      id: 1,
      title: "NEET Complete Course - 2 Years",
      duration: "24 months",
      price: 89999,
      originalPrice: 129999,
      rating: 4.9,
      students: 15420,
      level: "Comprehensive",
      features: [
        "Live Classes",
        "Doubt Resolution",
        "Test Series",
        "Study Material",
      ],
      description: "Complete NEET preparation with 2-year intensive program",
    },
    {
      id: 2,
      title: "NEET Crash Course - 6 Months",
      duration: "6 months",
      price: 34999,
      originalPrice: 49999,
      rating: 4.8,
      students: 8934,
      level: "Intensive",
      features: [
        "Rapid Revision",
        "Mock Tests",
        "Previous Year Papers",
        "Expert Guidance",
      ],
      description:
        "Fast-track NEET preparation for quick revision and practice",
    },
    {
      id: 3,
      title: "NEET Foundation Course - 1 Year",
      duration: "12 months",
      price: 59999,
      originalPrice: 84999,
      rating: 4.7,
      students: 11234,
      level: "Foundation",
      features: [
        "Concept Building",
        "Regular Tests",
        "Performance Analysis",
        "Study Material",
      ],
      description: "Build strong foundation for NEET with systematic approach",
    },
  ];

  const faculty = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      subject: "Biology",
      experience: "15+ years",
      qualification: "MBBS, MD",
      students: 50000,
      rating: 4.9,
      image: "/api/placeholder/200/200",
      specialization: "Human Anatomy & Physiology",
    },
    {
      id: 2,
      name: "Prof. Ramesh Kumar",
      subject: "Physics",
      experience: "20+ years",
      qualification: "M.Sc., Ph.D.",
      students: 45000,
      rating: 4.8,
      image: "/api/placeholder/200/200",
      specialization: "Medical Physics & Biophysics",
    },
    {
      id: 3,
      name: "Dr. Anita Desai",
      subject: "Chemistry",
      experience: "18+ years",
      qualification: "M.Sc., Ph.D.",
      students: 42000,
      rating: 4.9,
      image: "/api/placeholder/200/200",
      specialization: "Organic & Inorganic Chemistry",
    },
  ];

  const results = [
    { year: "2024", totalSelections: 12450, air1: 3, top100: 47, top500: 156 },
    { year: "2023", totalSelections: 10890, air1: 2, top100: 38, top500: 142 },
    { year: "2022", totalSelections: 9876, air1: 1, top100: 35, top500: 128 },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="text-green-600" size={24} />
                  <h3 className="font-bold text-gray-900">Expert Faculty</h3>
                </div>
                <p className="text-3xl font-bold text-green-600 mb-1">50+</p>
                <p className="text-sm text-gray-600">Medical Experts</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="text-blue-600" size={24} />
                  <h3 className="font-bold text-gray-900">Success Rate</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600 mb-1">87%</p>
                <p className="text-sm text-gray-600">Selection Rate</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-purple-600" size={24} />
                  <h3 className="font-bold text-gray-900">Top Rankers</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600 mb-1">156</p>
                <p className="text-sm text-gray-600">AIR &lt; 500</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-orange-600" size={24} />
                  <h3 className="font-bold text-gray-900">Students</h3>
                </div>
                <p className="text-3xl font-bold text-orange-600 mb-1">50K+</p>
                <p className="text-sm text-gray-600">Trained Successfully</p>
              </div>
            </div>

            {/* Course Highlights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose Brilliant Roots for NEET?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Microscope className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Comprehensive Syllabus Coverage
                    </h4>
                    <p className="text-gray-600">
                      Complete NEET syllabus with focus on Physics, Chemistry,
                      and Biology as per latest NMC guidelines
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Medical Expert Faculty
                    </h4>
                    <p className="text-gray-600">
                      Learn from doctors and medical professionals who
                      understand NEET requirements
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Visual Learning
                    </h4>
                    <p className="text-gray-600">
                      3D animations, diagrams, and visual aids for complex
                      biological concepts
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Test Series
                    </h4>
                    <p className="text-gray-600">
                      Regular mock tests and previous year question papers
                      practice
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "courses":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">NEET Courses</h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Filter size={20} />
                  Filter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-32 bg-gradient-to-br from-green-400 to-emerald-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain className="text-white/40" size={64} />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star
                          className="text-yellow-500 fill-current"
                          size={16}
                        />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {course.features.map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          ₹{course.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          ₹{course.originalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <Link href="/register" className="block text-center w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "faculty":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Expert Faculty
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculty.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                      <span className="text-white text-2xl font-bold">
                        {teacher.name.charAt(0)}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {teacher.name}
                    </h4>
                    <p className="text-green-600 font-semibold mb-2">
                      {teacher.subject}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {teacher.qualification}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {teacher.experience} experience
                    </p>
                    <p className="text-xs text-gray-600 mb-3">
                      {teacher.specialization}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Star
                          className="text-yellow-500 fill-current"
                          size={16}
                        />
                        <span className="font-medium">{teacher.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{teacher.students.toLocaleString()}</span>
                      </div>
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "results":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Results
            </h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {results.map((result) => (
                  <div key={result.year} className="text-center">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                      {result.year} Results
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-3xl font-bold text-green-600">
                          {result.totalSelections.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Total Selections
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <p className="text-xl font-bold text-orange-600">
                            {result.air1}
                          </p>
                          <p className="text-xs text-gray-600">AIR 1</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-blue-600">
                            {result.top100}
                          </p>
                          <p className="text-xs text-gray-600">Top 100</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-purple-600">
                            {result.top500}
                          </p>
                          <p className="text-xs text-gray-600">Top 500</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Our NEET Achievements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span className="text-gray-700">
                      3 AIR 1 Rankers in last 3 years
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span className="text-gray-700">
                      120+ students in Top 100
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span className="text-gray-700">
                      400+ students in Top 500
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span className="text-gray-700">
                      33,000+ total selections
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "features":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Course Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-green-600" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Live Interactive Classes
                  </h4>
                </div>
                <p className="text-gray-600">
                  &quot;The trial class was amazing! The teacher explained
                  concepts so clearly and made learning fun.&quot; Real-time
                  interaction with faculty, instant doubt resolution, and peer
                  learning opportunities.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="text-blue-600" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Test Series
                  </h4>
                </div>
                <p className="text-gray-600">
                  Chapter-wise tests, mock tests, and previous year papers with
                  detailed performance analysis.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Brain className="text-purple-600" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Study Material
                  </h4>
                </div>
                <p className="text-gray-600">
                  Comprehensive notes, question banks, and visual learning
                  materials for all subjects.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Award className="text-orange-600" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Personal Mentorship
                  </h4>
                </div>
                <p className="text-gray-600">
                  One-on-one guidance, study planning, and regular progress
                  monitoring.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Brain size={32} />
              <h1 className="text-4xl md:text-5xl font-bold">
                NEET Preparation Course
              </h1>
            </div>
            <p className="text-xl mb-8 text-white/90">
              Crack NEET with India&apos;s best medical faculty. Comprehensive
              preparation for Physics, Chemistry, and Biology.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Book FREE Trial
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 py-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedTab === tab.id
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        {renderContent()}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your NEET Preparation Today!
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of successful NEET aspirants. Book your free trial
            class now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Book FREE Trial Class
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors">
              Talk to NEET Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
