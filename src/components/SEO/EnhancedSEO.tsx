import React from 'react';
import { Helmet } from 'react-helmet-async';

interface EnhancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  structuredData?: object;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  title = 'EasyIo.tech - Simplifying Technology',
  description = 'EasyIo.tech specializes in sustainable agriculture, school management, business solutions, student programs, and technical services. Making technology accessible, sustainable, and meaningful.',
  keywords = 'technology solutions, sustainable agriculture, school management, business solutions, student programs, technical services, EasyIo.tech, IoT, digital transformation',
  image = '/og-image.jpg',
  url = 'https://easyio.tech',
  type = 'website',
  structuredData,
  canonicalUrl,
  noindex = false,
  nofollow = false,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const fullTitle = title.includes('EasyIo.tech') ? title : `${title} | EasyIo.tech`;
  const fullUrl = url.startsWith('http') ? url : `https://easyio.tech${url}`;
  const fullImage = image.startsWith('http') ? image : `https://easyio.tech${image}`;
  const canonical = canonicalUrl || fullUrl;

  // Default organization structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EasyIo.tech",
    "description": description,
    "url": "https://easyio.tech",
    "logo": {
      "@type": "ImageObject",
      "url": "https://easyio.tech/logo.png",
      "width": 512,
      "height": 512
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXX-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"],
      "areaServed": "IN"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "sameAs": [
      "https://linkedin.com/company/easyiotech",
      "https://twitter.com/easyiotech",
      "https://github.com/easyiotech"
    ],
    "foundingDate": "2023",
    "numberOfEmployees": "10-50",
    "industry": "Technology Services",
    "services": [
      "Sustainable Agriculture Technology",
      "School Management Systems", 
      "Business Solutions",
      "Student Programs",
      "Technical Services"
    ]
  };

  // Enhanced structured data for services
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "EasyIo.tech",
      "url": "https://easyio.tech"
    },
    "areaServed": "IN",
    "serviceType": "Technology Services"
  };

  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EasyIo.tech",
    "url": "https://easyio.tech",
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://easyio.tech/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = url !== 'https://easyio.tech' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://easyio.tech"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": title.replace(' | EasyIo.tech', ''),
        "item": fullUrl
      }
    ]
  } : null;

  const finalStructuredData = structuredData || 
    (type === 'service' ? serviceStructuredData : 
     type === 'website' ? [defaultStructuredData, websiteStructuredData] :
     defaultStructuredData);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Robots Meta Tags */}
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
      <meta name="googlebot" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="EasyIo.tech" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && author && <meta property="article:author" content={author} />}
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && section && <meta property="article:section" content={section} />}
      {type === 'article' && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@easyiotech" />
      <meta name="twitter:creator" content="@easyiotech" />
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="EasyIo.tech" />
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://api.easyio.tech" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default EnhancedSEO;
