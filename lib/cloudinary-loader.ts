import { Cloudinary } from '@cloudinary/url-gen';

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  },
});

// Custom Next.js image loader for Cloudinary
export function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If src is already a Cloudinary URL, return as is
  if (src.startsWith('http')) {
    return src;
  }

  // Build Cloudinary URL with transformations
  const transformations = [
    `w_${width}`,
    `q_${quality || 'auto'}`,
    'f_auto',
    'c_limit',
  ].join(',');

  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${src}`;
}

// Helper function to generate responsive image URLs
export function getCloudinaryImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
    crop?: 'fill' | 'limit' | 'fit' | 'scale';
    gravity?: 'auto' | 'face' | 'center';
  } = {}
) {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'limit',
    gravity = 'auto',
  } = options;

  const transformations = [
    width && `w_${width}`,
    height && `h_${height}`,
    `q_${quality}`,
    `f_${format}`,
    `c_${crop}`,
    gravity && `g_${gravity}`,
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

// Helper function to generate video URLs
export function getCloudinaryVideoUrl(
  publicId: string,
  options: {
    quality?: number | 'auto';
    format?: 'auto' | 'mp4' | 'webm';
    width?: number;
    height?: number;
  } = {}
) {
  const {
    quality = 'auto',
    format = 'auto',
    width,
    height,
  } = options;

  const transformations = [
    width && `w_${width}`,
    height && `h_${height}`,
    `q_${quality}`,
    `f_${format}`,
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/${publicId}`;
}

export { cld };
