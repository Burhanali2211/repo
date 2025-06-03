import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  generateMetaDescription,
  generatePageTitle,
  generateKeywords,
  generateStructuredData,
  generateOpenGraphData,
  generateTwitterCardData,
  generateCanonicalUrl,
  generateHreflangTags
} from '@/utils/seoOptimization';

interface ComprehensiveSEOProps {
  // Basic SEO props
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  
  // Page type for automatic optimization
  pageType?: 'home' | 'about' | 'services' | 'contact' | 'blog' | 'custom';
  
  // Advanced SEO props
  noindex?: boolean;
  nofollow?: boolean;
  image?: string;
  imageAlt?: string;
  
  // Article specific props
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  
  // Custom structured data
  structuredData?: object[];
  
  // Social media props
  twitterHandle?: string;
  
  // Additional meta tags
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

const ComprehensiveSEO: React.FC<ComprehensiveSEOProps> = ({
  title,
  description,
  keywords = [],
  canonical,
  pageType = 'custom',
  noindex = false,
  nofollow = false,
  image = 'https://easyio.tech/opengraph-image-p98pqg.png',
  imageAlt,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  structuredData = [],
  twitterHandle = '@easyiotech',
  additionalMeta = []
}) => {
  // Generate optimized content
  const optimizedTitle = title ? generatePageTitle(title) : generatePageTitle('Simplifying Technology');
  const optimizedDescription = description || generateMetaDescription(pageType);
  const optimizedKeywords = generateKeywords(keywords, true);
  const canonicalUrl = canonical || generateCanonicalUrl(typeof window !== 'undefined' ? window.location.pathname : '/');
  const finalImageAlt = imageAlt || optimizedTitle;

  // Generate structured data
  const defaultStructuredData = [
    generateStructuredData('organization'),
    generateStructuredData('website', {
      url: canonicalUrl,
      name: optimizedTitle,
      description: optimizedDescription
    })
  ];

  const finalStructuredData = structuredData.length > 0 ? structuredData : defaultStructuredData;

  // Generate Open Graph data
  const ogData = generateOpenGraphData(optimizedTitle, optimizedDescription, canonicalUrl, image);
  
  // Generate Twitter Card data
  const twitterData = generateTwitterCardData(optimizedTitle, optimizedDescription, image);

  // Generate hreflang tags
  const hreflangTags = generateHreflangTags(typeof window !== 'undefined' ? window.location.pathname : '/');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={optimizedKeywords} />
      <meta name="author" content={author || 'EasyIo.tech'} />
      
      {/* Robots Meta Tags */}
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
      <meta name="googlebot" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang Tags */}
      {hreflangTags.map((tag, index) => (
        <link key={index} rel={tag.rel} hrefLang={tag.hreflang} href={tag.href} />
      ))}
      
      {/* Open Graph Meta Tags */}
      {Object.entries(ogData).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      {Object.entries(twitterData).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
      
      {/* Article specific meta tags */}
      {author && <meta name="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="EasyIo.tech" />
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
      
      {/* Custom additional meta tags */}
      {additionalMeta.map((meta, index) => (
        <meta 
          key={index} 
          {...(meta.name ? { name: meta.name } : {})}
          {...(meta.property ? { property: meta.property } : {})}
          content={meta.content} 
        />
      ))}
      
      {/* Performance and SEO optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://api.easyio.tech" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      {/* Structured Data */}
      {finalStructuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default ComprehensiveSEO;
