/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Disable Next.js image optimization to avoid conflicts with Cloudinary
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Remove custom loader to avoid conflicts
    // loader: 'custom',
    // loaderFile: './lib/cloudinary-loader.ts',
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lucide-react'],
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Compression and caching
  compress: true,
  poweredByHeader: false,
  
  // Security headers
  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    const headers = [
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
    ];

    // Only add CSP in production
    if (!isDevelopment) {
      headers.push({
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://js.razorpay.com https://fonts.googleapis.com https://vercel.live blob:",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https: blob: https://res.cloudinary.com",
          "media-src 'self' https: blob: https://res.cloudinary.com",
          "connect-src 'self' https://api.razorpay.com https://checkout.razorpay.com https://res.cloudinary.com https://vercel.live https://lumberjack.razorpay.com https://cdn.jsdelivr.net https://maps.googleapis.com https://maps.gstatic.com",
          "frame-src 'self' https://checkout.razorpay.com https://vercel.live https://api.razorpay.com https://www.google.com",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'"
        ].join('; '),
      });
    }

    return [
      {
        source: '/(.*)',
        headers,
      },
      // Special headers for donate page - more permissive CSP
      {
        source: '/donate',
        headers: [
          ...headers.filter(h => h.key !== 'Content-Security-Policy'),
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:",
              "style-src 'self' 'unsafe-inline' https:",
              "font-src 'self' https:",
              "img-src 'self' data: https: blob:",
              "media-src 'self' https: blob:",
              "connect-src 'self' https:",
              "frame-src 'self' https:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; '),
          }
        ],
      },
    ];
  },
  // Bundle optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
