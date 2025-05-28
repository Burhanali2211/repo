
import React, { useState } from 'react';
import { Search, Palette, TrendingUp, Code, Megaphone, Shield, ArrowRight, Globe, Cloud, Smartphone, Leaf, GraduationCap, Building2, Users, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const services = [
  {
    icon: Leaf,
    title: 'Sustainable Agriculture Technology',
    description: 'Smart farming systems, automated farms, and eco-farming integration for sustainable agriculture.',
    link: '/services/agriculture-tech',
    color: 'bg-green-500',
    gradient: 'from-green-600 to-emerald-600'
  },
  {
    icon: GraduationCap,
    title: 'School Management Systems',
    description: 'Complete school solutions including websites, apps, administrative systems, and live bus tracking.',
    link: '/services/school-management',
    color: 'bg-blue-500',
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    icon: Building2,
    title: 'Business Solutions',
    description: 'Custom business software, ERP systems, inventory management, and scalable product design.',
    link: '/services/business-solutions',
    color: 'bg-purple-500',
    gradient: 'from-purple-600 to-indigo-600'
  },
  {
    icon: Users,
    title: 'Student Programs',
    description: 'Student upskill programs, workshops, hackathons, research support, and idea development.',
    link: '/services/student-programs',
    color: 'bg-amber-500',
    gradient: 'from-amber-600 to-orange-600'
  },
  {
    icon: Wrench,
    title: 'Technical Services',
    description: '3D designing, 3D printing, PCB designing/printing, and rapid prototyping solutions.',
    link: '/services/technical-services',
    color: 'bg-pink-500',
    gradient: 'from-pink-600 to-rose-600'
  },
  {
    icon: Globe,
    title: 'Digital Transformation',
    description: 'Complete digital transformation solutions including web development and cloud integration.',
    link: '/services/digital-transformation',
    color: 'bg-sky-500',
    gradient: 'from-sky-600 to-blue-600'
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
            <div className="bg-gray-100 dark:bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-500 group relative overflow-hidden h-full shadow-md dark:shadow-none flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-r ${service.gradient} transform transition-all duration-300 ${activeService === index ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{service.title}</h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">{service.description}</p>

                <Link
                  to={service.link}
                  className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 mt-auto"
                >
                  <span>Know More</span>
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
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
