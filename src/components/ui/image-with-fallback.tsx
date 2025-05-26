import React, { useState } from 'react';
import { ImageIcon, AlertCircle } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

/**
 * A component that displays an image with fallback
 * and provides useful debugging information when images fail to load
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackClassName = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setIsLoaded(false);
    setHasError(true);
  };

  return (
    <div className="relative w-full h-full">
      {src ? (
        <>
          <img
            src={src}
            alt={alt}
            className={`${className} ${!isLoaded && 'opacity-0'}`}
            onLoad={handleLoad}
            onError={handleError}
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
                  <p className="truncate">URL: {src}</p>
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
