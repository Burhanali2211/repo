import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import CounterAnimation from '../ui/CounterAnimation';

interface TrustIndicator {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  description: string;
  color: string;
  animated?: boolean;
  suffix?: string;
  prefix?: string;
}

// Custom SVG Icons
const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z" />
  </svg>
);

const AwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M5,16L3,5L8.5,12L12,4L15.5,12L21,5L19,16H5M12,13L9,15L10,11.5L7,9H10.5L12,5.5L13.5,9H17L14,11.5L15,15L12,13Z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z" />
  </svg>
);

const TrustIndicators: React.FC = () => {
  // Enhanced trust indicators with better messaging and more compelling stats
  const trustIndicators: TrustIndicator[] = [
    {
      icon: Star,
      value: 4.9,
      label: 'Client Satisfaction',
      description: 'Average rating from 300+ reviews',
      color: 'from-yellow-500 to-orange-500',
      animated: true,
      suffix: '★',
      prefix: '',
    },
    {
      icon: ShieldIcon,
      value: 150,
      label: 'Projects Delivered',
      description: 'Successfully completed across 20+ industries',
      color: 'from-purple-500 to-blue-500',
      animated: true,
      suffix: '+',
      prefix: '',
    },
    {
      icon: AwardIcon,
      value: 99,
      label: 'Success Rate',
      description: 'On-time delivery with quality assurance',
      color: 'from-green-500 to-emerald-500',
      animated: true,
      suffix: '%',
      prefix: '',
    },
    {
      icon: ClockIcon,
      value: '24/7',
      label: 'Expert Support',
      description: 'Round-the-clock technical assistance',
      color: 'from-blue-500 to-cyan-500',
      animated: false,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">EasyIo.tech</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Trusted by businesses worldwide for delivering exceptional technology solutions
            </p>
          </motion.div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-3 relative overflow-hidden">
                {/* Enhanced background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-bl-full opacity-50"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${indicator.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                      <indicator.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {indicator.animated && typeof indicator.value === 'number' ? (
                        <CounterAnimation
                          end={indicator.value}
                          duration={2.5}
                          delay={index * 0.3}
                          suffix={indicator.suffix}
                          prefix={indicator.prefix}
                          decimals={indicator.suffix === '★' ? 1 : 0}
                        />
                      ) : (
                        `${indicator.prefix || ''}${indicator.value}${indicator.suffix || ''}`
                      )}
                    </div>
                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {indicator.label}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {indicator.description}
                    </div>
                  </div>

                  {/* Enhanced progress bar for percentage values */}
                  {indicator.suffix === '%' && (
                    <div className="mt-6 space-y-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`bg-gradient-to-r ${indicator.color} h-3 rounded-full relative`}
                          initial={{ width: 0 }}
                          animate={{ width: `${indicator.value}%` }}
                          transition={{ duration: 2.5, delay: index * 0.3 + 0.5, ease: "easeOut" }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced live indicator for 24/7 support */}
                  {indicator.label === 'Expert Support' && (
                    <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-green-700 dark:text-green-400 font-medium">Live Support</span>
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                          8 experts online
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join hundreds of satisfied clients who trust us with their technology needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Free consultation</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Money-back guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;
