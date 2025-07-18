import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, Palette, TrendingUp, Code, Megaphone, Shield, ArrowRight, Globe,
  Cloud, Smartphone, Leaf, GraduationCap, Building2, Users, Wrench,
  Star, Zap, Award, CheckCircle, ExternalLink, Sparkles,
  Grid3X3, List, Filter, ChevronDown, Eye, Heart, Bookmark
} from '@/lib/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useServices } from '@/lib/supabase/hooks/useServices';
import AnimatedSection from '@/components/AnimatedSection';
import { getIconComponent } from './Services';

// View modes for different layouts
type ViewMode = 'grid' | 'list' | 'compact' | 'masonry';
type FilterCategory = 'all' | 'agriculture' | 'education' | 'business' | 'technical' | 'digital';

// Service categories with enhanced metadata
const serviceCategories = {
  all: { label: 'All Services', color: 'bg-gray-100 text-gray-700', count: 0 },
  agriculture: { label: 'Agriculture', color: 'bg-green-100 text-green-700', count: 0 },
  education: { label: 'Education', color: 'bg-blue-100 text-blue-700', count: 0 },
  business: { label: 'Business', color: 'bg-purple-100 text-purple-700', count: 0 },
  technical: { label: 'Technical', color: 'bg-pink-100 text-pink-700', count: 0 },
  digital: { label: 'Digital', color: 'bg-sky-100 text-sky-700', count: 0 }
};

// Enhanced contextual color system for different categories
const categoryColors = {
  agriculture: {
    cardBg: 'bg-emerald-50/40 dark:bg-emerald-950/20',
    border: 'border-emerald-200/40',
    iconBg: 'bg-emerald-100/60 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    hoverBg: 'group-hover:bg-emerald-50/60 dark:group-hover:bg-emerald-950/30',
    hoverIcon: 'group-hover:bg-emerald-200/70 dark:group-hover:bg-emerald-800/40',
    ctaColor: 'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
  },
  education: {
    cardBg: 'bg-blue-50/40 dark:bg-blue-950/20',
    border: 'border-blue-200/40',
    iconBg: 'bg-blue-100/60 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    hoverBg: 'group-hover:bg-blue-50/60 dark:group-hover:bg-blue-950/30',
    hoverIcon: 'group-hover:bg-blue-200/70 dark:group-hover:bg-blue-800/40',
    ctaColor: 'text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
  },
  business: {
    cardBg: 'bg-purple-50/40 dark:bg-purple-950/20',
    border: 'border-purple-200/40',
    iconBg: 'bg-purple-100/60 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    hoverBg: 'group-hover:bg-purple-50/60 dark:group-hover:bg-purple-950/30',
    hoverIcon: 'group-hover:bg-purple-200/70 dark:group-hover:bg-purple-800/40',
    ctaColor: 'text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
  },
  technical: {
    cardBg: 'bg-rose-50/40 dark:bg-rose-950/20',
    border: 'border-rose-200/40',
    iconBg: 'bg-rose-100/60 dark:bg-rose-900/30',
    iconColor: 'text-rose-600 dark:text-rose-400',
    hoverBg: 'group-hover:bg-rose-50/60 dark:group-hover:bg-rose-950/30',
    hoverIcon: 'group-hover:bg-rose-200/70 dark:group-hover:bg-rose-800/40',
    ctaColor: 'text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300',
    badgeBg: 'bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400'
  },
  digital: {
    cardBg: 'bg-cyan-50/40 dark:bg-cyan-950/20',
    border: 'border-cyan-200/40',
    iconBg: 'bg-cyan-100/60 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    hoverBg: 'group-hover:bg-cyan-50/60 dark:group-hover:bg-cyan-950/30',
    hoverIcon: 'group-hover:bg-cyan-200/70 dark:group-hover:bg-cyan-800/40',
    ctaColor: 'text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
  },
  default: {
    cardBg: 'bg-slate-50/40 dark:bg-slate-950/20',
    border: 'border-slate-200/40',
    iconBg: 'bg-slate-100/60 dark:bg-slate-900/30',
    iconColor: 'text-slate-600 dark:text-slate-400',
    hoverBg: 'group-hover:bg-slate-50/60 dark:group-hover:bg-slate-950/30',
    hoverIcon: 'group-hover:bg-slate-200/70 dark:group-hover:bg-slate-800/40',
    ctaColor: 'text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300',
    badgeBg: 'bg-slate-100 dark:bg-slate-900/20 text-slate-700 dark:text-slate-400'
  }
};

