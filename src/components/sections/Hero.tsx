
import React from 'react';
import { FileText, Star, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import HeroCarousel from './HeroCarousel';

interface KeyValue {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  description: string;
  color: string;
}

const Hero = () => {
  const [scrollY, setScrollY] = React.useState(0);

  // Optimized scroll handler with throttling
  const handleScroll = React.useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  React.useEffect(() => {
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  const scrollToSection = React.useCallback((sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Streamlined value propositions with better icons and messaging
  const keyValues: KeyValue[] = React.useMemo(() => [
    {
      icon: FileText,
      text: 'Smart Automation',
      description: 'IoT & AI Solutions',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Star,
      text: 'Business Growth',
      description: 'Digital Transformation',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: Heart,
      text: 'Sustainable Tech',
      description: 'Eco-Friendly Solutions',
      color: 'from-green-500 to-emerald-400'
    }
  ], []);

  return (
    <section className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      {/* Optimized background elements - reduced for better performance */}
      <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '8s', transform: `translate(${scrollY * -0.02}px, ${scrollY * 0.01}px)` }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '10s', animationDelay: '1s', transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.01}px)` }}></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '12s', animationDelay: '2s', transform: `translate(${scrollY * -0.015}px, ${scrollY * 0.015}px)` }}></div>
        </div>
      </div>

      {/* Main hero content - improved layout */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Hero content grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
            {/* Left column - Main content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 lg:space-y-10"
            >
              {/* Main headline - improved hierarchy */}
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500">
                    Simplifying
                  </span>
                  <br />
                  <span className="text-gray-900 dark:text-white">
                    Technology
                  </span>
                </motion.h1>

                {/* Value proposition - more scannable */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-4"
                >
                  <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                    Technology that <span className="text-purple-600 dark:text-purple-400 font-semibold">empowers</span>, not overwhelms
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed max-w-2xl">
                    We create solutions that are easy to use, powerful in impact, and kind to the planet.
                  </p>
                </motion.div>
              </div>



              {/* Call-to-action buttons - improved design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* Primary CTA */}
                <Button
                  onClick={() => scrollToSection("#contact")}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-purple-600/25 transition-all duration-300 rounded-2xl group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Your Project
                    <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>

                {/* Secondary CTA */}
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("#services")}
                  size="lg"
                  className="border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-400 dark:hover:border-purple-500 px-8 py-4 text-lg font-medium rounded-2xl transition-all duration-300"
                >
                  Explore Solutions
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex items-center gap-6 text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Trusted by 100+ businesses
                  </span>
                </div>
              </motion.div>

              {/* Key Value Propositions Marquee */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="mt-12"
              >
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                    Our Core Expertise
                  </h3>

                  {/* Marquee Container */}
                  <div className="relative overflow-hidden rounded-2xl">
                    {/* Gradient overlays for seamless effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none"></div>

                    {/* Marquee Track */}
                    <div className="flex animate-marquee py-4">
                      {/* First set of cards */}
                      {keyValues.map((value, index) => (
                        <div
                          key={`first-${index}`}
                          className="flex-shrink-0 mx-3 sm:mx-4 group"
                        >
                          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/60 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-2 min-w-[240px] sm:min-w-[280px] group-hover:bg-white dark:group-hover:bg-gray-800 relative overflow-hidden">
                            {/* Subtle background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative flex items-center space-x-3 sm:space-x-4">
                              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                                <value.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                  {value.text}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {value.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Duplicate set for seamless loop */}
                      {keyValues.map((value, index) => (
                        <div
                          key={`second-${index}`}
                          className="flex-shrink-0 mx-3 sm:mx-4 group"
                        >
                          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/60 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-2 min-w-[240px] sm:min-w-[280px] group-hover:bg-white dark:group-hover:bg-gray-800 relative overflow-hidden">
                            {/* Subtle background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative flex items-center space-x-3 sm:space-x-4">
                              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                                <value.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                  {value.text}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {value.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Third set for extra smoothness on larger screens */}
                      {keyValues.map((value, index) => (
                        <div
                          key={`third-${index}`}
                          className="flex-shrink-0 mx-3 sm:mx-4 group hidden lg:block"
                        >
                          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/60 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-2 min-w-[240px] sm:min-w-[280px] group-hover:bg-white dark:group-hover:bg-gray-800 relative overflow-hidden">
                            {/* Subtle background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative flex items-center space-x-3 sm:space-x-4">
                              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                                <value.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                  {value.text}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {value.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile carousel - shown only on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="lg:hidden mt-8"
              >
                <HeroCarousel />
              </motion.div>
            </motion.div>

            {/* Right column - Visual showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative lg:flex hidden"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 dark:from-purple-500/30 dark:to-blue-500/30 rounded-3xl blur-2xl"></div>

              {/* Main showcase container */}
              <div className="relative w-full max-w-lg mx-auto">
                {/* Hero Carousel - Featured prominently */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mb-8"
                >
                  <HeroCarousel />
                </motion.div>

                {/* Enhanced Stats cards with marquee-style design */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {/* Projects Delivered Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="group relative"
                  >
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 dark:border-gray-700/60 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-2 relative overflow-hidden">
                      {/* Subtle background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative">
                        {/* Icon and header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            100+
                          </div>
                          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Projects Delivered
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            Across 15+ industries
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Success Rate</span>
                            <span>98%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: "98%" }}
                              transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Expert Support Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="group relative"
                  >
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 dark:border-gray-700/60 hover:border-green-300 dark:hover:border-green-600 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/15 hover:-translate-y-2 relative overflow-hidden">
                      {/* Subtle background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative">
                        {/* Icon and header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                            <Star className="w-6 h-6 text-white" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                            24/7
                          </div>
                          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Expert Support
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            Average response: 2 hours
                          </div>
                        </div>

                        {/* Status indicator */}
                        <div className="mt-4 flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online Now</span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            • 5 experts available
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Additional Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="grid grid-cols-2 gap-3 mt-4"
                >
                  {/* Client Satisfaction */}
                  <div className="group relative">
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/60 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                            4.9★
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Client Rating
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Years Experience */}
                  <div className="group relative">
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/60 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                            5+
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Years Exp.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating decorative elements */}
                <motion.div
                  animate={{ y: [-8, 8, -8], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center"
                >
                  <Heart className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [8, -8, 8], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg flex items-center justify-center"
                >
                  <User className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          >
            <motion.button
              onClick={() => scrollToSection('#services')}
              className="flex flex-col items-center group cursor-pointer"
              aria-label="Scroll to services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-medium">
                Explore Services
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-12 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center group-hover:border-purple-400 dark:group-hover:border-purple-500 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-2 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Gradient transition to next section */}
      <div className="section-transition-overlay gradient-transition-to-light dark:gradient-transition-to-dark"></div>
    </section>
  );
};



export default Hero;
