/**
 * SEO Optimization Utilities for EasyIo.tech
 * Centralized keyword management and SEO helpers
 */

// Target keywords for brand optimization
export const TARGET_KEYWORDS = {
  primary: [
    'easyio',
    'easyiotech',
    'easylotech',
    'easyiot',
    'easyiotechnology',
    'easyio technologies',
    'easyiotechnologies',
    'easyiotech'
  ],
  secondary: [
    'technology solutions',
    'IoT solutions',
    'automation services',
    'digital transformation',
    'sustainable tech',
    'EasyIo.tech'
  ],
  technical: [
    'web development',
    'mobile app development',
    'cloud services',
    'SEO optimization',
    'digital marketing',
    'brand design'
  ]
};

// Generate keyword-rich meta descriptions
export const generateMetaDescription = (
  pageType: 'home' | 'about' | 'services' | 'contact' | 'blog' | 'custom',
  customContent?: string
): string => {
  const baseDescription = 'EasyIo.tech (EasyIoTech) - Leading technology company specializing in IoT, automation, digital transformation, and innovative solutions. EasyIoTechnology makes complex tech accessible and sustainable.';
  
  const pageDescriptions = {
    home: baseDescription,
    about: `About EasyIo.tech (EasyIoTech) - Founded in 2023, we're a leading technology company specializing in IoT, automation, and digital transformation. Learn about EasyIoTechnology's mission and vision.`,
    services: `EasyIo.tech Services - Comprehensive IoT solutions, automation services, digital transformation, web development, and cloud services. EasyIoTech delivers innovative technology solutions.`,
    contact: `Contact EasyIo.tech (EasyIoTech) - Get in touch with our technology experts for IoT solutions, automation services, and digital transformation projects. EasyIoTechnology support team.`,
    blog: `EasyIo.tech Blog - Latest insights on IoT, automation, digital transformation, and technology trends from EasyIoTech experts. Stay updated with EasyIoTechnology innovations.`,
    custom: customContent || baseDescription
  };

  return pageDescriptions[pageType];
};

// Generate keyword-rich titles
export const generatePageTitle = (
  pageTitle: string,
  includeKeywords: boolean = true
): string => {
  const brandSuffix = 'EasyIo.tech';
  const keywordSuffix = 'EasyIoTech Solutions';
  
  if (pageTitle.includes(brandSuffix)) {
    return pageTitle;
  }
  
  if (includeKeywords) {
    return `${pageTitle} | ${brandSuffix} - ${keywordSuffix}`;
  }
  
  return `${pageTitle} | ${brandSuffix}`;
};

// Generate comprehensive keywords string
export const generateKeywords = (
  pageSpecificKeywords: string[] = [],
  includeAllTargets: boolean = true
): string => {
  let keywords: string[] = [];
  
  if (includeAllTargets) {
    keywords = [
      ...TARGET_KEYWORDS.primary,
      ...TARGET_KEYWORDS.secondary,
      ...TARGET_KEYWORDS.technical
    ];
  }
  
  keywords = [...keywords, ...pageSpecificKeywords];
  
  // Remove duplicates and return as comma-separated string
  return [...new Set(keywords)].join(', ');
};

