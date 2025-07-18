
import React, { useState } from 'react';
import {
  Code, Leaf, GraduationCap, Building2, Users, Wrench, Globe,
  Cloud, Smartphone, Search, Palette, PenTool, Megaphone,
  TrendingUp, BarChart3, Shield, CheckCircle, Award,
  Zap, Lightbulb, Sparkles, Monitor, Database,
  Cpu, Layers, Briefcase, ExternalLink
} from '@/lib/icons';
import { motion } from 'framer-motion';
import { useServices } from '@/hooks/useServices';
import AnimatedSection from '@/components/AnimatedSection';

// Enhanced icon mapping for services with more relevant icons
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  // Nature & Agriculture
  Leaf,
  // Education
  GraduationCap,
  // Business & Corporate
  Building2,
  Briefcase,
  // People & Social
  Users,
  // Technical & Development
  Wrench,
  Globe,
  Code,
  Monitor,
  Database,
  Cpu,
  Layers,
  Cloud,
  Smartphone,
  // Marketing & Design
  Search,
  Palette,
  PenTool,
  Megaphone,
  // Analytics & Growth
  TrendingUp,
  BarChart3,
  // Security & Quality
  Shield,
  CheckCircle,
  Award,
  // Innovation & Energy
  Zap,
  Lightbulb,
  Sparkles,
  ExternalLink
};

// Export helper function for use in other components
export const getIconComponent = (iconName: string | null) => {
  if (!iconName || !iconMap[iconName]) {
    return Code; // Default to Code icon instead of Star
  }
  return iconMap[iconName];
};



// Enhanced service category colors with grid backgrounds
const serviceColors = {
  'agriculture': {
    bg: 'from-emerald-50/80 to-green-50/80',
    border: 'border-emerald-200/50',
    text: 'text-emerald-700',
    icon: 'from-emerald-500 to-green-600',
    grid: 'from-emerald-500/5 to-green-500/5'
  },
  'education': {
    bg: 'from-blue-50/80 to-cyan-50/80',
    border: 'border-blue-200/50',
    text: 'text-blue-700',
    icon: 'from-blue-500 to-cyan-600',
    grid: 'from-blue-500/5 to-cyan-500/5'
  },
  'business': {
    bg: 'from-purple-50/80 to-indigo-50/80',
    border: 'border-purple-200/50',
    text: 'text-purple-700',
    icon: 'from-purple-500 to-indigo-600',
    grid: 'from-purple-500/5 to-indigo-500/5'
  },
  'technical': {
    bg: 'from-pink-50/80 to-rose-50/80',
    border: 'border-pink-200/50',
    text: 'text-pink-700',
    icon: 'from-pink-500 to-rose-600',
    grid: 'from-pink-500/5 to-rose-500/5'
  },
  'digital': {
    bg: 'from-sky-50/80 to-blue-50/80',
    border: 'border-sky-200/50',
    text: 'text-sky-700',
    icon: 'from-sky-500 to-blue-600',
    grid: 'from-sky-500/5 to-blue-500/5'
  },
  'default': {
    bg: 'from-gray-50/80 to-slate-50/80',
    border: 'border-gray-200/50',
    text: 'text-gray-700',
    icon: 'from-gray-500 to-slate-600',
    grid: 'from-gray-500/5 to-slate-500/5'
  }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto px-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-6 mx-auto"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24 mx-auto mt-6"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }



  // Handle empty services array
  if (!services || services.length === 0) {
    return (
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Wrench className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Services Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              We're working on adding our comprehensive service offerings. Check back soon to see what we can do for you!
            </p>

          </div>
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

          {/* Enhanced Responsive Grid Layout */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
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
                  aria-labelledby={`service-title-${index}`}
                  aria-describedby={`service-desc-${index}`}
                >
                  {/* Enhanced Service Card with Professional Design */}
                  <div
                    className={`
                      relative bg-white dark:bg-gray-900 rounded-xl w-full h-full
                      border ${colors.border} dark:border-gray-700/50
                      shadow-sm hover:shadow-lg dark:hover:shadow-xl
                      transition-all duration-400 ease-out
                      hover:-translate-y-1 hover:scale-[1.02]
                      flex flex-col p-6 service-card-enhanced overflow-hidden
                      ${isHovered ? `ring-1 ${colors.border} shadow-md` : ''}
                    `}
                  >
                    {/* Subtle Grid Background Pattern */}
                    <div
                      className={`
                        absolute inset-0 opacity-20 group-hover:opacity-35
                        bg-gradient-to-br ${colors.grid}
                        transition-opacity duration-400
                      `}
                      style={{
                        backgroundImage: `
                          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
                          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '16px 16px'
                      }}
                    />

                    {/* Subtle Color Overlay */}
                    <div className={`
                      absolute inset-0 rounded-xl opacity-0 group-hover:opacity-15
                      bg-gradient-to-br ${colors.bg} dark:from-gray-800/20 dark:to-gray-700/20
                      transition-opacity duration-400
                    `} />

                    {/* Card Content */}
                    <div className="relative z-10 h-full flex flex-col text-center">
                      {/* Enhanced Icon Section */}
                      <div className="flex justify-center mb-5">
                        <div className={`
                          w-14 h-14 rounded-xl flex items-center justify-center
                          bg-gradient-to-br ${colors.icon}
                          shadow-md group-hover:shadow-lg
                          transform transition-all duration-400 group-hover:scale-105 group-hover:rotate-2
                          ring-2 ring-white/30 dark:ring-gray-800/30
                        `}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Title and Description */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3
                            id={`service-title-${index}`}
                            className="text-lg font-semibold mb-3 leading-snug text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-100"
                          >
                            {service.title}
                          </h3>

                          <p
                            id={`service-desc-${index}`}
                            className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 line-clamp-3 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Service Category Badge */}
                      <div className="mt-4">
                        <span className={`
                          inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                          ${colors.text} bg-gradient-to-r ${colors.bg}
                          border ${colors.border}
                          transition-all duration-300 group-hover:scale-105
                        `}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Streamlined Call-to-Action Section */}
          <AnimatedSection delay={0.3} threshold={0.1}>
            <div className="mt-20 text-center">
              {/* Simplified Header */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Discover how our comprehensive services can help you achieve your goals with cutting-edge technology and expert support.
                </p>
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
                    <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span className="font-medium">Award Winning</span>
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
