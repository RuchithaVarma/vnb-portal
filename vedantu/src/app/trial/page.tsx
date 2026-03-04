"use client";
import { useState } from 'react';
import { Calendar, User, Phone, Mail, CheckCircle, Star, Award, Play, Sparkles, ArrowRight } from 'lucide-react';

export default function TrialPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    grade: '',
    subject: '',
    preferredDate: '',
    preferredTime: '',
    parentName: '',
    relation: 'self'
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const grades = [
    { value: '', label: 'Select Grade' },
    { value: '1', label: 'Grade 1' },
    { value: '2', label: 'Grade 2' },
    { value: '3', label: 'Grade 3' },
    { value: '4', label: 'Grade 4' },
    { value: '5', label: 'Grade 5' },
    { value: '6', label: 'Grade 6' },
    { value: '7', label: 'Grade 7' },
    { value: '8', label: 'Grade 8' },
    { value: '9', label: 'Grade 9' },
    { value: '10', label: 'Grade 10' },
    { value: '11', label: 'Grade 11' },
    { value: '12', label: 'Grade 12' },
    { value: 'jee', label: 'JEE Preparation' },
    { value: 'neet', label: 'NEET Preparation' }
  ];

  const subjects = [
    { value: '', label: 'Select Subject' },
    { value: 'math', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'science', label: 'Science' },
    { value: 'social', label: 'Social Studies' }
  ];

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM'
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trial Class Booked!</h2>
          <p className="text-gray-600 mb-6">
            Your free trial class has been successfully booked. We&apos;ll send you a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Date:</strong> {formData.preferredDate}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Time:</strong> {formData.preferredTime}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Subject:</strong> {subjects.find(s => s.value === formData.subject)?.label}
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-primary w-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={32} />
              <h1 className="text-4xl md:text-5xl font-bold">
                Book Your FREE Trial Class
              </h1>
            </div>
            <p className="text-xl mb-8 text-white/90">
              Experience the Brilliant Roots difference with a complimentary 60-minute trial class. No obligations, just quality education!
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} />
                <span>100% FREE</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} />
                <span>Expert Teachers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} />
                <span>Interactive Learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="text-[var(--primary)]" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Interactive Class</h3>
              <p className="text-gray-600">60-minute session with real-time doubt resolution</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-[var(--primary)]" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Teachers</h3>
              <p className="text-gray-600">Learn from India&apos;s best educators</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-[var(--primary)]" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Experience</h3>
              <p className="text-gray-600">Tailored to your learning pace and style</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Trial Class</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student Name *
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
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter student name"
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
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
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="9876543210"
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
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
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="student@email.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade/Class *
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent appearance-none ${
                        errors.grade ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {grades.map(grade => (
                        <option key={grade.value} value={grade.value}>
                          {grade.label}
                        </option>
                      ))}
                    </select>
                    {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade}</p>}
                  </div>
                </div>
              </div>

              {/* Class Preferences */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent appearance-none ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {subjects.map(subject => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                          errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.preferredDate && <p className="mt-1 text-sm text-red-600">{errors.preferredDate}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <label key={time} className="flex items-center">
                          <input
                            type="radio"
                            name="preferredTime"
                            value={time}
                            checked={formData.preferredTime === time}
                            onChange={handleChange}
                            className="mr-2 text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <span className="text-sm">{time}</span>
                        </label>
                      ))}
                    </div>
                    {errors.preferredTime && <p className="mt-1 text-sm text-red-600">{errors.preferredTime}</p>}
                  </div>
                </div>
              </div>

              {/* Parent Information (optional) */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent Information (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent/Guardian Name
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
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                        placeholder="Parent name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--primary)] text-white py-4 rounded-lg font-bold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Book FREE Trial Class
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Students Say About Our Trial Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-current" size={16} />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;The trial class was amazing! The teacher explained concepts so clearly and made learning fun.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rahul Sharma</p>
                  <p className="text-sm text-gray-500">Class 10 Student</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-current" size={16} />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;I was skeptical about online classes, but the trial changed my mind completely. Interactive and engaging!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">P</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Priya Nair</p>
                  <p className="text-sm text-gray-500">Class 12 Student</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-current" size={16} />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;The teacher was very patient and answered all my doubts. I enrolled immediately after the trial!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Amit Kumar</p>
                  <p className="text-sm text-gray-500">JEE Aspirant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
