'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "The quality of these powders is exceptional. You can truly taste the difference when products come directly from the farm.",
    author: "Rajesh Kumar",
    role: "Organic Farmer",
    location: "Punjab",
  },
  {
    quote: "As a nutritionist, I recommend Blooms Energy to all my clients. The purity and nutritional value are unmatched.",
    author: "Dr. Priya Sharma",
    role: "Nutritionist",
    location: "Mumbai",
  },
  {
    quote: "My family has been using these powders for over a year. The freshness and natural taste are remarkable.",
    author: "Anita Desai",
    role: "Health Enthusiast",
    location: "Bangalore",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">Voices from the Fields</h2>
          <p className="text-gray-600 text-lg mt-2">
            What our customers and partners say about us
          </p>
        </div>

        <div className="relative">
          <div className="bg-cream rounded-2xl p-8 md:p-12 shadow-soft">
            <Quote className="w-12 h-12 text-gold mb-6 mx-auto" />
            
            <blockquote className="text-center">
              <p className="text-xl md:text-2xl text-gray-800 italic mb-6 leading-relaxed">
                "{current.quote}"
              </p>
              
              <footer className="space-y-1">
                <div className="font-semibold text-lg text-forest">
                  {current.author}
                </div>
                <div className="text-sm text-gray-600">
                  {current.role} • {current.location}
                </div>
              </footer>
            </blockquote>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-cream transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-forest" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-cream transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-forest" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-forest w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
