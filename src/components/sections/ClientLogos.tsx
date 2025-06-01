import React from 'react';
import { motion } from 'framer-motion';

interface ClientLogo {
  name: string;
  logo: string;
  industry: string;
}

const ClientLogos: React.FC = () => {
  // Client logos with proper branding and fallback support
  const clientLogos: ClientLogo[] = [
    {
      name: 'Chinar Brand',
      logo: 'https://via.placeholder.com/120x60/f59e0b/ffffff?text=Chinar+Brand',
      industry: 'E-Commerce',
    },
    {
      name: 'Rakesh Travels',
      logo: 'https://via.placeholder.com/120x60/3b82f6/ffffff?text=Rakesh+Travels',
      industry: 'Travel & Tourism',
    },
    {
      name: 'Kadeem Holidays',
      logo: 'https://via.placeholder.com/120x60/10b981/ffffff?text=Kadeem+Holidays',
      industry: 'Travel & Tourism',
    },
    {
      name: 'Sobha Sales',
      logo: 'https://via.placeholder.com/120x60/8b5cf6/ffffff?text=Sobha+Sales',
      industry: 'Real Estate',
    },
    {
      name: 'Tiger Group',
      logo: 'https://via.placeholder.com/120x60/ef4444/ffffff?text=Tiger+Group',
      industry: 'Corporate',
    },
    {
      name: 'FinanceFlow',
      logo: 'https://via.placeholder.com/120x60/06b6d4/ffffff?text=FinanceFlow',
      industry: 'Finance',
    },
    {
      name: 'ManufacturePro',
      logo: 'https://via.placeholder.com/120x60/84cc16/ffffff?text=ManufacturePro',
      industry: 'Manufacturing',
    },
    {
      name: 'LogisticLink',
      logo: 'https://via.placeholder.com/120x60/f97316/ffffff?text=LogisticLink',
      industry: 'Logistics',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Trusted by Industry Leaders
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Join 500+ companies that chose EasyIo.tech for their digital transformation
        </p>
      </motion.div>

      {/* Logos Carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Gradient overlays for seamless effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track */}
        <div className="flex animate-marquee-slow py-6">
          {/* First set of logos */}
          {clientLogos.map((client, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-6 group"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/60 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 min-w-[140px] h-20 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-800 relative overflow-hidden">
                {/* Subtle background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative flex flex-col items-center space-y-1">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="h-8 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 font-medium">
                    {client.industry}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {clientLogos.map((client, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-6 group"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/60 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 min-w-[140px] h-20 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-800 relative overflow-hidden">
                {/* Subtle background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative flex flex-col items-center space-y-1">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="h-8 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 font-medium">
                    {client.industry}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center items-center space-x-6 text-xs text-gray-500 dark:text-gray-400"
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span>ISO 27001 Certified</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span>GDPR Compliant</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span>99.9% Uptime SLA</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientLogos;
