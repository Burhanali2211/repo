
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



// Enhanced contextual service colors with minimalistic design
const serviceColors = {
  'agriculture': {
    cardBg: 'bg-emerald-50/40 dark:bg-emerald-950/20',
    border: 'border-emerald-200/40',
    iconBg: 'bg-emerald-100/60 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    hoverBg: 'group-hover:bg-emerald-50/60 dark:group-hover:bg-emerald-950/30',
    hoverIcon: 'group-hover:bg-emerald-200/70 dark:group-hover:bg-emerald-800/40',
    ctaColor: 'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300'
  },
  'education': {
    cardBg: 'bg-blue-50/40 dark:bg-blue-950/20',
    border: 'border-blue-200/40',
    iconBg: 'bg-blue-100/60 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    hoverBg: 'group-hover:bg-blue-50/60 dark:group-hover:bg-blue-950/30',
    hoverIcon: 'group-hover:bg-blue-200/70 dark:group-hover:bg-blue-800/40',
    ctaColor: 'text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300'
  },
  'business': {
    cardBg: 'bg-purple-50/40 dark:bg-purple-950/20',
    border: 'border-purple-200/40',
    iconBg: 'bg-purple-100/60 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    hoverBg: 'group-hover:bg-purple-50/60 dark:group-hover:bg-purple-950/30',
    hoverIcon: 'group-hover:bg-purple-200/70 dark:group-hover:bg-purple-800/40',
    ctaColor: 'text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300'
  },
  'technical': {
    cardBg: 'bg-rose-50/40 dark:bg-rose-950/20',
    border: 'border-rose-200/40',
    iconBg: 'bg-rose-100/60 dark:bg-rose-900/30',
    iconColor: 'text-rose-600 dark:text-rose-400',
    hoverBg: 'group-hover:bg-rose-50/60 dark:group-hover:bg-rose-950/30',
    hoverIcon: 'group-hover:bg-rose-200/70 dark:group-hover:bg-rose-800/40',
    ctaColor: 'text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300'
  },
  'digital': {
    cardBg: 'bg-cyan-50/40 dark:bg-cyan-950/20',
    border: 'border-cyan-200/40',
    iconBg: 'bg-cyan-100/60 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    hoverBg: 'group-hover:bg-cyan-50/60 dark:group-hover:bg-cyan-950/30',
    hoverIcon: 'group-hover:bg-cyan-200/70 dark:group-hover:bg-cyan-800/40',
    ctaColor: 'text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300'
  },
  'default': {
    cardBg: 'bg-slate-50/40 dark:bg-slate-950/20',
    border: 'border-slate-200/40',
    iconBg: 'bg-slate-100/60 dark:bg-slate-900/30',
    iconColor: 'text-slate-600 dark:text-slate-400',
    hoverBg: 'group-hover:bg-slate-50/60 dark:group-hover:bg-slate-950/30',
    hoverIcon: 'group-hover:bg-slate-200/70 dark:group-hover:bg-slate-800/40',
    ctaColor: 'text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'
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
                  {/* Contextual Service Card with Minimalistic Hover */}
                  <div className={`relative h-full p-5 rounded-2xl bg-grid-pattern bg-clip-padding backdrop-filter backdrop-blur-xl shadow-sm border transition-all duration-200 ${colors.cardBg} ${colors.border} ${colors.hoverBg} hover:shadow-md group-hover:scale-[1.01]`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="mb-4">
                        <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 ${colors.iconBg} ${colors.hoverIcon}`}>
                          <IconComponent className={`w-6 h-6 transition-all duration-200 ${colors.iconColor} group-hover:scale-105`} />
                        </div>
                      </div>
                      <h3
                        id={`service-title-${index}`}
                        className="text-lg font-semibold mb-2 text-gray-900 dark:text-white"
                      >
                        {service.title}
                      </h3>
                      <p
                        id={`service-desc-${index}`}
                        className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow"
                      >
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
