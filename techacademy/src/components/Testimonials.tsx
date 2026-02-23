const testimonials = [
  {
    name: "Raju K.",
    role: "Java Full Stack Developer",
    company: "TCS",
    text: "Naresh IT helped me transition from a non-IT background to a software engineer. The training was practical and the placement assistance was excellent.",
    image: null
  },
  {
    name: "Sneha P.",
    role: "Data Scientist",
    company: "Infosys",
    text: "The Data Science course curriculum is very updated. The faculty helps you understand complex concepts easily. Highly recommended!",
    image: null
  },
  {
    name: "Ahmed M.",
    role: "DevOps Engineer",
    company: "Capgemini",
    text: "Real-time projects in the DevOps course gave me the confidence to crack the interview. Thanks to Naresh IT team.",
    image: null
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Success <span className="text-[var(--primary)]">Stories</span></h2>
        <p className="text-center text-[var(--muted)] max-w-2xl mx-auto mb-12">
            Hear from our students who have successfully started their careers in top MNCs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
                    <div className="text-4xl text-blue-100 absolute top-4 right-6">"</div>
                    <p className="text-gray-600 mb-6 italic relative z-10">{t.text}</p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                            {t.name[0]}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">{t.name}</h4>
                            <p className="text-xs text-[var(--primary)] font-medium">{t.role} @ {t.company}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
