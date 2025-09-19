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
  const gridItems = [
    {
      id: 1,
      video: "https://res.cloudinary.com/digilabs/video/upload/f_auto,q_auto/v1758275716/prod/hero/prod/hero/second.mp4",
      className: "col-span-1 row-span-2",
      delay: 0.2,
    },
    {
      id: 2,
      video: "https://res.cloudinary.com/digilabs/video/upload/f_auto,q_auto/v1758276111/prod/hero/prod/hero/third.mp4",
      className: "col-span-1 row-span-1",
      delay: 0.4,
    },
    {
      id: 3,
      video: "https://res.cloudinary.com/digilabs/video/upload/f_auto,q_auto/v1758277639/prod/hero/prod/hero/fourth.mp4",
      className: "col-span-1 row-span-1",
      delay: 0.6,
    },
    {
      id: 4,
      video: "https://res.cloudinary.com/digilabs/video/upload/f_auto,q_auto/prod/hero/prod/hero/secon.mp4",
      className: "col-span-1 row-span-2",
      delay: 0.8,
    },
  ];

  return (
    <section
      data-testid="hero-section"
      className="min-h-screen relative overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255, 140, 0, 0.1), transparent 70%), url("https://res.cloudinary.com/digilabs/raw/upload/prod/hero/prod/hero/background-pattern.svg")',
          backgroundSize: "cover, 300px 300px",
          opacity: 0.3,
        }}
      />

      {/* Bento Grid Container */}
      <div className="relative z-10 w-full h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto">
          {isMobile ? (
            <div className="relative w-full h-[85vh] max-h-[800px] mt-16">
              <ComponentErrorBoundary componentName="Hero Carousel">
                <HeroCarousel items={gridItems} />
              </ComponentErrorBoundary>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
                {/* Clean & Elegant Text Container */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {/* Subtle Background Glow */}
                  <motion.div
                    className="absolute inset-0 w-72 h-32 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-2xl blur-xl"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Main Text Container */}
                  <motion.div
                    className="relative px-6 py-4 pb-4 rounded-2xl backdrop-blur-sm bg-black/20 border border-white/10"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    {/* VIRASAT Text */}
                    <motion.h1
                      className="text-5xl sm:text-6xl font-bold leading-tight mb-1"
                      style={{
                        fontFamily:
                          'var(--font-cinzel), "Cinzel", "Playfair Display", serif',
                        fontWeight: "700",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        background:
                          "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ea580c 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter:
                          "drop-shadow(0 4px 20px rgba(251, 191, 36, 0.4))",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      Virasat
                    </motion.h1>

                    {/* Elegant Divider */}
                    <motion.div
                      className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-2"
                      initial={{ width: 0 }}
                      animate={{ width: 64 }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                    />

                    {/* Subtitle */}
                    <motion.p
                      className="text-lg sm:text-xl text-white/95 font-light tracking-wide"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.4 }}
                      style={{
                        textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      Heritage in the Hills
                    </motion.p>
                  </motion.div>


                  {/* Single Floating Accent */}
                  <motion.div
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full"
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-4 grid-rows-2 gap-6 h-[80vh] max-h-[800px] w-full mt-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              {/* Grid Items with Videos */}
              {gridItems.map((item) => (
                <div
                  key={item.id}
                  className={`${item.className} relative group cursor-pointer overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500`}
                >
                  <video
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={`https://res.cloudinary.com/digilabs/image/upload/f_auto,q_auto,w_800,c_limit/prod/hero/prod/hero/${item.video.split("/").pop()?.replace(".mp4", ".jpg")}`}
                    onError={(e) => {
                      console.error('Video failed to load:', item.video);
                      // Fallback to poster image if video fails
                      const videoElement = e.target as HTMLVideoElement;
                      const posterElement = document.createElement('div');
                      posterElement.className = 'w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center';
                      posterElement.innerHTML = '<div class="text-white/60 text-sm">Heritage Video</div>';
                      videoElement.parentNode?.replaceChild(posterElement, videoElement);
                    }}
                  >
                    <source src={item.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating particles */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full opacity-60" />
                </div>
              ))}

              {/* Center Logo - Virasat */}
              <motion.div
                className="col-span-2 row-span-2 relative flex items-center justify-center rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                {/* Rangoli background pattern */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ transform: "translateX(-1.5%)" }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Image
                      src="https://res.cloudinary.com/digilabs/raw/upload/prod/hero/prod/hero/rangoli.svg"
                      alt="Rangoli"
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </div>

                {/* Shiny Virasat Text */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <motion.h1
                    className="text-5xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 via-amber-300 to-red-400 bg-clip-text text-transparent leading-tight mb-2"
                    style={{
                      fontFamily:
                        'var(--font-cinzel), "Cinzel", "Playfair Display", serif',
                      backgroundSize: "200% 200%",
                      fontWeight: "600",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    Virasat
                  </motion.h1>

                  <motion.p
                    className="text-lg sm:text-xl md:text-2xl text-white/90 font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                  >
                    Heritage in the Hills
                  </motion.p>

                  {/* Scroll Down Graphic */}
                  <motion.div
                    className="absolute bottom-[1%] left-[47.5%] transform -translate-x-1/2 flex flex-col items-center"
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

                </motion.div>

                {/* Floating decorative elements */}
                <motion.div
                  className="absolute top-4 left-4 w-3 h-3 bg-amber-400 rounded-full opacity-70"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-60"
                  animate={{
                    y: [0, 8, 0],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
