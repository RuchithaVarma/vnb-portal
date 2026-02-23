import { Code, Calculator, Globe, Palette, BookOpen, Zap } from 'lucide-react';

const courses = [
  { 
    title: "JEE/NEET Preparation", 
    icon: Calculator, 
    color: "from-red-400 to-pink-500",
    grades: "Class 11-12",
    features: ["Live Classes", "Doubt Solving", "Test Series"]
  },
  { 
    title: "CBSE School Tuition", 
    icon: BookOpen, 
    color: "from-blue-400 to-cyan-500",
    grades: "Class 1-12",
    features: ["All Subjects", "NCERT Based", "Board Prep"]
  },
  { 
    title: "Coding for Kids", 
    icon: Code, 
    color: "from-purple-400 to-indigo-500",
    grades: "Class 1-8",
    features: ["Scratch", "Python", "Web Dev"]
  },
  { 
    title: "Spoken English", 
    icon: Globe, 
    color: "from-green-400 to-teal-500",
    grades: "All Ages",
    features: ["Fluency", "Grammar", "Confidence"]
  },
  { 
    title: "Mathematics", 
    icon: Zap, 
    color: "from-yellow-400 to-orange-500",
    grades: "Class 1-12",
    features: ["Vedic Math", "Olympiad", "Advanced"]
  },
  { 
    title: "Creative Arts", 
    icon: Palette, 
    color: "from-pink-400 to-rose-500",
    grades: "Class 1-8",
    features: ["Drawing", "Music", "Dance"]
  }
];

const CoursesSection = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-pink-50 px-6 py-3 rounded-full shadow-lg mb-4 border-2 border-orange-200">
            <Zap className="text-[var(--primary)]" size={24} />
            <span className="font-bold text-gray-700">Our Courses</span>
          </div>
          <h2 className="section-title">
            Explore Our <span className="gradient-text">Learning Programs</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Personalized courses designed for every student's unique learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <div
                key={idx}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl card-hover animate-fadeInUp border-2 border-gray-100 relative overflow-hidden"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                {/* Gradient overlay */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${course.color} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xl`}>
                    <Icon className="text-white" size={36} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{course.title}</h3>
                  <p className="text-sm text-[var(--primary)] font-semibold mb-4">{course.grades}</p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${course.color}`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <button className={`w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r ${course.color} hover:shadow-2xl hover:scale-105 transition-all duration-300`}>
                    Explore Course
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 animate-fadeInUp" style={{animationDelay: '0.7s'}}>
          <button className="btn-primary shadow-2xl text-lg px-10 py-4">
            View All Courses →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
