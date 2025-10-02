"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import ComponentErrorBoundary from "./ComponentErrorBoundary";

const HeroCarousel = dynamic(() => import("./HeroCarousel"), {
  loading: () => <div className="w-full h-full bg-black/20 backdrop-blur-sm"></div>,
  ssr: false,
});

const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Set initial value
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};

const HeroSection = () => {
  const isMobile = useIsMobile();
  const backgroundVideoUrl = "https://res.cloudinary.com/digilabs/video/upload/v1758814315/prod/hero/prod/hero/laptop_screen_bg_mfckkk.mp4";

  return (
    <section
      data-testid="hero-section"
      className="min-h-screen relative overflow-hidden bg-black"
      style={{ zIndex: 10 }}
    >
      {/* Background Video - Full Screen */}
      <video
        className="absolute inset-0 w-full h-full object-cover sm:object-cover md:object-cover lg:object-cover xl:object-fill z-0 min-h-screen"
        style={{ objectPosition: 'center center' }}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        onError={(e) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Background video failed to load:', backgroundVideoUrl);
          }
          // Fallback to gradient background if video fails
          const videoElement = e.target as HTMLVideoElement;
          const fallbackElement = document.createElement('div');
          fallbackElement.className = 'absolute inset-0 bg-gradient-to-br from-amber-900/50 via-orange-800/50 to-red-900/50';
          videoElement.parentNode?.replaceChild(fallbackElement, videoElement);
        }}
      >
        <source src={backgroundVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Bottom Fade Overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-1"
        style={{
          height: '400px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.4) 80%, transparent 100%)'
        }}
      />

      {/* Peacock Circle removed - now handled by UnifiedPeacockCircle component */}

      {/* Content Container */}
      <div className="relative z-50 w-full h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto text-center">
          {/* Virasat 2025 Text */}
          <motion.div
            className="mb-8 relative z-[300]"
            style={{ marginTop: '28rem' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-berkshire-swash text-white drop-shadow-2xl"
              style={{ fontFamily: 'var(--font-berkshire-swash)' }}
            >
              Virasat 202<span style={{ color: '#E0A106' }}>5</span>
            </h1>
            
            {/* Description Text */}
            <div className="mt-8 text-white text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }}>
              <p>Born in 1995 in Dehradun, REACH (Rural Entrepreneurship for Art &</p>
              <p>Cultural Heritage) emerged to safeguard India&apos;s fading traditions at a</p>
              <p>time when modernization threatened.</p>
            </div>
          </motion.div>
          
          {/* Scroll Down Graphic - Kept for navigation */}
          <motion.div
            className="absolute bottom-[1%] left-1/2 transform -translate-x-1/2 flex flex-col items-center z-[100]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <motion.div
              className="w-5 h-8 border-2 border-amber-300/50 rounded-full flex justify-center"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-2 bg-amber-300 rounded-full mt-1.5"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
