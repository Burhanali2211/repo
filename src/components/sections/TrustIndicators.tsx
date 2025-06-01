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
  const trustIndicators: TrustIndicator[] = [
    {
      icon: Star,
      value: 4.9,
      label: 'Client Rating',
      description: 'Based on 200+ reviews',
      color: 'from-yellow-500 to-orange-500',
      animated: true,
      suffix: '★',
      prefix: '',
    },
    {
      icon: ShieldIcon,
      value: 100,
      label: 'Projects Delivered',
      description: 'Across 15+ industries',
      color: 'from-purple-500 to-blue-500',
      animated: true,
      suffix: '+',
      prefix: '',
    },
    {
      icon: AwardIcon,
      value: 98,
      label: 'Success Rate',
      description: 'On-time delivery',
      color: 'from-green-500 to-emerald-500',
      animated: true,
      suffix: '%',
      prefix: '',
    },
    {
      icon: ClockIcon,
      value: '24/7',
      label: 'Expert Support',
      description: 'Average response: 2 hours',
      color: 'from-blue-500 to-cyan-500',
      animated: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {trustIndicators.map((indicator, index) => (
        <motion.div
          key={indicator.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group relative"
        >
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-gray-200/60 dark:border-gray-700/60 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-2 relative overflow-hidden">
            {/* Subtle background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              {/* Icon and header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${indicator.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                  <indicator.icon className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {indicator.animated && typeof indicator.value === 'number' ? (
                    <CounterAnimation
                      end={indicator.value}
                      duration={2}
                      delay={index * 0.2}
                      suffix={indicator.suffix}
                      prefix={indicator.prefix}
                      decimals={indicator.suffix === '★' ? 1 : 0}
                    />
                  ) : (
                    `${indicator.prefix || ''}${indicator.value}${indicator.suffix || ''}`
                  )}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {indicator.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {indicator.description}
                </div>
              </div>

              {/* Progress bar for percentage values */}
              {indicator.suffix === '%' && (
                <div className="mt-4 space-y-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`bg-gradient-to-r ${indicator.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${indicator.value}%` }}
                      transition={{ duration: 2, delay: index * 0.2 + 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}

              {/* Live indicator for 24/7 support */}
              {indicator.label === 'Expert Support' && (
                <div className="mt-4 flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online Now</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    • 5 experts available
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustIndicators;
