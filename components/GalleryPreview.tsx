'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from './ui/button';

const galleryItems = [
  { type: 'image', src: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_80,w_600,c_limit/prod/gallery/2023/prod/gallery/2023/3.jpg' },
  { type: 'image', src: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_80,w_600,c_limit/prod/gallery/2023/prod/gallery/2023/13.jpg' },
  { type: 'image', src: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_80,w_600,c_limit/prod/gallery/2022/prod/gallery/2022/12.jpg' },
  { type: 'image', src: 'https://res.cloudinary.com/digilabs/image/upload/f_auto,q_80,w_600,c_limit/prod/gallery/2024/prod/gallery/2024/9.jpg' },
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-4 pb-20 px-4 sm:px-6 container mx-auto"
      style={{ 
        backgroundColor: '#FFF7F5F4',
        contain: 'layout style paint',
        isolation: 'isolate'
      }}
    >
      <motion.div
        className="text-center max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-brown mb-6 leading-tight"
          variants={itemVariants}
        >
          Festival Memories Through the Years
        </motion.h2>
        {/* Decorative gradient line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-24 h-1 mx-auto mb-8 sm:mb-12 rounded-full"
          style={{
            background: 'linear-gradient(to right, #dc2626, #7c2d12)'
          }}
        />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            className="group relative rounded-lg overflow-hidden shadow-lg border-4 border-brand-earthen-light aspect-square"
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
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={`Gallery item ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <video
                src={item.src}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                style={{ objectFit: 'cover' }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-8 sm:mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Link href="/gallery">
          <Button size="lg" className="bg-brand-red text-white hover:bg-brand-red-dark text-base sm:text-lg font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
            View Full Gallery &rarr;
          </Button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default GalleryPreview;
