'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { gsap } from 'gsap';
import ComponentErrorBoundary from './ComponentErrorBoundary';

// Helper function to convert event title to Cloudinary image name
function getEventImageUrl(title: string): string {
  const kebabCase = title
    .toLowerCase()
    .replace(/[–—]/g, '-')           // Replace em/en dashes
    .replace(/[^\w\s-]/g, '')       // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/-+/g, '-')            // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');         // Remove leading/trailing hyphens
  
  return `https://res.cloudinary.com/digilabs/image/upload/f_auto,q_auto,w_500/prod/events/prod/events/${kebabCase}.jpg`;
}

// Real events data (first 10 non-cancelled events)
const rawEvents = [
  {
    id: 2,
    title: "Choliya – Folk Form of Uttarakhand",
    description: "Experience the traditional folk dance of Uttarakhand, showcasing the rich cultural heritage of the Himalayan region."
  },
  {
    id: 3,
    title: "Sarod recital by Ustad Amjad Ali Khan",
    description: "An enchanting evening with the legendary sarod maestro, presenting classical ragas and timeless melodies."
  },
  {
    id: 6,
    title: "Sitar recital by Adnan Khan",
    description: "An evening of soulful sitar melodies by the renowned Adnan Khan, exploring the depths of Hindustani classical music."
  },
  {
    id: 7,
    title: "Osman Mir Live",
    description: "A contemporary musical experience with Osman Mir, blending traditional and modern sounds in a unique performance."
  },
  {
    id: 9,
    title: "Folk performances from Uttarakhand",
    description: "A vibrant showcase of traditional folk music and dance forms from the beautiful state of Uttarakhand."
  },
  {
    id: 10,
    title: "Sarod recital by Pratik Shrivastava",
    description: "An intimate performance by the talented sarod artist Pratik Shrivastava, presenting classical compositions."
  },
  {
    id: 11,
    title: "Hindustani vocal by Pt Ulhas Kashalkar",
    description: "An evening of classical vocal music by the renowned Pandit Ulhas Kashalkar, master of the Gwalior gharana."
  },
  {
    id: 13,
    title: "Sitar recital by Soumitra Thakur",
    description: "An evening of classical sitar music by the talented Soumitra Thakur, exploring traditional ragas and compositions."
  },
  {
    id: 14,
    title: "Vocal recital by Aniruddh Aithal",
    description: "A soulful vocal performance by Aniruddh Aithal, presenting classical Hindustani vocal music with traditional compositions."
  },
  {
    id: 16,
    title: "Slide Guitar concert by Deepak Kshirsagar",
    description: "A unique musical experience with slide guitar maestro Deepak Kshirsagar, blending traditional and contemporary sounds."
  }
];

// Generate Cloudinary image URLs for the carousel
const eventImages = rawEvents.map(event => getEventImageUrl(event.title));

const EventsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  let xPos = 0;

  useEffect(() => {
    if (!containerRef.current || !ringRef.current) return;

    // Immediate setup for visibility
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

    // Wait for component to mount (reduced timeout)
    const timer = setTimeout(() => {
      if (!ringRef.current) return;

      // Initialize GSAP timeline
      const tl = gsap.timeline();
      
      // Set initial rotation
      tl.set(ringRef.current, { 
        rotationY: 180
      });

      // Set up each image with initial visibility
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
            opacity: 1, // Ensure images are visible from start
            y: 0 // Start at normal position
          });
        }
      });

      // Animate images in with a subtle entrance effect
      tl.from(imagesRef.current.filter(Boolean), {
        duration: 1.2,
        scale: 0.8,
        opacity: 0.3,
        stagger: 0.1,
        ease: 'power2.out'
      });

      // Add hover effects
      imagesRef.current.forEach((img) => {
        if (img) {
          img.addEventListener('mouseenter', () => {
            gsap.to(imagesRef.current.filter(Boolean), {
              opacity: (i, t) => (t === img) ? 1 : 0.5,
              ease: 'power3',
              duration: 0.3
            });
          });
          
          img.addEventListener('mouseleave', () => {
            gsap.to(imagesRef.current.filter(Boolean), {
              opacity: 1,
              ease: 'power2.inOut',
              duration: 0.3
            });
          });
        }
      });
    }, 50);

    // Drag functionality
    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      xPos = Math.round(clientX);
      if (ringRef.current) {
        gsap.set(ringRef.current, { cursor: 'grabbing' });
      }
      
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('touchmove', handleDrag);
    };

    const handleDrag = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotationY: '-=' + ((Math.round(clientX) - xPos) % 360),
          duration: 0.1
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

    // Add event listeners
    document.addEventListener('mousedown', handleDragStart);
    document.addEventListener('touchstart', handleDragStart);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);

    // Cleanup
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleDragStart);
      document.removeEventListener('touchstart', handleDragStart);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('touchmove', handleDrag);
    };
  }, []);

  return (
    <ComponentErrorBoundary componentName="Events Section">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-4 pb-20 px-4 sm:px-6 min-h-screen relative overflow-hidden"
        style={{ 
          backgroundColor: '#000',
          contain: 'layout style paint',
          isolation: 'isolate'
        }}
      >
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-griffy text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Virasat Festival Events
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 mx-auto mb-8 rounded-full bg-gradient-to-r from-red-600 to-orange-600"
          />
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience the magic of Indian culture through our immersive 3D event showcase
          </motion.p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative w-full h-96 flex items-center justify-center mb-16">
          <div 
            ref={containerRef}
            className="relative"
            style={{
              perspective: '2000px',
              width: '300px',
              height: '400px'
            }}
          >
            <div 
              ref={ringRef}
              className="relative w-full h-full cursor-grab"
              style={{ 
                transformStyle: 'preserve-3d'
              }}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) imagesRef.current[i] = el;
                  }}
                  className="absolute inset-0 rounded-xl border-2 border-white/10"
                  style={{
                    transformStyle: 'preserve-3d',
                    userSelect: 'none',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    transition: 'opacity 0.3s ease',
                    opacity: 1, // Ensure fallback visibility
                    backgroundImage: `url(${eventImages[i] || eventImages[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link 
            href="/events" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore All Events
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="text-center mt-8 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-gray-400 text-sm">
            Drag to rotate • Hover to highlight
          </p>
        </motion.div>
      </motion.section>
    </ComponentErrorBoundary>
  );
};

export default EventsSection;