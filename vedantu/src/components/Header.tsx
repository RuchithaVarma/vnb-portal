"use client";
import Link from 'next/link';
import { Phone, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with animation */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-3xl font-bold gradient-text">Vedantu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-[var(--primary)] font-medium transition-colors">
                Courses <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
            </div>
            <Link href="/kids" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors relative group">
              Courses for Kids
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/materials" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors relative group">
              Free Study Material
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/centres" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors relative group">
              Offline Centres
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-[var(--primary)] font-semibold hover:scale-105 transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-full flex items-center justify-center animate-pulse">
                <Phone size={18} className="text-white" />
              </div>
              <span>Talk to our experts</span>
            </div>
            <Link href="/signin" className="px-6 py-2 border-2 border-[var(--primary)] text-[var(--primary)] rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 hover:scale-105">
              Sign In
            </Link>
            <Link href="/trial" className="btn-primary">
              Book FREE Trial
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gray-700 hover:text-[var(--primary)] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu with animation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4 animate-fadeIn">
            <nav className="flex flex-col gap-4">
              <Link href="/courses" className="text-gray-700 font-medium hover:text-[var(--primary)] transition-colors">Courses</Link>
              <Link href="/kids" className="text-gray-700 font-medium hover:text-[var(--primary)] transition-colors">Courses for Kids</Link>
              <Link href="/materials" className="text-gray-700 font-medium hover:text-[var(--primary)] transition-colors">Free Study Material</Link>
              <Link href="/centres" className="text-gray-700 font-medium hover:text-[var(--primary)] transition-colors">Offline Centres</Link>
              <div className="flex flex-col gap-3 mt-4">
                <Link href="/signin" className="text-center px-6 py-2 border-2 border-[var(--primary)] text-[var(--primary)] rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Sign In
                </Link>
                <Link href="/trial" className="text-center btn-primary">
                  Book FREE Trial
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
