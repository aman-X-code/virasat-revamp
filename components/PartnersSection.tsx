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
      initial={{ opacity: 1 }}
      className="pt-4 pb-20 relative"
      style={{ backgroundColor: '#000', zIndex: 10 }}
    >
      {/* Fabric Texture Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/digilabs/image/upload/v1759174422/prod/texture/fabric_texture_dtbgi8.jpg)',
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          opacity: 0.35
        }}
      />

      {/* Top Fade Overlay */}
      <div
        className="absolute top-0 left-0 right-0 z-2"
        style={{
          height: '200px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)'
        }}
      />

      {/* Bottom Fade Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 z-2"
        style={{
          height: '200px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)'
        }}
      />
      <div className="container mx-auto relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-berkshire-swash text-center text-white mb-6" style={{ fontFamily: 'var(--font-berkshire-swash)' }}>
              Our Esteemed<br className="md:hidden" />
              <span className="hidden md:inline"> </span>Partners
            </h2>
        {/* Decorative gradient line */}
        <motion.div
          initial={{ opacity: 1, scaleX: 1 }}
          className="w-24 h-1 mx-auto mb-12 rounded-full bg-gradient-to-r from-red-600 to-orange-600"
        />
        
        {/* Static Sponsor Cards - Powered by & Supported by */}
        {sponsors.length > 0 && (
          <div className="mb-12" aria-label="Sponsors">
            <div className="relative">
              <div className="relative grid grid-cols-1 gap-2 sm:gap-3 max-w-md mx-auto justify-items-center">
                {/* Powered by - Show first */}
                {sponsors.filter((sponsor: any) => sponsor.sponsorType === 'poweredBy').map((sponsor: any, idx: number) => (
                  <motion.div
                    key={`powered-${idx}`}
                    initial={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-xl border border-white/40 bg-white shadow-[0_8px_30px_rgba(124,45,18,0.08)] ring-1 ring-red-100/40 px-2 sm:px-3 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 w-full max-w-[280px]"
                  >
                    <div className="shrink-0">
                      <span className="text-xs uppercase tracking-wider text-brand-red font-semibold">
                        Powered by
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        width={100}
                        height={48}
                        className="h-8 sm:h-10 object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
                
                {/* Supported by - Show second */}
                {sponsors.filter((sponsor: any) => sponsor.sponsorType === 'supportedBy').map((sponsor: any, idx: number) => (
                  <motion.div
                    key={`supported-${idx}`}
                    initial={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-xl border border-white/40 bg-white shadow-[0_8px_30px_rgba(124,45,18,0.08)] ring-1 ring-red-100/40 px-2 py-2 flex items-center gap-2 w-full max-w-[220px]"
                  >
                    <div className="shrink-0">
                      <span className="text-xs uppercase tracking-wider text-brand-red font-semibold">
                        Supported by
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        width={80}
                        height={40}
                        className="h-6 sm:h-7 object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Partners Over the Years Heading */}
        <div className="mb-8">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-berkshire-swash text-center text-white mb-4" style={{ fontFamily: 'var(--font-berkshire-swash)' }}>
            Partners Over the<br className="md:hidden" />
            <span className="hidden md:inline"> </span>Years
          </h3>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-red-600 to-orange-600"></div>
        </div>

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
              const isWhiteLogo = partner.name === 'Heritage Society';
              
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
