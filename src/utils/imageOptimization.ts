/**
 * Image Optimization Utilities
 * 
 * Comprehensive image optimization and management utilities for EasyIo.tech
 * Handles responsive images, lazy loading, WebP conversion, and performance tracking
 */

// Image format detection and optimization
export const getOptimizedImageUrl = (
  originalUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png' | 'auto';
  } = {}
): string => {
  const { width, height, quality = 80, format = 'auto' } = options;
  
  // For local images, return as-is (they should already be optimized)
  if (originalUrl.startsWith('/') || originalUrl.startsWith('./')) {
    return originalUrl;
  }
  
  // For placeholder images, add optimization parameters
  if (originalUrl.includes('via.placeholder.com')) {
    let optimizedUrl = originalUrl;
    
    if (width && height) {
      optimizedUrl = optimizedUrl.replace(/\d+x\d+/, `${width}x${height}`);
    }
    
    return optimizedUrl;
  }
  
  // For external images, return original URL (handled by proxy)
  return originalUrl;
};

// Responsive image srcSet generation
export const generateResponsiveSrcSet = (
  baseUrl: string,
  breakpoints: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  return breakpoints
    .map(width => {
      const optimizedUrl = getOptimizedImageUrl(baseUrl, { width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
};

// Image preloading utility
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Lazy loading intersection observer
export const createLazyLoadObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, defaultOptions);
};

// Image performance tracking
export interface ImagePerformanceMetrics {
  loadTime: number;
  fileSize?: number;
  format: string;
  dimensions: { width: number; height: number };
  cached: boolean;
}

export const trackImagePerformance = (
  imageElement: HTMLImageElement,
  startTime: number
): ImagePerformanceMetrics => {
  const loadTime = performance.now() - startTime;
  const cached = loadTime < 50; // Assume cached if loads very quickly
  
  return {
    loadTime,
    format: getImageFormat(imageElement.src),
    dimensions: {
      width: imageElement.naturalWidth,
      height: imageElement.naturalHeight
    },
    cached
  };
};

// Get image format from URL or data
export const getImageFormat = (src: string): string => {
  if (src.includes('.webp')) return 'webp';
  if (src.includes('.jpg') || src.includes('.jpeg')) return 'jpeg';
  if (src.includes('.png')) return 'png';
  if (src.includes('.svg')) return 'svg';
  if (src.includes('.gif')) return 'gif';
  return 'unknown';
};

// WebP support detection
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Image compression utility (for client-side uploads)
export const compressImage = (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Image validation utility
export const validateImage = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPEG, PNG, WebP, or SVG images.'
    };
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size too large. Please upload images smaller than 10MB.'
    };
  }
  
  return { valid: true };
};

// Generate placeholder image data URL
export const generatePlaceholder = (
  width: number,
  height: number,
  color: string = '#f3f4f6',
  textColor: string = '#9ca3af',
  text?: string
): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  canvas.width = width;
  canvas.height = height;
  
  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  // Add text if provided
  if (text) {
    ctx.fillStyle = textColor;
    ctx.font = `${Math.min(width, height) / 10}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
  }
  
  return canvas.toDataURL();
};

// Image accessibility utilities
export const generateAltText = (
  filename: string,
  context?: string
): string => {
  // Remove file extension and clean up filename
  const cleanName = filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  if (context) {
    return `${cleanName} - ${context}`;
  }
  
  return cleanName;
};

// Export all utilities
export default {
  getOptimizedImageUrl,
  generateResponsiveSrcSet,
  preloadImage,
  createLazyLoadObserver,
  trackImagePerformance,
  getImageFormat,
  supportsWebP,
  compressImage,
  validateImage,
  generatePlaceholder,
  generateAltText
};
