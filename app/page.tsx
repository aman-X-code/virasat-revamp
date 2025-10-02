'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import HeroEventsSection from '@/components/HeroEventsSection';

const FAQSection = dynamic(() => import('@/components/FAQSection'), { 
  loading: () => <div className="animate-pulse bg-gray-100 h-32 rounded-lg mx-6" role="status" aria-label="Loading FAQ section"></div>
});
const PartnersSection = dynamic(() => import('@/components/PartnersSection'), { 
  loading: () => <div className="animate-pulse bg-gray-100 h-24 rounded-lg mx-6" role="status" aria-label="Loading partners section"></div>
});
const HighlightsSection = dynamic(() => import('@/components/HighlightsSection'), { 
  loading: () => <div className="animate-pulse bg-gray-100 h-40 rounded-lg mx-6" role="status" aria-label="Loading highlights section"></div>
});
const ArtistsSection = dynamic(() => import('@/components/ArtistsSection'), { 
  loading: () => <div className="animate-pulse bg-gray-100 h-96 rounded-lg mx-6" role="status" aria-label="Loading artists section"></div>
});

const AboutSection = dynamic(() => import('@/components/AboutSection'), { 
  loading: () => <div className="animate-pulse bg-gray-100 h-64 rounded-lg mx-6" role="status" aria-label="Loading about section"></div>
});
const GalleryPreview = dynamic(() => import('@/components/GalleryPreview'), { 
  loading: () => <div className="animate-pulse bg-gray-100 h-64 rounded-lg mx-6" role="status" aria-label="Loading gallery section"></div>
});

const HomePage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="text-white relative">
      {/* 1. Hero Section + Events Section with Unified Peacock */}
      <HeroEventsSection />

      {/* 3. Highlights/Key Features - Build trust and excitement */}
      <HighlightsSection />

      {/* 4. Featured Artists/Performers - Build credibility and star power */}
      <ArtistsSection />

      {/* 5. About Virasat by REACH - Provide context and build trust */}
      <AboutSection />

      {/* 6. Gallery Preview - Showcase festival memories */}
      <GalleryPreview />

      {/* 7. Partners/Sponsors - Social proof and credibility */}
      <PartnersSection />

      {/* 8. FAQ Section - Address concerns and remove barriers */}
      <FAQSection />
    </div>
  );
};

export default HomePage;
