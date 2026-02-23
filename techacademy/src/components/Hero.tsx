"use client";
import Link from 'next/link';
import { Calendar, Clock, Share2, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const courses = [
  {
    id: 1,
    title: "Full Stack Java",
    image: "https://nareshit.com/images/course-images/full-stack-java.jpg", // Placeholder or simulated
    rating: 4.8,
    reviews: 1240,
    startDate: "20th Feb 2026",
    time: "7:00 AM",
    mode: "Online & Classroom",
    trainer: "Mr. Hari Krishna"
  },
  {
    id: 2,
    title: "Data Science & AI",
    image: "https://nareshit.com/images/course-images/data-science.jpg", // Placeholder
    rating: 4.9,
    reviews: 850,
    startDate: "22nd Feb 2026",
    time: "9:00 AM",
    mode: "Online",
    trainer: "Dr. Sharma"
  },
  {
    id: 3,
    title: "DevOps with AWS",
    image: "https://nareshit.com/images/course-images/devops.jpg", // Placeholder
    rating: 4.7,
    reviews: 2100,
    startDate: "25th Feb 2026",
    time: "6:00 PM",
    mode: "Online",
    trainer: "Mr. Satish"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Simple auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % courses.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight">
                    Build Your Career in <span className="text-[var(--primary)]">Software Industry</span>
                </h1>
                <p className="text-lg text-[var(--muted)]">
                    Join Naresh i Technologies for the best software training in Hyderabad. We offer 100% placement assistance and real-time project training.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/courses" className="btn-primary">
                        Browse Courses
                    </Link>
                    <Link href="/contact" className="btn-secondary">
                        Contact Us
                    </Link>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                    <div>
                        <h4 className="text-3xl font-bold text-[var(--primary)]">20+</h4>
                        <p className="text-sm text-gray-600">Years Experience</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold text-[var(--primary)]">1M+</h4>
                        <p className="text-sm text-gray-600">Students Trained</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold text-[var(--primary)]">500+</h4>
                        <p className="text-sm text-gray-600">Expert Trainers</p>
                    </div>
                </div>
            </div>

            {/* Right Content - Course Card Carousel */}
            <div className="md:w-1/2 w-full flex justify-center">
                <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Placeholder for Image - Using a gradient since we don't have real images */}
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                        {courses[currentSlide].title}
                    </div>
                    
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{courses[currentSlide].title}</h3>
                                <p className="text-sm text-gray-500">By {courses[currentSlide].trainer}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                <span className="font-bold text-sm">{courses[currentSlide].rating}</span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Calendar size={18} className="text-[var(--primary)]" />
                                <span>Starts: {courses[currentSlide].startDate}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Clock size={18} className="text-[var(--primary)]" />
                                <span>Time: {courses[currentSlide].time}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-[var(--primary)] text-white py-2 rounded-md font-medium hover:bg-[var(--primary-hover)] transition-colors">
                                Enroll Now
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {courses.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    currentSlide === index ? 'bg-[var(--primary)]' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
