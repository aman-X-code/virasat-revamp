'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import 'swiper/css';

const partners = [
  // Sponsors - Static cards on top
  { name: 'ONGC', label: 'Supported by', sponsorType: 'supportedBy', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693784/prod/partners/partner-02_rmrk08.png' },
  { name: 'UPES', label: 'Powered by', sponsorType: 'poweredBy', logoUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1757693783/prod/partners/partner-01_hbnsjy.png' },

  // Partners - For marquee
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
  const sponsors = partners.filter((p: any) => (p as any).sponsorType);
  const regularPartners = partners.filter((p: any) => !(p as any).sponsorType);
  const swiperRef = useRef<any>(null);

  // Simple effect to restart autoplay when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current && swiperRef.current.swiper && swiperRef.current.swiper.autoplay) {
        swiperRef.current.swiper.autoplay.start();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
        
        {/* Static Sponsor Cards - Supported by & Powered by */}
        {sponsors.length > 0 && (
          <div className="mb-12" aria-label="Sponsors">
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 md:h-28 bg-gradient-to-r from-red-50/60 via-rose-50/60 to-orange-50/60 blur-xl rounded-full" aria-hidden></div>
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto justify-items-center">
                {sponsors.map((sponsor: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * idx }}
                    className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(124,45,18,0.08)] ring-1 ring-red-100/40 px-2 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-4 w-full max-w-[380px]"
                  >
                    <div className="shrink-0">
                      <span className="text-xs uppercase tracking-wider text-brand-red font-semibold">
                        {sponsor.label || (sponsor.sponsorType === 'supportedBy' ? 'Supported by' : 'Powered by')}
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        width={120}
                        height={56}
                        className="h-10 sm:h-12 md:h-14 object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Infinite Marquee with Swiper */}
        <div className="marquee-swiper-container">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={20}
            loop={true}
            speed={6000}
            allowTouchMove={false}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            className="marquee-swiper"
          >
            {/* Render slides multiple times for better loop effect */}
            {[...regularPartners, ...regularPartners].map((partner, index) => {
              // Check if this is partner with white logo
              const isWhiteLogo = partner.name === 'Art Foundation' || partner.name === 'Traditional Crafts';
              
              return (
                <SwiperSlide key={index} className="marquee-swiper-slide">
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    width={120}
                    height={80}
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
