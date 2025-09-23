# 🎭 New Engineer Onboarding Guide - VIRASAT Project

Welcome to the VIRASAT Cultural Heritage Festival website project! This guide will help you understand the current state of the project and recent major changes.

## 🚀 Quick Start

### 1. Setup Development Environment

```bash
# Clone and setup
git clone <repository-url>
cd virasat
npm install

# Environment setup
cp .env.example .env.local
# Add your API keys (see README.md for details)

# Start development
npm run dev
```

### 2. Key URLs

- **Development**: http://localhost:3000
- **Home Page**: Main landing page with new 3D carousel design
- **Events**: /events (booking system)
- **Donate**: /donate (PayU Biz integration)

## 📋 Current Project Status

### ✅ Recently Completed (December 2024)

- **Home Page Redesign**: Complete visual overhaul
- **3D Events Carousel**: Interactive GSAP-powered carousel
- **Journey Highlights**: Classical column design with scrollable content
- **Typography Update**: Griffy font integration
- **Background Redesign**: Maroon textured gradient theme

### 🔧 Core Technologies

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP + Framer Motion
- **Payments**: PayU Biz integration
- **Email**: Custom SMTP with PDF generation

## 🎨 Design System Overview

### Color Palette

```css
/* Primary Colors */
--brand-black: #000000        /* Accent sections */
--brand-white: #ffffff        /* Text and contrast */
--brand-orange: #f97316       /* Highlights and CTAs */
--brand-amber: #f59e0b        /* Golden decorative elements */

/* Background */
Maroon textured gradient with subtle patterns
```

### Typography

```css
/* Font Hierarchy */
Griffy (Google Fonts)         /* All headings */
Playfair Display             /* Elegant text sections */
Lato                         /* Body text and UI */
```

## 🏗️ Key Components to Understand

### 1. 🎠 EventsSection.tsx

**Location**: `/components/EventsSection.tsx`
**Purpose**: Interactive 3D carousel for events

**Key Features**:

- GSAP-powered 3D rotation
- Drag-to-rotate functionality
- 10 images in circular arrangement
- Touch and mouse support
- Black background for drama

**Important Code**:

```typescript
// 3D positioning
gsap.set(imagesRef.current, {
  rotateY: (i) => i * -36,
  transformOrigin: "50% 50% 500px",
  z: -500,
});

// Drag interaction
const handleDrag = (e) => {
  gsap.to(ringRef.current, {
    rotationY: "-=" + ((clientX - xPos) % 360),
  });
};
```

### 2. 🏛️ HighlightsSection.tsx

**Location**: `/components/HighlightsSection.tsx`
**Purpose**: Journey highlights with classical column

**Key Features**:

- 3D CSS classical column (left side)
- Scrollable content (right side)
- 7 journey items, 3 visible at once
- Up/down navigation + dot indicators
- Griffy font for headings

**Important Code**:

```typescript
// Navigation logic
const itemsToShow = 3;
const nextPage = () =>
  setCurrentIndex(
    Math.min(highlightsData.length - itemsToShow, currentIndex + itemsToShow)
  );
```

### 3. 🏠 Home Page Structure

**Location**: `/app/page.tsx`
**Current Sections**:

1. Hero Section (unchanged)
2. **Events Section** (3D carousel)
3. **Highlights Section** (classical column)
4. Artist Section (unchanged)
5. About Section (updated background)
6. Gallery Preview (unchanged)
7. Partners Section (unchanged)
8. FAQ Section (unchanged)

## 🎯 What You Need to Know

### 1. 🎨 Design Philosophy

- **Cultural Heritage**: Traditional Indian aesthetics with modern UX
- **Premium Feel**: Rich textures, elegant typography, smooth animations
- **Accessibility**: Keyboard navigation, screen reader support
- **Performance**: GPU-accelerated animations, optimized loading

### 2. 🔧 Technical Architecture

- **Static Export**: Configured for static hosting
- **Dynamic Imports**: Performance-optimized component loading
- **Error Boundaries**: Graceful error handling
- **TypeScript**: Full type safety throughout

### 3. 📱 Responsive Strategy

- **Mobile First**: Touch-optimized interactions
- **Progressive Enhancement**: Desktop gets full 3D effects
- **Performance Scaling**: Reduced complexity on lower-end devices

## 🚨 Important Notes

### ⚠️ Critical Components

**DO NOT MODIFY** without understanding:

- Payment system (`/api/payubiz/`)
- Email system (`/api/send-email/`)
- Event booking system (`/events/`)

### 🎨 Design Consistency

**ALWAYS FOLLOW**:

- Use Griffy font for headings
- Maintain maroon/black color scheme
- Test animations on mobile devices
- Ensure accessibility compliance

### 🔧 Development Guidelines

**BEST PRACTICES**:

- Use TypeScript strictly
- Test responsive design
- Optimize animations for performance
- Follow existing component patterns

## 📚 Essential Files to Review

### 1. Core Documentation

- `README.md` - Complete project overview
- `RECENT_CHANGES.md` - Detailed change log
- `package.json` - Dependencies and scripts

### 2. Key Components

- `components/EventsSection.tsx` - 3D carousel
- `components/HighlightsSection.tsx` - Classical column
- `app/page.tsx` - Home page layout
- `app/globals.css` - Global styles

### 3. Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind setup
- `tsconfig.json` - TypeScript configuration

## 🧪 Testing Checklist

### Before Making Changes

- [ ] Test 3D carousel drag functionality
- [ ] Verify highlights navigation (arrows + dots)
- [ ] Check responsive design on mobile
- [ ] Test payment flow (use test mode)
- [ ] Validate email system functionality

### After Making Changes

- [ ] Run `npm run build` successfully
- [ ] Test on multiple browsers
- [ ] Verify mobile performance
- [ ] Check accessibility with screen reader
- [ ] Validate TypeScript compilation

## 🎯 Common Tasks

### Adding New Content

1. **Events**: Update `lib/events.ts`
2. **Journey Items**: Modify `HighlightsSection.tsx`
3. **Images**: Add to `/public/images/`
4. **Styles**: Use existing Tailwind classes

### Debugging Issues

1. **3D Carousel**: Check GSAP console errors
2. **Navigation**: Verify state management
3. **Responsive**: Test on actual devices
4. **Performance**: Use browser dev tools

### Performance Optimization

1. **Images**: Use Next.js Image component
2. **Animations**: Enable GPU acceleration
3. **Loading**: Implement lazy loading
4. **Caching**: Optimize static assets

## 🆘 Getting Help

### Resources

1. **Documentation**: README.md and RECENT_CHANGES.md
2. **Code Comments**: Detailed inline documentation
3. **TypeScript**: Hover for type information
4. **Browser DevTools**: Network, Performance, Console tabs

### Common Issues & Solutions

1. **GSAP not working**: Check import and registration
2. **Fonts not loading**: Verify Google Fonts configuration
3. **Responsive issues**: Test actual devices, not just browser resize
4. **Performance problems**: Check animation complexity

## 🎉 Welcome to the Team!

You're now ready to work on the VIRASAT project. The codebase is well-structured, documented, and follows modern best practices. Take your time to explore the components and understand the recent changes.

**Remember**: This is a cultural heritage project that celebrates India's traditions. Every change should enhance the user experience while respecting the cultural significance of the content.

---

**Happy Coding!** 🚀
