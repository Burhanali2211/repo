import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PerformantImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  quality?: number;
}

/**
 * High-performance image component optimized for Core Web Vitals
 * Features:
 * - Lazy loading with intersection observer
 * - WebP format detection and fallback
 * - Responsive images with srcset
 * - Blur placeholder support
 * - Performance monitoring
 */
const PerformantImage: React.FC<PerformantImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder,
  onLoad,
  onError,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 80
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate optimized image URLs
  const generateSrcSet = (baseSrc: string) => {
    if (!baseSrc || baseSrc.startsWith('data:')) return '';
    
    const breakpoints = [320, 640, 768, 1024, 1280, 1920];
    return breakpoints
      .map(w => {
        const url = new URL(baseSrc, window.location.origin);
        url.searchParams.set('w', w.toString());
        url.searchParams.set('q', quality.toString());
        return `${url.toString()} ${w}w`;
      })
      .join(', ');
  };

  // WebP support detection
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Generate optimized src
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc || originalSrc.startsWith('data:')) return originalSrc;
    
    try {
      const url = new URL(originalSrc, window.location.origin);
      url.searchParams.set('q', quality.toString());
      
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      
      // Add WebP format if supported
      if (supportsWebP()) {
        url.searchParams.set('f', 'webp');
      }
      
      return url.toString();
    } catch {
      return originalSrc;
    }
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Set current src when in view
  useEffect(() => {
    if (isInView && src) {
      setCurrentSrc(getOptimizedSrc(src));
    }
  }, [isInView, src, width, height, quality]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  };

  // Generate blur placeholder
  const blurDataURL = placeholder || 
    `data:image/svg+xml;base64,${btoa(
      `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">Loading...</text>
      </svg>`
    )}`;

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {isInView && currentSrc && !hasError ? (
        <img
          ref={imgRef}
          src={currentSrc}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            "w-full h-full object-cover"
          )}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      ) : (
        <div 
          className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {hasError ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="text-sm">Failed to load image</div>
            </div>
          ) : (
            <div className="w-8 h-8 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
};

export default PerformantImage;
