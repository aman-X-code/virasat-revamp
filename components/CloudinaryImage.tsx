import Image from 'next/image';
import { getCloudinaryImageUrl } from '@/lib/cloudinary-loader';
import React from 'react';

// Predefined image configurations for common use cases with optimized sizes
const imageConfigs = {
  hero: {
    desktop: { width: 1920, height: 1080, crop: 'fill' as const, quality: 'auto' as const },
    tablet: { width: 1024, height: 768, crop: 'fill' as const, quality: 'auto' as const },
    mobile: { width: 768, height: 576, crop: 'fill' as const, quality: 'auto' as const }
  },
  thumbnail: {
    large: { width: 400, height: 300, crop: 'fill' as const, quality: 'auto' as const },
    medium: { width: 300, height: 225, crop: 'fill' as const, quality: 'auto' as const },
    small: { width: 200, height: 150, crop: 'fill' as const, quality: 'auto' as const }
  },
  portrait: {
    large: { width: 400, height: 600, crop: 'fill' as const, quality: 'auto' as const },
    medium: { width: 300, height: 450, crop: 'fill' as const, quality: 'auto' as const },
    small: { width: 200, height: 300, crop: 'fill' as const, quality: 'auto' as const }
  },
  gallery: {
    full: { width: 1200, crop: 'limit' as const, quality: 'auto' as const },
    preview: { width: 600, crop: 'limit' as const, quality: 'auto' as const },
    thumbnail: { width: 300, height: 300, crop: 'fill' as const, quality: 'auto' as const }
  }
};

// Default blur placeholder for better perceived performance
const DEFAULT_BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

// Helper function to get image URL with predefined config
function getImageUrl(publicId: string, type: string, size: string, folder: string = '') {
  const typeConfig = imageConfigs[type as keyof typeof imageConfigs];
  if (!typeConfig) {
    console.warn(`Invalid image type: ${type}`);
    return getCloudinaryImageUrl(`${folder}/${publicId}`);
  }
  
  const config = (typeConfig as any)[size];
  if (!config) {
    console.warn(`Invalid image size: ${size} for type: ${type}`);
    return getCloudinaryImageUrl(`${folder}/${publicId}`);
  }
  
  return getCloudinaryImageUrl(`${folder}/${publicId}`, config);
}

interface CloudinaryImageProps {
  publicId: string;
  folder: string;
  type?: string;
  size?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  quality?: number | 'auto';
  [key: string]: any;
}

/**
 * Cloudinary-optimized Image component using Next.js Image component
 * @param {string} publicId - The public ID (filename without extension)
 * @param {string} folder - Folder name (hero, events, artists, etc.)
 * @param {string} type - Image type from predefined configs
 * @param {string} size - Size variant
 * @param {string} alt - Alt text (optional, defaults to empty string)
 * @param {Object} props - Additional Image props
 */
export default function CloudinaryImage({ 
  publicId, 
  folder, 
  type, 
  size, 
  alt, 
  className,
  width,
  height,
  fill,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  loading = 'lazy',
  quality = 'auto',
  ...props 
}: CloudinaryImageProps) {
  // If type and size are provided, use predefined config
  const src = type && size 
    ? getImageUrl(publicId, type, size, folder)
    : `${folder}/${publicId}`;

  // For Next.js Image component, we need to provide either width/height or fill
  const imageProps: any = {
    src,
    alt: alt || 'Image',
    className,
    priority,
    placeholder,
    blurDataURL: blurDataURL || DEFAULT_BLUR_DATA_URL,
    loading: priority ? 'eager' : loading,
    quality,
    ...props
  };

  // Add width/height or fill based on what's provided
  if (fill) {
    imageProps.fill = true;
  } else if (width && height) {
    imageProps.width = width;
    imageProps.height = height;
  } else {
    // Fallback: if no dimensions provided, use fill
    imageProps.fill = true;
  }

  return <Image {...imageProps} alt={imageProps.alt} />;
}
