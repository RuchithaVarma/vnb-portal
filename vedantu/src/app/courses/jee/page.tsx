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
  Calculator,
  Atom,
  ChevronRight,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export default function JEECoursePage() {
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
      title: "JEE Main & Advanced - 2 Years",
      duration: "24 months",
      price: 99999,
      originalPrice: 149999,
      rating: 4.9,
      students: 18420,
      level: "Comprehensive",
      features: [
        "Live Classes",
        "Doubt Resolution",
        "Test Series",
        "Study Material",
      ],
      description: "Complete JEE preparation with 2-year intensive program",
    },
    {
      id: 2,
      title: "JEE Crash Course - 3 Months",
      duration: "3 months",
      price: 29999,
      originalPrice: 44999,
      rating: 4.8,
      students: 7934,
      level: "Intensive",
      features: [
        "Rapid Revision",
        "Mock Tests",
        "Previous Year Papers",
        "Expert Guidance",
      ],
      description: "Fast-track JEE preparation for quick revision and practice",
    },
    {
      id: 3,
      title: "JEE Foundation Course - 1 Year",
      duration: "12 months",
      price: 69999,
      originalPrice: 99999,
      rating: 4.7,
      students: 13234,
      level: "Foundation",
      features: [
        "Concept Building",
        "Regular Tests",
        "Performance Analysis",
        "Study Material",
      ],
      description: "Build strong foundation for JEE with systematic approach",
    },
  ];

  const faculty = [
    {
      id: 1,
      name: "Prof. Ashok Kumar",
      subject: "Physics",
      experience: "20+ years",
      qualification: "M.Sc., Ph.D. (IIT)",
      students: 60000,
      rating: 4.9,
      specialization: "Mechanics & Electrodynamics",
    },
    {
      id: 2,
      name: "Dr. Ravi Singh",
      subject: "Chemistry",
      experience: "18+ years",
      qualification: "M.Sc., Ph.D.",
      students: 55000,
      rating: 4.8,
      specialization: "Organic & Physical Chemistry",
    },
    {
      id: 3,
      name: "Prof. Neha Sharma",
      subject: "Mathematics",
      experience: "22+ years",
      qualification: "M.Sc., Ph.D. (IIT)",
      students: 58000,
      rating: 4.9,
      specialization: "Calculus & Algebra",
    },
  ];

  const results = [
    { year: "2024", totalSelections: 18450, air1: 5, top100: 67, top500: 234 },
    { year: "2023", totalSelections: 15890, air1: 3, top100: 58, top500: 198 },
    { year: "2022", totalSelections: 13476, air1: 2, top100: 52, top500: 176 },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="text-blue-600" size={24} />
                  <h3 className="font-bold text-gray-900">Expert Faculty</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600 mb-1">60+</p>
                <p className="text-sm text-gray-600">IIT Alumni</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="text-orange-600" size={24} />
                  <h3 className="font-bold text-gray-900">Success Rate</h3>
                </div>
                <p className="text-3xl font-bold text-orange-600 mb-1">92%</p>
                <p className="text-sm text-gray-600">Selection Rate</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-purple-600" size={24} />
                  <h3 className="font-bold text-gray-900">Top Rankers</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600 mb-1">234</p>
                <p className="text-sm text-gray-600">AIR &lt; 500</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-green-600" size={24} />
                  <h3 className="font-bold text-gray-900">Students</h3>
                </div>
                <p className="text-3xl font-bold text-green-600 mb-1">75K+</p>
                <p className="text-sm text-gray-600">Trained Successfully</p>
              </div>
            </div>

            {/* Course Highlights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose Brilliant Roots for JEE?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Atom className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Comprehensive Syllabus Coverage
                    </h4>
                    <p className="text-gray-600">
                      Complete JEE Main & Advanced syllabus with focus on
                      Physics, Chemistry, and Mathematics
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calculator className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      IIT Alumni Faculty
                    </h4>
                    <p className="text-gray-600">
                      Learn from IIT graduates who understand JEE patterns and
                      requirements
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Problem-Solving Approach
                    </h4>
                    <p className="text-gray-600">
                      Focus on conceptual clarity and problem-solving techniques
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="text-green-600" size={24} />
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
              <h3 className="text-2xl font-bold text-gray-900">JEE Courses</h3>
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
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                  <div className="h-32 bg-gradient-to-br from-blue-400 to-indigo-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Atom className="text-white/40" size={64} />
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
                            className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
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

                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Enroll Now
                    </button>
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
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4">
                      <span className="text-white text-2xl font-bold">
                        {teacher.name.charAt(0)}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {teacher.name}
                    </h4>
                    <p className="text-blue-600 font-semibold mb-2">
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
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
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
                        <p className="text-3xl font-bold text-blue-600">
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
                          <p className="text-xl font-bold text-purple-600">
                            {result.top100}
                          </p>
                          <p className="text-xs text-gray-600">Top 100</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-green-600">
                            {result.top500}
                          </p>
                          <p className="text-xs text-gray-600">Top 500</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Our JEE Achievements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-blue-600" size={24} />
                    <span className="text-gray-700">
                      10 AIR 1 Rankers in last 3 years
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-blue-600" size={24} />
                    <span className="text-gray-700">
                      177+ students in Top 100
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-blue-600" size={24} />
                    <span className="text-gray-700">
                      608+ students in Top 500
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-blue-600" size={24} />
                    <span className="text-gray-700">
                      48,000+ total selections
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
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-blue-600" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Live Interactive Classes
                  </h4>
                </div>
                <p className="text-gray-600">
                  Real-time interaction with faculty, instant doubt resolution,
                  and peer learning opportunities.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Target className="text-orange-600" size={24} />
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
                  Comprehensive notes, question banks, and problem-solving
                  techniques for all subjects.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="text-green-600" size={24} />
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Atom size={32} />
              <h1 className="text-4xl md:text-5xl font-bold">
                JEE Preparation Course
              </h1>
            </div>
            <p className="text-xl mb-8 text-white/90">
              Crack JEE Main & Advanced with India&apos;s best engineering
              faculty. Comprehensive preparation for Physics, Chemistry, and
              Mathematics.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedTab === tab.id
                    ? "bg-blue-600 text-white"
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your JEE Preparation Today!
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of successful JEE aspirants. Book your free trial
            class now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Book FREE Trial Class
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors">
              Talk to JEE Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
