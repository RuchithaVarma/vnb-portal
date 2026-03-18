"use client";

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Compass, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Contact header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-indigo-900 via-[#0f172a] to-black text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-400 to-pink-500 rounded-full blur-[100px] -mr-40 -mt-20"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 mb-6">
              <Sparkles className="text-orange-400" size={16} />
              <span className="text-xs font-black uppercase tracking-widest text-orange-200">Get In Touch</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              We'd Love to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Hear from You</span>
            </h1>
            <p className="text-lg text-gray-300 font-medium">
              Have questions about courses or want to visit our offline center? Our experts are here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main layout grid */}
      <section className="container mx-auto px-6 -mt-16 pb-32 relative z-20">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Form left block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-500 text-sm mb-8 font-medium">Fill out the form below and we'll reply within 24 hours.</p>

            {submitted ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-green-600" size={24} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h4>
                <p className="text-gray-500 text-sm">Thank you for contacting us. We'll be in touch very soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    placeholder="John Doe" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:bg-white outline-none transition-all font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    placeholder="john@example.com" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:bg-white outline-none transition-all font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    rows={5} 
                    required
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                    placeholder="Tell us what you're looking for..." 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:bg-white outline-none transition-all font-medium resize-none" 
                  ></textarea>
                </div>
                
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[var(--primary)] to-orange-500 hover:to-orange-600 text-white rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info right block */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Information Node */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-6">Offline Center Details</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[var(--primary)] border border-orange-100 shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Our Location</p>
                    <p className="text-gray-800 font-bold leading-snug">Moghularajpuram,<br />Vijayawada, Andhra Pradesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 border border-blue-100 shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-gray-800 font-bold">+91 9704766236</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 border border-purple-100 shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Email</p>
                    <p className="text-gray-800 font-bold text-sm">brabacusvedicmaths@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Reach node */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-full blur-2xl -mr-12 -mt-12" />
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Compass className="text-[var(--primary)]" size={24} />
                How to Reach
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-black">1</span>
                  <p className="text-sm text-gray-600 font-medium">Head towards the central hub of **Moghularajpuram**.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-black">2</span>
                  <p className="text-sm text-gray-600 font-medium">Look for major landmarks near the central junction.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-black">3</span>
                  <p className="text-sm text-gray-600 font-medium">Our staff is available on phone for precise turn directions!</p>
                </div>
                <div className="pt-4">
                  <Link href="https://maps.google.com" target="_blank" className="w-full py-3 border-2 border-gray-200 hover:border-[var(--primary)] text-gray-700 hover:text-[var(--primary)] rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 group">
                     View on Google Maps
                  </Link>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </section>
    </div>
  );
}
