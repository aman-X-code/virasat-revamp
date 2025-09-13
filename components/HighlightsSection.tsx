'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const highlightsData = [
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757755057/prod/highlights/painting_bafhl5.png',
    title: 'Painting Competition',
    description: 'Express your creativity through traditional and contemporary art forms in our vibrant painting competition.',
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757755057/prod/highlights/reel_xzmikx.png',
    title: 'Reel Making Competition',
    description: 'Capture the essence of our cultural heritage through creative short videos and reels.',
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757755057/prod/highlights/photography_gtxpsb.png',
    title: 'Photography Competition',
    description: 'Freeze moments of beauty and tradition in our photography competition celebrating visual storytelling.',
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757755058/prod/highlights/videography_mz02ru.png',
    title: 'Videography Competition',
    description: 'Create compelling visual narratives that showcase the depth and richness of our cultural heritage.',
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757755056/prod/highlights/artisan_rebsnr.png',
    title: 'Artisan Workshop',
    description: 'Learn from master craftsmen and discover the intricate techniques of traditional artisan work.',
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757755058/prod/highlights/vintage_zagvux.png',
    title: 'Vintage Car Rally',
    description: 'Experience the charm of classic automobiles in our vintage car rally through heritage routes.',
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757755057/prod/highlights/gala_em7byp.png',
    title: 'Gala Night',
    description: 'An elegant evening celebrating our cultural heritage with performances, awards, and festivities.',
  },
];

export const HighlightsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollContainerRef, setScrollContainerRef] = useState<HTMLDivElement | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll position for mobile
  const handleScroll = () => {
    if (!isMobile || !scrollContainerRef) return;
    
    const scrollLeft = scrollContainerRef.scrollLeft;
    const cardWidth = 304; // w-72 + gap = 288 + 16 = 304px
    const currentCardIndex = Math.round(scrollLeft / cardWidth);
    setCurrentCard(Math.min(Math.max(currentCardIndex, 0), highlightsData.length - 1));
  };

  // Pagination logic for desktop
  const cardsPerPage = 4;
  const totalPages = Math.ceil(highlightsData.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedHighlights = highlightsData.slice(startIndex, endIndex);

  const nextPage = () => {
    if (isMobile) {
      setCurrentCard((prev) => Math.min(prev + 1, highlightsData.length - 1));
    } else {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }
  };

  const prevPage = () => {
    if (isMobile) {
      setCurrentCard((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="pt-4 pb-20 px-6" 
      style={{ backgroundColor: '#FFF7F5F4' }}
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-brand-brown mb-6">
          Our Journey's Highlights
        </h2>
        {/* Decorative gradient line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-24 h-1 mx-auto mb-6 rounded-full"
          style={{
            background: 'linear-gradient(to right, #dc2626, #7c2d12)'
          }}
        />
        <p className="text-center text-lg text-brand-earthen mb-12 max-w-2xl mx-auto">
          Moments that defined our mission and celebrated our shared heritage.
        </p>
        
        {/* Desktop Grid Layout with Pagination */}
        {!isMobile && (
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-6 lg:gap-8 mb-8">
              {/* Left Button - only show when not on first page */}
              {currentPage > 0 && (
                <motion.button
                  onClick={prevPage}
                  className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-brand-red group flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Previous highlights"
                >
                  <svg
                    className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              )}

              {/* Spacer for when left button is not shown */}
              {currentPage === 0 && <div className="w-14 h-14 flex-shrink-0" />}

              {/* Highlights Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
                {displayedHighlights.map((highlight, index) => (
                  <motion.div
                    key={startIndex + index}
                    initial={isMobile ? undefined : { opacity: 0, y: 50 }}
                    whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                    viewport={isMobile ? undefined : { once: true }}
                    transition={isMobile ? undefined : { duration: 0.6, delay: index * 0.1 }}
                    className={`bg-white rounded-2xl ${isMobile ? 'shadow-md hover:shadow-lg' : 'shadow-lg hover:shadow-2xl'} transition-all duration-300 ease-out overflow-hidden group`}
                  >
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <img 
                        src={highlight.imageUrl} 
                        alt={highlight.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif text-brand-black mb-3 line-clamp-2">{highlight.title}</h3>
                      <p className="text-sm font-sans text-brand-earthen line-clamp-3">
                        {highlight.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Button - only show when not on last page */}
              {currentPage < totalPages - 1 && (
                <motion.button
                  onClick={nextPage}
                  className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-brand-red group flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Next highlights"
                >
                  <svg
                    className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              )}

              {/* Spacer for when right button is not shown */}
              {currentPage === totalPages - 1 && <div className="w-14 h-14 flex-shrink-0" />}
            </div>

            {/* Page Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? 'bg-brand-red scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mobile Horizontal Scroll Layout */}
        {isMobile && (
          <div className="relative">
            <div 
              ref={setScrollContainerRef}
              className="flex overflow-x-auto overflow-y-hidden scrollbar-hide gap-3 sm:gap-4 pb-4"
              onScroll={handleScroll}
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {highlightsData.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={undefined}
                  whileInView={undefined}
                  viewport={undefined}
                  transition={undefined}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-out overflow-hidden group flex-shrink-0 w-72"
                  style={{
                    scrollSnapAlign: 'start'
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={highlight.imageUrl} 
                      alt={highlight.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-serif text-brand-black mb-2 line-clamp-2">{highlight.title}</h3>
                    <p className="text-sm font-sans text-brand-earthen line-clamp-3">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default HighlightsSection;