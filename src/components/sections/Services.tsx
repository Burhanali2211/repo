
import React, { useState } from 'react';
import { Search, Palette, TrendingUp, Code, Megaphone, Shield, ArrowRight, Globe, Cloud, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const services = [
  {
    icon: Globe,
    title: 'Web Design & Development',
    description: 'Our websites are user-friendly, engaging, and optimized for a great user experience.',
    link: '/services/web-development',
    color: 'bg-purple-500',
    gradient: 'from-purple-600 to-indigo-600'
  },
  {
    icon: Search,
    title: 'SEO Services',
    description: 'Achieve Google\'s #1 ranking. Ensure top rankings for different businesses.',
    link: '/services/seo',
    color: 'bg-blue-500',
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Connect, engage, and grow your brand\'s presence using marketing.',
    link: '/services/digital-marketing',
    color: 'bg-pink-500',
    gradient: 'from-pink-600 to-rose-600'
  },
  {
    icon: Palette,
    title: 'Brand Design',
    description: 'Develop and position your brand, Logos, Banners, Cards, Business Profiles.',
    link: '/services/brand-design',
    color: 'bg-amber-500',
    gradient: 'from-amber-600 to-orange-600'
  },
  {
    icon: Cloud,
    title: 'Cloud Services',
    description: 'Top-rated reliable hosting services including business mail, cloud support.',
    link: '/services/cloud',
    color: 'bg-sky-500',
    gradient: 'from-sky-600 to-blue-600'
  },
  {
    icon: Smartphone,
    title: 'Mobile Application',
    description: 'We are specialized in creating Mobile apps that fascinate users.',
    link: '/services/app-development',
    color: 'bg-green-500',
    gradient: 'from-green-600 to-emerald-600'
  }
];

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  
  const handleServiceHover = (index: number) => {
    setActiveService(index);
  };
  
  const handleServiceLeave = () => {
    setActiveService(null);
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
  return (
    <section id="services" className="w-full relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/30 dark:bg-purple-500/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-blue-500/30 dark:bg-blue-500/50 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-pink-500/30 dark:bg-pink-500/50 rounded-full blur-3xl"></div>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group"
            onMouseEnter={() => handleServiceHover(index)}
            onMouseLeave={handleServiceLeave}
            onFocus={() => handleServiceHover(index)}
            onBlur={handleServiceLeave}
          >
            <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 shadow-md dark:shadow-none p-8 rounded-xl transition-all duration-300 h-full flex flex-col">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-r ${service.gradient} transform transition-all duration-300 ${activeService === index ? 'scale-110' : 'group-hover:scale-110'}`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{service.title}</h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow">{service.description}</p>
              
              <Link 
                to={service.link} 
                className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 mt-auto"
              >
                <span>Know More</span>
                <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-12 text-center">
        <Link to="/services">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 group">
            <span className="mr-2">View All Services</span>
            <ArrowRight className="h-4 w-4 inline-block group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Services;
