# VIRASAT - Cultural Heritage Festival Website

A modern, responsive website celebrating India's cultural heritage and traditions, built with Next.js 13, TypeScript, Tailwind CSS, and advanced animations. This project showcases the Virasat festival by REACH (Rural Entrepreneurship for Art & Cultural Heritage) - Afro-Asia's largest celebration of art and culture.

## 🌟 Project Overview

VIRASAT is a comprehensive cultural heritage website that transforms Dehradun into a living museum where classical ragas blend with folk dances, handmade crafts find new admirers, and theatre, literature, and traditional cuisines bring communities together. The website serves as both an information hub and a ticket booking platform for the 15-day festival.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd virasat3
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
```bash
npm run dev
```
The website will be available at [http://localhost:3000](http://localhost:3000)

### Building for Production
```bash
npm run build
npm start
```

## 🎨 Design System & Colors

### Brand Color Palette
The project uses a carefully crafted color palette inspired by Indian cultural heritage:

```css
/* Primary Brand Colors */
--brand-red: #c0392b          /* Primary accent - inspired by sindoor/traditional red */
--brand-red-dark: #a52f23     /* Darker variant for hover states */
--brand-black: #1a1a1a        /* Primary text and dark elements */
--brand-white: #f5f5f5        /* Background and light text */
--brand-brown: #5a3e36        /* Earthy brown - represents clay/terracotta */
--brand-earthen: #8b786d      /* Muted earth tone for secondary text */
--brand-earthen-light: #bcaea4 /* Light earth tone for subtle elements */
```

### Typography
- **Primary Font**: Playfair Display (Serif) - for headings and cultural elements
- **Secondary Font**: Lato (Sans-serif) - for body text and UI elements
- **Accent Fonts**: Cormorant Garamond, Cinzel - for special cultural sections

### Background Colors
- **Main Background**: `#FFF7F5F4` - Warm, cream-like background throughout the site
- **Hero Section**: Black with gradient overlays for dramatic effect
- **Artist Section**: Dark theme with flowing silk animations

## 📱 Responsive Design & Device Support

### Breakpoints
- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: 1024px - 1280px (lg)
- **Large Desktop**: > 1280px (xl)

### Device-Specific Features

#### Mobile (< 768px)
- **Hero Section**: Swiper carousel with fade effect instead of bento grid
- **Events Section**: Horizontal scroll with snap behavior
- **Navigation**: Collapsible hamburger menu
- **Spacing**: Reduced padding (`px-4`, `py-3`)
- **Typography**: Smaller font sizes (`text-sm`, `text-base`)

#### Tablet (768px - 1024px)
- **Events Section**: 2-column grid layout
- **Artist Section**: Stacked layout with centered content
- **Navigation**: Full menu with reduced spacing

#### Desktop (> 1024px)
- **Hero Section**: Full bento grid with 4 video tiles
- **Events Section**: 4-column grid with pagination
- **Artist Section**: Side-by-side layout with parallax scrolling
- **Navigation**: Full horizontal menu

### Spacing System
```css
/* Container Spacing */
.container {
  padding: 1rem 1.5rem; /* Mobile */
  padding: 1.5rem 2rem; /* Tablet */
  padding: 2rem 3rem;   /* Desktop */
}

/* Section Spacing */
section {
  padding-top: 1rem;    /* Mobile */
  padding-top: 2rem;    /* Tablet */
  padding-top: 4rem;    /* Desktop */
  padding-bottom: 3rem; /* Mobile */
  padding-bottom: 5rem; /* Desktop */
}
```

## 🎭 Scroll Behavior & Interactive Elements

### Scroll-Triggered Animations
1. **Hero Section**: 
   - Bento grid items animate in with staggered delays
   - Scroll indicator with pulsing animation
   - Video tiles have hover effects with overlay gradients

2. **Events Section**:
   - Cards animate in on scroll with `whileInView`
   - Pagination with smooth transitions
   - Mobile horizontal scroll with snap behavior

3. **Artist Section** (Parallax):
   - **Desktop**: Horizontal scroll with GSAP ScrollTrigger
   - **Mobile**: Vertical scroll with standard animations
   - Floating decorative elements (lanterns/diyas)
   - Header auto-hide during parallax scroll

4. **Highlights Section**:
   - Grid items with hover lift effects
   - Pagination navigation
   - Mobile horizontal scroll

### Interactive Elements

#### Buttons
- **Primary CTA**: Red gradient with hover scale effect
- **Navigation**: Smooth color transitions
- **Pagination**: Scale and color changes
- **Event Cards**: "Buy Now" buttons with arrow animations

#### Hover Effects
- **Cards**: Lift effect with enhanced shadows
- **Images**: Scale and overlay transitions
- **Text**: Color changes to brand red
- **Buttons**: Scale and shadow animations

#### Loading States
- **Initial Load**: 3D GSAP animation with particle effects
- **Image Loading**: Smooth fade-in transitions
- **Content Loading**: Staggered animations

## 🎪 Page Structure & Components

### Home Page (`/`)
1. **Loading Screen**: 3D animated "VIRASAT" text with particle effects
2. **Hero Section**: Video grid/carousel with floating text overlay
3. **Events Section**: Cultural festival ticket booking (HIGHEST PRIORITY)
4. **Highlights Section**: Key festival features and competitions
5. **Artist Section**: Featured performers with parallax scrolling
6. **About Section**: REACH organization information
7. **Gallery Preview**: Festival memories showcase
8. **Partners Section**: Sponsors and collaborators
9. **FAQ Section**: Common questions and answers

### Additional Pages
- `/about` - Detailed organization information
- `/events` - Full events listing and booking
- `/gallery` - Complete photo/video gallery
- `/blogs` - News and blog posts
- `/contact` - Contact information and forms
- `/donate` - Donation page for supporting heritage preservation

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

### Key Dependencies
```json
{
  "framer-motion": "^12.23.12",    // Page transitions and animations
  "gsap": "^3.13.0",               // Advanced scroll animations
  "swiper": "^11.2.10",            // Mobile carousel
  "embla-carousel-react": "^8.3.0", // Additional carousel support
  "next-themes": "^0.3.0",         // Theme management
  "lucide-react": "^0.446.0"       // Icon library
}
```

## 🎨 Component Architecture

### Core Components

#### `HeroSection.tsx`
- **Desktop**: 4-video bento grid with center logo
- **Mobile**: Swiper carousel with fade transitions
- **Features**: Scroll indicator, floating particles, gradient overlays

#### `EventsSection.tsx`
- **Desktop**: 4-column grid with pagination
- **Mobile**: Horizontal scroll with snap behavior
- **Features**: Countdown timers, featured badges, booking buttons

#### `ParallaxArtistSection.tsx`
- **Desktop**: Horizontal scroll with GSAP ScrollTrigger
- **Mobile**: Vertical scroll with standard layout
- **Features**: Floating lanterns, ring overlays, auto-hide header

#### `HighlightsSection.tsx`
- **Desktop**: 4-column grid with pagination
- **Mobile**: Horizontal scroll
- **Features**: Hover lift effects, competition showcases

#### `LoadingScreen.tsx`
- **Features**: 3D text animation, particle effects, zoom transition
- **Duration**: ~6 seconds total animation sequence

### UI Components (`/components/ui/`)
- **Button**: Multiple variants with hover animations
- **Accordion**: FAQ section with smooth expand/collapse
- **Card**: Consistent styling across all sections
- **Carousel**: Swiper integration for mobile experiences

## 🎯 Key Features

### Performance Optimizations
- **Static Export**: Configured for static hosting
- **Image Optimization**: Next.js Image component with proper sizing
- **Lazy Loading**: Components load on scroll
- **Code Splitting**: Automatic with Next.js App Router

### Accessibility
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Interactive elements properly labeled
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG compliant color combinations

### SEO & Meta
- **Dynamic Titles**: Page-specific meta titles
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Event and organization markup
- **Sitemap**: Automatic generation

## 🚀 Deployment

### Static Export Configuration
```javascript
// next.config.js
const nextConfig = {
  output: 'export',           // Static export
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true } // For static hosting
};
```

### Build Process
```bash
npm run build    # Creates optimized static files in /out
npm run start    # Serves the built application
```

### Hosting Options
- **Vercel**: Recommended for Next.js projects
- **Netlify**: Static site hosting
- **GitHub Pages**: Free static hosting
- **AWS S3**: Scalable static hosting

## 🎨 Custom Animations & Effects

### GSAP Animations
- **Loading Screen**: 3D text reveal with particle effects
- **Parallax Scrolling**: Horizontal scroll with ScrollTrigger
- **Floating Elements**: Continuous animations for decorative elements
- **Smooth Transitions**: Page-to-page navigation

### Framer Motion
- **Page Transitions**: Smooth fade and slide effects
- **Scroll Animations**: `whileInView` for content reveals
- **Hover Effects**: Scale, rotate, and color transitions
- **Staggered Animations**: Sequential element reveals

### CSS Animations
- **Gradient Text**: Animated color shifts
- **Floating Particles**: Continuous movement
- **Pulse Effects**: Attention-grabbing elements
- **3D Transforms**: Perspective and depth effects

## 📊 Content Management

### Event Data Structure
```typescript
interface Event {
  id: number;
  day: string;
  title: string;
  description: string;
  image: string;
  time: string;
  location: string;
  seats: string;
  price: string;
  featured: boolean;
  category: string;
}
```

### Artist Data Structure
```typescript
interface Artist {
  name: string;
  title: string;
  description: string;
  image: string;
  specialty: string;
  years: string;
}
```

## 🔧 Development Guidelines

### Code Organization
- **Components**: Organized by feature/functionality
- **Styles**: Tailwind-first with custom CSS for complex animations
- **Types**: TypeScript interfaces for all data structures
- **Hooks**: Custom hooks for reusable logic

### Performance Best Practices
- **Image Optimization**: Proper sizing and lazy loading
- **Bundle Analysis**: Regular bundle size monitoring
- **Animation Performance**: GPU-accelerated transforms
- **Memory Management**: Proper cleanup of event listeners

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS 14+, Android 10+
- **Progressive Enhancement**: Graceful degradation for older browsers

## 📈 Analytics & Monitoring

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS optimization
- **Bundle Size**: Monitoring JavaScript bundle size
- **Image Optimization**: WebP format with fallbacks
- **Loading Times**: Critical path optimization

### User Experience
- **Scroll Behavior**: Smooth scrolling with momentum
- **Touch Interactions**: Optimized for mobile devices
- **Loading States**: Clear feedback during data fetching
- **Error Handling**: Graceful error boundaries

## 🎭 Cultural Elements

### Visual Design
- **Rangoli Patterns**: SVG background elements
- **Traditional Colors**: Earth tones and cultural reds
- **Typography**: Mix of modern and traditional fonts
- **Imagery**: Cultural artifacts and festival moments

### Interactive Features
- **Floating Lanterns**: Animated diyas and kandils
- **Silk Animations**: Flowing background effects
- **Ring Overlays**: Traditional jewelry-inspired frames
- **Particle Effects**: Cultural celebration elements

## 🚀 Future Enhancements

### Planned Features
- **Multi-language Support**: Hindi and regional languages
- **Advanced Booking**: Seat selection and payment integration
- **User Accounts**: Personalized festival experience
- **Live Streaming**: Virtual festival participation
- **Mobile App**: Native mobile application

### Technical Improvements
- **PWA Support**: Progressive Web App capabilities
- **Offline Mode**: Cached content for offline viewing
- **Push Notifications**: Event reminders and updates
- **Advanced Analytics**: User behavior tracking


---

**Built with ❤️ for preserving and celebrating India's rich cultural heritage**

*This project represents the intersection of technology and tradition, creating a digital platform that honors the past while embracing the future.*