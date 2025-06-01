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
    <section
      className="w-full overflow-hidden"
      aria-labelledby="industries-heading"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        {/* Continuous Horizontal Carousel */}
        <div className="relative" role="region" aria-label="Industries we serve carousel">

          <motion.div
            className="flex gap-6 min-w-max"
            role="list"
            aria-label="Industries we serve"
            animate={{
              x: [0, -(160 + 24) * industries.length] // Move by exact width: card width (160px) + gap (24px)
            }}
            transition={{
              x: {
                duration: 20, // Optimized scrolling speed
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
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 hover:border-purple-400/60 dark:hover:border-purple-500/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-250 hover:transform hover:scale-105 group shadow-lg hover:shadow-xl dark:shadow-gray-900/20 w-[160px] h-[140px] flex-shrink-0 relative overflow-hidden"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                role="listitem"
                aria-label={`${industry.name} industry`}
              >
                {/* Enhanced background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-indigo-500/5 dark:from-purple-500/10 dark:via-blue-500/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Enhanced icon container with better styling */}
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/15 via-blue-500/15 to-indigo-500/15 dark:from-purple-500/25 dark:via-blue-500/25 dark:to-indigo-500/25 group-hover:from-purple-500/25 group-hover:via-blue-500/25 group-hover:to-indigo-500/25 dark:group-hover:from-purple-500/40 dark:group-hover:via-blue-500/40 dark:group-hover:to-indigo-500/40 flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl">
                  {/* Icon glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Enhanced icon with better sizing and colors */}
                  <industry.icon className="relative z-10 h-8 w-8 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-500 group-hover:scale-110" />
                </div>
                <h3 className="relative z-10 text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-all duration-500 leading-tight text-center">
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
    </section>
  );
};

export default Industries;
