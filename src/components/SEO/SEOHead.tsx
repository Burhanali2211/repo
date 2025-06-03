import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'EasyIo.tech - Simplifying Technology | EasyIoTech Solutions',
  description = 'EasyIo.tech (EasyIoTech) - Leading technology company specializing in IoT, automation, digital transformation, and innovative solutions. EasyIoTechnology makes complex tech accessible and sustainable.',
  keywords = 'easyio, easyiotech, easylotech, easyiot, easyiotechnology, easyio technologies, easyiotechnologies, easyiotech, technology solutions, IoT, automation, digital transformation, sustainable tech, EasyIo.tech',
  image = '/og-image.jpg',
  url = 'https://easyio.tech',
  type = 'website',
  structuredData
}) => {
  const fullTitle = title.includes('EasyIo.tech') ? title : `${title} | EasyIo.tech`;
  const fullUrl = url.startsWith('http') ? url : `https://easyio.tech${url}`;
  const fullImage = image.startsWith('http') ? image : `https://easyio.tech${image}`;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EasyIo.tech",
    "alternateName": ["EasyIoTech", "EasyIoTechnology", "EasyIo Technologies"],
    "description": description,
    "url": "https://easyio.tech",
    "logo": "https://easyio.tech/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXX-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"],
      "areaServed": "Global"
    },
    "sameAs": [
      "https://linkedin.com/company/easyiotech",
      "https://twitter.com/easyiotech"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "keywords": "easyio, easyiotech, easylotech, easyiot, easyiotechnology, IoT, automation, digital transformation",
    "foundingDate": "2023",
    "industry": "Technology Services"
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="EasyIo.tech" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#6366f1" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="EasyIo.tech" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@easyiotech" />
      <meta name="twitter:creator" content="@easyiotech" />

      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="EasyIo.tech" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEOHead;
