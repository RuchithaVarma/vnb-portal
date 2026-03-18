import { BookOpen, FileText, Award, Download, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

const studyMaterials = [
  { title: "NCERT Solutions", icon: BookOpen, color: "from-blue-400 to-cyan-500", count: "All Classes" },
  { title: "Previous Year Papers", icon: FileText, color: "from-purple-400 to-pink-500", count: "2000+ Papers" },
  { title: "Sample Papers", icon: Download, color: "from-green-400 to-teal-500", count: "500+ Papers" },
  { title: "Important Questions", icon: CheckCircle, color: "from-orange-400 to-red-500", count: "10,000+ Qs" },
  { title: "Revision Notes", icon: Sparkles, color: "from-yellow-400 to-orange-500", count: "All Subjects" },
  { title: "NCERT Books", icon: Award, color: "from-indigo-400 to-purple-500", count: "Free PDFs" }
];

const StudyMaterialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-orange-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg mb-4 border-2 border-orange-200">
            <BookOpen className="text-[var(--primary)]" size={24} />
            <span className="font-bold text-gray-700">Free Study Resources</span>
          </div>
          <h2 className="section-title">
            Comprehensive <span className="gradient-text">Study Materials</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access thousands of free study resources to boost your preparation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyMaterials.map((material, idx) => {
            const Icon = material.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-8 shadow-lg card-hover animate-fadeInUp border-2 border-gray-100 relative overflow-hidden"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${material.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${material.color} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{material.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{material.count}</p>
                  
                  <Link href="/coming-soon" className="flex items-center gap-2 text-[var(--primary)] font-semibold hover:gap-3 transition-all cursor-pointer">
                    Access Now
                    <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 animate-fadeInUp" style={{animationDelay: '0.7s'}}>
          <Link href="/materials" className="btn-primary shadow-2xl inline-block">
            Explore All Resources &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StudyMaterialsSection;
