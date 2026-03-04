"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Users,
  Building,
  Navigation,
  Calendar,
  Award,
} from "lucide-react";

export default function OfflineCentresPage() {
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const cities = [
    { id: "all", name: "All Cities" },
    { id: "mumbai", name: "Mumbai" },
    { id: "delhi", name: "Delhi" },
    { id: "bangalore", name: "Bangalore" },
    { id: "hyderabad", name: "Hyderabad" },
    { id: "chennai", name: "Chennai" },
    { id: "kolkata", name: "Kolkata" },
    { id: "pune", name: "Pune" },
  ];

  const centres = [
    {
      id: 1,
      name: "Brilliant Roots Learning Centre - Andheri",
      city: "mumbai",
      address:
        "Shop No. 12, 3rd Floor, Infinity Mall, Andheri West, Mumbai - 400053",
      phone: "+91 98765 43210",
      email: "andheri@brilliantroots.com",
      rating: 4.8,
      students: 1250,
      established: "2020",
      features: [
        "Smart Classrooms",
        "Library",
        "Science Lab",
        "Counseling Room",
      ],
      courses: ["JEE", "NEET", "CBSE Boards", "State Boards"],
      timings: "9:00 AM - 8:00 PM",
      image: "/api/placeholder/400/250",
      coordinates: { lat: 19.1199, lng: 72.8464 },
    },
    {
      id: 2,
      name: "Brilliant Roots Learning Centre - Connaught Place",
      city: "delhi",
      address: "A-Block, Connaught Place, New Delhi - 110001",
      phone: "+91 98765 43211",
      email: "cp@brilliantroots.com",
      rating: 4.9,
      students: 1890,
      established: "2019",
      features: [
        "Digital Classrooms",
        "Computer Lab",
        "Study Lounge",
        "Parking",
      ],
      courses: ["UPSC", "JEE", "NEET", "Class 6-12"],
      timings: "8:00 AM - 9:00 PM",
      image: "/api/placeholder/400/250",
      coordinates: { lat: 28.6328, lng: 77.2197 },
    },
    {
      id: 3,
      name: "Brilliant Roots Learning Centre - Koramangala",
      city: "bangalore",
      address: "5th Block, Koramangala, Bangalore - 560095",
      phone: "+91 98765 43212",
      email: "koramangala@brilliantroots.com",
      rating: 4.7,
      students: 980,
      established: "2021",
      features: [
        "Modern Classrooms",
        "Library",
        "Physics Lab",
        "Chemistry Lab",
      ],
      courses: ["JEE", "NEET", "KCET", "Class 6-12"],
      timings: "10:00 AM - 7:00 PM",
      image: "/api/placeholder/400/250",
      coordinates: { lat: 12.9279, lng: 77.6271 },
    },
    {
      id: 4,
      name: "Brilliant Roots Learning Centre - Madhapur",
      city: "hyderabad",
      address: "Hitech City, Madhapur, Hyderabad - 500081",
      phone: "+91 98765 43213",
      email: "madhapur@brilliantroots.com",
      rating: 4.8,
      students: 1450,
      established: "2020",
      features: ["Smart Boards", "Computer Lab", "Library", "Cafeteria"],
      courses: ["JEE", "NEET", "EAMCET", "Class 6-12"],
      timings: "9:00 AM - 8:00 PM",
      image: "/api/placeholder/400/250",
      coordinates: { lat: 17.4483, lng: 78.3915 },
    },
    {
      id: 5,
      name: "Brilliant Roots Learning Centre - T. Nagar",
      city: "chennai",
      address: "Usman Road, T. Nagar, Chennai - 600017",
      phone: "+91 98765 43214",
      email: "tnagar@brilliantroots.com",
      rating: 4.6,
      students: 780,
      established: "2021",
      features: ["AC Classrooms", "Library", "Science Lab", "Parking"],
      courses: ["NEET", "JEE", "Tamil Nadu Boards", "Class 6-12"],
      timings: "8:00 AM - 8:00 PM",
      image: "/api/placeholder/400/250",
      coordinates: { lat: 13.0403, lng: 80.2337 },
    },
    {
      id: 6,
      name: "Brilliant Roots Learning Centre - Salt Lake",
      city: "kolkata",
      address: "Sector 1, Salt Lake City, Kolkata - 700064",
      phone: "+91 98765 43215",
      email: "saltlake@brilliantroots.com",
      rating: 4.7,
      students: 920,
      established: "2020",
      features: ["Digital Classrooms", "Library", "Physics Lab", "Study Rooms"],
      courses: ["JEE", "NEET", "WBJEE", "Class 6-12"],
      timings: "9:00 AM - 7:00 PM",
      image: "/api/placeholder/400/250",
      coordinates: { lat: 22.5726, lng: 88.3639 },
    },
  ];

  const filteredCentres = centres.filter((centre) => {
    const matchesCity = selectedCity === "all" || centre.city === selectedCity;
    const matchesSearch =
      centre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      centre.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Building size={32} />
              <h1 className="text-4xl md:text-5xl font-bold">
                Brilliant Roots Offline Centres
              </h1>
            </div>
            <p className="text-xl mb-8 text-white/90">
              Experience the perfect blend of online and offline learning. Visit
              our state-of-the-art centres across India.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search for centres by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                <MapPin size={20} />
                Find Nearest Centre
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Centres Nationwide</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">25K+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Expert Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                4.8★
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* City Filter */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-4 overflow-x-auto">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Filter by City:
            </span>
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedCity === city.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Centres Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Our Learning Centres
            <span className="text-gray-500 font-normal ml-2">
              ({filteredCentres.length} centres)
            </span>
          </h2>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600">
            <option>Nearest First</option>
            <option>Highest Rated</option>
            <option>Most Students</option>
            <option>Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCentres.map((centre) => (
            <div
              key={centre.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Centre Image */}
              <div className="h-48 bg-gradient-to-br from-green-400 to-teal-400 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building className="text-white/40" size={64} />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full">
                    {centre.city.charAt(0).toUpperCase() + centre.city.slice(1)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="text-yellow-500 fill-current" size={14} />
                    <span className="text-xs font-semibold">
                      {centre.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Centre Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {centre.name}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="text-gray-400 mt-1" size={16} />
                    <span className="text-sm text-gray-600 line-clamp-2">
                      {centre.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Phone size={16} />
                      <span>{centre.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail size={16} />
                      <span className="text-xs">
                        {centre.email.split("@")[0]}@...
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {centre.timings}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {centre.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {centre.features.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        +{centre.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Courses */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Courses Available
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {centre.courses.slice(0, 3).map((course, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
                      >
                        {course}
                      </span>
                    ))}
                    {centre.courses.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        +{centre.courses.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{centre.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>Since {centre.established}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <Navigation size={16} />
                    Get Directions
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Load More Centres
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Brilliant Roots Offline Centres?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Faculty
              </h3>
              <p className="text-gray-600">
                Learn from experienced teachers who provide personalized
                attention
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Modern Infrastructure
              </h3>
              <p className="text-gray-600">
                State-of-the-art classrooms, labs, and learning facilities
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hybrid Learning
              </h3>
              <p className="text-gray-600">
                Best of both online and offline learning experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Visit Your Nearest Brilliant Roots Centre Today!
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Experience the future of education with our hybrid learning model
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Book a Centre Visit
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
