"use client";
import Link from "next/link";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  User,
  LogOut,
  BookOpen,
  Settings,
  Award,
  GraduationCap,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        coursesRef.current &&
        !coursesRef.current.contains(event.target as Node)
      ) {
        setIsCoursesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const courses = [
    {
      category: "Academic",
      icon: <GraduationCap size={20} />,
      items: [
        {
          name: "Class 7 & 8",
          href: "/courses?category=academic",
          description: "Concept clarity and skill development",
        },
        {
          name: "Class 5 & 6",
          href: "/courses?category=academic",
          description: "Foundation building for young learners",
        },
        {
          name: "Class 3 & 4",
          href: "/courses?category=academic",
          description: "Basic arithmetic and interactive reading",
        },
      ],
    },
    {
      category: "Skills & Logic",
      icon: <Sparkles size={20} />,
      items: [
        {
          name: "Vedic Maths",
          href: "/courses?category=skill",
          description: "Master speed calculation tricks",
        },
        {
          name: "Phonics",
          href: "/courses?category=skill",
          description: "Reading fluency and pronunciation",
        },
        {
          name: "Abacus",
          href: "/courses?category=skill",
          description: "Mental arithmetic and concentration",
        },
      ],
    },
    {
      category: "Languages",
      icon: <Award size={20} />,
      items: [
        {
          name: "Telugu Basics",
          href: "/courses?category=languages",
          description: "Learn Telugu from scratch",
        },
        {
          name: "Telugu Advanced",
          href: "/courses?category=languages",
          description: "Advanced grammar and essay writing",
        },
      ],
    },
    {
      category: "Competitive Exams",
      icon: <Award size={20} />,
      items: [
        {
          name: "Olympiad Exams Preparation",
          href: "/courses?category=competitive",
          description: "Competitive preparation for young achievers",
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 relative overflow-hidden rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/logo.jpeg"
                alt="Brilliant Roots Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-2xl font-bold gradient-text">Brilliant Roots</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Courses Dropdown */}
            <div className="relative" ref={coursesRef}>
              <button
                onMouseEnter={() => setIsCoursesOpen(true)}
                className="flex items-center gap-1 text-gray-700 hover:text-[var(--primary)] font-medium transition-colors cursor-pointer"
              >
                Courses{" "}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isCoursesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Courses Dropdown Menu */}
              {isCoursesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-lg shadow-xl border border-gray-200 p-6 animate-fadeIn"
                  onMouseEnter={() => setIsCoursesOpen(true)}
                  onMouseLeave={() => setIsCoursesOpen(false)}
                >
                  <div className="grid grid-cols-4 gap-6">
                    {courses.map((category, index) => (
                      <div key={index}>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="text-[var(--primary)]">
                            {category.icon}
                          </div>
                          <h3 className="font-semibold text-gray-900">
                            {category.category}
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              href={item.href}
                              className="block group cursor-pointer"
                              onClick={() => setIsCoursesOpen(false)}
                            >
                              <div className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <p className="font-medium text-gray-800 group-hover:text-[var(--primary)] transition-colors">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom section */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Need Help Choosing?
                        </h4>
                        <p className="text-sm text-gray-600">
                          Get expert guidance from our counselors
                        </p>
                      </div>
                      <Link
                        href="/counseling"
                       className="btn-primary text-sm cursor-pointer"
                      >
                        Talk to Expert
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/kids"
              className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors relative group cursor-pointer"
            >
              Courses for Kids
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/materials"
              className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors relative group cursor-pointer"
            >
              Free Study Material
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors relative group cursor-pointer"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/counseling" className="flex items-center gap-2 text-[var(--primary)] font-semibold hover:scale-105 transition-transform cursor-pointer">
             <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-full flex items-center justify-center animate-pulse">
                <Phone size={16} className="text-white" />
              </div>
              <span className="text-sm">Talk to Experts</span>
            </Link>

            {isAuthenticated ? (
              /* User Profile Dropdown */
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-200 cursor-pointer"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-full flex items-center justify-center">
                    {user?.name ? (
                      <span className="text-white text-xs font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <User size={14} className="text-white" />
                    )}
                  </div>
                  <span className="font-medium text-gray-700 text-sm">
                    {user?.name || "User"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <BookOpen size={14} />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/courses"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Award size={14} />
                        <span>My Courses</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings size={14} />
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full cursor-pointer"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Auth Buttons */
              <>
                <Link
                  href="/signin"
                  className="px-4 py-2 border-2 border-[var(--primary)] text-[var(--primary)] rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 hover:scale-105 cursor-pointer text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/trial"
                  className="btn-primary cursor-pointer text-sm px-4 py-2"
                >
                  Book FREE Trial
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-700 hover:text-[var(--primary)] transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t pt-4 pb-4 animate-fadeIn">
            <nav className="flex flex-col gap-3">
              <Link
                href="/courses"
                className="text-gray-700 font-medium hover:text-[var(--primary)] transition-colors cursor-pointer"
              >
                Courses
              </Link>
              <Link
                href="/kids"
                className="text-gray-700 font-medium hover:text-[var(--primary)] transition-colors cursor-pointer"
              >
                Courses for Kids
              </Link>
              <Link
                href="/materials"
                className="text-gray-700 font-medium hover:text-[var(--primary)] transition-colors cursor-pointer"
              >
                Free Study Material
              </Link>

              <Link
                href="/contact"
                className="text-gray-700 font-medium hover:text-[var(--primary)] transition-colors cursor-pointer"
              >
                Contact Us
              </Link>

              {/* Mobile Auth Section */}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-center px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="text-center px-4 py-2 border-2 border-[var(--primary)] text-[var(--primary)] rounded-lg font-semibold hover:bg-orange-50 transition-colors cursor-pointer"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/trial"
                      className="text-center btn-primary cursor-pointer"
                    >
                      Book FREE Trial
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
