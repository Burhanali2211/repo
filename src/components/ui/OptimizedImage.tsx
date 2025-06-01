import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { 
  getOptimizedImageUrl, 
  generateResponsiveSrcSet, 
  createLazyLoadObserver,
  trackImagePerformance,
  generatePlaceholder,
  generateAltText
} from '@/utils/imageOptimization';
import { ImageIcon, AlertCircle } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  responsive?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: boolean;
  placeholderText?: string;
  priority?: boolean;
}

/**
 * OptimizedImage Component
 * 
 * A comprehensive image component with:
 * - Automatic optimization
 * - Lazy loading
 * - Responsive images
 * - Fallback handling
 * - Performance tracking
 * - Accessibility features
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  fallbackSrc,
  lazy = true,
  responsive = true,
  quality = 80,
  onLoad,
  onError,
  placeholder = true,
  placeholderText,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [loadStartTime, setLoadStartTime] = useState<number>(0);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate optimized image URL
  const optimizedSrc = getOptimizedImageUrl(currentSrc, {
    width,
    height,
    quality
  });

  // Generate responsive srcSet if enabled
  const srcSet = responsive ? generateResponsiveSrcSet(currentSrc) : undefined;

  // Generate alt text if not provided
  const imageAlt = alt || generateAltText(src, placeholderText);

  // Lazy loading observer
  useEffect(() => {
    if (!lazy || priority || !containerRef.current) return;

    const observer = createLazyLoadObserver((entry) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [lazy, priority]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    
    // Track performance
    if (loadStartTime && imgRef.current) {
      const metrics = trackImagePerformance(imgRef.current, loadStartTime);
      
      // Log performance in development
      if (import.meta.env.DEV) {
        console.log(`Image loaded: ${src}`, metrics);
      }
    }
    
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    if (import.meta.env.DEV) {
      console.warn(`Failed to load image: ${currentSrc}`);
    }

    // Try fallback image if available and we haven't tried it yet
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoaded(false);
      setHasError(false);
      return;
    }

    setIsLoaded(false);
    setHasError(true);
    onError?.();
  };

  // Start loading when in view
  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      setLoadStartTime(performance.now());
    }
  }, [isInView, isLoaded, hasError]);

  // Generate placeholder if needed
  const placeholderDataUrl = placeholder && width && height 
    ? generatePlaceholder(width, height, '#f3f4f6', '#9ca3af', placeholderText)
    : undefined;

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {isInView ? (
        <>
          <img
            ref={imgRef}
            src={optimizedSrc}
            srcSet={srcSet}
            sizes={responsive ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
            alt={imageAlt}
            width={width}
            height={height}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading={lazy && !priority ? "lazy" : "eager"}
            decoding="async"
          />

          {/* Loading state */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              {placeholderDataUrl ? (
                <img
                  src={placeholderDataUrl}
                  alt="Loading placeholder"
                  className="w-full h-full object-cover opacity-50"
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ImageIcon className="h-8 w-8 text-gray-400 animate-pulse" />
                  <span className="text-xs text-gray-500">Loading...</span>
                </div>
              )}
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500">
              <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
              <span className="text-xs text-center px-2">
                Failed to load image
              </span>
              {import.meta.env.DEV && (
                <span className="text-xs text-gray-400 mt-1 px-2 text-center">
                  {currentSrc}
                </span>
              )}
            </div>
          )}
        </>
      ) : (
        // Placeholder for lazy loading
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          {placeholderDataUrl ? (
            <img
              src={placeholderDataUrl}
              alt="Placeholder"
              className="w-full h-full object-cover opacity-30"
            />
          ) : (
            <ImageIcon className="h-8 w-8 text-gray-400" />
          )}
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
