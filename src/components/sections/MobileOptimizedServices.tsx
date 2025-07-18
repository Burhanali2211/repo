import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, ArrowRight, CheckCircle, Star, Zap, Sparkles,
  ChevronDown, Eye, MoreHorizontal, Filter, X
} from '@/lib/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useServices } from '@/lib/supabase/hooks/useServices';
import AnimatedSection from '@/components/AnimatedSection';
import { getIconComponent } from './Services';

// Mobile-first design patterns
type MobileViewMode = 'cards' | 'list' | 'carousel';

// Simplified categories for mobile
const mobileCategories = {
  all: { label: 'All', emoji: '🔥', count: 0 },
  popular: { label: 'Popular', emoji: '⭐', count: 0 },
  business: { label: 'Business', emoji: '💼', count: 0 },
  tech: { label: 'Tech', emoji: '⚡', count: 0 },
  creative: { label: 'Creative', emoji: '🎨', count: 0 }
};

// Mobile-optimized contextual color system
const mobileColors = {
  agriculture: {
    cardBg: 'bg-emerald-50/40 dark:bg-emerald-950/20',
    border: 'border-emerald-200/40',
    iconBg: 'bg-emerald-100/60 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    hoverBg: 'group-hover:bg-emerald-50/60 dark:group-hover:bg-emerald-950/30',
    hoverIcon: 'group-hover:bg-emerald-200/70 dark:group-hover:bg-emerald-800/40',
    ctaColor: 'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300'
  },
  education: {
    cardBg: 'bg-blue-50/40 dark:bg-blue-950/20',
    border: 'border-blue-200/40',
    iconBg: 'bg-blue-100/60 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    hoverBg: 'group-hover:bg-blue-50/60 dark:group-hover:bg-blue-950/30',
    hoverIcon: 'group-hover:bg-blue-200/70 dark:group-hover:bg-blue-800/40',
    ctaColor: 'text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300'
  },
  business: {
    cardBg: 'bg-purple-50/40 dark:bg-purple-950/20',
    border: 'border-purple-200/40',
    iconBg: 'bg-purple-100/60 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    hoverBg: 'group-hover:bg-purple-50/60 dark:group-hover:bg-purple-950/30',
    hoverIcon: 'group-hover:bg-purple-200/70 dark:group-hover:bg-purple-800/40',
    ctaColor: 'text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300'
  },
  technical: {
    cardBg: 'bg-rose-50/40 dark:bg-rose-950/20',
    border: 'border-rose-200/40',
    iconBg: 'bg-rose-100/60 dark:bg-rose-900/30',
    iconColor: 'text-rose-600 dark:text-rose-400',
    hoverBg: 'group-hover:bg-rose-50/60 dark:group-hover:bg-rose-950/30',
    hoverIcon: 'group-hover:bg-rose-200/70 dark:group-hover:bg-rose-800/40',
    ctaColor: 'text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300'
  },
  digital: {
    cardBg: 'bg-cyan-50/40 dark:bg-cyan-950/20',
    border: 'border-cyan-200/40',
    iconBg: 'bg-cyan-100/60 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    hoverBg: 'group-hover:bg-cyan-50/60 dark:group-hover:bg-cyan-950/30',
    hoverIcon: 'group-hover:bg-cyan-200/70 dark:group-hover:bg-cyan-800/40',
    ctaColor: 'text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300'
  },
  default: {
    cardBg: 'bg-slate-50/40 dark:bg-slate-950/20',
    border: 'border-slate-200/40',
    iconBg: 'bg-slate-100/60 dark:bg-slate-900/30',
    iconColor: 'text-slate-600 dark:text-slate-400',
    hoverBg: 'group-hover:bg-slate-50/60 dark:group-hover:bg-slate-950/30',
    hoverIcon: 'group-hover:bg-slate-200/70 dark:group-hover:bg-slate-800/40',
    ctaColor: 'text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'
  }
};

