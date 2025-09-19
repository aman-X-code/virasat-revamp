import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-white pt-10 pb-8 md:pt-16 md:pb-8">
      <div className="container mx-auto px-5 md:px-6">
        {/* Ornamental Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-earthen to-transparent mb-8 md:mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {/* Logo and About */}
          <div>
            <h3 className="text-2xl md:text-3xl font-serif text-brand-red font-bold mb-3 md:mb-4">VIRASAT</h3>
            <p className="text-sm md:text-base text-brand-earthen-light font-sans">
              Experience the confluence of tradition and modernity. A celebration of culture, art, and heritage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg md:text-xl font-serif text-brand-white mb-3 md:mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 md:gap-2 font-sans text-sm md:text-base">
              <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
              <Link href="/events" className="hover:text-brand-red transition-colors">Events</Link>
              <Link href="/about" className="hover:text-brand-red transition-colors">About Us</Link>
              <Link href="/gallery" className="hover:text-brand-red transition-colors">Gallery</Link>
              <Link href="/blogs" className="hover:text-brand-red transition-colors">News</Link>
              <Link href="/contact" className="hover:text-brand-red transition-colors">Contact Us</Link>
              <Link href="/donate" className="hover:text-brand-red transition-colors">Donate</Link>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-lg md:text-xl font-serif text-brand-white mb-3 md:mb-4">Address</h4>
            <address className="not-italic font-sans text-brand-earthen-light text-sm md:text-base">
              <p className="font-semibold">Rural Entrepreneurship for Art & Cultural Heritage (REACH)</p>
              <p>72/II, Vasant Vihar</p>
              <p>Dehradun – 248006</p>
              <p>Uttarakhand, India</p>
            </address>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg md:text-xl font-serif text-brand-white mb-3 md:mb-4">Contact</h4>
            <div className="font-sans text-brand-earthen-light text-sm md:text-base space-y-2">
              <p>Phone: <a href="tel:01352752111" className="hover:text-brand-red">0135 2752111</a></p>
              <p>Email: <a href="mailto:virasat.reach@gmail.com" className="hover:text-brand-red">virasat.reach@gmail.com</a></p>
              <p>Location: <a href="https://maps.app.goo.gl/bHkuzUZNpVJK9xg48" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red">View on Google Maps</a></p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg md:text-xl font-serif text-brand-white mb-3 md:mb-4">Follow Us</h4>
            <div className="flex space-x-3 md:space-x-4">
              <a href="https://www.facebook.com/reachvirasat/" target="_blank" rel="noopener noreferrer" className="text-brand-earthen-light hover:text-brand-red transition-colors"><Facebook size={20} className="md:w-6 md:h-6" /></a>
              <a href="https://www.instagram.com/reachvirasat/?hl=en" target="_blank" rel="noopener noreferrer" className="text-brand-earthen-light hover:text-brand-red transition-colors"><Instagram size={20} className="md:w-6 md:h-6" /></a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-brand-brown">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4">
            <Link href="/terms" className="text-brand-earthen hover:text-brand-red transition-colors font-sans text-sm md:text-base">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-brand-earthen hover:text-brand-red transition-colors font-sans text-sm md:text-base">
              Privacy Policy
            </Link>
            <Link href="/refund" className="text-brand-earthen hover:text-brand-red transition-colors font-sans text-sm md:text-base">
              Refund Policy
            </Link>
          </div>
          <div className="text-center text-brand-earthen font-sans text-sm md:text-base">
            <p>&copy; {new Date().getFullYear()} VIRASAT. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
