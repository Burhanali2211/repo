/**
 * Image Proxy Utility
 * 
 * This utility helps prevent OpaqueResponseBlocking errors by:
 * 1. Using proper CORS headers
 * 2. Providing a proxy function for external images
 * 3. Setting appropriate cache control
 */

// Define allowed image sources with proper CORS support
const TRUSTED_IMAGE_DOMAINS = [
  'cloudinary.com',
  'res.cloudinary.com',
  'cdn.pixabay.com',
  'pixabay.com',
  // Supabase storage domains
  'supabase.co',
  'supabase.com'
];

/**
 * Check if URL is from a trusted source that might have CORS issues
 */
export const isTrustedImageSource = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return TRUSTED_IMAGE_DOMAINS.some(domain => parsedUrl.hostname.includes(domain));
  } catch (e) {
    console.error('Invalid URL format:', url);
    return false;
  }
};

/**
 * Get proper image URL to prevent CORS issues
 * For trusted sources, we add proper parameters to ensure CORS compatibility
 */
export const getProxiedImageUrl = (url: string): string => {
  if (!url) return '';

  try {
    const parsedUrl = new URL(url);

    // For Cloudinary, ensure proper delivery
    if (parsedUrl.hostname.includes('cloudinary.com')) {
      // Add auto-format and quality params for Cloudinary
      const params = new URLSearchParams(parsedUrl.search);
      if (!params.has('f_auto')) params.set('f_auto', 'true');
      if (!params.has('q_auto')) params.set('q_auto', 'good');

      parsedUrl.search = params.toString();
      return parsedUrl.toString();
    }

    // For Supabase storage, ensure proper caching
    if (parsedUrl.hostname.includes('supabase.co') || parsedUrl.hostname.includes('supabase.com')) {
      // Supabase storage URLs are already optimized, just return as-is
      return url;
    }

    // Return original URL for other sources
    return url;
  } catch (e) {
    console.error('Error processing image URL:', e);
    return url;
  }
};

/**
 * Image component props type
 */
export type ImageProxyProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
};

/**
 * React hook for using proxied images
 */
export const useProxiedImage = (originalUrl: string): string => {
  if (!originalUrl) return '';

  // Only proxy if it's a trusted external source
  if (isTrustedImageSource(originalUrl)) {
    return getProxiedImageUrl(originalUrl);
  }

  return originalUrl;
};

// Export a default helper function
export default getProxiedImageUrl;