const MobileOptimizedServices = React.memo(() => {
  const { data: services, isLoading: loading } = useServices();
  const [viewMode, setViewMode] = useState<MobileViewMode>('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Helper function to categorize services for mobile
  const getMobileCategory = (title: string, description: string) => {
    const text = `${title} ${description}`.toLowerCase();
    if (text.includes('agriculture') || text.includes('farm')) return 'agriculture';
    if (text.includes('school') || text.includes('education') || text.includes('student')) return 'education';
    if (text.includes('business') || text.includes('management') || text.includes('enterprise')) return 'business';
    if (text.includes('technical') || text.includes('design') || text.includes('development')) return 'technical';
    if (text.includes('digital') || text.includes('web') || text.includes('app') || text.includes('cloud')) return 'digital';
    return 'default';
  };

  // Filter services with mobile-optimized logic
  const filteredServices = useMemo(() => {
    let filtered = services || [];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'popular') {
        // Show featured services or first 6 services
        filtered = filtered.filter(service => service.featured).slice(0, 6);
        if (filtered.length === 0) {
          filtered = (services || []).slice(0, 6);
        }
      } else {
        filtered = filtered.filter(service => {
          const category = getMobileCategory(service.title, service.description);
          return category === selectedCategory;
        });
      }
    }

    return filtered;
  }, [services, searchTerm, selectedCategory]);

  // Update category counts for mobile
  const categoriesWithCounts = useMemo(() => {
    const counts = { ...mobileCategories };

    if (services) {
      counts.all.count = services.length;
      counts.popular.count = services.filter(s => s.featured).length || Math.min(6, services.length);

      services.forEach(service => {
        const category = getMobileCategory(service.title, service.description);
        if (counts[category]) {
          counts[category].count++;
        }
      });
    }

    return counts;
  }, [services]);

  // Mobile-optimized animations
  const mobileCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  // Loading state optimized for mobile
  if (loading) {
    return (
      <section className="w-full py-6 px-4">
        <div className="space-y-4">
          {/* Mobile loading skeleton */}
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-shrink-0"></div>
            ))}
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="animate-pulse flex gap-3">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }



  // No services state
  if (!services || services.length === 0) {
    return (
      <section className="w-full py-6 px-4">
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No services available</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Check back soon for our latest offerings.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-6">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Mobile-First Header */}
        <div className="mb-6 space-y-4">
          {/* Search Bar - Full width on mobile */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 dark:border-gray-700 text-base"
            />
          </div>

          {/* Mobile Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {Object.entries(categoriesWithCounts).map(([key, category]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center gap-2 whitespace-nowrap flex-shrink-0 rounded-full px-4 py-2 ${selectedCategory === key
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border-gray-200'
                  }`}
              >
                <span className="text-sm">{category.emoji}</span>
                <span className="text-sm font-medium">{category.label}</span>
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </span>

            {(searchTerm || selectedCategory !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-purple-600 hover:text-purple-700 text-sm"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Services Display */}
        <AnimatePresence mode="wait">
          {filteredServices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No services found</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Try adjusting your search or category filter.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {filteredServices.map((service, index) => (
                <MobileServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  isExpanded={expandedCard === service.id}
                  onToggleExpand={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
                  category={getMobileCategory(service.title, service.description)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile CTA Section */}
        <div className="mt-8 text-center">
          <Link to="/services">
            <Button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105">
              <span className="mr-2">View All Services</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          {/* Mobile Trust Indicators */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>500+ Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Mobile-optimized service card component
interface MobileServiceCardProps {
  service: any;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  category: string;
}

const MobileServiceCard: React.FC<MobileServiceCardProps> = ({
  service,
  index,
  isExpanded,
  onToggleExpand,
  category
}) => {
  const IconComponent = getIconComponent(service.iconName);
  const colors = mobileColors[category] || mobileColors.default;

  return (
    <motion.div
      variants={mobileCardVariants}
      initial="hidden"
      animate="visible"
      className={`relative h-full p-4 rounded-2xl bg-grid-pattern bg-clip-padding backdrop-filter backdrop-blur-xl shadow-sm border transition-all duration-200 overflow-hidden ${colors.cardBg} ${colors.border} ${colors.hoverBg} hover:shadow-md group-hover:scale-[1.01]`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-4">
          {/* Icon */}
          <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${colors.iconBg} ${colors.hoverIcon}`}>
            <IconComponent className={`w-6 h-6 transition-all duration-200 ${colors.iconColor} group-hover:scale-105`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                {service.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleExpand}
                className="ml-2 p-1 h-8 w-8 flex-shrink-0"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {service.description}
            </p>

            {/* Quick Action */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                <CheckCircle className="w-3 h-3" />
                <span>Available</span>
              </div>

              <div className={`flex items-center transition-colors duration-200 ${colors.ctaColor}`}>
                <span className="text-sm font-medium mr-1">Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-gray-100 dark:border-gray-800"
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Features:</h4>
                <div className="space-y-1">
                  {['Fast Setup', 'Proven Results', '24/7 Support', 'Money-back Guarantee'].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to={service.slug ? `/services/${service.slug}` : service.link || `/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-lg text-sm font-semibold ${colors.bg} text-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105`}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              {/* Pricing hint */}
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Starting from <span className="font-semibold">$99</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MobileOptimizedServices;
