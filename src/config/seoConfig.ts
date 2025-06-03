/**
 * SEO Configuration for EasyIo.tech
 * Centralized SEO settings and metadata
 */

export const SEO_CONFIG = {
  // Base domain and URL configuration
  domain: 'easyio.tech',
  baseUrl: 'https://easyio.tech',
  
  // Default meta information
  defaultTitle: 'EasyIo.tech - Simplifying Technology | EasyIoTech Solutions',
  defaultDescription: 'EasyIo.tech (EasyIoTech) - Leading technology company specializing in IoT, automation, digital transformation, and innovative solutions. EasyIoTechnology makes complex tech accessible and sustainable.',
  
  // Brand keywords for SEO optimization
  brandKeywords: [
    'easyio',
    'easyiotech', 
    'easylotech',
    'easyiot',
    'easyiotechnology',
    'easyio technologies',
    'easyiotechnologies',
    'easyiotech'
  ],
  
  // Core service keywords
  serviceKeywords: [
    'technology solutions',
    'IoT solutions',
    'automation services',
    'digital transformation',
    'web development',
    'mobile app development',
    'cloud services',
    'SEO optimization',
    'digital marketing',
    'sustainable technology'
  ],
  
  // Social media handles
  social: {
    twitter: '@easyiotech',
    linkedin: 'https://linkedin.com/company/easyiotech',
    github: 'https://github.com/easyiotech',
    facebook: 'https://facebook.com/easyiotech'
  },
  
  // Company information
  company: {
    name: 'EasyIo.tech',
    alternateName: ['EasyIoTech', 'EasyIoTechnology', 'EasyIo Technologies'],
    foundingDate: '2023',
    industry: 'Technology Services',
    numberOfEmployees: '10-50',
    addressCountry: 'IN',
    addressRegion: 'India',
    areaServed: 'Global'
  },
  
  // Default images
  images: {
    logo: '/logo.png',
    ogImage: '/opengraph-image-p98pqg.png',
    favicon: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png'
  },
  
  // Page-specific SEO configurations
  pages: {
    home: {
      title: 'EasyIo.tech - Simplifying Technology | EasyIoTech Solutions',
      description: 'EasyIo.tech (EasyIoTech) - Leading technology company specializing in IoT, automation, digital transformation, and innovative solutions. EasyIoTechnology makes complex tech accessible and sustainable for businesses worldwide.',
      keywords: ['easyio', 'easyiotech', 'technology solutions', 'IoT', 'automation', 'digital transformation'],
      priority: 1.0,
      changefreq: 'daily'
    },
    about: {
      title: 'About EasyIo.tech | EasyIoTech Company',
      description: 'About EasyIo.tech (EasyIoTech) - Founded in 2023, we\'re a leading technology company specializing in IoT, automation, and digital transformation. Learn about EasyIoTechnology\'s mission and vision.',
      keywords: ['about easyio', 'easyiotech company', 'technology company', 'IoT company', 'automation company'],
      priority: 0.9,
      changefreq: 'weekly'
    },
    services: {
      title: 'Services - EasyIo.tech | EasyIoTech Solutions',
      description: 'EasyIo.tech Services - Comprehensive IoT solutions, automation services, digital transformation, web development, and cloud services. EasyIoTech delivers innovative technology solutions.',
      keywords: ['easyio services', 'IoT solutions', 'automation services', 'digital transformation', 'technology services', 'easyiotech solutions'],
      priority: 0.9,
      changefreq: 'weekly'
    },
    contact: {
      title: 'Contact EasyIo.tech | EasyIoTech Support',
      description: 'Contact EasyIo.tech (EasyIoTech) - Get in touch with our technology experts for IoT solutions, automation services, and digital transformation projects. EasyIoTechnology support team.',
      keywords: ['contact easyio', 'easyiotech contact', 'technology consultation', 'IoT consultation', 'automation consultation'],
      priority: 0.8,
      changefreq: 'monthly'
    },
    blog: {
      title: 'Blog - EasyIo.tech | EasyIoTech Insights',
      description: 'EasyIo.tech Blog - Latest insights on IoT, automation, digital transformation, and technology trends from EasyIoTech experts. Stay updated with EasyIoTechnology innovations.',
      keywords: ['easyio blog', 'technology blog', 'IoT insights', 'automation trends', 'digital transformation news'],
      priority: 0.7,
      changefreq: 'daily'
    }
  },
  
  // Service-specific SEO configurations
  services: {
    'iot-solutions': {
      title: 'IoT Solutions | EasyIo.tech - EasyIoTech',
      description: 'Professional IoT solutions by EasyIo.tech (EasyIoTech). Custom Internet of Things development, smart device integration, and IoT consulting services.',
      keywords: ['IoT solutions', 'Internet of Things', 'smart devices', 'IoT development', 'easyio IoT']
    },
    'automation-services': {
      title: 'Automation Services | EasyIo.tech - EasyIoTech',
      description: 'Business automation services by EasyIo.tech (EasyIoTech). Process automation, workflow optimization, and intelligent automation solutions.',
      keywords: ['automation services', 'process automation', 'workflow automation', 'business automation', 'easyio automation']
    },
    'digital-transformation': {
      title: 'Digital Transformation | EasyIo.tech - EasyIoTech',
      description: 'Digital transformation services by EasyIo.tech (EasyIoTech). Modernize your business with cloud migration, digital strategy, and technology consulting.',
      keywords: ['digital transformation', 'digital strategy', 'cloud migration', 'technology consulting', 'easyio digital']
    },
    'web-development': {
      title: 'Web Development | EasyIo.tech - EasyIoTech',
      description: 'Professional web development services by EasyIo.tech (EasyIoTech). Custom websites, web applications, and e-commerce solutions.',
      keywords: ['web development', 'website development', 'web applications', 'e-commerce', 'easyio web']
    },
    'app-development': {
      title: 'Mobile App Development | EasyIo.tech - EasyIoTech',
      description: 'Mobile app development services by EasyIo.tech (EasyIoTech). iOS, Android, and cross-platform mobile applications.',
      keywords: ['mobile app development', 'iOS development', 'Android development', 'mobile apps', 'easyio apps']
    },
    'cloud-services': {
      title: 'Cloud Services | EasyIo.tech - EasyIoTech',
      description: 'Cloud services and solutions by EasyIo.tech (EasyIoTech). Cloud migration, infrastructure, hosting, and cloud consulting.',
      keywords: ['cloud services', 'cloud migration', 'cloud hosting', 'cloud infrastructure', 'easyio cloud']
    }
  },
  
  // Structured data templates
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'EasyIo.tech',
      alternateName: ['EasyIoTech', 'EasyIoTechnology', 'EasyIo Technologies'],
      url: 'https://easyio.tech',
      logo: 'https://easyio.tech/logo.png',
      foundingDate: '2023',
      industry: 'Technology Services',
      numberOfEmployees: '10-50',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressRegion: 'India'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'Global'
      },
      sameAs: [
        'https://linkedin.com/company/easyiotech',
        'https://twitter.com/easyiotech',
        'https://github.com/easyiotech'
      ]
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'EasyIo.tech',
      alternateName: ['EasyIoTech', 'EasyIoTechnology'],
      url: 'https://easyio.tech',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://easyio.tech/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  },
  
  // Robots.txt configuration
  robots: {
    allow: [
      '/',
      '/services/',
      '/about/',
      '/contact/',
      '/our-work/',
      '/blog/',
      '/case-studies/'
    ],
    disallow: [
      '/admin/',
      '/dashboard/',
      '/setup-settings/',
      '/api/'
    ],
    sitemap: 'https://easyio.tech/sitemap.xml'
  }
};

// Helper functions for SEO
export const generatePageTitle = (pageTitle: string, includeBrand: boolean = true): string => {
  if (includeBrand && !pageTitle.includes('EasyIo.tech')) {
    return `${pageTitle} | ${SEO_CONFIG.company.name}`;
  }
  return pageTitle;
};

export const generateKeywords = (pageKeywords: string[] = []): string => {
  const allKeywords = [
    ...SEO_CONFIG.brandKeywords,
    ...SEO_CONFIG.serviceKeywords,
    ...pageKeywords
  ];
  return [...new Set(allKeywords)].join(', ');
};

export const generateCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_CONFIG.baseUrl}${cleanPath}`;
};

export default SEO_CONFIG;
