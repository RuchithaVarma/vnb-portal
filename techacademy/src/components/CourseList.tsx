const categories = [
  { name: "Full Stack Development", icon: "💻" },
  { name: "Data Science & AI", icon: "🤖" },
  { name: "Cloud Computing", icon: "☁️" },
  { name: "Cyber Security", icon: "🔒" },
  { name: "DevOps", icon: "∞" },
  { name: "Mobile App Dev", icon: "📱" },
];

const popularCourses = [
  { title: "Java Full Stack", duration: "90 Days", mode: "Online/Classroom" },
  { title: "Python Full Stack", duration: "90 Days", mode: "Online/Classroom" },
  { title: "AWS Cloud", duration: "45 Days", mode: "Online" },
  { title: "Azure DevOps", duration: "60 Days", mode: "Online" },
  { title: "Data Science with AI", duration: "120 Days", mode: "Online/Classroom" },
  { title: "React JS", duration: "45 Days", mode: "Online" },
  { title: "Selenium Testing", duration: "45 Days", mode: "Online" },
  { title: "UI/UX Design", duration: "60 Days", mode: "Classroom" },
];

const CourseList = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Categories Grid */}
        <div className="text-center mb-16">
            <h2 className="section-title">Explore by <span className="text-[var(--primary)]">Technology</span></h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto mb-10">
                Browse our wide range of courses categorized by technology domain.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat, idx) => (
                    <div key={idx} className="p-4 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow cursor-pointer group">
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                        <h3 className="font-semibold text-sm text-gray-700">{cat.name}</h3>
                    </div>
                ))}
            </div>
        </div>

        {/* Popular Courses Grid */}
        <div>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="section-title text-left mb-2">Popular <span className="text-[var(--primary)]">Courses</span></h2>
                    <p className="text-[var(--muted)]">Trending courses selected by students</p>
                </div>
                <button className="text-[var(--primary)] font-semibold hover:underline">View All Courses →</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularCourses.map((course, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400 font-medium">
                            {course.title} Image
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{course.title}</h3>
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>⏱ {course.duration}</p>
                                <p>🎓 {course.mode}</p>
                            </div>
                            <button className="w-full mt-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded hover:bg-blue-50 font-medium transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default CourseList;
