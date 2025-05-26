
import React, { useState, useEffect } from 'react';
import { ArrowRight, MousePointer, ChevronDown, Code, Users, Globe, Rocket, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ParticleBackground, AnimatedText, FloatingElement } from '@/components/animations';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
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

  // Feature cards for the hero section
  const features = [
    { icon: Code, text: 'Web Development', color: 'from-blue-500 to-cyan-400' },
    { icon: Users, text: 'Digital Marketing', color: 'from-purple-500 to-indigo-400' },
    { icon: Globe, text: 'Cloud Services', color: 'from-amber-500 to-orange-400' },
    { icon: Rocket, text: 'App Development', color: 'from-green-500 to-teal-400' },
    { icon: Sparkles, text: 'Brand Design', color: 'from-pink-500 to-rose-400' }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white overflow-hidden">
      {/* Particle background for visual effect - only visible in dark mode */}
      <div className="hidden dark:block">
        <ParticleBackground 
          particleCount={60} 
          connectParticles={true} 
          connectDistance={150}
          particleSpeed={0.2}
          maxFPS={30}
        />
      </div>
      
      {/* Light mode background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      
      {/* Dynamic background gradient elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl" 
        style={{ transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.01}px)` }}></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" 
        style={{ transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.01}px)` }}></div>
      
      {/* Main hero content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 flex flex-col lg:flex-row items-center gap-12">
        {/* Left column with text content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Transforming</span>
            <span className="block mt-2">Your Digital Presence</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
            We design, develop, and deliver digital experiences that drive growth and transform businesses.
          </p>
          
          {/* Feature list */}
          <div className="mb-10 space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                className="flex items-center gap-3 group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-base font-medium text-gray-800 dark:text-gray-200">{feature.text}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Button 
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-base font-semibold shadow-lg hover:shadow-purple-600/20 transition-all duration-300 rounded-xl group"
            >
              <span className="relative z-10 flex items-center">Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 px-8 py-6 text-base font-medium rounded-xl flex items-center group transition-all duration-300"
            >
              <MousePointer className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              See Our Work
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Right column with hero image/illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 relative min-h-[420px] w-full max-w-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-3xl blur-xl"></div>
          <div className="relative h-full w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="h-8 w-full bg-gray-100 dark:bg-gray-700 flex items-center px-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="p-6 h-full">
              <div className="w-full h-8 bg-gray-200 dark:bg-gray-600 rounded-md mb-4 animate-pulse"></div>
              <div className="w-3/4 h-8 bg-gray-200 dark:bg-gray-600 rounded-md mb-8 animate-pulse"></div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="h-24 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Floating elements around the main image */}
          <FloatingElement amplitude={15} frequency={0.002}>
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-purple-500 rounded-2xl rotate-12 shadow-lg flex items-center justify-center text-white">
              <Code className="w-10 h-10" />
            </div>
          </FloatingElement>
          
          <FloatingElement amplitude={12} frequency={0.8}>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white">
              <Globe className="w-8 h-8" />
            </div>
          </FloatingElement>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <FloatingElement amplitude={8} frequency={0.003}>
            <button 
              onClick={() => scrollToSection('#services')} 
              className="flex flex-col items-center group"
              aria-label="Scroll down"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSection('#services')}
            >
              <span className="text-sm text-gray-600 dark:text-gray-400 mb-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Scroll Down</span>
              <div className="w-10 h-16 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center group-hover:border-gray-700 dark:group-hover:border-gray-400 transition-colors">
                <div className="w-2 h-4 bg-gray-400 dark:bg-gray-500 rounded-full mt-3 group-hover:bg-gray-700 dark:group-hover:bg-gray-300 transition-colors animate-bounce">
                  <ChevronDown className="text-black dark:text-white w-full h-full" />
                </div>
              </div>
            </button>
          </FloatingElement>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
