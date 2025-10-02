'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { gsap } from 'gsap';
import ComponentErrorBoundary from './ComponentErrorBoundary';
import { allEvents } from '@/lib/events';

// Helper function for event images
function getEventImageUrl(title: string): string {
  const kebabCase = title
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `https://res.cloudinary.com/digilabs/image/upload/f_auto,q_auto,w_500/prod/events/prod/events/${kebabCase}.jpg`;
}

const rawEvents = allEvents.slice(0, 10);
const eventImages = rawEvents.map(event => getEventImageUrl(event.title));

const HeroEventsSection = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0); // Start with index 0 for 'Choliya – Folk Form of Uttarakhand'
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [peacockVisible, setPeacockVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  
  const backgroundVideoUrl = "https://res.cloudinary.com/digilabs/video/upload/v1759244383/prod/hero/prod/hero/laptop_screen_bg_ykp6td.mp4";

  // Independent animation timing (not dependent on video loading)
  useEffect(() => {
    // Show peacock circle after a fixed delay
    const peacockTimer = setTimeout(() => {
      setPeacockVisible(true);
    }, 800); // 800ms after component mounts

    // Show text after peacock circle appears
    const textTimer = setTimeout(() => {
      setTextVisible(true);
    }, 1300); // 1300ms after component mounts (800ms + 500ms)

    return () => {
      clearTimeout(peacockTimer);
      clearTimeout(textTimer);
    };
  }, []); // Empty dependency array - runs once on mount

  // Events carousel logic
  useEffect(() => {
    let xPos = 0;
    if (!containerRef.current || !ringRef.current) return;

    if (ringRef.current) {
      gsap.set(ringRef.current, { rotationY: 180 });
      
      imagesRef.current.forEach((img, i) => {
        if (img) {
          gsap.set(img, {
            rotateY: i * -36,
            transformOrigin: '50% 50% 500px',
            z: -500,
            opacity: 1,
            backgroundImage: `url(${eventImages[i] || eventImages[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backfaceVisibility: 'hidden'
          });
        }
      });
    }

    const timer = setTimeout(() => {
      if (!ringRef.current) return;

      const tl = gsap.timeline();
      tl.set(ringRef.current, { rotationY: 180 });

      imagesRef.current.forEach((img, i) => {
        if (img) {
          gsap.set(img, {
            rotateY: i * -36,
            transformOrigin: '50% 50% 500px',
            z: -500,
            backgroundImage: `url(${eventImages[i] || eventImages[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backfaceVisibility: 'hidden',
            opacity: 1,
            y: 0
          });
        }
      });

      tl.from(imagesRef.current.filter(Boolean), {
        duration: 1.2,
        scale: 0.8,
        opacity: 0.3,
        stagger: 0.1,
        ease: 'power2.out'
      });

      // Initialize center card after animation
      setTimeout(() => {
        initializeCenterCard();
      }, 100);
    }, 50);

    // Drag functionality
    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      // Prevent default to avoid conflicts with page scrolling
      e.preventDefault();
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      xPos = Math.round(clientX);
      if (ringRef.current) {
        gsap.set(ringRef.current, { cursor: 'grabbing' });
      }
      
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('touchmove', handleDrag, { passive: false });
    };

    const updateCurrentEvent = (rotation: number) => {
      const normalizedRotation = ((rotation % 360) + 360) % 360;
      const eventIndex = Math.round(normalizedRotation / 36) % 10;
      setCurrentEventIndex(eventIndex);
    };

    // Initialize with center card to match the visual center
    const initializeCenterCard = () => {
      if (ringRef.current) {
        // Set initial rotation to show the correct card in the center
        // The center card should be at index 0 for 'Choliya – Folk Form of Uttarakhand'
        gsap.set(ringRef.current, { rotationY: 180 });
        setCurrentEventIndex(0);
      }
    };

    const handleDrag = (e: MouseEvent | TouchEvent) => {
      // Prevent default to avoid conflicts with page scrolling
      e.preventDefault();
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      if (ringRef.current) {
        const rotationChange = (Math.round(clientX) - xPos) % 360;
        gsap.to(ringRef.current, {
          rotationY: '-=' + rotationChange,
          duration: 0.1,
          onUpdate: function() {
            const currentRotation = gsap.getProperty(ringRef.current, 'rotationY') as number;
            updateCurrentEvent(currentRotation);
          }
        });
      }
      xPos = Math.round(clientX);
    };

    const handleDragEnd = () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('touchmove', handleDrag);
      if (ringRef.current) {
        gsap.set(ringRef.current, { cursor: 'grab' });
      }
    };

    // Attach drag events to the container with better event handling
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener('mousedown', handleDragStart);
      containerElement.addEventListener('touchstart', handleDragStart, { passive: false });
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      clearTimeout(timer);
      if (containerElement) {
        containerElement.removeEventListener('mousedown', handleDragStart);
        containerElement.removeEventListener('touchstart', handleDragStart);
      }
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('touchmove', handleDrag);
    };
  }, []);

  return (
    <ComponentErrorBoundary componentName="Hero Events Section">
      <div className="relative min-h-[220vh] bg-black">
        
        {/* LAYER 1: HERO VIDEO BACKGROUND */}
        <video
          className="absolute inset-0 w-full h-screen object-cover z-10"
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
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src={backgroundVideoUrl} type="video/mp4" />
        </video>


        {/* LAYER 1: EVENTS SOLID BLACK BACKGROUND */}
        <div 
          className="absolute w-full z-10"
          style={{
            top: '100vh',
            height: '120vh',
            backgroundColor: '#000'
          }}
        />
        
        {/* Fabric Texture Background for Events */}
        <div 
          className="absolute w-full z-10"
          style={{
            top: '100vh',
            height: '120vh',
            backgroundImage: 'url(https://res.cloudinary.com/digilabs/image/upload/v1759174422/prod/texture/fabric_texture_dtbgi8.jpg)',
            backgroundSize: 'auto',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: 0.18
          }}
        />
        


        {/* LAYER 2: DARK FADE OVERLAYS */}
        {/* Hero bottom fade - stronger for better blending */}
        <div 
          className="absolute bottom-0 left-0 right-0 w-full h-[500px] z-20"
          style={{
            top: 'calc(100vh - 500px)',
            background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.2) 90%, transparent 100%)'
          }}
        />
        
        {/* Events top fade - stronger for better blending */}
        <div 
          className="absolute left-0 right-0 w-full h-[300px] z-20"
          style={{
            top: '100vh',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)'
          }}
        />
        
        {/* Events bottom fade */}
        <div 
          className="absolute left-0 right-0 w-full h-[200px] z-20"
          style={{
            top: 'calc(220vh - 200px)',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
          }}
        />

        {/* LAYER 3: PEACOCK CIRCLE */}
        <motion.div 
          className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: peacockVisible ? 1 : 0, 
            scale: peacockVisible ? 1 : 0.8 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div 
            className="relative rounded-full overflow-hidden"
            style={{
              width: 'min(135vw, 1250px)',
              height: 'min(135vw, 1250px)',
              top: '48%',
              transform: 'translateY(-50%)',
            }}
          >
            {/* Peacock Underlay */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundColor: '#FF7C60',
                opacity: 0.17
              }}
            />
            
            {/* Peacock Background */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(https://res.cloudinary.com/digilabs/image/upload/v1759174280/prod/hero/prod/hero/peacock_vkylk9.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 1
              }}
            />
          </div>
        </motion.div>

        {/* LAYER 4: HERO CONTENT */}
        <div className="absolute inset-0 w-full h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center z-40">
          <div className="w-full max-w-6xl mx-auto text-center">
            <motion.div
              className="mb-8 relative"
              style={{ marginTop: '28rem' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: textVisible ? 1 : 0, 
                y: textVisible ? 0 : 30 
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-berkshire-swash text-white drop-shadow-2xl"
                style={{ fontFamily: 'var(--font-berkshire-swash)' }}
              >
                Virasat 202<span style={{ color: '#E0A106' }}>5</span>
              </h1>
              
              <div className="mt-8 text-white text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                <p>Born in 1995 in Dehradun, REACH (Rural Entrepreneurship for Art &</p>
                <p>Cultural Heritage) emerged to safeguard India&apos;s fading traditions at a</p>
                <p>time when modernization threatened.</p>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-[3vh] left-[50%] transform -translate-x-1/2 flex flex-col items-center z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: textVisible ? 1 : 0, 
                y: textVisible ? 0 : 20 
              }}
              transition={{ duration: 1, ease: "easeOut" }}
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

        {/* LAYER 4: EVENTS CONTENT */}
        <div 
          className="absolute w-full pt-2 pb-12 px-4 sm:px-6 z-40"
          style={{
            top: '100vh',
            minHeight: '120vh'
          }}
        >
          {/* Section Header */}
          <div className="text-center mb-8 mt-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-berkshire-swash text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-berkshire-swash)' }}>
                Cultural Heritage<br className="md:hidden" />
                <span className="hidden md:inline"> </span>Festival
              </h2>
            <div className="w-24 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-600 to-orange-600" />
          </div>

          {/* 3D Carousel Container */}
          <div className="relative w-full h-96 flex items-center justify-center mb-8">
            <div 
              ref={containerRef}
              className="relative cursor-grab"
              style={{
                perspective: '2000px',
                width: '300px',
                height: '400px'
              }}
            >
              <div 
                ref={ringRef}
                className="relative w-full h-full"
                style={{ 
                  transformStyle: 'preserve-3d'
                }}
              >
                {Array.from({ length: 10 }, (_, i) => {
                  const isActive = i === currentEventIndex;
                  return (
                    <div
                      key={i}
                      ref={(el) => {
                        if (el) imagesRef.current[i] = el;
                      }}
                      className="absolute inset-0 rounded-xl border-2 border-white/10"
                      style={{
                        transformStyle: 'preserve-3d',
                        userSelect: 'none',
                        boxShadow: isActive 
                          ? '0 0 25px rgba(255,193,7,0.5), 0 20px 40px rgba(0,0,0,0.3)' 
                          : '0 20px 40px rgba(0,0,0,0.3)',
                        transition: 'box-shadow 0.3s ease',
                        opacity: 1,
                        backgroundImage: `url(${eventImages[i] || eventImages[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        border: isActive ? '2px solid #fbbf24' : '2px solid rgba(255,255,255,0.1)'
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Event Information */}
          <div className="mb-6">
            <div className="max-w-4xl mx-auto px-6">
              <div className="grid grid-cols-3 gap-8 text-center relative">
                <div className="space-y-3">
                  <h3 className="font-semibold text-xl mb-4" style={{ color: '#E0A106' }}>Time</h3>
                  <div className="text-white text-base" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                    <div className="font-medium">{rawEvents[currentEventIndex]?.time || '7:30 PM'}</div>
                    <div className="opacity-80">{rawEvents[currentEventIndex]?.date || '4th October, Saturday'}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-xl mb-4" style={{ color: '#E0A106' }}>Artist</h3>
                  <div className="text-white text-base" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                    <div className="font-medium">{rawEvents[currentEventIndex]?.title || 'Wadali Brothers'}</div>
                    <div className="opacity-80">{rawEvents[currentEventIndex]?.category || 'Classical Performance'}</div>
                  </div>
                </div>
                
                 <div className="space-y-3">
                   <h3 className="font-semibold text-xl mb-4" style={{ color: '#E0A106' }}>Venue</h3>
                   <div className="text-white text-base" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                     <div className="font-medium">BR Ambedkar Stadium</div>
                     <div className="opacity-80">Dehradun Campus</div>
                   </div>
                 </div>

                <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-60"></div>
                <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-60"></div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link 
              href="/events" 
              className="group inline-flex items-center cursor-pointer font-semibold transition-all duration-200 py-2.5 px-5 rounded-full border border-transparent bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600"
              style={{ fontSize: '15px' }}
            >
              <span>Explore All Events</span>
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
            </Link>
          </div>

          {/* Instructions */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>
              Drag to rotate • Hover to highlight
            </p>
          </div>
        </div>

      </div>
    </ComponentErrorBoundary>
  );
};

export default HeroEventsSection;