# 🎭 VIRASAT - Cultural Heritage Festival Website

[![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13.0-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![Production Ready](https://img.shields.io/badge/Production-Ready-green?style=for-the-badge)](https://github.com)

A modern, responsive website celebrating India's cultural heritage and traditions, built with Next.js 13, TypeScript, Tailwind CSS, and advanced animations. This project showcases the Virasat festival by **REACH** (Rural Entrepreneurship for Art & Cultural Heritage) - Afro-Asia's largest celebration of art and culture.

## 🌟 Project Overview

**VIRASAT** is a comprehensive cultural heritage website that transforms Dehradun into a living museum where classical ragas blend with folk dances, handmade crafts find new admirers, and theatre, literature, and traditional cuisines bring communities together. The website serves as both an information hub and a complete donation platform for the 15-day festival.

### 🎯 Key Highlights

- 🎪 **15-day Cultural Festival** - Complete event management and information system
- 💳 **PayU Payment Integration** - Live payment gateway with secure donation processing
- 📧 **Automated Email System** - Professional receipt emails with PDF attachments
- 🎨 **Advanced Animations** - GSAP and Framer Motion powered interactions
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🚀 **Performance Optimized** - Advanced caching, dynamic imports, and bundle optimization
- 🎭 **Cultural Design** - Traditional Indian aesthetics with modern UX
- 🔒 **Security First** - Comprehensive security headers and production-ready configuration
- 🏗️ **Clean Architecture** - Refactored codebase with optimized structure and zero console log exposure
- ⚡ **TypeScript Optimized** - Full type safety with zero compilation errors
- 🌐 **Production Deployed** - Live and fully functional payment system

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Git** for version control

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd virasat
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   # Run the setup script for easy configuration
   npm run setup-dev
   
   # Or manually create .env.local file
   cp .env.example .env.local
   
   # Add your credentials to .env.local:
   
   # PayU Payment Gateway (Production Ready)
   PAYUBIZ_MERCHANT_KEY=your_live_merchant_key
   PAYUBIZ_MERCHANT_SALT=your_live_merchant_salt
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Email Configuration (Custom SMTP)
   EMAIL_SERVICE=smtp
   EMAIL_HOST=mail.reachvirasat.org
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=noreply@reachvirasat.org
   EMAIL_PASSWORD=your_email_password
   
   # Cloudinary (for images)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   🌐 **Website**: [http://localhost:3000](http://localhost:3000)

### 🏗️ Production Build & Deployment

```bash
# Test PayU configuration
npm run test-payu

# Validate production setup
npm run validate-production

# Build for production
npm run build

# Start production server
npm start

# Production build with environment
npm run build-production
```

## 📁 Project Structure

```
virasat/
├── 📁 app/                          # Next.js 13 App Router
│   ├── 📁 about/                    # About REACH organization
│   │   └── page.tsx                 # About page component
│   ├── 📁 api/                      # API Routes
│   │   ├── 📁 donate/               # Donation callback handlers
│   │   │   ├── 📁 success/          # PayU success callback API
│   │   │   └── 📁 failure/          # PayU failure callback API
│   │   ├── 📁 payment/              # Payment processing APIs
│   │   │   ├── 📁 initiate/         # Payment initiation endpoint
│   │   │   ├── 📁 callback/         # PayU webhook handler
│   │   │   ├── 📁 verify/           # Payment verification
│   │   │   ├── 📁 success/          # Success processing
│   │   │   └── 📁 failure/          # Failure processing
│   │   └── 📁 send-email/           # Email sending API
│   ├── 📁 blogs/                    # News system (PDF downloads)
│   │   ├── 📁 [slug]/               # Dynamic blog routes
│   │   └── page.tsx                 # News listing page
│   ├── 📁 contact/                  # Contact page
│   │   └── page.tsx                 # Contact form with Google Maps
│   ├── 📁 donate/                   # Complete donation system
│   │   ├── 📁 success/              # Donation success page
│   │   ├── 📁 failure/              # Donation failure page
│   │   ├── 📁 status/               # Payment status verification
│   │   ├── 📁 payment-status/       # Payment status checking
│   │   ├── 📁 payu-success/         # PayU success redirect handler
│   │   ├── 📁 payu-failure/         # PayU failure redirect handler
│   │   ├── 📁 success-redirect/     # Success redirect middleware
│   │   └── page.tsx                 # Main donation form
│   ├── 📁 events/                   # Events information system
│   │   └── page.tsx                 # Events listing and details
│   ├── 📁 gallery/                  # Photo/video gallery
│   │   └── page.tsx                 # Masonry gallery with lightbox
│   ├── 📁 legends/                  # Cultural legends showcase
│   │   └── page.tsx                 # Artist profiles and stories
│   ├── 📁 privacy/                  # Privacy policy page
│   │   └── page.tsx                 # Privacy policy and data protection
│   ├── 📁 refund/                   # Refund policy page
│   │   └── page.tsx                 # Refund terms and conditions
│   ├── 📁 terms/                    # Terms and conditions page
│   │   └── page.tsx                 # Legal terms and conditions
│   ├── globals.css                  # Global styles and animations
│   ├── layout.tsx                   # Root layout with fonts and providers
│   └── page.tsx                     # Home page with hero and sections
├── 📁 components/                   # React components
│   ├── 📁 ui/                       # Reusable UI components (Radix UI)
│   │   ├── accordion.tsx            # FAQ accordion component
│   │   ├── alert.tsx                # Alert notifications
│   │   ├── badge.tsx                # Status badges
│   │   ├── bento-grid.tsx           # Grid layout component
│   │   ├── button.tsx               # Button variants
│   │   ├── card.tsx                 # Card component
│   │   ├── carousel.tsx             # Carousel wrapper
│   │   ├── form.tsx                 # Form components
│   │   ├── input.tsx                # Input fields
│   │   ├── label.tsx                # Form labels
│   │   ├── toast.tsx                # Toast notifications
│   │   └── toaster.tsx              # Toast container
│   ├── AboutSection.tsx             # About REACH section
│   ├── ArtistsSection.tsx           # Featured artists showcase
│   ├── CloudinaryImage.tsx          # Optimized image component
│   ├── ComponentErrorBoundary.tsx   # Component-level error boundary
│   ├── ErrorBoundary.tsx            # Main application error boundary
│   ├── FAQSection.tsx               # FAQ section with accordion
│   ├── Footer.tsx                   # Site footer with links
│   ├── GalleryPreview.tsx           # Gallery preview section
│   ├── Header.tsx                   # Site header with navigation
│   ├── HeroCarousel.tsx             # Hero carousel (mobile)
│   ├── HeroEventsSection.tsx        # Events showcase section
│   ├── HeroSection.tsx              # Main hero section with video
│   ├── HighlightsSection.tsx        # Journey highlights section
│   ├── LoadingScreen.tsx            # Initial loading animation
│   ├── PartnersSection.tsx          # Partners and sponsors
│   └── SmallLoader.tsx              # Small loading indicator
├── 📁 hooks/                        # Custom React hooks
│   ├── use-toast.ts                 # Toast notifications hook
│   ├── useErrorHandler.ts           # Error handling hook
│   └── useLoading.ts                # Loading state management
├── 📁 lib/                          # Utility libraries
│   ├── cloudinary-loader.ts         # Cloudinary image loader
│   ├── cloudinary.ts                # Cloudinary configuration
│   ├── csrf.ts                      # CSRF protection utilities
│   ├── email.ts                     # Email templates and PDF generation
│   ├── env-validation.ts            # Environment variable validation
│   ├── events.ts                    # Events data and management
│   ├── payu.ts                      # PayU payment gateway integration
│   ├── performance.ts               # Performance monitoring utilities
│   ├── rate-limit.ts                # In-memory rate limiting
│   ├── redis-rate-limit.ts          # Redis-based rate limiting
│   ├── security.ts                  # Security utilities and validation
│   └── utils.ts                     # General utility functions
├── 📁 public/                       # Static assets
│   ├── 📁 images/                   # Image assets
│   │   ├── circle_frame.png         # UI elements
│   │   └── qr.jpg                   # QR code for donations
│   ├── 📁 pdf/                      # PDF documents
│   │   ├── news-1.pdf               # News articles
│   │   └── news-2.pdf
│   └── payu-redirect.html           # PayU redirect helper
├── 📁 scripts/                      # Build and utility scripts
│   ├── setup-dev.js                 # Development environment setup
│   ├── test-payu.js                 # PayU integration testing
│   ├── upload-to-cloudinary.js      # Cloudinary upload utility
│   └── validate-production.js       # Production deployment validation
├── 📁 types/                        # TypeScript type definitions
│   └── css.d.ts                     # CSS module types
├── components.json                  # Shadcn/ui configuration
├── middleware.ts                    # Next.js middleware for routing
├── next.config.js                   # Next.js configuration
├── package.json                     # Dependencies and scripts
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── FORMSPREE_SETUP.md              # Form setup documentation
└── README.md                        # This file
```

## 🛠️ Technology Stack

### 🚀 Core Technologies
- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3
- **Animations**: Framer Motion 12.23.12, GSAP 3.13.0
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### 💳 Payment & Email Integration
- **Payment Gateway**: PayU (Production Ready)
- **Email Service**: Nodemailer with custom SMTP
- **PDF Generation**: jsPDF for receipts
- **Image Optimization**: Cloudinary

### 📦 Key Dependencies

```json
{
  "next": "13.5.1",                    // React framework
  "react": "18.2.0",                   // UI library
  "typescript": "5.2.2",               // Type safety
  "tailwindcss": "3.3.3",              // CSS framework
  "framer-motion": "^12.23.12",        // Animations
  "gsap": "^3.13.0",                   // Advanced animations
  "swiper": "^11.2.10",                // Touch carousels
  "lucide-react": "^0.446.0",          // Icon library
  "@radix-ui/react-accordion": "^1.2.0", // UI primitives
  "cloudinary": "^2.7.0",              // Image optimization
  "react-hook-form": "^7.53.0",        // Form handling
  "zod": "^3.23.8",                    // Schema validation
  "nodemailer": "^7.0.6",              // Email sending
  "jspdf": "^3.0.2",                   // PDF generation
  "yet-another-react-lightbox": "^3.25.0", // Gallery lightbox
  "react-masonry-css": "^1.0.16"       // Masonry layout
}
```

## 🎯 Key Features & Functionality

### 💳 PayU Payment System (Production Ready)
- **Live PayU Integration**: Complete PayU payment gateway for real transactions
- **Multiple Payment Methods**: Credit/Debit Cards, Net Banking, UPI, Wallets
- **Secure Processing**: Bank-level security and PCI compliance
- **Receipt Generation**: Automated PDF receipts with tax deduction information
- **Donation Form**: Complete donor information collection with validation
- **Success/Failure Handling**: Professional post-payment experience with email notifications
- **Webhook Integration**: Real-time payment verification and processing
- **Tax Deduction Support**: Section 80G compliance for Indian donors

### 📧 Email System (Automated Notifications)
- **Professional Email Templates**: Branded HTML emails with organization branding
- **PDF Receipt Attachments**: Automatic receipt generation and attachment
- **Custom SMTP Integration**: Professional email setup (noreply@reachvirasat.org)
- **Dual Email System**: Donor receipts and admin notifications
- **Error Handling**: Graceful email failure handling with retry mechanisms

### 🎨 Advanced UI/UX Features
- **Hero Video Background**: Immersive cultural video with fallback handling
- **Interactive Gallery**: Masonry layout with lightbox and video support
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Loading Animations**: Smooth page transitions and component loading states
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Toast Notifications**: Real-time feedback for user actions

### 🔒 Security & Performance
- **Security Headers**: Comprehensive security headers including CSP (configurable)
- **Rate Limiting**: API endpoint protection against abuse
- **Input Validation**: Comprehensive form validation and sanitization
- **CSRF Protection**: Cross-site request forgery protection
- **Environment Validation**: Runtime environment variable validation
- **Console Log Security**: Production-safe logging (no sensitive data exposure)
- **Performance Monitoring**: Web vitals tracking and optimization

### 🚀 Performance Optimizations
- **Static Export**: Optimized for static hosting and CDN distribution
- **Image Optimization**: Cloudinary integration with responsive images
- **Lazy Loading**: Component and image lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Bundle Optimization**: Tree shaking and dependency optimization
- **GPU Acceleration**: Hardware-accelerated animations with GSAP

## 🎨 Design System & Brand Identity

### 🎨 Brand Color Palette
```css
/* Primary Brand Colors */
--brand-red: #c0392b          /* Primary accent - traditional Indian red */
--brand-red-dark: #a52f23     /* Darker variant for hover states */
--brand-brown: #5a3e36        /* Earthy brown for text */
--brand-orange: #f97316       /* Vibrant orange for highlights */
--brand-amber: #f59e0b        /* Golden amber for decorative elements */

/* Background Gradients */
background: linear-gradient(135deg, #8b4513 0%, #a0522d 25%, #cd853f 50%, #daa520 75%, #b8860b 100%);
```

### 🔤 Typography System
- **Primary Font**: **Berkshire Swash** (Google Fonts) - for main headings and cultural elements
- **Secondary Font**: **League Spartan** (Sans-serif) - for body text and UI elements
- **Accent Fonts**: **Cormorant Garamond**, **Cinzel** - for special cultural sections

### 🎭 Design Themes
- **Global Background**: Rich maroon textured gradient with cultural patterns
- **Hero Section**: Immersive video background with elegant overlay
- **Events Section**: Clean card-based layout with hover effects
- **Gallery Section**: Masonry layout with smooth lightbox transitions

## 🌐 Pages & Routes

### 🏠 Home Page (`/`) - Main Landing
1. **Loading Screen**: Animated "VIRASAT" text with particle effects
2. **Hero Section**: Full-screen video background with festival introduction
3. **Events Section**: Featured events with interactive cards
4. **About Section**: REACH organization information
5. **Gallery Preview**: Photo/video showcase with lightbox
6. **Artists Section**: Featured cultural artists and performers
7. **Partners Section**: Sponsors and collaborators
8. **FAQ Section**: Common questions and answers

### 📄 Content Pages
- **About (`/about`)**: Detailed information about REACH organization
- **Events (`/events`)**: Complete events listing with details and schedules
- **Gallery (`/gallery`)**: Full photo and video gallery with categories
- **Legends (`/legends`)**: Cultural legends and artist profiles
- **Contact (`/contact`)**: Contact form with Google Maps integration
- **Blogs (`/blogs`)**: News articles and updates (PDF downloads)

### 💳 Donation System
- **Donate (`/donate`)**: Main donation form with PayU integration
- **Success (`/donate/success`)**: Payment success page with receipt download
- **Failure (`/donate/failure`)**: Payment failure page with retry options
- **Status (`/donate/status`)**: Payment status verification and tracking

### 📋 Legal Pages
- **Privacy Policy (`/privacy`)**: Data protection and privacy information
- **Terms & Conditions (`/terms`)**: Legal terms and conditions
- **Refund Policy (`/refund`)**: Refund terms and procedures

## 🔧 Development & Deployment

### 🛠️ Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run setup-dev       # Setup development environment
npm run test-payu       # Test PayU integration

# Production
npm run build           # Build optimized production bundle
npm run build-production # Build with production environment
npm run start           # Start production server
npm run validate-production # Validate production configuration

# Utilities
npm run lint            # Run ESLint
npm run upload-cloudinary # Upload images to Cloudinary
```

### 🏗️ Build Configuration

```javascript
// next.config.js highlights
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true, // For static hosting compatibility
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lucide-react'],
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
  // Comprehensive security headers
  async headers() { /* Security configuration */ },
};
```

### 🌐 Recommended Hosting
- **Vercel**: Recommended for Next.js projects (automatic deployments, serverless functions)
- **Netlify**: Static site hosting with form handling capabilities
- **AWS S3 + CloudFront**: Scalable static hosting with CDN
- **Traditional Hosting**: Compatible with static export for shared hosting

## 📊 Recent Updates & Improvements

### 🔒 Security Enhancements
- ✅ **Console Log Security**: All console statements wrapped with development checks
- ✅ **Production Safety**: No sensitive data exposure in production logs
- ✅ **Input Validation**: Comprehensive form validation and sanitization
- ✅ **Rate Limiting**: API endpoint protection against abuse
- ✅ **Security Headers**: Comprehensive security headers configuration

### 💳 Payment System Improvements
- ✅ **PayU Integration**: Complete live payment gateway integration
- ✅ **Error Handling**: Robust error handling and user feedback
- ✅ **Receipt System**: Automated PDF receipt generation and email delivery
- ✅ **Webhook Security**: Secure webhook handling and verification
- ✅ **Payment Tracking**: Complete payment status tracking and verification

### 🎨 UI/UX Enhancements
- ✅ **Responsive Design**: Mobile-first responsive design improvements
- ✅ **Loading States**: Smooth loading animations and transitions
- ✅ **Error Boundaries**: Graceful error handling with user-friendly messages
- ✅ **Performance**: Optimized bundle size and loading performance
- ✅ **Accessibility**: Improved accessibility and keyboard navigation

### 🏗️ Code Quality Improvements
- ✅ **TypeScript**: Full TypeScript implementation with strict type checking
- ✅ **Component Architecture**: Clean, reusable component structure
- ✅ **Error Handling**: Comprehensive error handling and logging
- ✅ **Performance Monitoring**: Web vitals tracking and optimization
- ✅ **Development Tools**: Enhanced development scripts and utilities

## 🤝 Contributing

### 🔧 For New Developers
1. **Setup Environment**: Run `npm run setup-dev` for easy configuration
2. **Check Component Structure**: Review `/components` directory for patterns
3. **Test Locally**: Run `npm run dev` and test all functionality
4. **Follow Guidelines**: Use established design system and coding patterns
5. **Update Documentation**: Keep README updated with any changes

### 📋 Development Checklist
- [ ] Run `npm run setup-dev` to configure environment
- [ ] Test PayU integration with `npm run test-payu`
- [ ] Verify responsive design on mobile and desktop
- [ ] Configure email system and test receipt generation
- [ ] Validate production setup with `npm run validate-production`
- [ ] Test payment flow end-to-end
- [ ] Ensure accessibility compliance
- [ ] Check performance metrics

## 📞 Support & Contact

For technical support or questions about this project:

- **Organization**: REACH (Rural Entrepreneurship for Art & Cultural Heritage)
- **Festival**: Virasat - Celebrating India's Cultural Heritage
- **Location**: Dehradun, Uttarakhand, India
- **Website**: [Live Production Site]

---

**Built with ❤️ for preserving and celebrating India's rich cultural heritage**

*This project represents the digital transformation of cultural preservation, bringing traditional Indian arts, crafts, and performances to the modern web while maintaining their authentic essence and cultural significance.*