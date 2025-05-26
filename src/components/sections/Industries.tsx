import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { 
  Building2, ShoppingBag, GraduationCap, HomeIcon, Briefcase, 
  PlaneTakeoff, HeartPulse, Landmark, Truck, Factory,
  BarChart3, FolderOpen, Car, Gamepad2, Mail, UtensilsCrossed, Scale, Dumbbell, 
  ChevronLeft, ChevronRight, PauseCircle, PlayCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  }
};

// Create a doubled array for continuous scrolling effect
const doubledIndustries = [...industries, ...industries];

const Industries = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px 0px" });
  const controls = useAnimationControls();
  
  // Handle auto-scrolling
  useEffect(() => {
    if (isInView && !isPaused) {
      controls.start({
        x: [
          0, 
          activeRow === 0 ? '-50%' : '0%'
        ],
        transition: {
          x: {
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop'
          }
        }
      });
    } else {
      controls.stop();
    }
    
    return () => {
      controls.stop();
    };
  }, [isInView, isPaused, activeRow, controls]);

  // Handle manual scroll
  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const scrollAmount = direction === 'left' ? -300 : 300;
    containerRef.current.scrollLeft += scrollAmount;
  };

  // Toggle pause/play
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Split industries into two rows for better visual organization
  const firstRowIndustries = industries.slice(0, industries.length / 2);
  const secondRowIndustries = industries.slice(industries.length / 2);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full overflow-hidden"
      ref={containerRef}
    >
      {/* Row selector */}
      <div className="flex justify-center gap-4 mb-6">
        <Button 
          variant="ghost"
          size="sm"
          className={`rounded-full ${activeRow === 0 ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : ''}`}
          onClick={() => setActiveRow(0)}
        >
          Row 1
        </Button>
        <Button 
          variant="ghost"
          size="sm"
          className={`rounded-full ${activeRow === 1 ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : ''}`}
          onClick={() => setActiveRow(1)}
        >
          Row 2
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full"
          onClick={togglePause}
          aria-label={isPaused ? "Play auto-scroll" : "Pause auto-scroll"}
        >
          {isPaused ? <PlayCircle className="h-4 w-4 mr-1" /> : <PauseCircle className="h-4 w-4 mr-1" />}
          {isPaused ? "Play" : "Pause"}
        </Button>
      </div>

      {/* Control buttons */}
      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 shadow-md"
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 shadow-md"
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* First row */}
        <div className={`overflow-hidden ${activeRow === 0 ? 'block' : 'hidden'}`}>
          <motion.div 
            animate={controls}
            className="flex gap-4 py-4 min-w-max"
          >
            {/* First set */}
            {firstRowIndustries.map((industry, index) => (
              <motion.div
                key={`first-${index}`}
                variants={itemVariants}
                className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-purple-500/50 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:transform hover:scale-105 group shadow-sm dark:shadow-none w-[160px] h-[120px] flex-shrink-0"
                whileHover={{ y: -5 }}
                tabIndex={0}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/10 to-blue-600/10 dark:from-purple-600/20 dark:to-blue-600/20 group-hover:from-purple-600/20 group-hover:to-blue-600/20 dark:group-hover:from-purple-600/30 dark:group-hover:to-blue-600/30 flex items-center justify-center mb-3 transition-all duration-300">
                  <industry.icon className="h-6 w-6 text-gray-500 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {industry.name}
                </h3>
              </motion.div>
            ))}
            
            {/* Duplicate set for infinite scroll */}
            {firstRowIndustries.map((industry, index) => (
              <motion.div
                key={`first-dup-${index}`}
                variants={itemVariants}
                className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-purple-500/50 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:transform hover:scale-105 group shadow-sm dark:shadow-none w-[160px] h-[120px] flex-shrink-0"
                whileHover={{ y: -5 }}
                tabIndex={0}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/10 to-blue-600/10 dark:from-purple-600/20 dark:to-blue-600/20 group-hover:from-purple-600/20 group-hover:to-blue-600/20 dark:group-hover:from-purple-600/30 dark:group-hover:to-blue-600/30 flex items-center justify-center mb-3 transition-all duration-300">
                  <industry.icon className="h-6 w-6 text-gray-500 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {industry.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second row */}
        <div className={`overflow-hidden ${activeRow === 1 ? 'block' : 'hidden'}`}>
          <motion.div 
            animate={controls}
            className="flex gap-4 py-4 min-w-max"
          >
            {/* First set */}
            {secondRowIndustries.map((industry, index) => (
              <motion.div
                key={`second-${index}`}
                variants={itemVariants}
                className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-purple-500/50 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:transform hover:scale-105 group shadow-sm dark:shadow-none w-[160px] h-[120px] flex-shrink-0"
                whileHover={{ y: -5 }}
                tabIndex={0}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/10 to-blue-600/10 dark:from-purple-600/20 dark:to-blue-600/20 group-hover:from-purple-600/20 group-hover:to-blue-600/20 dark:group-hover:from-purple-600/30 dark:group-hover:to-blue-600/30 flex items-center justify-center mb-3 transition-all duration-300">
                  <industry.icon className="h-6 w-6 text-gray-500 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {industry.name}
                </h3>
              </motion.div>
            ))}
            
            {/* Duplicate set for infinite scroll */}
            {secondRowIndustries.map((industry, index) => (
              <motion.div
                key={`second-dup-${index}`}
                variants={itemVariants}
                className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-purple-500/50 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:transform hover:scale-105 group shadow-sm dark:shadow-none w-[160px] h-[120px] flex-shrink-0"
                whileHover={{ y: -5 }}
                tabIndex={0}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/10 to-blue-600/10 dark:from-purple-600/20 dark:to-blue-600/20 group-hover:from-purple-600/20 group-hover:to-blue-600/20 dark:group-hover:from-purple-600/30 dark:group-hover:to-blue-600/30 flex items-center justify-center mb-3 transition-all duration-300">
                  <industry.icon className="h-6 w-6 text-gray-500 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {industry.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
