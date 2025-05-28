
import React from 'react';
import { Search, FileText, User, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ParticleBackground } from '@/components/animations';

const Hero = () => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Key value propositions for the hero section (reduced from 5 to 3 for better focus)
  const keyValues = [
    { icon: FileText, text: 'IoT & Automation', color: 'from-blue-500 to-cyan-400' },
    { icon: Star, text: 'Business Solutions', color: 'from-green-500 to-teal-400' },
    { icon: Heart, text: 'Smart Agriculture', color: 'from-amber-500 to-orange-400' }
  ];

  return (
    <section className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      {/* Optimized particle background - reduced for better performance */}
      <div className="hidden dark:lg:block">
        <ParticleBackground
          particleCount={30}
          connectParticles={true}
          connectDistance={120}
          particleSpeed={0.15}
          maxFPS={24}
        />
      </div>

      {/* Enhanced background elements matching testimonials style */}
      <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '8s', transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.01}px)` }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '10s', animationDelay: '1s', transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.01}px)` }}></div>
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '12s', animationDelay: '2s', transform: `translate(${scrollY * -0.02}px, ${scrollY * 0.02}px)` }}></div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"
        style={{ transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.01}px)` }}></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"
        style={{ transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.01}px)` }}></div>
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl"
        style={{ transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.02}px)` }}></div>

      {/* Main hero content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 flex flex-col lg:flex-row items-center gap-12">
        {/* Left column with text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-2xl"
        >
          {/* Enhanced headline with better hierarchy */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Simplifying</span>
              <span className="block mt-1">Technology</span>
            </h1>

            {/* Clear, concise value proposition */}
            <p className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-6">
              Technology that empowers, not overwhelms
            </p>

            {/* Supporting description - shorter and more scannable */}
            <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
              From bold ideas to business transformation, we create solutions that are
              <span className="font-semibold text-gray-900 dark:text-white"> easy to use, powerful in impact, and kind to the planet.</span>
            </p>
          </div>

          {/* Streamlined key values - horizontal layout for better scanning */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-4 md:gap-6">
              {keyValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{value.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced CTA buttons with clearer messaging */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Primary CTA - more specific and action-oriented */}
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-purple-600/25 transition-all duration-300 rounded-xl group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start Your Project
                <Search className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>

            {/* Secondary CTA - more conversion-focused */}
            <Button
              variant="outline"
              onClick={() => scrollToSection("#services")}
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-400 dark:hover:border-purple-500 px-8 py-4 text-lg font-medium rounded-xl flex items-center group transition-all duration-300"
            >
              <Search className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Explore Solutions
            </Button>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <span className="font-medium">Trusted by innovative businesses since 2023</span>
          </motion.div>
        </motion.div>

        {/* Right column with optimized visual element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 relative min-h-[400px] w-full max-w-lg lg:max-w-xl"
        >
          {/* Simplified background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-3xl blur-2xl"></div>

          {/* Main visual container - simplified for better performance */}
          <div className="relative h-full w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            {/* Browser-like header */}
            <div className="h-10 w-full bg-gray-50 dark:bg-gray-700 flex items-center px-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="ml-4 text-xs text-gray-500 dark:text-gray-400 font-mono">easyio.tech</div>
            </div>

            {/* Content area with tech visualization */}
            <div className="p-6 h-full flex flex-col justify-center">
              {/* Simplified tech dashboard mockup */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 h-3 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 rounded-full"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 h-3 bg-gradient-to-r from-green-200 to-teal-200 dark:from-green-800 dark:to-teal-800 rounded-full"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 h-3 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-800 dark:to-orange-800 rounded-full"></div>
                </div>
              </div>

              {/* Stats visualization */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">100+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 p-4 rounded-lg border border-green-100 dark:border-green-800">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">24/7</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Simplified floating elements - fewer for better performance */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl rotate-12 shadow-lg items-center justify-center text-white hidden lg:flex"
          >
            <Heart className="w-8 h-8" />
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-lg items-center justify-center text-white hidden lg:flex"
          >
            <User className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Optimized scroll indicator */}
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
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-medium">
              Explore Services
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-12 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center group-hover:border-purple-400 dark:group-hover:border-purple-500 transition-colors"
            >
              <div className="w-1.5 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 group-hover:bg-purple-500 transition-colors"></div>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
