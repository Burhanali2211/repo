import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag, GraduationCap, HomeIcon, Briefcase,
  PlaneTakeoff, HeartPulse, Landmark, Truck, Factory,
  BarChart3, FolderOpen, Car, Gamepad2, Mail, UtensilsCrossed, Scale, Dumbbell
} from 'lucide-react';

// Define industry data
const industries = [
  { name: 'Retail', icon: ShoppingBag },
  { name: 'Real Estate', icon: HomeIcon },
  { name: 'Travel & Tourism', icon: PlaneTakeoff },
  { name: 'Healthcare', icon: HeartPulse },
  { name: 'Education', icon: GraduationCap },
  { name: 'E-Commerce', icon: ShoppingBag },
  { name: 'Startups', icon: Briefcase },
  // { name: 'Media', icon: Microphone },
  { name: 'Government & Public', icon: Landmark },
  { name: 'Nonprofits & NGOs', icon: HeartPulse },
  { name: 'Logistics', icon: Truck },
  { name: 'Manufacturing', icon: Factory },
  { name: 'Finance', icon: BarChart3 },
  { name: 'On-Demand', icon: FolderOpen },
  { name: 'Automotive', icon: Car },
  { name: 'Gaming', icon: Gamepad2 },
  { name: 'Advertising', icon: Mail },
  { name: 'Food & Beverages', icon: UtensilsCrossed },
  { name: 'Legal Services', icon: Scale },
  { name: 'Fitness', icon: Dumbbell }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};



const Industries = () => {
  // Create duplicated arrays for seamless infinite scroll
  const duplicatedIndustries = [...industries, ...industries];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full overflow-hidden"
    >
      {/* Continuous Horizontal Carousel */}
      <div className="relative">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none"></div>

        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex gap-6 min-w-max"
          animate={{
            x: [0, -(160 + 24) * industries.length] // Move by exact width: card width (160px) + gap (24px)
          }}
          transition={{
            x: {
              duration: 30, // Smooth scrolling speed
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
        >
          {duplicatedIndustries.map((industry, index) => (
            <motion.div
              key={`${industry.name}-${index}`}
              variants={itemVariants}
              className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-purple-500/50 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:transform hover:scale-105 group shadow-sm dark:shadow-none w-[160px] h-[140px] flex-shrink-0"
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/10 to-blue-600/10 dark:from-purple-600/20 dark:to-blue-600/20 group-hover:from-purple-600/20 group-hover:to-blue-600/20 dark:group-hover:from-purple-600/30 dark:group-hover:to-blue-600/30 flex items-center justify-center mb-4 transition-all duration-300">
                <industry.icon className="h-7 w-7 text-gray-500 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 leading-tight">
                {industry.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="mt-16 text-center">
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We tailor our expertise to meet the unique requirements of various industries, ensuring specialized solutions that drive success across diverse sectors.
        </p>
      </div>
    </motion.div>
  );
};

export default Industries;
