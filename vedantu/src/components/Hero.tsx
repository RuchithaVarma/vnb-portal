"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getItems } from "@/lib/firestoreService";
import { HeroSlide } from "@/types";

const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getItems<HeroSlide>("hero_slides");
        if (data && data.length > 0) {
          const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
          setSlides(sorted);
        }
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (animating || slides.length === 0) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating, slides.length],
  );

  const prev = () => {
    if (slides.length === 0) return;
    goTo((current - 1 + slides.length) % slides.length);
  };
  const next = useCallback(() => {
    if (slides.length === 0) return;
    goTo((current + 1) % slides.length);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 relative">
        {loading ? (
          <div className="w-full h-[500px] md:h-[600px] rounded-[2rem] bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">
                Loading amazing content...
              </p>
            </div>
          </div>
        ) : slides.length === 0 ? (
          <div className="w-full h-[500px] md:h-[600px] rounded-[2rem] bg-gradient-to-br from-[var(--primary)] to-orange-600 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Welcome to Brilliant Roots
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Amazing courses and content coming soon! We&apos;re preparing
                something special for you.
              </p>
              <Link
                href="/courses"
                className="btn-primary bg-white text-[var(--primary)] hover:bg-gray-100"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group">
            {/* Carousel Slides */}
            {slides.map((slide, index) => {
              const isActive = index === current;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                >
                  {/* Full Background Image */}
                  <Image
                    src={slide.bgImage}
                    alt={slide.title}
                    fill
                    className={`object-cover transition-transform duration-[10000ms] ease-out ${isActive ? "scale-105" : "scale-100"}`}
                    priority={index === 0}
                    unoptimized
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center p-8 md:p-16 lg:p-20">
                    <div
                      className={`max-w-2xl text-white space-y-6 transform transition-all duration-700 delay-100 ${isActive ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
                    >
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-sm">
                        <Sparkles className="text-yellow-400" size={18} />
                        <span className="text-xs md:text-sm font-bold tracking-wide uppercase text-white shadow-sm">
                          {slide.badge}
                        </span>
                      </div>

                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-md whitespace-pre-line">
                        {slide.title
                          .split(
                            new RegExp(
                              `(${slide.titleHighlights.join("|")})`,
                              "gi",
                            ),
                          )
                          .map((part, i) =>
                            slide.titleHighlights.some(
                              (h) => h.toLowerCase() === part.toLowerCase(),
                            ) ? (
                              <span key={i} className="text-yellow-400">
                                {part}
                              </span>
                            ) : (
                              part
                            ),
                          )}
                      </h1>

                      <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-medium drop-shadow-sm border-l-4 border-yellow-400 pl-4">
                        {slide.desc}
                      </p>

                      <div className="flex flex-col gap-4 pt-4">
                        {/* Actions Row */}
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href="/register"
                            className="bg-[#4b43ff] text-white px-2 py-2.5 md:px-2 md:py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all text-sm md:text-base flex items-center justify-center gap-2 w-full"
                          >
                            Register Now <ArrowRight size={18} />
                          </Link>
                          <Link
                            href="/trial"
                            className="bg-[#ff5a36] text-white px-2 py-2.5 md:px-2 md:py-3 rounded-xl font-bold shadow-lg hover:bg-[#ff451f] hover:-translate-y-0.5 transition-all text-sm md:text-base text-center w-full"
                          >
                            Book FREE Trial
                          </Link>
                          <Link
                            href="/courses"
                            className="bg-white text-[#ff5a36] border-2 border-[#ff5a36] px-2 py-2.5 md:px-2 md:py-3 rounded-xl font-bold shadow-md hover:bg-orange-50 hover:-translate-y-0.5 transition-all text-sm md:text-base text-center w-full"
                          >
                            Explore Courses
                          </Link>
                          <Link
                            href="/tests"
                            className="bg-[#a020f0] text-white px-2 py-2.5 md:px-2 md:py-3 rounded-xl font-bold shadow-lg hover:bg-purple-700 hover:-translate-y-0.5 transition-all text-sm md:text-base flex items-center justify-center gap-2 w-full"
                          >
                            <span className="text-xl leading-none">🪄</span>{" "}
                            Explore Tests
                          </Link>
                        </div>
                      </div>

                      {/* Trust Indicators (Only on 1st slide) */}
                      {index === 0 && (
                        <div className="flex items-center gap-6 pt-8 mt-8 border-t border-white/20">
                          <div className="flex items-center gap-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className="text-yellow-400 fill-yellow-400"
                                />
                              ))}
                            </div>
                            <p className="text-sm font-semibold">
                              4.8/5 Rating
                            </p>
                          </div>
                          <div className="h-8 w-px bg-white/30"></div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-yellow-400 text-xl">
                              2.1Cr+
                            </p>
                            <p className="text-sm font-semibold">Hours</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${i === current ? "w-10 h-2 bg-yellow-400" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
