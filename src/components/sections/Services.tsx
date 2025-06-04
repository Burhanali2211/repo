
import React, { useState, useMemo } from 'react';
import {
  Search, Palette, TrendingUp, Code, Megaphone, Shield, ArrowRight, Globe,
  Cloud, Smartphone, Leaf, GraduationCap, Building2, Users, Wrench,
  Star, Zap, Award, CheckCircle, ExternalLink, Sparkles
} from '@/lib/icons';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useServices } from '@/hooks/useServices';
import AnimatedSection from '@/components/AnimatedSection';

// Icon mapping for services
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Leaf,
  GraduationCap,
  Building2,
  Users,
  Wrench,
  Globe,
  Search,
  Palette,
  TrendingUp,
  Code,
  Megaphone,
  Shield,
  Cloud,
  Smartphone,
  Star,
  Zap,
  Award,
  CheckCircle
};

// Export helper function for use in other components
export const getIconComponent = (iconName: string | null) => {
  if (!iconName || !iconMap[iconName]) {
    return Star; // Default icon
  }
  return iconMap[iconName];
};

// Modern gradient system with cohesive color palette
const modernGradients = [
  'from-violet-500 via-purple-500 to-indigo-600',
  'from-blue-500 via-cyan-500 to-teal-600',
  'from-emerald-500 via-green-500 to-lime-600',
  'from-amber-500 via-orange-500 to-red-600',
  'from-pink-500 via-rose-500 to-red-600',
  'from-indigo-500 via-blue-500 to-cyan-600',
  'from-teal-500 via-emerald-500 to-green-600',
  'from-orange-500 via-amber-500 to-yellow-600'
];

// Service category colors for consistent theming
const serviceColors = {
  'agriculture': { bg: 'from-emerald-50 to-green-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: 'from-emerald-500 to-green-600' },
  'education': { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'from-blue-500 to-cyan-600' },
  'business': { bg: 'from-purple-50 to-indigo-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'from-purple-500 to-indigo-600' },
  'technical': { bg: 'from-pink-50 to-rose-50', border: 'border-pink-200', text: 'text-pink-700', icon: 'from-pink-500 to-rose-600' },
  'digital': { bg: 'from-sky-50 to-blue-50', border: 'border-sky-200', text: 'text-sky-700', icon: 'from-sky-500 to-blue-600' },
  'default': { bg: 'from-gray-50 to-slate-50', border: 'border-gray-200', text: 'text-gray-700', icon: 'from-gray-500 to-slate-600' }
};

const Services = React.memo(() => {
  const { services, loading, error } = useServices();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Helper function to determine service category for theming
  const getServiceCategory = (title: string, description: string): keyof typeof serviceColors => {
    const text = `${title} ${description}`.toLowerCase();
    if (text.includes('agriculture') || text.includes('farm')) return 'agriculture';
    if (text.includes('school') || text.includes('education') || text.includes('student')) return 'education';
    if (text.includes('business') || text.includes('management') || text.includes('enterprise')) return 'business';
    if (text.includes('technical') || text.includes('design') || text.includes('development')) return 'technical';
    if (text.includes('digital') || text.includes('web') || text.includes('app') || text.includes('cloud')) return 'digital';
    return 'default';
  };

  // Animation variants for modern, subtle effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Loading state with modern skeleton
  if (loading) {
    return (
      <section className="w-full py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
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
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full py-8">
        <div className="text-center py-12 max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unable to load services</h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
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
      id="services"
      className="w-full services-section"
      aria-labelledby="services-heading"
    >
      <AnimatedSection threshold={0.1}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto services-container"
        >

          {/* Responsive Grid Layout - Fixed overflow and better proportions */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full overflow-hidden"
            role="list"
            aria-label="Our services"
          >
            {services.map((service, index) => {
              const IconComponent = getIconComponent(service.iconName);
              const category = getServiceCategory(service.title, service.description);
              const colors = serviceColors[category];
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  className="group relative"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  role="listitem"
                  aria-label={`${service.title} service`}
                >
                  {/* Optimized Service Card with Better Proportions */}
                  <div
                    className={`
                      relative bg-white dark:bg-gray-900 rounded-xl w-full
                      border border-gray-200 dark:border-gray-700
                      shadow-sm hover:shadow-lg dark:hover:shadow-xl
                      transition-all duration-300 ease-out
                      hover:-translate-y-1 hover:scale-[1.02]
                      flex flex-col p-6 service-card-optimized
                      ${isHovered ? 'ring-1 ring-purple-500/20 shadow-purple-500/5' : ''}
                    `}
                  >
                    {/* Gradient Background Overlay */}
                    <div className={`
                      absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                      bg-gradient-to-br ${colors.bg} dark:from-gray-800/50 dark:to-gray-700/50
                      transition-opacity duration-500
                    `} />

                    {/* Card Content with Optimized Spacing */}
                    <div className="relative z-10 h-full flex flex-col text-center">
                      {/* Icon Section */}
                      <div className="flex justify-center mb-4">
                        <div className={`
                          w-14 h-14 rounded-lg flex items-center justify-center
                          bg-gradient-to-br ${colors.icon}
                          shadow-md group-hover:shadow-lg
                          transform transition-all duration-300 group-hover:scale-105
                        `}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Title and Description with Compact Spacing */}
                      <div className="flex-1 mb-4">
                        <h3 className="text-lg font-bold mb-3 leading-tight text-gray-900 dark:text-white transition-colors duration-300">
                          {service.title}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 line-clamp-3">
                          {service.description}
                        </p>
                      </div>

                      {/* Compact CTA Button */}
                      <div className="mt-auto">
                        <Link
                          to={service.slug ? `/services/${service.slug}` : service.link || `/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className={`
                            group/cta inline-flex items-center justify-center w-full
                            px-4 py-3 min-h-[48px] rounded-lg text-sm font-semibold
                            bg-gradient-to-r ${colors.icon}
                            text-white shadow-md hover:shadow-lg
                            transform transition-all duration-300
                            hover:scale-[1.02] hover:-translate-y-0.5
                            focus:outline-none focus:ring-2 focus:ring-purple-500/50
                            touch-manipulation
                          `}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Explore Service</span>
                          <ArrowRight className="w-4 h-4 ml-2 transform group-hover/cta:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Modern Call-to-Action Section */}
          <AnimatedSection delay={0.3} threshold={0.1}>
            <div className="mt-16 text-center">
              {/* Main CTA */}
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
                    {/* Button Glow Effect */}
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
        </motion.div>
      </AnimatedSection>
    </section>
  );
});

export default Services;
