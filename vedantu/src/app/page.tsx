import Hero from "@/components/Hero";
import CoursesSection from "@/components/CoursesSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ResultsSection from "@/components/ResultsSection";
import MasterTeachers from "@/components/MasterTeachers";
import TestimonialsSection from "@/components/TestimonialsSection";
import StudyMaterialsSection from "@/components/StudyMaterialsSection";
import MobileAppSection from "@/components/MobileAppSection";
import { Rocket, Phone } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Courses Offerings */}
      <CoursesSection />

      {/* Stats & Trust Indicators */}
      <StatsSection />

      {/* Why Choose Brilliant Roots */}
      <FeaturesSection />

      {/* Results & Toppers */}
      <ResultsSection />

      {/* Master Teachers */}
      <MasterTeachers />

      {/* Student Testimonials */}
      <TestimonialsSection />

      {/* Study Materials */}
      <StudyMaterialsSection />

      {/* Mobile App Download */}
      <MobileAppSection />

      {/* Final CTA Section */}
      <section className="relative bg-gradient-to-r from-[var(--primary)] via-orange-500 to-orange-600 py-20 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 animate-fadeIn">
            <Rocket className="text-white" size={24} />
            <span className="font-bold">Start Your Journey Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Join millions of students learning with Brilliant Roots. Book a FREE trial class and experience the difference!
          </p>

          <div className="flex flex-wrap justify-center gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <button className="group bg-white text-[var(--primary)] px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-110 flex items-center gap-3">
              <span>Book FREE Trial Class</span>
              <Rocket className="group-hover:translate-x-1 transition-transform" size={24} />
            </button>
            <button className="group bg-transparent border-3 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-3">
              <Phone size={24} />
              <span>Talk to Our Experts</span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>100% Live Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Expert Teachers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Personalized Learning</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Proven Results</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
