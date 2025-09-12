'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const partners = [
  { name: 'Heritage Foundation', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693783/prod/partners/partner-01_hbnsjy.png' },
  { name: 'Cultural Trust', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693784/prod/partners/partner-02_rmrk08.png' },
  { name: 'Artisan Guild', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693784/prod/partners/partner-03_vmewvr.png' },
  { name: 'National Museum', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693786/prod/partners/partner-04_bnxefh.png' },
  { name: 'Traditional Arts', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693788/prod/partners/partner-05_k69daf.png' },
  { name: 'History Channel', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693789/prod/partners/partner-6_lp0hiy.png' },
  { name: 'Legacy Bank', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693791/prod/partners/partner-07_sixvjk.png' },
  { name: 'Cultural Institute', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693793/prod/partners/partner-08_hrnfht.png' },
  { name: 'Heritage Society', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693795/prod/partners/partner-09_iqdnop.png' },
  { name: 'Art Foundation', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693796/prod/partners/partner-10_lwz6y7.png' },
  { name: 'Traditional Crafts', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693798/prod/partners/partner-11_jbcgti.png' },
  { name: 'Cultural Center', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693800/prod/partners/partner-12_vn55mz.png' },
];

export const PartnersSection = () => {
  const sectionBgColor = '#FFF7F5F4'; // Matching Cultural Heritage Festival background

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className="pt-4 pb-20"
      style={{ backgroundColor: sectionBgColor }}
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-brand-brown mb-6">
          Our Esteemed Partners
        </h2>
        {/* Decorative gradient line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-24 h-1 mx-auto mb-12 rounded-full"
          style={{
            background: 'linear-gradient(to right, #dc2626, #7c2d12)'
          }}
        />
        
        {/* Infinite Marquee with Swiper */}
        <div className="marquee-swiper-container">
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={20}
            loop={true}
            speed={6000}
            allowTouchMove={false}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
            }}
            className="marquee-swiper"
          >
            {/* Render slides multiple times for better loop effect */}
            {[...partners, ...partners].map((partner, index) => {
              // Check if this is partner 10 or 11 (Art Foundation or Traditional Crafts)
              const isWhiteLogo = partner.name === 'Art Foundation' || partner.name === 'Traditional Crafts';
              
              return (
                <SwiperSlide key={index} className="marquee-swiper-slide">
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className={`h-20 object-contain ${
                      isWhiteLogo ? 'invert' : ''
                    }`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
};

export default PartnersSection;
