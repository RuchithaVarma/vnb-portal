import { GraduationCap, Users, BookOpen, Heart, Lightbulb, Target } from 'lucide-react';

const teachers = [
  { name: "Dr. Rajesh Kumar", subject: "Physics", qualification: "IIT Delhi, PhD", experience: "15+ years", color: "from-blue-400 to-cyan-400" },
  { name: "Prof. Anita Sharma", subject: "Mathematics", qualification: "IIT Bombay, M.Tech", experience: "12+ years", color: "from-purple-400 to-pink-400" },
  { name: "Mr. Vikram Singh", subject: "Chemistry", qualification: "IIT Kanpur, B.Tech", experience: "10+ years", color: "from-green-400 to-teal-400" }
];

const MasterTeachers = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100 to-transparent rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-100 to-transparent rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-yellow-50 px-6 py-3 rounded-full shadow-lg mb-4 border-2 border-orange-200">
            <Heart className="text-[var(--primary)]" size={20} />
            <span className="font-bold text-gray-700">Our Master Teachers</span>
          </div>
          <h2 className="section-title">
            All Teachers Teach. <span className="gradient-text">Greatest Teachers Inspire</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from India's best educators with proven track records and passion for teaching
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {teachers.map((teacher, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-gray-100 card-hover animate-fadeInUp group"
              style={{animationDelay: `${idx * 0.15}s`}}
            >
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className={`w-28 h-28 bg-gradient-to-br ${teacher.color} rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {/* Animated pulse ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-[var(--primary)] opacity-0 group-hover:opacity-20 animate-ping"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center mb-2">{teacher.name}</h3>
              <p className="text-center text-[var(--primary)] font-bold text-lg mb-4">{teacher.subject}</p>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <GraduationCap size={18} className="text-[var(--primary)] flex-shrink-0" />
                  <span>{teacher.qualification}</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <BookOpen size={18} className="text-[var(--primary)] flex-shrink-0" />
                  <span>{teacher.experience}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Teacher Stats */}
        <div className="bg-gradient-to-r from-[var(--foreground)] to-gray-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl animate-fadeInUp" style={{animationDelay: '0.5s'}}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Users size={40} />
              </div>
              <p className="text-4xl font-bold mb-2 gradient-text">500+</p>
              <p className="text-gray-300">Expert Teachers</p>
            </div>
            <div className="group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Target size={40} />
              </div>
              <p className="text-4xl font-bold mb-2 gradient-text">90%</p>
              <p className="text-gray-300">From IITs & Top Colleges</p>
            </div>
            <div className="group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Lightbulb size={40} />
              </div>
              <p className="text-4xl font-bold mb-2 gradient-text">15+</p>
              <p className="text-gray-300">Avg. Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterTeachers;
