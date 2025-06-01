import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';
import { useWebsiteSettings } from '@/contexts/SettingsContext';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useWebsiteSettings();

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'Our Work', path: '/our-work' },
        { label: 'Industries We Serve', path: '/industries' },
        { label: 'Careers', path: '/careers' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Web Design & Development', path: '/services/web-development' },
        { label: 'SEO Services', path: '/services/seo' },
        { label: 'Digital Marketing', path: '/services/digital-marketing' },
        { label: 'Brand Design', path: '/services/brand-design' },
        { label: 'Cloud Services', path: '/services/cloud-services' },
        { label: 'Mobile Applications', path: '/services/app-development' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', path: '/blog' },
        { label: 'Case Studies', path: '/case-studies' },
        { label: 'FAQ', path: '/about#faq' },
        { label: 'Support', path: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Cookie Policy', path: '/cookies' },
      ],
    },
  ];

  // Social media icon mapping
  const socialIconMap: { [key: string]: React.ComponentType<any> } = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    github: Github,
    youtube: Youtube
  };

  // Dynamic social links from settings
  const socialLinks = settings?.social_links ?
    Object.entries(settings.social_links)
      .filter(([_, url]) => url && url.trim() !== '')
      .map(([platform, url]) => ({
        icon: platform,
        label: platform.charAt(0).toUpperCase() + platform.slice(1),
        url: url as string,
        IconComponent: socialIconMap[platform.toLowerCase()] || MessageSquare
      })) : [];

  // Dynamic contact info from settings
  const contactInfo = [
    ...(settings?.contact_phone ? [{
      icon: Phone,
      label: settings.contact_phone,
      url: `tel:${settings.contact_phone.replace(/\D/g, '')}`
    }] : []),
    ...(settings?.contact_email ? [{
      icon: Mail,
      label: settings.contact_email,
      url: `mailto:${settings.contact_email}`
    }] : []),
    ...(settings?.address ? [{
      icon: MapPin,
      label: [
        settings.address,
        settings.address_line_2,
        settings.city,
        settings.state_province,
        settings.postal_code
      ].filter(Boolean).join(', '),
      url: settings.map_embed_url || 'https://maps.google.com'
    }] : [])
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-950 pt-20 pb-8 text-gray-700 dark:text-gray-300">
      {/* Newsletter subscription section */}
      <div className="container mx-auto px-4 md:px-6 mb-16">
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-8 md:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Stay in the Loop</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">Get notified about our latest projects, company updates, and special announcements. No spam, just the good stuff.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
                  aria-label="Email for newsletter"
                />
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg whitespace-nowrap">
                Join Updates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <Logo size="lg" />

            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              Secure, seamless identity solutions for the digital age. Connect, protect, and manage your digital presence with confidence.
            </p>

            <div className="mt-6 space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-8 flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.IconComponent;
                  return (
                    <a
                      key={social.icon}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-600 hover:text-white transition-all"
                      aria-label={social.label}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && window.open(social.url, '_blank')}
                    >
                      <span className="sr-only">{social.label}</span>
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {footerLinks.map((column) => (
                <div key={column.title}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{column.title}</h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center group"
                          tabIndex={0}
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 overflow-hidden transition-all duration-300 text-purple-600 dark:text-purple-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-center md:text-left text-sm">
              {settings?.footer_text || `© ${currentYear} ${settings?.site_name || 'Easyio.tech'}. All rights reserved.`}
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-6">
              <Link to="/privacy" className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
              <Link to="/sitemap" className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
