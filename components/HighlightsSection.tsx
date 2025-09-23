'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const highlightsData = [
  {
    id: '03',
    date: 'May 2024',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174433/prod/highlights/chakravyuh_xrbkxu.png',
    title: 'Chakravyuh – A Garhwali Folk Theatre',
    location: 'Dehradun',
    duration: 'May 1, 2024 06:00 - June 1, 2024 08:00',
    description: 'Experience the traditional Garhwali folk theatre performance that showcases the rich cultural heritage of Uttarakhand.',
  },
  {
    id: '01',
    date: 'Apr 2024',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174433/prod/highlights/carrally_l5qnty.jpg',
    title: 'Vintage Car Rally',
    location: 'Dehradun',
    duration: 'Apr 15, 2024 10:00 - Apr 15, 2024 16:00',
    description: 'Experience the charm of classic automobiles in our vintage car rally through heritage routes.',
  },
  {
    id: '01',
    date: 'Mar 2024',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174433/prod/highlights/bikerally_yfphdz.jpg',
    title: 'Bike Rally Adventure',
    location: 'Dehradun',
    duration: 'Mar 10, 2024 08:00 - Mar 11, 2024 18:00',
    description: 'Join our exciting bike rally celebrating the spirit of adventure and cultural exploration.',
  },
  {
    id: '02',
    date: 'Feb 2024',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174434/prod/highlights/saadhna_ay8fyg.jpg',
    title: 'SAADHNA',
    location: 'Dehradun',
    duration: 'Feb 20, 2024 09:00 - Feb 25, 2024 17:00',
    description: 'A dedicated platform for spiritual and cultural practices that connect us to our roots.',
  },
  {
    id: '04',
    date: 'Jan 2024',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174434/prod/highlights/talkies_rqusd9.jpg',
    title: 'REACH Talkies',
    location: 'Dehradun',
    duration: 'Jan 15, 2024 18:00 - Jan 15, 2024 21:00',
    description: 'Our film club that celebrates world cinema and promotes awareness through curated screenings.',
  },
  {
    id: '05',
    date: 'Dec 2023',
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174434/prod/highlights/theatre_firrdd.png',
    title: 'Theatre Festival',
    location: 'Dehradun',
    duration: 'Dec 10, 2023 19:00 - Dec 12, 2023 22:00',
    description: 'A celebration of dramatic arts featuring performances that bring stories to life on stage.',
  },
  {
    id: '06',
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
      className="pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ 
        backgroundColor: '#000'
      }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side - Title and Classical Column */}
          <div className="relative">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-5xl md:text-6xl font-griffy text-white mb-6 leading-tight">
                Our Journeys
                <br />
                <span className="text-orange-300">Highlights</span>
              </h2>
              
              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-8">
                Dicta sunt explicabo. Nemo enim ipsam voluptatem quia 
                voluptas sit aspernatur aut odit aut fugit, sed quia 
                consequuntur. Dicta sunt explicabo. Nemo enim ipsam 
                voluptatem quia voluptas.
              </p>

              {/* View More Link */}
              <Link 
                href="/events"
                className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:text-orange-300 transition-colors duration-300 group"
              >
                View More
                <motion.svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Link>
            </motion.div>

            {/* Classical Column */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="w-32 h-96 mx-auto relative">
                {/* Column Base */}
                <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-amber-700 to-amber-600 rounded-b-lg shadow-lg"></div>
                
                {/* Column Shaft */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-80 bg-gradient-to-b from-amber-500 to-amber-700 shadow-xl">
                  {/* Fluting lines */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-20 transform translate-x-1"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-40 transform -translate-x-1"></div>
                </div>
                
                {/* Column Capital (Corinthian style) */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-16">
                  {/* Capital base */}
                  <div className="w-full h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-lg shadow-lg"></div>
                  {/* Decorative elements */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gradient-to-b from-amber-300 to-amber-500 rounded-full shadow-md"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-3 bg-gradient-to-b from-amber-200 to-amber-400 rounded-full shadow-sm"></div>
                  
                  {/* Acanthus leaves pattern */}
                  <div className="absolute top-4 left-2 w-6 h-8 bg-gradient-to-br from-amber-300 to-amber-600 rounded-full transform rotate-12 opacity-80"></div>
                  <div className="absolute top-4 right-2 w-6 h-8 bg-gradient-to-bl from-amber-300 to-amber-600 rounded-full transform -rotate-12 opacity-80"></div>
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-amber-200 to-amber-500 rounded-full opacity-90"></div>
                </div>

                {/* Decorative scrollwork */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-16 opacity-60">
                  <div className="w-full h-full border-2 border-amber-300 rounded-full"></div>
                  <div className="absolute top-2 left-2 w-12 h-12 border border-amber-400 rounded-full"></div>
                  <div className="absolute top-4 left-4 w-8 h-8 bg-amber-400 rounded-full opacity-50"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Journey Highlights with Scrolling */}
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mb-6">
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
            <div className="space-y-8 overflow-hidden">
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
                  <div className="flex items-start gap-6">
                    {/* Date and Number */}
                    <div className="flex-shrink-0 text-center">
                      <div className="text-4xl font-bold text-orange-400 mb-1">
                        {item.id}
                      </div>
                      <div className="text-sm text-gray-400">
                        {item.date}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex items-start gap-4">
                      {/* Image */}
                      <motion.div
                        className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      </motion.div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {item.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {item.duration}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      className="flex-shrink-0 text-gray-500 group-hover:text-orange-400 transition-colors duration-300"
                      animate={hoveredItem === item.id + (currentIndex + index) ? { x: 5 } : { x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Divider */}
                  {index < itemsToShow - 1 && currentIndex + index < highlightsData.length - 1 && (
                    <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50"></div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(highlightsData.length / itemsToShow) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsToShow)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / itemsToShow) === index
                      ? 'bg-orange-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HighlightsSection;