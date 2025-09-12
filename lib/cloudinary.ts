import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

// Cloudinary folder structure constants
export const CLOUDINARY_FOLDERS = {
  HERO: 'prod/hero',
  EVENTS: 'prod/events',
  ARTISTS: 'prod/artists',
  GALLERY: 'prod/gallery',
  ABOUT: 'prod/about',
  VIDEOS: 'prod/videos',
} as const;

// Default transformation settings
export const DEFAULT_TRANSFORMATIONS = {
  images: {
    quality: 'auto',
    format: 'auto',
    fetchFormat: 'auto',
  },
  videos: {
    quality: 'auto',
    format: 'auto',
  },
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const;
