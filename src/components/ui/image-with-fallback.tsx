import React, { useState } from 'react';
import { ImageIcon, AlertCircle } from 'lucide-react';
import { useProxiedImage } from '@/lib/image-proxy';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  fallbackSrc?: string;
}

/**
 * A component that displays an image with fallback, CORS handling,
 * and provides useful debugging information when images fail to load
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  fallbackSrc,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Use the image proxy for external images
  const proxiedSrc = useProxiedImage(currentSrc);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    // Only log in development to avoid console spam in production
    if (import.meta.env.DEV) {
      console.error(`Failed to load image: ${currentSrc}`);
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
  };

  return (
    <div className="relative w-full h-full">
      {currentSrc ? (
        <>
          <img
            src={proxiedSrc}
            alt={alt}
            className={`${className} ${!isLoaded && 'opacity-0'}`}
            onLoad={handleLoad}
            onError={handleError}
            crossOrigin="anonymous"
            loading="lazy"
          />

          {/* Loading or error state */}
          {!isLoaded && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 ${fallbackClassName}`}
              onClick={() => setShowDebugInfo(!showDebugInfo)}
            >
              {hasError ? (
                <>
                  <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center px-4">
                    Image failed to load
                  </p>
                </>
              ) : (
                <ImageIcon className="h-10 w-10 text-gray-400 animate-pulse" />
              )}

              {/* Debug information */}
              {showDebugInfo && hasError && (
                <div className="mt-2 p-2 bg-black/70 text-white text-xs rounded max-w-full overflow-hidden">
                  <p className="truncate">Original: {src}</p>
                  {fallbackSrc && <p className="truncate">Fallback: {fallbackSrc}</p>}
                  <p className="truncate">Current: {currentSrc}</p>
                  <p className="truncate">Proxied: {proxiedSrc}</p>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className={`w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 ${fallbackClassName}`}>
          <ImageIcon className="h-10 w-10 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
