"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Search, Download, FileText, Video, BookOpen, Clock, Star, Eye, Filter, ChevronRight, Award, TrendingUp } from 'lucide-react';

export default function StudyMaterialsPage() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const subjects = [
    { id: 'all', name: 'All Subjects', icon: <BookOpen size={20} /> },
    { id: 'math', name: 'Mathematics', icon: <FileText size={20} /> },
    { id: 'science', name: 'Science', icon: <Video size={20} /> },
    { id: 'english', name: 'English', icon: <BookOpen size={20} /> },
    { id: 'social', name: 'Social Studies', icon: <FileText size={20} /> }
  ];

  const classes = [
    { id: 'all', name: 'All Classes' },
    { id: '6', name: 'Class 6' },
    { id: '7', name: 'Class 7' },
    { id: '8', name: 'Class 8' },
    { id: '9', name: 'Class 9' },
    { id: '10', name: 'Class 10' },
    { id: '11', name: 'Class 11' },
    { id: '12', name: 'Class 12' }
  ];

  const materials = [
    {
      id: 1,
      title: 'Class 10 Mathematics Complete Notes',
      subject: 'math',
      class: '10',
      type: 'notes',
      format: 'PDF',
      size: '15.2 MB',
      pages: 245,
      downloads: 45678,
      rating: 4.8,
      description: 'Comprehensive mathematics notes covering all CBSE Class 10 topics',
      chapters: ['Real Numbers', 'Polynomials', 'Pair of Linear Equations', 'Quadratic Equations'],
      preview: true
    },
    {
      id: 2,
      title: 'Physics Formula Sheet - Class 12',
      subject: 'science',
      class: '12',
      type: 'formula',
      format: 'PDF',
      size: '2.8 MB',
      pages: 12,
      downloads: 32456,
      rating: 4.9,
      description: 'All important physics formulas for Class 12 board exams',
      chapters: ['Electrostatics', 'Current Electricity', 'Magnetism', 'Optics'],
      preview: true
    },
    {
      id: 3,
      title: 'English Grammar Guide',
      subject: 'english',
      class: 'all',
      type: 'guide',
      format: 'PDF',
      size: '8.5 MB',
      pages: 156,
      downloads: 67890,
      rating: 4.7,
      description: 'Complete English grammar guide for all classes',
      chapters: ['Parts of Speech', 'Tenses', 'Active & Passive Voice', 'Reported Speech'],
      preview: true
    },
    {
      id: 4,
      title: 'Chemistry Practical Videos',
      subject: 'science',
      class: '11',
      type: 'video',
      format: 'MP4',
      size: '1.2 GB',
      duration: '8 hours',
      downloads: 23456,
      rating: 4.8,
      description: 'Step-by-step video tutorials for Class 11 chemistry practicals',
      chapters: ['Basic Lab Techniques', 'Salt Analysis', 'Organic Chemistry', 'Inorganic Chemistry'],
      preview: true
    },
    {
      id: 5,
      title: 'Social Studies MCQ Bank',
      subject: 'social',
      class: '9',
      type: 'mcq',
      format: 'PDF',
      size: '4.2 MB',
      pages: 89,
      downloads: 34567,
      rating: 4.6,
      description: '5000+ MCQs for Class 9 Social Studies exam preparation',
      chapters: ['History', 'Geography', 'Civics', 'Economics'],
      preview: true
    },
    {
      id: 6,
      title: 'Mathematics Problem Solutions',
      subject: 'math',
      class: '8',
      type: 'solutions',
      format: 'PDF',
      size: '6.7 MB',
      pages: 178,
      downloads: 28934,
      rating: 4.7,
      description: 'Detailed solutions to all Class 8 mathematics problems',
      chapters: ['Rational Numbers', 'Linear Equations', 'Geometry', 'Data Handling'],
      preview: true
    }
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    const matchesClass = selectedClass === 'all' || material.class === selectedClass;
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesClass && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'notes': return <FileText className="text-blue-500" size={20} />;
      case 'video': return <Video className="text-red-500" size={20} />;
      case 'formula': return <FileText className="text-green-500" size={20} />;
      case 'guide': return <BookOpen className="text-purple-500" size={20} />;
      case 'mcq': return <FileText className="text-orange-500" size={20} />;
      case 'solutions': return <FileText className="text-teal-500" size={20} />;
      default: return <FileText className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={32} />
              <h1 className="text-4xl md:text-5xl font-bold">
                Free Study Materials
              </h1>
            </div>
            <p className="text-xl mb-8 text-white/90">
              Access high-quality study resources, notes, videos, and practice materials completely free. Learn better, score higher!
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for notes, videos, solutions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Filter size={20} />
                Advanced Search
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
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Free Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">500K+</div>
              <div className="text-gray-600">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 py-4">
            {/* Subject Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                      selectedSubject === subject.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {subject.icon}
                    {subject.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Class Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Study Materials
            <span className="text-gray-500 font-normal ml-2">({filteredMaterials.length} resources)</span>
          </h2>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
            <option>Most Popular</option>
            <option>Highest Rated</option>
            <option>Most Downloaded</option>
            <option>Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Material Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(material.type)}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">{material.type}</span>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{material.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="text-yellow-500 fill-current" size={16} />
                    <span className="font-medium">{material.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {material.description}
                </p>

                {/* Chapters */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {material.chapters.slice(0, 3).map((chapter, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                      {chapter}
                    </span>
                  ))}
                  {material.chapters.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      +{material.chapters.length - 3} more
                    </span>
                  )}
                </div>

                {/* Material Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FileText size={14} />
                    <span>{material.format}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download size={14} />
                    <span>{material.downloads.toLocaleString()}</span>
                  </div>
                  {material.pages && (
                    <div className="flex items-center gap-1">
                      <FileText size={14} />
                      <span>{material.pages} pages</span>
                    </div>
                  )}
                  {material.duration && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{material.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">File size: {material.size}</span>
                  {material.preview && (
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                      <Eye size={16} />
                      Preview
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download Free
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                    <Award size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Load More Materials
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Students Love Our Free Materials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exam Focused</h3>
              <p className="text-gray-600">Materials designed specifically for board exams and competitive tests</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Created</h3>
              <p className="text-gray-600">Prepared by experienced teachers and subject matter experts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Always Free</h3>
              <p className="text-gray-600">No hidden charges, no subscriptions - completely free for everyone</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
