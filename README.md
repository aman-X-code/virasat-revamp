# 🎭 VIRASAT - Cultural Heritage Festival Website

[![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13.0-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

A modern, responsive website celebrating India's cultural heritage and traditions, built with Next.js 13, TypeScript, Tailwind CSS, and advanced animations. This project showcases the Virasat festival by **REACH** (Rural Entrepreneurship for Art & Cultural Heritage) - Afro-Asia's largest celebration of art and culture.


### 🎪 New Home Page Design
- **3D Events Carousel**: Interactive GSAP-powered 3D rotating carousel with drag functionality
- **Journey Highlights**: Classical column design with scrollable content (7 items, 3 visible)
- **Maroon Textured Background**: Rich gradient background throughout the site
- **Griffy Font Integration**: Google Fonts Griffy for all headings and cultural elements
- **Black Accent Sections**: Pure black backgrounds for dramatic effect in key sections

### 🎭 Design System Overhaul
- **Typography**: Griffy (headings) + Playfair Display + Lato (body)
- **Color Palette**: Maroon gradient + pure black + orange accents + golden elements
- **Animations**: Enhanced GSAP 3D animations + Framer Motion transitions
- **Responsive**: Optimized for mobile, tablet, and desktop experiences

## 🌟 Project Overview

**VIRASAT** is a comprehensive cultural heritage website that transforms Dehradun into a living museum where classical ragas blend with folk dances, handmade crafts find new admirers, and theatre, literature, and traditional cuisines bring communities together. The website serves as both an information hub and a ticket booking platform for the 15-day festival.

### 🎯 Key Highlights
- 🎪 **15-day Cultural Festival** - Complete event management and booking system
- 💳 **PayU Biz Payment Integration** - Secure donation processing with Indian payment methods
- 📧 **Automated Email System** - Professional receipt emails with PDF attachments
- 🎨 **Advanced Animations** - GSAP and Framer Motion powered interactions
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🚀 **Performance Optimized** - Static export with advanced caching and dynamic imports
- 🎭 **Cultural Design** - Traditional Indian aesthetics with modern UX
- 🔒 **Security First** - Comprehensive security headers and CSP
- 🔗 **Webhook Integration** - Real-time payment processing and email notifications
- 🏗️ **Clean Architecture** - Refactored codebase with no duplicated data and optimized structure
- ⚡ **TypeScript Optimized** - Full type safety with zero compilation errors

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
   # Create .env.local file
   cp .env.example .env.local
   
   # Add your credentials
   # Cloudinary (for images)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # PayU Biz (for payments)
   PAYUBIZ_MERCHANT_KEY=your_payubiz_merchant_key
   PAYUBIZ_MERCHANT_SALT=your_payubiz_merchant_salt
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Email Configuration (Custom SMTP)
   EMAIL_SERVICE=smtp
   EMAIL_HOST=mail.reachvirasat.org
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=noreply@reachvirasat.org
   EMAIL_PASSWORD=your_email_password
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   🌐 **Website**: [http://localhost:3000](http://localhost:3000)

### 🏗️ Production Build
```bash
# Build for production
npm run build

# Start production server
npm start

# Or export static files
npm run export
```

## 📁 Project Structure

```
virasat/
├── 📁 app/                          # Next.js 13 App Router
│   ├── 📁 about/                    # About page
│   │   └── page.tsx                 # About page component
│   ├── 📁 api/                      # API Routes
│   │   ├── 📁 debug/               # Development debugging endpoints
│   │   │   └── 📁 env-check/       # Environment validation endpoint
│   │   ├── 📁 payubiz/             # PayU Biz payment integration
│   │   │   ├── 📁 create-transaction/ # Create payment transaction
│   │   │   ├── 📁 verify-payment/     # Verify payment status
│   │   │   ├── 📁 webhook/            # Payment webhook handler
│   │   │   ├── 📁 get-key/            # Get merchant key
│   │   │   ├── 📁 test-config/        # Test PayU Biz configuration
│   │   │   ├── 📁 check-status/       # Check payment status
│   │   │   └── 📁 redirect-handler/   # Handle PayU Biz redirects
│   │   ├── 📁 send-email/          # Email sending API
│   │   └── 📁 test-email/          # Email testing API
│   ├── 📁 blogs/                    # News system (PDF downloads)
│   │   └── page.tsx                 # News listing
│   ├── 📁 contact/                  # Contact page
│   │   └── page.tsx                 # Contact form with Google Maps
│   ├── 📁 donate/                   # Donation system
│   │   ├── 📁 success/             # Donation success page
│   │   ├── 📁 failure/             # Donation failure page
│   │   ├── 📁 dev-complete/        # Development payment completion helper
│   │   ├── 📁 payment-status/      # Payment status checking page
│   │   ├── 📁 status/              # Payment status verification page
│   │   └── page.tsx                 # Donation form with PayU Biz
│   ├── 📁 events/                   # Events system
│   │   ├── 📁 [id]/                # Dynamic event pages
│   │   │   ├── 📁 booking/         # Event booking
│   │   │   │   ├── EventBookingClient.tsx
│   │   │   │   ├── eventData.ts
│   │   │   │   └── page.tsx
│   │   │   ├── EventDetailsClient.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx                 # Events listing
│   ├── 📁 gallery/                  # Gallery page
│   │   └── page.tsx                 # Photo/video gallery
│   ├── 📁 refund/                   # Refund policy page
│   │   └── page.tsx                 # Refund terms and conditions
│   ├── 📁 terms/                    # Terms and conditions page
│   │   └── page.tsx                 # Legal terms and conditions
│   ├── 📁 privacy/                  # Privacy policy page
│   │   └── page.tsx                 # Privacy policy and data protection
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layoutation
│   └── page.tsx                     # Home page
├── 📁 components/                   # React components
│   ├── 📁 ui/                       # Reusable UI components
│   │   ├── accordion.tsx            # FAQ accordion
│   │   ├── alert.tsx                # Alert notifications
│   │   ├── badge.tsx                # Status badges
│   │   ├── button.tsx               # Button variants
│   │   ├── card.tsx                 # Card component
│   │   ├── carousel.tsx             # Carousel wrapper
│   │   ├── form.tsx                 # Form components
│   │   ├── input.tsx                # Input fields
│   │   ├── label.tsx                # Form labels
│   │   ├── toast.tsx                # Toast notifins
│   │   └── toaster.tsx              # Toast container
│   ├── CloudinaryImage.tsx          # Optimized image com
│   ├── ComponentErrorBoundary.tsx   # Error boundary wrper
│   ├── ErrorBoundary.tsx            # Main error dary
│   ├── EventsSection.tsx            # 3D Events carousel with GSAP
│   ├── FAQSection.tsx               # FAQ section
│   ├── FlowingSilkBackground.tsx    # Silk animation background
│   ├── Footer.tsx                   # Site footer
│   ├── GalleryPreview.tsx           # Gallery preview section
│   ├── Header.tsx                   # Site header/navigation
│   ├── HeroCarousel.tsx             # Hero carousel (mobile)
│   ├── HeroSection.tsx              # Main hero section
│   ├── HighlightsSection.tsx        # Journey highlights with classical column
│   ├── LoadingScreen.tsx            # Initial loa
│   ├── ParallaxArtistSection.tsx    # Parallax artist secon
│   ├── PartnersSection.tsx          # Partners/sponsors
│   └── SmallLoader.tsx              # Small loadior
├── 📁 hooks/                        # Custom React hooks
│   ├── use-toast.ts                 # Toast notifications
│   ├── useErrorHandler.ts           # Error handling
│   ├── useEvents.ts                 # Events data manag
│   └── useLoading.ts                # Loading state managment
├── 📁 lib/                          # Utility libraries
│   ├── cloudinary-loader.ts         # Cloudinary image loader
│   ├── cloudinary.ts                # Cloudinary configation
│   ├── email.ts                     # Email templates and PDF
│   ├── env-validation.ts            # Environment variablon
│   ├── event-preloader.ts           # Event data preloading
│   ├── events-ssg.ts                # Static site generatn
│   ├── events.ts                    # Events data & ion
│   ├── rate-limit.ts                # In-memory rate limiting
│   ├── redis-rate-limit.ts          # Redis-based rate limiting
│   ├── security.ts                  # Security utilities
│   ├── webhook-security.ts          # Webhook security valida
│   └── utils.ts                     # General utilities
├── 📁 public/                       # Static assets
│   └── 📁 images/                   # Image assets
│       ├── 📁 artists/              # Artist photos
│       │   └── ring.png
│       ├── rangoli-about.png        # Cultural images
│       ├── rangoli-about2.png
│       ├── rangoli-about3.png
│       ├── rangoli.svg              # SVG assets
│       ├── REACH (2).jpg            # Organization logos
│       ├── reach.png
│       ├── textured-background.svg
│       └── vir.png
├── 📁 scripts/                      # Build and utiscripts
│   ├── test-payubiz.js ing
│   ├── upload-to-cloudinary.js      # Cloudinary upcript
│   └── validate-production.js       # Production depl
├── components.json           on
├── next.config.js            on
├── package.json                     # Dependenci
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.tation
├── tsconfig.json                  
└── README.md      e
```

## 🎨 Design System & Brand Identity

### 🎨 Brand Color Palette
The project uses a carefully crafted color palette inspired 

```css
/* Updated Brand Colors with Maroon Theme */
--brand-red: #c0392b          /* Primary accent - inspired by s
--brand-red-dark: #a52f23     /* Darker variant tates */
--bt */
 */
--brand-brown: #5a3e36        /* Ear
xt */
--brand-orange: #f97316    */
--brand-amber: #f59e0b        /* Golden amber for decorative elements */

/* Mar
background: linear-gradien
```

### 🔤 Typography System
- **Primary Font**: **Griffy** (Google Fonts) - for all headi
- **Secondary Font**: **Playfair Display** (Serif) - for elegant text sections
- **Body Font**: **Lato** (Sans-serif) - for body text and UI elements
- **Accent Fonts**: **Cormorant Garamond**, **Cinzel** - for special cultections

hemes
- **Global Background**:e patterns
- **Events Section**: Pure black (`#000`) for dramatic 3D carousel effect
- **Journey Highlights**: Pure black (`#000`) with golden classical column
- **Artist Section**: Dark theme with flowing silk animations

## � Updatged Home Page re

### 🏠 Home Page (`/`) - New Design
1. **Loading Screen**: 3D animated "VIRASAT" text with particfects
lay
3. **Events Section**: **NEW 3D Carouselign**

   - Drag-to-rotate functy
   - H
   - Black background for dramect
4. **Journey Highlights**: **NEW Classical Column **
   - Left side: Griffy font title + 3D CSSn
   - Right side: Scrollable journey items sible)
   - Up/down navigation arrows
   - Dot indicators for pagination
    section

6. **About Section**: REACH org
wcase
8. **Partners Section**:s
9. **FAQ Section**: Common questions and answers

## 🎨 New Component Features

### 🎪 EventsSection.tsx - 3D Carousel
t
// Key Features:
- 3D rotating carousel using GSAP
- 10 image slots arranged in circular formation
- Drag-to-rotate interaction (mouse & touch)
es
- Smooth entrance animations
- Black background for dramatic effect
- Responsive design for mobile/desktop
```

ign
```typescript
// Keyatures:
- Left: Griffy font tital column
- Right: Scr
- Navigation: Up/down arrows + dot iators
- Smooth animations with Framer Moti
- All 7 original journey items preser
 e

  3. Bike Rally Adven
  4. SAADA
  5. REACH Talkies
  6. Theatre Festival
  7. Photography Competition
```

#es
```css
 */
body {
: 
    radial-gradient(circle at 25% ,
0%),
    linear-gradient(135deg,
  background-attachment: fixed;
}

/* Griffy Font Integration */
{
  font-family: var(--font-griserif;
}

.font-griffy {
  font-family: var(--font-griffy), serif;
}
```

## 🛠️ Technology Stack

### 🚀 Core Technologies
- **Framework**: Next.js 13 (App Router)
peScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
o)


```json
{
  "next": "13.5.1",                    // React framework
  "react": "18.2.0",                   //ary
  "typescript": "5.2.2",               // Type safety
S
  "framer-motion": "^ations
  "gsap": "^3.13.0",                   // Adva carousel
  "swiper": "^11.2.10",                // Msel
  "lucide-react": "^0.446.0",         brary
  "@radix-ui/react-accordion": "^1.2.0", /rdion

  "cloudinary": "^2.7on
  "react-hook-form": "^7.53.0",        // Form handling
  "zod": "^3.23.8",                    // Schemtion
  "nodemailer": "^7.0.6",              // E
n
}
```

## � Kaey Features & Functionality

### 🎪 3D Events Carousel
- **Interactive 3D Rotation**: Drag to rotate the carousel in 3D 
- **GSAP Powered**: Smooth animations and transforms
- **Touch Support**: Works on mobile devices with to
- **Hover Effects**: Images highlight on hover wit
- **Responsive**: Adapts to different screen sizes
- **Performance Optimized**: GPU-accelerated anis

### 🏛️ Journey Highligumn
- **3D CSS Column**: Hand-crafted classical column with Corinthian capital
- **Scrollable Content**: 7 journey items with 3  time
- **Navigation Controls**: Up/down arrows and dot indicat
- **Smooth Animations**: Framer Motion powered transitios
- **Responsive Design**: Adapts to mobile and desktop layouts

### 💳 Payment System (PayU Biz Integration)
- **Secure Payment Processing**: PayU Biz integthods
- **Multiple Payment Options**: Cards, UPI, Net Br
- **Real-time Verification**: Payment status veling
- **Donation Form**: Complete donor information collecti
- **Success/Failure Pages**: Professional post-pence
- **PDF Receipt Generation**: Automatic receipt generation with jsPDF
- **Tax Deduction Support**: Section 80G compliance for Indian donors

### 📧 Email System (Automated Notifications)
- **Professional Email Templates**: Branded HTML emailsg
- **PDF Receipt Attachments**: Automatic PDF generachment
- **Custom SMTP Integration**: Professional email setup with cust.org)
ts


- **Static Export**: Conting
- **Image Optimization**: Next.js Image 
- **Lazy Loading**: Compon
- **Code Splitting**: Automuter
- **Bundle Optimization**: Tree shakis
- **GPU Acceleration**: GSAP animations 

nes

### 🎨 ns
We page:

1. **Create Component**: Add new component in `/compnts/`
2. **Import Dynamically**: Use dynamic imports for pee
3. **Follow Design System**: Use established colors and fons
4. **Add Animations**: Use Framer Motion for entrance animations
5. **Test Responsiveness**: Ensure mobile and desktop compatibility

### 🎭 Animation Guidelines
- **Entrance Animations**: Use `whileInView` for scrolns
- **Hover Effects**: Subtle scale and color transitions
- **Loading States**: Smooth fade-in transitions
- **Performance**: Use `will-change` and GPU acceleration foions

### 🎨 Styling Guidelines
- **Background**: Use maroon textured gradient for main sons
- **Accent Sections**: Use pure black (`#000`) for dramffect
- **Typography**: Griffy for headings, Lato for body text
- **Colors**: Stick to established brand palette
-

ing


```javascript
onfig.js
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true, // For static hosting
[
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
,
      },
    ],
  },
  experimental: {
-react'],
  },
  compress: true,
  poweredByHeader: false,
};
```

### 🏗️ Build Process
```bash
t
npm run dev          # Start developmentver

# Production
npm run build        # Build optimized production 
npm run start        # Start production server

# Static Export

```

### 🌐 Recommended Hosting
- **Vercel**: Recommended for Next.js projects (automatic deployments, serverlesss)
- **Netlify**: Static site hosting with form handling and serverless functions
- **AWS S3 + CloudFront**: Scalable static hosting

## 📝 Recent Updates & Changes

### 🎨 Design System Updates
ent
- ✅ **Typography**: Integrated Griffy font fo
- ✅ **Color Palette**: Updated with maroon theme and pure black accents

### 🎪 Home Page Redesign
- ✅ **Events Section**: Completely redesigned with 3D GSAP carousel
- ✅ **Journey Highlights**: New classical column design with scrollable cent
- ✅ **Navigation**: Added up/down arrows and dot indicators
- ✅ **Animations**: Enhanced with Framer Motion and GSAP

### 🏗️ Component Architecture
- ✅ **EventsSection.tsx**: Rebuilt with 3D carouseality
- ✅ **HighlightsSection.tsx**: Redesigned with classical column layout
- ✅ **Global Styles**: Updated with new backgography
- ✅ **Font Integration**: Added Griffy font to layout as

### 🧹 Code Cleanup
onents
- ✅ **Optimized Imports**: Uencies
- ✅ **Performance**: Improved loading times aons

## 🤝 Contributing

### 🔧 For New Engineers
es
2. **Check Component Structuremponents
3. **Test Locally**: Run `npm run dev` and test
4. **Follow Guidelines**: Use established design sy
5. **Update Documentation**: Keep README updated withanges

### 📋 Development Checklist
)
- [ ] Verify journey higg)
- [ ] Check responsive design on mobile and desktop
- [ ] Test payment integration and email system
- [ ] Validate performance and loading times
- [ ] Ensure accessibility compliance

## 📞 Support & Contact

For technical support oect:
ge)
- **Festival**: Virlture
dia

---

**Built with ❤️ fe**al heritag culturg India'srvinor prese