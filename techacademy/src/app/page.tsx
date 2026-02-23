import Hero from "@/components/Hero";
import CourseList from "@/components/CourseList";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <CourseList />
      <Testimonials />
      
      {/* Call to Action Section */}
      <section className="bg-[var(--primary)] py-16 text-white text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Career?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have transformed their careers with Naresh i Technologies.
            </p>
            <button className="bg-white text-[var(--primary)] px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors">
                Book a Free Demo
            </button>
        </div>
      </section>
    </div>
  );
}
