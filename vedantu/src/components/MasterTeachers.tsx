"use client";
import { GraduationCap, Users, BookOpen, Heart, Lightbulb, Target, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const teachers = [
  { name: "Dr. Rajesh Kumar", subject: "Physics", qualification: "IIT Delhi, PhD", experience: "15+ years", color: "from-blue-500 to-cyan-400" },
  { name: "Prof. Anita Sharma", subject: "Mathematics", qualification: "IIT Bombay, M.Tech", experience: "12+ years", color: "from-purple-500 to-pink-400" },
  { name: "Mr. Vikram Singh", subject: "Chemistry", qualification: "IIT Kanpur, B.Tech", experience: "10+ years", color: "from-green-500 to-teal-400" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const MasterTeachers = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-50 to-transparent rounded-full blur-3xl opacity-70 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-50 to-transparent rounded-full blur-3xl opacity-70 -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-yellow-50 px-6 py-2.5 rounded-full shadow-sm mb-6 border border-orange-100">
            <Sparkles className="text-[var(--primary)]" size={16} />
            <span className="font-bold text-gray-700 uppercase tracking-widest text-[10px]">Expert Faculty</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            All Teachers Teach. <br />
            <span className="gradient-text">Greatest Teachers Inspire</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Learn from India's best educators with proven track records and a passion for shaping the future.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {teachers.map((teacher, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${teacher.color} opacity-[0.02] rounded-full blur-2xl group-hover:opacity-[0.05] transition-opacity`}></div>
              
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className={`w-24 h-24 bg-gradient-to-br ${teacher.color} rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-orange-100 group-hover:rotate-6 transition-transform duration-500`}>
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-md border border-gray-50">
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${teacher.color} flex items-center justify-center`}>
                      <GraduationCap size={12} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center text-gray-900 mb-1">{teacher.name}</h3>
              <p className="text-center text-[var(--primary)] font-bold text-sm mb-6 tracking-wide uppercase">{teacher.subject}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/50">
                  <GraduationCap size={18} className="text-[var(--primary)] flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{teacher.qualification}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/50">
                  <BookOpen size={18} className="text-[var(--primary)] flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{teacher.experience} Experience</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Teacher Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center relative z-10">
            <div className="group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mb-5 group-hover:scale-110 group-hover:bg-[var(--primary)] transition-all duration-500 shadow-md">
                <Users size={30} className="text-white" />
              </div>
              <p className="text-4xl font-black mb-1 bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">500+</p>
              <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">Expert Teachers</p>
            </div>
            <div className="group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mb-5 group-hover:scale-110 group-hover:bg-yellow-500 transition-all duration-500 shadow-md">
                <Target size={30} className="text-white" />
              </div>
              <p className="text-4xl font-black mb-1 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">90%</p>
              <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">IIT & Top Colleges</p>
            </div>
            <div className="group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mb-5 group-hover:scale-110 group-hover:bg-green-500 transition-all duration-500 shadow-md">
                <Lightbulb size={30} className="text-white" />
              </div>
              <p className="text-4xl font-black mb-1 bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent">15+</p>
              <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">Avg. Years Experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MasterTeachers;
