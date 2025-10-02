'use client';

import './globals.css';
import { Berkshire_Swash, League_Spartan } from 'next/font/google';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { trackWebVitals } from '@/lib/performance';

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });

const berkshireSwash = Berkshire_Swash({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-berkshire-swash',
  display: 'swap',
  preload: true, // Primary hero font
});

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-league-spartan',
  display: 'swap',
  preload: true, // Hero subtitle font
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This state will be true on first load and on every refresh.
  // It will persist as `false` across client-side navigations.
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Suppress Next.js router scroll warnings in development
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const originalConsoleWarn = console.warn;
      console.warn = function(...args) {
        const message = args[0];
        if (typeof message === 'string' && message.includes('Skipping auto-scroll behavior due to')) {
          // Suppress this specific warning as it's expected behavior
          return;
        }
        originalConsoleWarn.apply(console, args);
      };
      
      return () => {
        console.warn = originalConsoleWarn;
      };
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    // Track performance metrics after loading
    if (typeof window !== 'undefined') {
      trackWebVitals();
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preload" href="/images/rangoli-about.png" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Performance meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#B09E91" />
        <meta name="color-scheme" content="light" />
        
        
        {/* Resource hints for better performance */}
        <link rel="preload" href="https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_160,c_limit/v1759346303/prod/hero/prod/hero/vir_z2ln92.png" as="image" />
        <link rel="preload" href="https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_160,c_limit/v1759346302/prod/hero/prod/hero/reach_pab9vf.png" as="image" />
        
        {/* Preload critical CSS and JS */}
        <link rel="preload" href="/images/rangoli.svg" as="image" />
      </head>
      <body className={`${berkshireSwash.variable} ${leagueSpartan.variable} font-sans`} style={{ backgroundColor: '#000000' }}>
        <noscript>
          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fef3c7', border: '1px solid #f59e0b', margin: '10px' }}>
            <h2>JavaScript Required</h2>
            <p>This website requires JavaScript to function properly. Please enable JavaScript in your browser to continue.</p>
          </div>
        </noscript>
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
            </motion.div>
          </ErrorBoundary>
        )}
      </body>
    </html>
  );
}