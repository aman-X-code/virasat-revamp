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

// Custom Rupee Icon Component
const RupeeIcon = ({ className, size }: { className?: string; size?: number }) => (
  <span className={className} style={{ fontSize: size || 16, fontWeight: 'bold' }}>
    ₹
  </span>
);

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState<ContactType>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  // Formspree form IDs - configured with your actual Formspree form IDs
  const FORMSPREE_ENDPOINTS = {
    artist: 'https://formspree.io/f/mqayqvjk',
    volunteer: 'https://formspree.io/f/myznwqvk', 
    sponsor: 'https://formspree.io/f/mzzjrlwe',
    general: 'https://formspree.io/f/meorgbdg'
  };

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
      icon: RupeeIcon,
      color: 'from-slate-700 to-slate-800',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      focusColor: 'focus:ring-slate-500'
    },
    {
      id: 'general' as ContactType,
      title: 'General Enquiry/Stall Booking',
      description: 'Questions, feedback, or support',
      icon: MessageCircle,
      color: 'from-yellow-400 to-amber-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      focusColor: 'focus:ring-amber-500'
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add form type to distinguish between different forms
    formData.append('form_type', activeTab);
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINTS[activeTab], {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
        form.reset();
        // Reset after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const data = await response.json();
        if (data.errors) {
          setError(data.errors.map((error: any) => error.message).join(', '));
        } else {
          setError('There was a problem submitting the form. Please try again.');
        }
      }
    } catch (error) {
      setError('There was a network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderArtistForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Full Name *</label>
          <input type="text" name="name" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }} />
        </div>
        <div>
          <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Email *</label>
          <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Phone Number</label>
          <input type="tel" name="phone" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }} />
        </div>
        <div>
          <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Art Form *</label>
          <select name="art_form" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }}>
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
        <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Experience Level *</label>
        <div className="grid grid-cols-3 gap-3">
          {['Beginner', 'Intermediate', 'Professional'].map((level) => (
            <label key={level} className="flex items-center space-x-2 cursor-pointer text-sm">
              <input type="radio" name="experience" value={level.toLowerCase()} className="text-amber-500" />
              <span className="font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }}>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Portfolio/Website</label>
        <input type="url" name="portfolio_url" placeholder="https://yourportfolio.com" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }} />
      </div>

      <div>
        <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Portfolio/Work Samples (Google Drive Link)</label>
        <input 
          type="url" 
          name="portfolio_drive_link" 
          placeholder="https://drive.google.com/drive/folders/your-folder-id" 
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan" 
          style={{ fontFamily: 'var(--font-league-spartan)' }}
        />
        <p className="text-xs text-gray-500 mt-1 font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }}>
          Upload your portfolio images, documents, and work samples to Google Drive, make the folder public, and share the link here.
        </p>
      </div>

      <div>
        <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Tell us about your artistic journey *</label>
        <textarea name="artistic_journey" required rows={3} placeholder="Share your story, inspirations, and what drives your passion for art..." className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }}></textarea>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-md font-league-spartan font-semibold hover:from-amber-700 hover:to-orange-700 transition-all disabled:opacity-50 text-sm"
      >
        {isSubmitting ? 'Submitting...' : 'Register as Artist'}
      </motion.button>
    </form>
  );

  const renderVolunteerForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Full Name *</label>
          <input type="text" name="name" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }} />
        </div>
        <div>
          <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Email *</label>
          <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Phone Number *</label>
          <input type="tel" name="phone" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }} />
        </div>
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Age</label>
          <input type="number" name="age" min="16" max="100" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Skills & Interests *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['Event Management', 'Social Media', 'Photography', 'Teaching', 'Translation', 'Administration', 'Fundraising', 'Technical Support', 'Cultural Knowledge'].map((skill) => (
            <label key={skill} className="flex items-center space-x-2 cursor-pointer text-xs">
              <input type="checkbox" name="skills" value={skill} className="text-emerald-500 rounded" />
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
              <input type="checkbox" name="availability" value={time} className="text-emerald-500 rounded" />
              <span className="font-sans">{time}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Previous Volunteer Experience</label>
        <textarea name="previous_experience" rows={2} placeholder="Tell us about any previous volunteer work or relevant experience..." className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"></textarea>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Why do you want to volunteer with us? *</label>
        <textarea name="motivation" required rows={3} placeholder="Share your motivation and what you hope to contribute..." className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"></textarea>
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
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Company/Organization Name *</label>
          <input type="text" name="company_name" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Contact Person *</label>
          <input type="text" name="contact_person" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Email *</label>
          <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-gray-700 font-sans mb-1 text-sm">Phone Number *</label>
          <input type="tel" name="phone" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Partnership Type *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {['Financial Sponsorship', 'In-Kind Support', 'Media Partnership', 'Event Co-hosting', 'Educational Programs', 'Technology Support'].map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer text-xs">
              <input type="checkbox" name="partnership_type" value={type} className="text-slate-500 rounded" />
              <span className="font-sans">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Budget Range</label>
        <select name="budget_range" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm">
          <option value="">Select budget range</option>
          <option value="under-10k">Under ₹8,00,000</option>
          <option value="10k-25k">₹8,00,000 - ₹20,00,000</option>
          <option value="25k-50k">₹20,00,000 - ₹40,00,000</option>
          <option value="50k-100k">₹40,00,000 - ₹80,00,000</option>
          <option value="over-100k">Over ₹80,00,000</option>
          <option value="discuss">Prefer to discuss</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Company Website</label>
        <input type="url" name="company_website" placeholder="https://yourcompany.com" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm" />
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">Tell us about your organization *</label>
        <textarea name="organization_description" required rows={2} placeholder="Brief description of your company and its values..." className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"></textarea>
      </div>

      <div>
        <label className="block text-gray-700 font-sans mb-1 text-sm">How would you like to support our mission? *</label>
        <textarea name="support_mission" required rows={3} placeholder="Describe your partnership goals and how you'd like to collaborate..." className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"></textarea>
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
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Name *</label>
          <input type="text" name="name" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }} />
        </div>
        <div>
          <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Email *</label>
          <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }} />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Subject *</label>
        <select 
          name="subject" 
          required 
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan"
          style={{ fontFamily: 'var(--font-league-spartan)' }}
        >
          <option value="">Select a topic</option>
          <option value="general-inquiry">General Inquiry</option>
          <option value="stall-booking">Stall Booking</option>
          <option value="event-info">Event Information</option>
          <option value="booking-support">Booking Support</option>
          <option value="feedback">Feedback</option>
          <option value="media-inquiry">Media Inquiry</option>
          <option value="other">Other</option>
        </select>
      </div>

      {selectedSubject === 'stall-booking' && (
        <div className="mb-4">
          <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Stall Images & Information (Google Drive Link) *</label>
          <input 
            type="url" 
            name="stall_drive_link" 
            required
            placeholder="https://drive.google.com/drive/folders/your-folder-id" 
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan" 
            style={{ fontFamily: 'var(--font-league-spartan)' }}
          />
          <p className="text-xs text-gray-500 mt-1 font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }}>
            Upload your stall images, product information, and any relevant documents to Google Drive, make the folder public, and share the link here.
          </p>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-league-spartan mb-1 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>Message *</label>
        <textarea name="message" required rows={4} placeholder="How can we help you?" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }}></textarea>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-yellow-400 to-amber-600 text-white py-3 rounded-md font-league-spartan font-semibold hover:from-yellow-500 hover:to-amber-700 transition-all disabled:opacity-50 text-sm"
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
    <div className="text-gray-900 pt-16 relative">
      {/* Dark Underlay Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "#160000",
        }}
      />

      {/* Fabric Texture Background - Reduced Opacity */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/digilabs/image/upload/v1759174422/prod/texture/fabric_texture_dtbgi8.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.18,
        }}
      />

      {/* Peacock Flat Overlay with Multiply Blend */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/digilabs/image/upload/v1759174358/prod/about/background/peacock_flat_ol19op.png)",
          backgroundSize: "70%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          mixBlendMode: "multiply",
          opacity: 0.9,
        }}
      />

      {/* Top Fade Overlay - Like Home Screen */}
      <div
        className="absolute top-0 left-0 right-0 z-1"
        style={{
          height: "200px",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        }}
      />

      {/* Bottom Fade Overlay - Like Home Screen */}
      <div
        className="absolute bottom-0 left-0 right-0 z-1"
        style={{
          height: "200px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        }}
      />

      <section className="py-12 px-6 container mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-berkshire-swash text-white mb-4" style={{ fontFamily: 'var(--font-berkshire-swash)' }}>Get In Touch</h1>
          <p className="text-base font-sans text-gray-300 max-w-2xl mx-auto">
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
                  {type.id === 'sponsor' ? (
                    <RupeeIcon className="text-white" size={16} />
                  ) : (
                    <Icon className="text-white" size={16} />
                  )}
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
                {activeTab === 'sponsor' ? (
                  <RupeeIcon className="text-white" size={16} />
                ) : (() => {
                  const IconComponent = contactTypes.find(t => t.id === activeTab)?.icon || MessageCircle;
                  return <IconComponent className="text-white" size={16} />;
                })()}
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
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md border border-white/20">
              <h3 className="text-xl font-serif text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <Mail className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-white text-sm">virasat.reach@gmail.com</p>
                    <p className="text-xs text-gray-300">General inquiries</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <Phone className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-white text-sm">0135 2752111</p>
                    <p className="text-xs text-gray-300">Mon-Fri 9AM-6PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                    <MapPin className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-white text-sm">72/II, Vasant Vihar</p>
                    <p className="text-xs text-gray-300">Dehradun – 248006, Uttarakhand</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/20">
                <h4 className="font-serif text-white mb-3 text-sm">Follow Us</h4>
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
            
            <div className="h-64 rounded-lg shadow-md overflow-hidden border border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.123456789!2d78.0123456789!3d30.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909d9b8b8b8b8b8%3A0x1234567890abcdef!2s72%2FII%2C%20Vasant%20Vihar%2C%20Dehradun%2C%20Uttarakhand%20248006!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                onError={(e) => {
                  if (process.env.NODE_ENV === 'development') {
                    console.error('Google Maps iframe failed to load');
                  }
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
