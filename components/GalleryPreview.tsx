'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

const galleryItems = [
  { 
    year: 2024, 
    src: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_600,c_limit/v1759346033/prod/gallery/home/gallery_card_esbdh9.png',
    hoverImage: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_80,w_600,c_limit/prod/gallery/2024/prod/gallery/2024/1.jpg'
  },
  { 
    year: 2023, 
    src: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_600,c_limit/v1759346033/prod/gallery/home/gallery_card_esbdh9.png',
    hoverImage: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_80,w_600,c_limit/prod/gallery/2023/prod/gallery/2023/1.jpg'
  },
  { 
    year: 2022, 
    src: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_600,c_limit/v1759346033/prod/gallery/home/gallery_card_esbdh9.png',
    hoverImage: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_80,w_600,c_limit/prod/gallery/2022/prod/gallery/2022/1.jpg'
  },
  { 
    year: 2021, 
    src: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_600,c_limit/v1759346033/prod/gallery/home/gallery_card_esbdh9.png',
    hoverImage: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_80,w_600,c_limit/prod/gallery/2021/prod/gallery/2021/1.jpg'
  },
];

const GalleryPreview = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, rotateX: -45 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 1, y: 0 }}
      className="pt-4 pb-20 px-4 sm:px-6 relative w-full"
      style={{ 
        backgroundColor: '#000',
        contain: 'layout style paint',
        isolation: 'isolate',
        zIndex: 10
      }}
    >
      {/* Fabric Texture Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/digilabs/image/upload/v1759174422/prod/texture/fabric_texture_dtbgi8.jpg)',
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          opacity: 0.25,
          minWidth: '100%',
          minHeight: '100%'
        }}
      />

      {/* Gallery Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_1920,c_limit/v1759346039/prod/gallery/home/gallery_back_kppsr3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3,
          minWidth: '100%',
          minHeight: '100%'
        }}
      />

      {/* Top Fade Overlay */}
      <div
        className="absolute top-0 left-0 right-0 z-10"
        style={{
          height: '200px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)'
        }}
      />

      {/* Bottom Fade Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: '200px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)'
        }}
      />

      {/* Left Curtain */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 z-1 pointer-events-none hidden md:block"
        style={{
          width: "450px",
          backgroundImage: "url(https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_900,c_limit/v1759346217/prod/artists/prod/artists/curtain-left_fylzoy.png)",
          backgroundSize: "contain",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.8 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        className="text-center max-w-6xl mx-auto relative z-10"
        initial="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-berkshire-swash text-white mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-berkshire-swash)' }}
          variants={itemVariants}
        >
          Festival Memories Through the Years
        </motion.h2>
        {/* Decorative gradient line */}
        <motion.div
          initial={{ opacity: 1, scaleX: 1 }}
          className="w-24 h-1 mx-auto mb-8 sm:mb-12 rounded-full bg-gradient-to-r from-red-600 to-orange-600"
        />
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 relative z-10"
        variants={containerVariants}
        initial="visible"
      >
        {galleryItems.map((item, index) => (
          <Link key={index} href={`/gallery?year=${item.year}`}>
            <motion.div
              className="group relative rounded-lg overflow-hidden shadow-lg border-2 border-brand-earthen-light aspect-square cursor-pointer"
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                rotateY: index % 2 === 0 ? 10 : -10,
                rotateX: 5,
                translateZ: 20,
                boxShadow: '0px 15px 35px rgba(0,0,0,0.3)',
              }}
              style={{ transformPerspective: '1000px' }}
            >
              {/* Default gallery card image */}
              <Image
                src={item.src}
                alt={`Gallery ${item.year}`}
                width={500}
                height={500}
                className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-110"
                style={{ objectFit: 'cover' }}
                priority={index < 2}
              />
              
              {/* Hover gallery image */}
              <Image
                src={item.hoverImage}
                alt={`Gallery ${item.year} preview`}
                width={500}
                height={500}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-110"
                style={{ objectFit: 'cover' }}
              />
              
              {/* Dark overlay to make cards less bright */}
              <div className="absolute inset-0 bg-black/20" />
              
              {/* Year Label Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-berkshire-swash drop-shadow-lg tracking-wider">
                  {item.year}
                </span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-8 sm:mt-12 relative z-10"
        initial={{ opacity: 1, y: 0 }}
      >
        <Link href="/gallery" className="inline-block">
          <button className="group cursor-pointer font-semibold transition-all duration-200 py-2.5 px-5 rounded-full border border-transparent flex items-center text-sm bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600" style={{ fontSize: '15px' }}>
            <span>View Full Gallery</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 74 74"
              height="34"
              width="34"
              className="ml-2.5 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
              style={{ marginLeft: '10px' }}
            >
              <circle strokeWidth="3" stroke="black" r="35.5" cy="37" cx="37"></circle>
              <path
                fill="black"
                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
              ></path>
            </svg>
          </button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default GalleryPreview;
