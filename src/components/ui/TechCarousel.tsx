import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageWithFallback from './image-with-fallback';

// High-quality tech images related to Arduino, robotics, IoT, and technology creation
const techImages = [
  {
    id: 1,
    src: "/images/tech/arduino.svg",
    alt: "Arduino development board with sensors and components for microcontroller programming",
    title: "Arduino Development",
    category: "Hardware",
    description: "Microcontroller programming and sensor integration"
  },
  {
    id: 2,
    src: "/images/tech/robotics.svg",
    alt: "Advanced robotics and automation technology with intelligent systems",
    title: "Robotics & Automation",
    category: "Automation",
    description: "Intelligent robotic systems and automation solutions"
  },
  {
    id: 3,
    src: "/images/tech/iot.svg",
    alt: "IoT devices and smart sensors network for connected solutions",
    title: "IoT Solutions",
    category: "Connectivity",
    description: "Connected devices and smart sensor networks"
  },
  {
    id: 4,
    src: "/images/tech/circuit-design.svg",
    alt: "Professional circuit board design and electronics engineering",
    title: "Circuit Design",
    category: "Engineering",
    description: "Professional electronics and circuit engineering"
  },
  {
    id: 5,
    src: "/images/tech/3d-printing.svg",
    alt: "3D printing and rapid prototyping technology for manufacturing",
    title: "3D Prototyping",
    category: "Manufacturing",
    description: "Rapid prototyping and additive manufacturing"
  },
  {
    id: 6,
    src: "/images/tech/smart-home.svg",
    alt: "Smart home automation and control systems for modern living",
    title: "Smart Home Tech",
    category: "Automation",
    description: "Home automation and intelligent control systems"
  },
  {
    id: 7,
    src: "/images/tech/drone.svg",
    alt: "Drone technology and aerial robotics for innovative applications",
    title: "Drone Technology",
    category: "Aerospace",
    description: "Aerial robotics and autonomous flight systems"
  },
  {
    id: 8,
    src: "/images/tech/software-dev.svg",
    alt: "Programming and software development for digital solutions",
    title: "Software Development",
    category: "Software",
    description: "Custom software solutions and digital platforms"
  }
];

// Duplicate images for seamless infinite scroll
const duplicatedImages = [...techImages, ...techImages];

const TechCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        <motion.div
          className="flex gap-3 sm:gap-4 md:gap-6 h-full"
          animate={!isPaused ? {
            x: [0, -(320 + 24) * techImages.length] // Move by exact width: image width (320px) + gap (24px)
          } : {}}
          transition={{
            x: {
              duration: 30, // Slightly slower for better viewing
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
          style={{ willChange: 'transform' }} // Performance optimization
        >
          {duplicatedImages.map((image, index) => (
            <motion.div
              key={`${image.id}-${index}`}
              className="relative flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] h-full group cursor-pointer"
              whileHover={{
                scale: 1.03,
                y: -5
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 1, 0.5, 1],
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500 bg-white dark:bg-gray-800">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  fallbackSrc={`https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(image.title)}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Enhanced Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 backdrop-blur-sm">
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-1 leading-tight">
                      {image.title}
                    </h3>
                    <p className="text-gray-200 text-sm sm:text-base opacity-90 leading-relaxed">
                      {image.description}
                    </p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg backdrop-blur-sm">
                  {image.category}
                </div>

                {/* Innovation Indicator */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                </div>

                {/* Enhanced border glow on hover */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-400/60 group-hover:via-blue-400/60 group-hover:to-indigo-400/60 dark:group-hover:from-purple-500/60 dark:group-hover:via-blue-500/60 dark:group-hover:to-indigo-500/60 transition-all duration-500"></div>

                {/* Outer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Accessibility label */}
      <div className="sr-only" aria-live="polite" aria-label="Interactive technology showcase carousel featuring cutting-edge innovations">
        Continuous carousel showcasing various technology innovations including Arduino development, robotics automation, IoT solutions, circuit design, 3D prototyping, smart home technology, drone systems, and software development. Hover to pause animation and view detailed information.
      </div>

      {/* Enhanced Pause indicator */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-4 left-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-semibold z-20 backdrop-blur-md shadow-lg border border-white/20"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            Paused
          </div>
        </motion.div>
      )}

      {/* Viewing indicator */}
      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-medium z-20 backdrop-blur-sm border border-white/20 opacity-80">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          Live Tech Showcase
        </div>
      </div>
    </div>
  );
};

export default TechCarousel;
