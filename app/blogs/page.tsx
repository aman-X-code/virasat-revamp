'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Poster-style news items linking to PDFs
const newsItems = [
  {
    id: 'pdf-1',
    title: 'Press Release 1',
    cover: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_640,c_limit/v1759346382/prod/news/poster-1_ejeawm.png',
    pdfUrl: '/pdfs/news-1.pdf',
    downloadName: 'Press_Release_1.pdf'
  },
  {
    id: 'pdf-2',
    title: 'Press Release 2',
    cover: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_640,c_limit/v1759346383/prod/news/poster-2_e2kfot.png',
    pdfUrl: '/pdfs/news-2.pdf',
    downloadName: 'Press_Release_2.pdf'
  }
];

const BlogsPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="text-brand-black pt-28 relative">
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

          <section className="py-6 px-6 container mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 items-center">
              {/* Left Side - News Heading */}
              <div className="lg:w-1/3 flex items-center">
                <div className="text-left ml-12">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-berkshire-swash)' }}>
                    Latest<br />News
                  </h1>
                  <p className="text-lg text-gray-300 font-light">
                    Download our latest press releases<br />and announcements.
                  </p>
                </div>
              </div>

              {/* Right Side - Edgy News Cards */}
              <div className="lg:w-2/3 w-full">
                <div className="flex gap-6 overflow-x-auto pb-4">
                  {newsItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 w-80 group cursor-pointer"
                      custom={index}
                      initial="initial"
                      whileInView="animate"
                      variants={fadeIn}
                      viewport={{ once: true }}
                      whileHover={{ y: -12 }}
                    >
                      <a href={item.pdfUrl} download={item.downloadName} target="_blank" rel="noopener noreferrer" className="block">
                        {/* Image with NEWS label */}
                        <div className="relative h-96 overflow-hidden">
                          <Image 
                            src={item.cover} 
                            alt={item.title} 
                            fill 
                            style={{ objectFit: 'cover' }}
                          />
                          {/* NEWS Label */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-black/80 text-white px-3 py-1 rounded-md text-sm font-semibold">
                              NEWS
                            </span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                          <div className="text-gray-500 text-sm mb-2">
                            Press Release
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            Download our latest press release and stay updated with our latest announcements and news.
                          </p>
                          <div className="flex items-center text-gray-700 font-medium group-hover:text-orange-500 transition-colors cursor-pointer">
                            <span className="text-sm group-hover:underline">Download PDF</span>
                            <svg 
                              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
  );
};

export default BlogsPage;
