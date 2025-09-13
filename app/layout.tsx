'use client';

import './globals.css';
import { Playfair_Display, Lato, Cormorant_Garamond, Cinzel } from 'next/font/google';
import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingGetTicketsButton from '@/components/FloatingGetTicketsButton';
import ErrorBoundary from '@/components/ErrorBoundary';

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This state will be true on first load and on every refresh.
  // It will persist as `false` across client-side navigations.
  const [loading, setLoading] = useState(true);


  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <html lang="en">
      <head>
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//checkout.razorpay.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://checkout.razorpay.com" crossOrigin="anonymous" />
        <link rel="preload" href="/images/rangoli-about.png" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Performance meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#B09E91" />
        <meta name="color-scheme" content="light" />
        
        
        {/* Resource hints for better performance */}
        <link rel="preload" href="/images/vir.png" as="image" />
        <link rel="preload" href="/images/reach.png" as="image" />
        
        {/* Preload critical CSS and JS */}
        <link rel="preload" href="/images/rangoli.svg" as="image" />
        <link rel="preload" href="/images/textured-background.svg" as="image" />
      </head>
      <body className={`${playfairDisplay.variable} ${lato.variable} ${cormorantGaramond.variable} ${cinzel.variable} font-sans bg-brand-white`}>
        {loading ? (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        ) : (
          <ErrorBoundary>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Header />
              <main>{children}</main>
              <Footer />
              <FloatingGetTicketsButton />
            </motion.div>
          </ErrorBoundary>
        )}
      </body>
    </html>
  );
}