const EnhancedServices = React.memo(() => {
  const { data: services, isLoading: loading } = useServices();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Helper function to determine service category
  const getServiceCategory = (title: string, description: string): keyof typeof categoryColors => {
    const text = `${title} ${description}`.toLowerCase();
    if (text.includes('agriculture') || text.includes('farm')) return 'agriculture';
    if (text.includes('school') || text.includes('education') || text.includes('student')) return 'education';
    if (text.includes('business') || text.includes('management') || text.includes('enterprise')) return 'business';
    if (text.includes('technical') || text.includes('design') || text.includes('development')) return 'technical';
    if (text.includes('digital') || text.includes('web') || text.includes('app') || text.includes('cloud')) return 'digital';
    return 'default';
  };

  // Filter and search services
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
      filtered = filtered.filter(service => {
        const category = getServiceCategory(service.title, service.description);
        return category === selectedCategory;
      });
    }

    return filtered;
  }, [services, searchTerm, selectedCategory]);

  // Update category counts
  const categoriesWithCounts = useMemo(() => {
    const counts = { ...serviceCategories };

    if (services) {
      counts.all.count = services.length;

      services.forEach(service => {
        const category = getServiceCategory(service.title, service.description);
        if (counts[category]) {
          counts[category].count++;
        }
      });
    }

    return counts;
  }, [services]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading skeleton for controls */}
          <div className="mb-8 space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Loading skeleton for cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
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
      <section className="w-full py-8">
        <div className="text-center py-12 max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No services available</h3>
          <p className="text-gray-600 dark:text-gray-400">Check back soon for our latest offerings.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="enhanced-services"
      className="w-full py-8"
      aria-labelledby="services-heading"
    >
      <AnimatedSection threshold={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header with Controls */}
          <div className="mb-8 space-y-6">
            {/* Search and View Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              {/* View Mode Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant={showFilters ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>

                <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  {[
                    { mode: 'grid' as ViewMode, icon: Grid3X3, label: 'Grid' },
                    { mode: 'list' as ViewMode, icon: List, label: 'List' },
                    { mode: 'compact' as ViewMode, icon: Eye, label: 'Compact' }
                  ].map(({ mode, icon: Icon, label }) => (
                    <Button
                      key={mode}
                      variant={viewMode === mode ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode(mode)}
                      className="h-8 w-8 p-0"
                      title={label}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    {Object.entries(categoriesWithCounts).map(([key, category]) => (
                      <Button
                        key={key}
                        variant={selectedCategory === key ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(key as FilterCategory)}
                        className={`flex items-center gap-2 ${selectedCategory === key ? category.color : ''}`}
                      >
                        <span>{category.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                Showing {filteredServices.length} of {services.length} services
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== 'all' && ` in ${categoriesWithCounts[selectedCategory].label}`}
              </span>

              {(searchTerm || selectedCategory !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-purple-600 hover:text-purple-700"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>

          {/* Services Display */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            layout
          >
            {filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No services found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or filters.
                </p>
              </div>
            ) : (
              <div className={getLayoutClasses(viewMode)}>
                {filteredServices.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                    viewMode={viewMode}
                    isHovered={hoveredIndex === index}
                    onHover={setHoveredIndex}
                    category={getServiceCategory(service.title, service.description)}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Enhanced Call-to-Action Section */}
          <AnimatedSection delay={0.3} threshold={0.1}>
            <div className="mt-16 text-center">
              <div className="mb-8">
                <Link to="/services">
                  <Button className="
                    group relative px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600
                    hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700
                    text-white font-semibold text-lg rounded-2xl
                    shadow-lg hover:shadow-2xl hover:shadow-purple-500/25
                    transform transition-all duration-300 hover:scale-105 hover:-translate-y-1
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50
                    overflow-hidden
                  ">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex items-center">
                      <span className="mr-3">View All Services</span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400 group">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-medium">500+ Happy Clients</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 group">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400 fill-current" />
                  </div>
                  <span className="font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 group">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>

              {/* Social Proof */}
              <div className="max-w-2xl mx-auto mb-6">
                <blockquote className="text-gray-600 dark:text-gray-300 text-lg italic leading-relaxed">
                  "EasyIo.tech transformed our business operations. Their solutions are truly
                  <span className="font-semibold text-purple-600 dark:text-purple-400"> simple yet powerful</span>."
                </blockquote>
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  — Sarah Johnson, CEO at TechCorp
                </div>
              </div>

              {/* Call-to-Action Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 text-emerald-700 dark:text-emerald-300 px-6 py-3 rounded-full text-sm font-medium border border-emerald-200/50 dark:border-emerald-500/30 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>Free consultation available - Get started today!</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </AnimatedSection>
    </section>
  );
});

// Helper function to get layout classes based on view mode
const getLayoutClasses = (viewMode: ViewMode): string => {
  switch (viewMode) {
    case 'grid':
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8';
    case 'list':
      return 'space-y-4';
    case 'compact':
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4';
    case 'masonry':
      return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6';
    default:
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8';
  }
};

// ServiceCard component with different view modes
interface ServiceCardProps {
  service: any;
  index: number;
  viewMode: ViewMode;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  category: keyof typeof categoryColors;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  viewMode,
  isHovered,
  onHover,
  category
}) => {
  const IconComponent = getIconComponent(service.iconName);
  const colors = categoryColors[category];

  // Different card layouts based on view mode
  switch (viewMode) {
    case 'list':
      return (
        <motion.div
          variants={cardVariants}
          className="group relative"
          onHoverStart={() => onHover(index)}
          onHoverEnd={() => onHover(null)}
        >
          <div className={`relative h-full p-5 rounded-2xl bg-grid-pattern bg-clip-padding backdrop-filter backdrop-blur-xl shadow-sm border transition-all duration-200 ${colors.cardBg} ${colors.border} ${colors.hoverBg} hover:shadow-md group-hover:scale-[1.01]`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
            <div className="relative z-10 flex items-start gap-4">
              {/* Icon */}
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${colors.iconBg} ${colors.hoverIcon}`}>
                <IconComponent className={`w-6 h-6 transition-all duration-200 ${colors.iconColor} group-hover:scale-105`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {service.title}
                  </h3>
                  <Badge className={`ml-2 text-xs ${colors.badgeBg}`}>
                    {category}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>Verified Service</span>
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
        </motion.div>
      );

    case 'compact':
      return (
        <motion.div
          variants={cardVariants}
          className="group relative"
          onHoverStart={() => onHover(index)}
          onHoverEnd={() => onHover(null)}
        >
          <div className={`relative h-full p-4 rounded-2xl bg-grid-pattern bg-clip-padding backdrop-filter backdrop-blur-xl shadow-sm border transition-all duration-200 ${colors.cardBg} ${colors.border} ${colors.hoverBg} hover:shadow-md group-hover:scale-[1.01]`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
            <div className="relative z-10 text-center h-full flex flex-col">
              {/* Icon */}
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 mx-auto mb-3 ${colors.iconBg} ${colors.hoverIcon}`}>
                <IconComponent className={`w-5 h-5 transition-all duration-200 ${colors.iconColor} group-hover:scale-105`} />
              </div>

              {/* Content */}
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {service.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mb-3 flex-grow">
                {service.description}
              </p>

              {/* CTA */}
              <div className={`flex items-center justify-center transition-colors duration-200 mt-auto ${colors.ctaColor}`}>
                <span className="text-xs font-medium mr-1">Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      );

    default: // grid view
      return (
        <motion.div
          variants={cardVariants}
          className="group relative"
          onHoverStart={() => onHover(index)}
          onHoverEnd={() => onHover(null)}
          role="listitem"
          aria-label={`${service.title} service`}
        >
          {/* Contextual Service Card with Minimalistic Hover */}
          <div className={`relative h-full p-5 rounded-2xl bg-grid-pattern bg-clip-padding backdrop-filter backdrop-blur-xl shadow-sm border transition-all duration-200 ${colors.cardBg} ${colors.border} ${colors.hoverBg} hover:shadow-md group-hover:scale-[1.01]`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4">
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 ${colors.iconBg} ${colors.hoverIcon}`}>
                  <IconComponent className={`w-6 h-6 transition-all duration-200 ${colors.iconColor} group-hover:scale-105`} />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
                {service.description}
              </p>
              <div className={`flex items-center transition-colors duration-200 mt-auto ${colors.ctaColor}`}>
                <span className="text-sm font-medium mr-2">Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      );
  }
};

export default EnhancedServices;
