'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Palette, 
  Heart, 
  DollarSign, 
  MessageCircle,
  Upload,
  Calendar,
  Star,
  Users,
  Briefcase,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';

type ContactType = 'artist' | 'volunteer' | 'sponsor' | 'general';

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState<ContactType>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const slideIn = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 },
  };

  const contactTypes = [
    {
      id: 'artist' as ContactType,
      title: 'Artist Registration',
      description: 'Join our community of talented artists',
      icon: Palette,
      color: 'from-amber-600 to-orange-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      focusColor: 'focus:ring-amber-500'
    },
    {
      id: 'volunteer' as ContactType,
      title: 'Volunteer Signup',
      description: 'Help us preserve and promote heritage',
      icon: Heart,
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      focusColor: 'focus:ring-emerald-500'
    },
    {
      id: 'sponsor' as ContactType,
      title: 'Sponsor Partnership',
      description: 'Support our cultural initiatives',
      icon: DollarSign,
      color: 'from-slate-700 to-slate-800',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      focusColor: 'focus:ring-slate-500'
    },
    {
      id: 'general' as ContactType,
      title: 'General Inquiry',
      description: 'Questions, feedback, or support',
      icon: MessageCircle,
      color: 'from-rose-600 to-pink-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      focusColor: 'focus:ring-rose-500'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const renderArtistForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Full Name *</label>
          <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Email *</label>
          <input type="email" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Phone Number</label>
          <input type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Art Form *</label>
          <select required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm">
            <option value="">Select your art form</option>
            <option value="classical-dance">Classical Dance</option>
            <option value="music">Music</option>
            <option value="painting">Painting</option>
            <option value="sculpture">Sculpture</option>
            <option value="theater">Theater</option>
            <option value="literature">Literature</option>
            <option value="crafts">Traditional Crafts</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Experience Level *</label>
        <div className="grid grid-cols-3 gap-3">
          {['Beginner', 'Intermediate', 'Professional'].map((level) => (
            <label key={level} className="flex items-center space-x-2 cursor-pointer text-sm">
              <input type="radio" name="experience" value={level.toLowerCase()} className="text-amber-500" />
              <span className="font-sans">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Portfolio/Website</label>
        <input type="url" placeholder="https://yourportfolio.com" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm" />
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Upload Portfolio Images</label>
        <div className="border-2 border-dashed border-amber-300 rounded-md p-4 text-center hover:border-amber-400 transition-colors">
          <Upload className="mx-auto text-amber-400 mb-1" size={24} />
          <p className="text-brand-earthen text-sm">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
          <input type="file" multiple accept="image/*" className="hidden" />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Tell us about your artistic journey *</label>
        <textarea required rows={3} placeholder="Share your story, inspirations, and what drives your passion for art..." className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"></textarea>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-md font-sans font-semibold hover:from-amber-700 hover:to-orange-700 transition-all disabled:opacity-50 text-sm"
      >
        {isSubmitting ? 'Submitting...' : 'Register as Artist'}
      </motion.button>
    </form>
  );

  const renderVolunteerForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Full Name *</label>
          <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Email *</label>
          <input type="email" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Phone Number *</label>
          <input type="tel" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Age</label>
          <input type="number" min="16" max="100" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Skills & Interests *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['Event Management', 'Social Media', 'Photography', 'Teaching', 'Translation', 'Administration', 'Fundraising', 'Technical Support', 'Cultural Knowledge'].map((skill) => (
            <label key={skill} className="flex items-center space-x-2 cursor-pointer text-xs">
              <input type="checkbox" value={skill} className="text-emerald-500 rounded" />
              <span className="font-sans">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Availability *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['Weekdays', 'Weekends', 'Evenings', 'Flexible'].map((time) => (
            <label key={time} className="flex items-center space-x-2 cursor-pointer text-xs">
              <input type="checkbox" value={time} className="text-emerald-500 rounded" />
              <span className="font-sans">{time}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Previous Volunteer Experience</label>
        <textarea rows={2} placeholder="Tell us about any previous volunteer work or relevant experience..." className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"></textarea>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Why do you want to volunteer with us? *</label>
        <textarea required rows={3} placeholder="Share your motivation and what you hope to contribute..." className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"></textarea>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-md font-sans font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 text-sm"
      >
        {isSubmitting ? 'Submitting...' : 'Join as Volunteer'}
      </motion.button>
    </form>
  );

  const renderSponsorForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Company/Organization Name *</label>
          <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Contact Person *</label>
          <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Email *</label>
          <input type="email" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Phone Number *</label>
          <input type="tel" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Partnership Type *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {['Financial Sponsorship', 'In-Kind Support', 'Media Partnership', 'Event Co-hosting', 'Educational Programs', 'Technology Support'].map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer text-xs">
              <input type="checkbox" value={type} className="text-slate-500 rounded" />
              <span className="font-sans">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Budget Range</label>
        <select className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm">
          <option value="">Select budget range</option>
          <option value="under-10k">Under $10,000</option>
          <option value="10k-25k">$10,000 - $25,000</option>
          <option value="25k-50k">$25,000 - $50,000</option>
          <option value="50k-100k">$50,000 - $100,000</option>
          <option value="over-100k">Over $100,000</option>
          <option value="discuss">Prefer to discuss</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Company Website</label>
        <input type="url" placeholder="https://yourcompany.com" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm" />
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Tell us about your organization *</label>
        <textarea required rows={2} placeholder="Brief description of your company and its values..." className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"></textarea>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">How would you like to support our mission? *</label>
        <textarea required rows={3} placeholder="Describe your partnership goals and how you'd like to collaborate..." className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"></textarea>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-slate-700 to-slate-800 text-white py-3 rounded-md font-sans font-semibold hover:from-slate-800 hover:to-slate-900 transition-all disabled:opacity-50 text-sm"
      >
        {isSubmitting ? 'Submitting...' : 'Start Partnership Discussion'}
      </motion.button>
    </form>
  );

  const renderGeneralForm = () => (
    <form onSubmit={handleSubmit} className="pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Name *</label>
          <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Email *</label>
          <input type="email" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm" />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-sans mb-1 text-sm">Subject *</label>
        <select required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm">
          <option value="">Select a topic</option>
          <option value="general-inquiry">General Inquiry</option>
          <option value="event-info">Event Information</option>
          <option value="booking-support">Booking Support</option>
          <option value="feedback">Feedback</option>
          <option value="media-inquiry">Media Inquiry</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-sans mb-1 text-sm">Message *</label>
        <textarea required rows={4} placeholder="How can we help you?" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"></textarea>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 rounded-md font-sans font-semibold hover:from-rose-700 hover:to-pink-700 transition-all disabled:opacity-50 text-sm"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>
    </form>
  );

  const renderForm = () => {
    switch (activeTab) {
      case 'artist':
        return renderArtistForm();
      case 'volunteer':
        return renderVolunteerForm();
      case 'sponsor':
        return renderSponsorForm();
      case 'general':
        return renderGeneralForm();
      default:
        return renderGeneralForm();
    }
  };

  return (
    <div className="text-gray-900 pt-20" style={{ backgroundColor: '#FFF6F4' }}>
      <section className="py-12 px-6 container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-gray-800 mb-4">Get In Touch</h1>
          <p className="text-base font-sans text-gray-600 max-w-2xl mx-auto">
            Whether you're an artist, volunteer, sponsor, or have a question - we'd love to hear from you.
          </p>
        </div>

        {/* Contact Type Tabs */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {contactTypes.map((type) => {
            const Icon = type.icon;
            const isActive = activeTab === type.id;
            
            return (
              <motion.button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  isActive 
                    ? `${type.bgColor} ${type.borderColor} border-opacity-100 shadow-md` 
                    : 'bg-white border-gray-200 hover:shadow-sm hover:border-gray-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-3 mx-auto`}>
                  <Icon className="text-white" size={16} />
                </div>
                <h3 className="text-sm font-serif text-gray-800 mb-1">{type.title}</h3>
                <p className="text-xs font-sans text-gray-600">{type.description}</p>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dynamic Form */}
          <motion.div
            className={`lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 ${
              activeTab === 'general' ? 'px-6 pt-6 pb-0' : 'p-6'
            }`}
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${contactTypes.find(t => t.id === activeTab)?.color} flex items-center justify-center mr-3`}>
                {React.createElement(contactTypes.find(t => t.id === activeTab)?.icon || MessageCircle, { className: "text-white", size: 16 })}
              </div>
              <h2 className="text-2xl font-serif text-gray-800">
                {contactTypes.find(t => t.id === activeTab)?.title}
              </h2>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={slideIn}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
                    <h3 className="text-xl font-serif text-brand-black mb-2">Thank You!</h3>
                    <p className="text-brand-earthen">We've received your message and will get back to you soon.</p>
                  </div>
                ) : (
                  renderForm()
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            className="space-y-6"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-serif text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <Mail className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-gray-700 text-sm">virasat.reach@gmail.com</p>
                    <p className="text-xs text-gray-500">General inquiries</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <Phone className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-gray-700 text-sm">0135 2752111</p>
                    <p className="text-xs text-gray-500">Mon-Fri 9AM-6PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                    <MapPin className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-gray-700 text-sm">72/II, Vasant Vihar</p>
                    <p className="text-xs text-gray-500">Dehradun – 248006, Uttarakhand</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-serif text-gray-800 mb-3 text-sm">Follow Us</h4>
                <div className="flex space-x-3">
                  <a href="https://www.facebook.com/reachvirasat/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all">
                    <Facebook size={16} />
                  </a>
                  <a href="https://www.instagram.com/reachvirasat/?hl=en" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg flex items-center justify-center text-white hover:from-rose-700 hover:to-pink-700 transition-all">
                    <Instagram size={16} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="h-64 rounded-lg shadow-md overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.123456789!2d78.0123456789!3d30.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909d9b8b8b8b8b8%3A0x1234567890abcdef!2s72%2FII%2C%20Vasant%20Vihar%2C%20Dehradun%2C%20Uttarakhand%20248006!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                onError={(e) => {
                  console.error('Google Maps iframe failed to load');
                  // Fallback to static map or address display
                  const iframeElement = e.target as HTMLIFrameElement;
                  const fallbackElement = document.createElement('div');
                  fallbackElement.className = 'w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4';
                  fallbackElement.innerHTML = `
                    <div class="text-center">
                      <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3 mx-auto">
                        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                      <h3 class="text-lg font-semibold text-gray-800 mb-2">Our Location</h3>
                      <p class="text-sm text-gray-600 mb-1">72/II, Vasant Vihar</p>
                      <p class="text-sm text-gray-600">Dehradun – 248006, Uttarakhand</p>
                    </div>
                  `;
                  iframeElement.parentNode?.replaceChild(fallbackElement, iframeElement);
                }}
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
