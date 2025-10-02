'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const highlightsData = [
  {
    id: '01',
    date: 'May 2024',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174433/prod/highlights/chakravyuh_xrbkxu.png',
    title: 'Chakravyuh – A Garhwali Folk Theatre',
    location: 'Dehradun',
    duration: 'May 1, 2024 06:00 - June 1, 2024 08:00',
    description: 'Experience the traditional Garhwali folk theatre performance that showcases the rich cultural heritage of Uttarakhand.',
  },
  {
    id: '02',
    date: 'Apr 2024',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174433/prod/highlights/carrally_l5qnty.jpg',
    title: 'Vintage Car Rally',
    location: 'Dehradun',
    duration: 'Apr 15, 2024 10:00 - Apr 15, 2024 16:00',
    description: 'Experience the charm of classic automobiles in our vintage car rally through heritage routes.',
  },
  {
    id: '03',
    date: 'Mar 2024',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174433/prod/highlights/bikerally_yfphdz.jpg',
    title: 'Bike Rally Adventure',
    location: 'Dehradun',
    duration: 'Mar 10, 2024 08:00 - Mar 11, 2024 18:00',
    description: 'Join our exciting bike rally celebrating the spirit of adventure and cultural exploration.',
  },
  {
    id: '04',
    date: 'Feb 2024',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174434/prod/highlights/saadhna_ay8fyg.jpg',
    title: 'SAADHNA',
    location: 'Dehradun',
    duration: 'Feb 20, 2024 09:00 - Feb 25, 2024 17:00',
    description: 'A dedicated platform for spiritual and cultural practices that connect us to our roots.',
  },
  {
    id: '05',
    date: 'Jan 2024',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174434/prod/highlights/talkies_rqusd9.jpg',
    title: 'REACH Talkies',
    location: 'Dehradun',
    duration: 'Jan 15, 2024 18:00 - Jan 15, 2024 21:00',
    description: 'Our film club that celebrates world cinema and promotes awareness through curated screenings.',
  },
  {
    id: '06',
    date: 'Dec 2023',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174434/prod/highlights/theatre_firrdd.png',
    title: 'Theatre Festival',
    location: 'Dehradun',
    duration: 'Dec 10, 2023 19:00 - Dec 12, 2023 22:00',
    description: 'A celebration of dramatic arts featuring performances that bring stories to life on stage.',
  },
  {
    id: '07',
    date: 'Nov 2023',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174433/prod/highlights/photography_lmglkm.jpg',
    title: 'Photography Competition',
    location: 'Dehradun',
    duration: 'Nov 5, 2023 10:00 - Nov 30, 2023 18:00',
    description: 'Freeze moments of beauty and tradition in our photography competition celebrating visual storytelling.',
  },
];

export const HighlightsSection = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="pt-16 pb-20 px-4 lg:pl-0 lg:pr-6 relative overflow-hidden"
      style={{ 
        backgroundColor: '#000',
        zIndex: 10
      }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-start">
          
          {/* Left Side - Title and Classical Column */}
          <div className="relative">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 lg:mb-12 px-4 lg:ml-8 lg:px-0 mt-8 lg:mt-12 relative z-20"
            >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-berkshire-swash text-white mb-4 lg:mb-6 leading-tight text-center lg:text-left relative z-30" style={{ fontFamily: 'var(--font-berkshire-swash)' }}>
              Our Journeys<br className="md:hidden" />
              <span className="hidden md:inline"> </span><span style={{ color: '#E0A106' }}>Highlights</span>
            </h2>
              
              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-6 lg:mb-8 text-center lg:text-left font-league-spartan relative z-30" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                Experience the rich tapestry of cultural heritage through our carefully curated highlights, showcasing the best moments from our festival journey.
              </p>

              {/* Pillar Image - Hidden on mobile, visible on medium screens and up */}
              <div className="hidden md:flex justify-center lg:justify-start mb-4 lg:mb-6 lg:ml-8 -mt-8">
                <Image
                  src="https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_520,c_limit/v1759346133/prod/highlights/pillar_i3lkig.png"
                  alt="Decorative pillar"
                  width={260}
                  height={420}
                  className="object-contain drop-shadow-lg"
                  priority={false}
                />
              </div>

            </motion.div>

          </div>

          {/* Right Side - Journey Highlights with Scrolling */}
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mb-6 px-4 lg:px-0">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - itemsToShow))}
                disabled={currentIndex === 0}
                className={`p-2 rounded-full transition-all duration-300 ${
                  currentIndex === 0 
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-orange-400 hover:text-orange-300 hover:bg-orange-400/10'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              
              <div className="text-sm text-gray-400">
                {currentIndex + 1}-{Math.min(currentIndex + itemsToShow, highlightsData.length)} of {highlightsData.length}
              </div>
              
              <button
                onClick={() => setCurrentIndex(Math.min(highlightsData.length - itemsToShow, currentIndex + itemsToShow))}
                disabled={currentIndex >= highlightsData.length - itemsToShow}
                className={`p-2 rounded-full transition-all duration-300 ${
                  currentIndex >= highlightsData.length - itemsToShow
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-orange-400 hover:text-orange-300 hover:bg-orange-400/10'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="space-y-8 overflow-hidden px-4 lg:px-0">
              {highlightsData.slice(currentIndex, currentIndex + itemsToShow).map((item, index) => (
                <motion.div
                  key={item.id + (currentIndex + index)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredItem(item.id + (currentIndex + index))}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-start gap-4 sm:gap-6 lg:gap-8">
                    {/* Large Number */}
                    <div className="flex-shrink-0">
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-300" style={{ color: hoveredItem === item.id + (currentIndex + index) ? '#E0A106' : 'white' }}>
                        {item.id}
                      </div>
                    </div>

                    {/* Image */}
                    <motion.div
                      className="relative w-24 h-20 sm:w-32 sm:h-24 lg:w-44 lg:h-32 rounded-xl overflow-hidden flex-shrink-0 border-[3px] border-gray-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 176px"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </motion.div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 lg:mb-3 transition-colors duration-300" style={{ color: hoveredItem === item.id + (currentIndex + index) ? '#E0A106' : 'white' }}>
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed mb-3 lg:mb-4 font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                        {item.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      className="flex-shrink-0 text-white transition-colors duration-300"
                      style={{ color: hoveredItem === item.id + (currentIndex + index) ? '#E0A106' : 'white' }}
                      animate={hoveredItem === item.id + (currentIndex + index) ? { x: 2 } : { x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Divider */}
                  {index < itemsToShow - 1 && currentIndex + index < highlightsData.length - 1 && (
                    <div className="mt-4 sm:mt-6 lg:mt-8 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fabric Texture Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/digilabs/image/upload/v1759174422/prod/texture/fabric_texture_dtbgi8.jpg)',
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          opacity: 0.18
        }}
      />

      {/* Top Fade Overlay */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-5 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)'
        }}
      />

      {/* Bottom Fade Overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-5 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)'
        }}
      />
    </motion.section>
  );
};

export default HighlightsSection;