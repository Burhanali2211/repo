import React from "react";
import { cn } from "@/lib/utils";
import { useProxiedImage, type ImageProxyProps } from "@/lib/image-proxy";

/**
 * ProxiedImage Component
 * 
 * A wrapper around the standard img element that automatically handles
 * CORS issues and OpaqueResponseBlocking by properly formatting image URLs
 * for external services like Unsplash.
 */
const ProxiedImage = ({
  src,
  alt,
  width,
  height,
  className,
  loading = "lazy",
  ...props
}: ImageProxyProps & React.ImgHTMLAttributes<HTMLImageElement>) => {
  // Get the proxied URL with proper parameters
  const proxiedSrc = useProxiedImage(src);
  
  return (
    <img
      src={proxiedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={cn("", className)}
      // Add proper crossOrigin attribute for external images
      crossOrigin="anonymous"
      // Add proper accessibility attributes
      aria-label={alt}
      // Event handlers
      onError={(e) => {
        console.warn(`Image failed to load: ${src}`);
        // Set fallback image or hide the broken image
        const target = e.target as HTMLImageElement;
        target.style.display = "none";
      }}
      {...props}
    />
  );
};

export { ProxiedImage };
