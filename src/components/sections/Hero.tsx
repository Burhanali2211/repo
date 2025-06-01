

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroCarousel from './HeroCarousel';
import { useWebsiteSettings } from '@/contexts/SettingsContext';

const Hero = () => {
  const { settings } = useWebsiteSettings();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      {/* Animated background elements matching website design system */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-30 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">



          {/* Main Hero Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-16rem)]">

            {/* Left Column - Main Content */}
            <div className="lg:col-span-7 space-y-8">

              {/* Main Headlines */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white">
                    {settings?.site_tagline || 'Simplifying Technology'}
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 dark:from-blue-400 dark:via-purple-400 dark:to-green-400">
                    for a Better Tomorrow
                  </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                  {settings?.site_description || 'Making technology accessible, sustainable, and meaningful for businesses worldwide. From IoT to digital transformation, we\'re your creative tech partner.'}
                </p>
              </motion.div>



              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-purple-500/25 transition-all duration-300 rounded-xl group w-full sm:w-auto"
                  >
                    <span className="flex items-center">
                      Get Started Today
                      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>

                <Button
                  onClick={() => scrollToSection("#services")}
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 dark:border-white/30 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 group backdrop-blur-sm"
                >
                  <span className="flex items-center">
                    <ChevronRight className="mr-2 h-5 w-5" />
                    Explore Services
                  </span>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex items-center justify-center sm:justify-start space-x-6 text-sm text-gray-600 dark:text-gray-300"
              >
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Sustainable solutions</span>
                </div>
              </motion.div>
            </div>


            {/* Right Column - Enhanced Hero Carousel */}
            <div className="lg:col-span-5 flex items-center justify-center">
              {/* Hero Carousel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full"
              >
                <HeroCarousel />
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          >
            <motion.button
              onClick={() => scrollToSection('#services')}
              className="flex flex-col items-center group cursor-pointer"
              aria-label="Scroll to services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm text-gray-600 dark:text-gray-300 mb-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors font-medium">
                Explore Our Services
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-12 border-2 border-gray-400 dark:border-white/30 rounded-full flex justify-center group-hover:border-gray-600 dark:group-hover:border-white/50 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-500 dark:text-white/50 mt-2 group-hover:text-gray-700 dark:group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Gradient transition to next section */}
      <div className="section-transition-overlay gradient-transition-to-gray-light dark:gradient-transition-to-gray-dark"></div>
    </section>
  );
};



export default Hero;