// Generate structured data for different page types
export const generateStructuredData = (
  pageType: 'organization' | 'website' | 'service' | 'article' | 'breadcrumb',
  data: any = {}
): object => {
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EasyIo.tech",
    "alternateName": ["EasyIoTech", "EasyIoTechnology", "EasyIo Technologies"],
    "description": "Leading technology company specializing in IoT, automation, digital transformation, and innovative solutions.",
    "url": "https://easyio.tech",
    "logo": {
      "@type": "ImageObject",
      "url": "https://easyio.tech/logo.png",
      "width": 512,
      "height": 512
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"],
      "areaServed": "Global"
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
    "keywords": TARGET_KEYWORDS.primary.join(', '),
    "foundingDate": "2023",
    "numberOfEmployees": "10-50",
    "industry": "Technology Services",
    "services": [
      "IoT Solutions",
      "Digital Transformation",
      "Automation Services",
      "Web Development",
      "Mobile App Development",
      "Cloud Services",
      "SEO & Digital Marketing"
    ]
  };

  switch (pageType) {
    case 'organization':
      return { ...baseOrganization, ...data };
      
    case 'website':
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "EasyIo.tech",
        "alternateName": ["EasyIoTech", "EasyIoTechnology"],
        "url": "https://easyio.tech",
        "description": "Leading technology company specializing in IoT, automation, digital transformation, and innovative solutions.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://easyio.tech/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        ...data
      };
      
    case 'service':
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        "provider": baseOrganization,
        "areaServed": "Global",
        "serviceType": "Technology Services",
        ...data
      };
      
    case 'article':
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "publisher": baseOrganization,
        ...data
      };
      
    case 'breadcrumb':
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        ...data
      };
      
    default:
      return baseOrganization;
  }
};

// Generate Open Graph data
export const generateOpenGraphData = (
  title: string,
  description: string,
  url: string = 'https://easyio.tech',
  image: string = 'https://easyio.tech/opengraph-image-p98pqg.png',
  type: string = 'website'
) => {
  return {
    'og:title': title,
    'og:description': description,
    'og:type': type,
    'og:url': url,
    'og:site_name': 'EasyIo.tech',
    'og:image': image,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': title,
    'og:locale': 'en_US'
  };
};

// Generate Twitter Card data
export const generateTwitterCardData = (
  title: string,
  description: string,
  image: string = 'https://easyio.tech/opengraph-image-p98pqg.png'
) => {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:image:alt': title,
    'twitter:site': '@easyiotech',
    'twitter:creator': '@easyiotech'
  };
};

// Validate and optimize content for SEO
export const optimizeContentForSEO = (content: string, targetKeywords: string[]): {
  score: number;
  suggestions: string[];
  optimizedContent: string;
} => {
  const suggestions: string[] = [];
  let score = 0;
  let optimizedContent = content;

  // Check keyword density
  const wordCount = content.split(' ').length;
  const keywordCount = targetKeywords.reduce((count, keyword) => {
    const regex = new RegExp(keyword, 'gi');
    const matches = content.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);

  const keywordDensity = (keywordCount / wordCount) * 100;

  if (keywordDensity < 1) {
    suggestions.push('Consider adding more target keywords to improve SEO relevance');
    score -= 10;
  } else if (keywordDensity > 3) {
    suggestions.push('Keyword density is too high, consider reducing to avoid keyword stuffing');
    score -= 15;
  } else {
    score += 20;
  }

  // Check content length
  if (wordCount < 300) {
    suggestions.push('Content is too short, consider expanding to at least 300 words');
    score -= 20;
  } else if (wordCount > 2000) {
    suggestions.push('Content is very long, consider breaking into sections or multiple pages');
    score -= 5;
  } else {
    score += 15;
  }

  // Check for brand mentions
  const brandMentions = TARGET_KEYWORDS.primary.filter(keyword => 
    content.toLowerCase().includes(keyword.toLowerCase())
  ).length;

  if (brandMentions === 0) {
    suggestions.push('Consider mentioning EasyIo.tech or EasyIoTech in the content');
    score -= 10;
  } else {
    score += 10;
  }

  return {
    score: Math.max(0, Math.min(100, score + 50)), // Normalize to 0-100
    suggestions,
    optimizedContent
  };
};

// Generate canonical URL
export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://easyio.tech';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

// Generate hreflang tags for international SEO
export const generateHreflangTags = (currentPath: string) => {
  const baseUrl = 'https://easyio.tech';
  return [
    { rel: 'alternate', hreflang: 'en', href: `${baseUrl}${currentPath}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}${currentPath}` }
  ];
};
