
import React, { useState, useMemo } from 'react';
import { Search, Palette, TrendingUp, Code, Megaphone, Shield, ArrowRight, Globe, Cloud, Smartphone, Leaf, GraduationCap, Building2, Users, Wrench, Star, Zap, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useServices } from '@/hooks/useServices';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingElement from '@/components/animations/FloatingElement';

// Icon mapping for services
const iconMap: { [key: string]: React.ComponentType<any> } = {
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

// Gradient mapping for services
const gradientMap: { [key: string]: string } = {
  'agriculture': 'from-green-600 to-emerald-600',
  'school': 'from-blue-600 to-cyan-600',
  'business': 'from-purple-600 to-indigo-600',
  'student': 'from-amber-600 to-orange-600',
  'technical': 'from-pink-600 to-rose-600',
  'digital': 'from-sky-600 to-blue-600',
  'web': 'from-purple-600 to-blue-600',
  'marketing': 'from-green-600 to-teal-600',
  'design': 'from-pink-600 to-purple-600',
  'seo': 'from-yellow-600 to-orange-600',
  'cloud': 'from-blue-600 to-indigo-600',
  'app': 'from-red-600 to-pink-600'
};

const Services = React.memo(() => {
  const { services, loading, error } = useServices();
  const [activeService, setActiveService] = useState<number | null>(null);

  const handleServiceHover = (index: number) => {
    setActiveService(index);
  };

  const handleServiceLeave = () => {
    setActiveService(null);
  };

  // Memoize duplicated services for performance
  const duplicatedServices = useMemo(() => {
    if (!services || services.length === 0) return [];
    return [...services, ...services];
  }, [services]);

  // Helper function to get icon component
  const getIconComponent = (iconName: string | null) => {
    if (!iconName || !iconMap[iconName]) {
      return Star; // Default icon
    }
    return iconMap[iconName];
  };

  // Helper function to get gradient class
  const getGradientClass = (slug: string) => {
    const key = Object.keys(gradientMap).find(k => slug.includes(k));
    return gradientMap[key || 'digital'] || 'from-purple-600 to-blue-600';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Loading state
  if (loading) {
    return (
      <section id="services" className="w-full relative overflow-hidden">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="services" className="w-full relative overflow-hidden">
        <div className="text-center py-20">
          <p className="text-red-500 dark:text-red-400">Error loading services: {error}</p>
        </div>
      </section>
    );
  }

  // No services state
  if (!services || services.length === 0) {
    return (
      <section id="services" className="w-full relative overflow-hidden">
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400">No services available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="w-full overflow-hidden py-8"
      aria-labelledby="services-heading"
    >
      <AnimatedSection threshold={0.2}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full max-w-7xl mx-auto"
        >
          {/* Continuous Horizontal Carousel */}
          <div className="relative" role="region" aria-label="Our services carousel">

            <motion.div
              className="flex gap-6 min-w-max"
              role="list"
              aria-label="Our services"
              animate={{
                x: [0, -(380 + 24) * services.length] // Move by exact width: card width (380px) + gap (24px)
              }}
              transition={{
                x: {
                  duration: 45, // Slightly slower for better readability with larger cards
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop"
                }
              }}
            >
              {duplicatedServices.map((service, index) => {
                const IconComponent = getIconComponent(service.iconName);
                const gradientClass = service.gradient || 'from-purple-600 to-blue-600';
                const isActive = activeService === index;

                return (
                  <motion.div
                    key={`${service.id}-${index}`}
                    variants={itemVariants}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/10 backdrop-blur-sm hover:from-white hover:to-gray-50 dark:hover:from-white/15 dark:hover:to-white/25 rounded-2xl p-6 flex flex-col transition-all duration-500 group relative overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-none w-[380px] h-[300px] flex-shrink-0 border border-gray-200/50 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-400/50"
                    whileHover={{ y: -12, scale: 1.03 }}
                    onHoverStart={() => handleServiceHover(index)}
                    onHoverEnd={handleServiceLeave}
                    role="listitem"
                    aria-label={`${service.title} service`}
                  >
                    {/* Enhanced gradient overlay with psychological appeal */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-blue-500/10 to-indigo-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 dark:to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Floating sparkle effects */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <FloatingElement amplitude={1} frequency={0.005} duration={3}>
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      </FloatingElement>
                    </div>

                    <div className="relative z-10 h-full flex flex-col">
                      {/* Header with enhanced icon and psychological elements */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`relative w-18 h-18 rounded-3xl flex items-center justify-center bg-gradient-to-br ${gradientClass} transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 shadow-xl group-hover:shadow-2xl overflow-hidden`}>
                          {/* Enhanced multi-layer glow effects */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                          <div className="absolute -inset-2 bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>

                          <FloatingElement amplitude={3} frequency={0.002} duration={6}>
                            <IconComponent className="relative z-10 h-9 w-9 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />
                          </FloatingElement>
                        </div>

                        {/* Enhanced quality indicators with psychological appeal */}
                        <div className="flex flex-col items-end space-y-1">
                          <div className="flex items-center space-x-1">
                            <FloatingElement amplitude={2} frequency={0.003} phase={0.5} duration={4}>
                              <Award className="h-4 w-4 text-yellow-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                            </FloatingElement>
                            <FloatingElement amplitude={2} frequency={0.003} phase={1} duration={5}>
                              <CheckCircle className="h-4 w-4 text-green-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                            </FloatingElement>
                          </div>
                          {/* Trust badge */}
                          <div className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                              Verified
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content with enhanced typography */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 leading-tight">
                          {service.title}
                        </h3>

                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 flex-grow group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                          {service.description}
                        </p>

                        {/* Benefits highlight */}
                        <div className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            <span>Fast Implementation • Proven Results</span>
                          </div>
                        </div>

                        {/* Enhanced CTA with psychological elements */}
                        <div className="flex items-center justify-between mt-auto">
                          <Link
                            to={service.slug ? `/services/${service.slug}` : service.link || `/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-purple-600/15 to-blue-600/15 hover:from-purple-600/25 hover:to-blue-600/25 text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 rounded-xl text-sm font-semibold transition-all duration-300 group/cta border border-purple-200/50 dark:border-purple-500/30 hover:border-purple-400/70 dark:hover:border-purple-400/70 shadow-sm hover:shadow-md"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Learn More</span>
                            <ArrowRight className="h-4 w-4 ml-2 transform group-hover/cta:translate-x-1 transition-transform duration-300" />
                          </Link>

                          {/* Enhanced urgency indicator */}
                          <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center text-xs text-orange-600 dark:text-orange-400 mb-1">
                              <Zap className="h-3 w-3 mr-1 animate-pulse" />
                              <span className="font-medium">Popular</span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              <span>Starting at $99</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Enhanced View All Services Button with Psychological Elements */}
          <AnimatedSection delay={300} threshold={0.1}>
            <div className="mt-12 text-center">
              {/* Primary CTA with enhanced psychological appeal */}
              <div className="mb-6">
                <Link to="/services">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center">
                      <span className="mr-3">Discover Your Perfect Solution</span>
                      <FloatingElement amplitude={2} frequency={0.004} duration={3}>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                      </FloatingElement>
                    </div>
                  </Button>
                </Link>
              </div>

              {/* Secondary psychological elements */}
              <div className="space-y-4">
                {/* Trust indicators with enhanced design */}
                <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span className="font-medium">500+ Happy Clients</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                    <span className="font-medium">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Zap className="h-4 w-4 mr-2 text-orange-500" />
                    <span className="font-medium">24h Response</span>
                  </div>
                </div>

                {/* Social proof testimonial snippet */}
                <div className="max-w-2xl mx-auto">
                  <blockquote className="text-gray-600 dark:text-gray-300 italic text-base">
                    "EasyIo.tech transformed our business operations. Their solutions are truly
                    <span className="font-semibold text-purple-600 dark:text-purple-400"> simple yet powerful</span>."
                  </blockquote>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    — Sarah Johnson, CEO at TechCorp
                  </div>
                </div>

                {/* Urgency element */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium border border-red-200/50 dark:border-red-500/30">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Free consultation ends soon - Book yours today!</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </motion.div>
      </AnimatedSection>
    </section>
  );
});

export default Services;
