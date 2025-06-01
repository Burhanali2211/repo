/**
 * Sitemap generation utilities for EasyIo.tech
 * Generates XML sitemaps for better SEO
 */

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapData {
  urls: SitemapUrl[];
}

/**
 * Generate XML sitemap content
 */
export function generateSitemapXML(urls: SitemapUrl[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urlElements = urls.map(url => {
    let urlElement = `  <url>\n    <loc>${url.loc}</loc>`;
    
    if (url.lastmod) {
      urlElement += `\n    <lastmod>${url.lastmod}</lastmod>`;
    }
    
    if (url.changefreq) {
      urlElement += `\n    <changefreq>${url.changefreq}</changefreq>`;
    }
    
    if (url.priority !== undefined) {
      urlElement += `\n    <priority>${url.priority}</priority>`;
    }
    
    urlElement += '\n  </url>';
    return urlElement;
  }).join('\n');

  return `${xmlHeader}\n${urlsetOpen}\n${urlElements}\n${urlsetClose}`;
}

/**
 * Get static pages for sitemap
 */
export function getStaticPages(): SitemapUrl[] {
  const baseUrl = 'https://easyio.tech';
  const currentDate = new Date().toISOString().split('T')[0];

  return [
    {
      loc: baseUrl,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/services`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/our-work`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/industries`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/case-studies`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.6
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/careers`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.6
    },
    {
      loc: `${baseUrl}/faq`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.5
    },
    {
      loc: `${baseUrl}/privacy`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: `${baseUrl}/terms`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: `${baseUrl}/cookies`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    }
  ];
}

/**
 * Get service pages for sitemap
 */
export function getServicePages(): SitemapUrl[] {
  const baseUrl = 'https://easyio.tech';
  const currentDate = new Date().toISOString().split('T')[0];

  const services = [
    'sustainable-agriculture',
    'school-management',
    'business-solutions',
    'student-programs',
    'technical-services',
    'web-development',
    'app-development',
    'digital-marketing',
    'seo',
    'brand-design',
    'cloud-services',
    'digital-transformation'
  ];

  return services.map(service => ({
    loc: `${baseUrl}/services/${service}`,
    lastmod: currentDate,
    changefreq: 'monthly' as const,
    priority: 0.7
  }));
}

/**
 * Generate complete sitemap
 */
export async function generateCompleteSitemap(): Promise<string> {
  const staticPages = getStaticPages();
  const servicePages = getServicePages();
  
  // Combine all URLs
  const allUrls = [
    ...staticPages,
    ...servicePages
  ];

  // Sort by priority (highest first) and then alphabetically
  allUrls.sort((a, b) => {
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0);
    }
    return a.loc.localeCompare(b.loc);
  });

  return generateSitemapXML(allUrls);
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  const baseUrl = 'https://easyio.tech';
  
  return `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /dashboard/
Disallow: /setup-settings/
Disallow: /api/

# Allow important pages
Allow: /services/
Allow: /our-work/
Allow: /blog/
Allow: /case-studies/

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;
}

/**
 * Download sitemap as file
 */
export function downloadSitemap(content: string, filename: string = 'sitemap.xml'): void {
  const blob = new Blob([content], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Validate sitemap URLs
 */
export function validateSitemapUrls(urls: SitemapUrl[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  urls.forEach((url, index) => {
    // Check if URL is valid
    try {
      new URL(url.loc);
    } catch {
      errors.push(`Invalid URL at index ${index}: ${url.loc}`);
    }
    
    // Check priority range
    if (url.priority !== undefined && (url.priority < 0 || url.priority > 1)) {
      errors.push(`Invalid priority at index ${index}: ${url.priority} (must be between 0 and 1)`);
    }
    
    // Check lastmod format
    if (url.lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(url.lastmod)) {
      errors.push(`Invalid lastmod format at index ${index}: ${url.lastmod} (must be YYYY-MM-DD)`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Submit sitemap to search engines
 */
export function submitSitemapToSearchEngines(sitemapUrl: string): void {
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  ];
  
  searchEngines.forEach(url => {
    // Open in new tab for manual submission
    window.open(url, '_blank');
  });
}
