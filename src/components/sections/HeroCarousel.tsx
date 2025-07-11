import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

// Icon mapping for dynamic icon rendering
const iconMap = {
  Cpu: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  TrendingUp: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Leaf: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  Cloud: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  Smartphone: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  Building2: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
    </svg>
  ),
};

interface HeroCarouselItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon_name: string;
  gradient_from: string;
  gradient_to: string;
  link_url: string;
  link_text: string;
  order_index: number;
}

const HeroCarousel: React.FC = () => {
  const [items, setItems] = useState<HeroCarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Fetch carousel items from Supabase
  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_carousel_items')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (error) {
          console.error('Error fetching carousel items:', error);
          // Fallback to default items if database fails
          setItems([
            {
              id: '1',
              title: 'IoT & Automation',
              subtitle: 'Smart Solutions',
              description: 'Transform your business with intelligent IoT systems and automation.',
              icon_name: 'Cpu',
              gradient_from: '#3b82f6',
              gradient_to: '#1d4ed8',
              link_url: '/services/iot',
              link_text: 'Learn More',
              order_index: 1,
            },
            {
              id: '2',
              title: 'Business Solutions',
              subtitle: 'Digital Transformation',
              description: 'Comprehensive business solutions that drive growth and optimize processes.',
              icon_name: 'TrendingUp',
              gradient_from: '#10b981',
              gradient_to: '#059669',
              link_url: '/services/business',
              link_text: 'Learn More',
              order_index: 2,
            },
          ]);
        } else {
          setItems(data || []);
        }
      } catch (error) {
        console.error('Exception fetching carousel items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarouselItems();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Touch gesture handling for mobile swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (isLoading) {
    return (
      <div className="relative w-full aspect-[16/9] sm:aspect-[20/9] md:aspect-[24/9] lg:aspect-[28/9] min-h-[280px] max-h-[400px] bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl md:rounded-3xl animate-pulse flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Loading...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];
  const IconComponent = iconMap[currentItem.icon_name as keyof typeof iconMap];

  return (
    <div
      className="relative w-full aspect-[16/9] sm:aspect-[20/9] md:aspect-[24/9] lg:aspect-[28/9] min-h-[280px] max-h-[400px] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm group hover:shadow-purple-500/25 transition-all duration-500 cursor-pointer select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Enhanced Background with gradient using website colors */}
      <div
        className="absolute inset-0 bg-gradient-to-br transition-all duration-1000 ease-in-out group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${currentItem.gradient_from}30, ${currentItem.gradient_to}60)`
        }}
      />

      {/* Enhanced Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60 group-hover:from-black/30 group-hover:to-black/50 transition-all duration-500" />

      {/* Enhanced Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-4 md:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex-1 text-white text-center sm:text-left flex flex-col justify-center"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-6">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/30 backdrop-blur-md flex items-center justify-center group-hover:bg-white/45 transition-all duration-500 shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-3 overflow-hidden flex-shrink-0">
                {/* Enhanced icon glow effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white/10 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

                {/* Enhanced icon with better styling */}
                {IconComponent && (
                  <div className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white drop-shadow-lg group-hover:scale-110 transition-all duration-500">
                    {IconComponent()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 group-hover:text-white/95 transition-colors leading-tight">{currentItem.title}</h3>
                <p className="text-sm sm:text-base md:text-lg opacity-90 group-hover:opacity-100 transition-opacity leading-tight">{currentItem.subtitle}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-85 mb-3 sm:mb-4 md:mb-6 max-w-2xl leading-relaxed group-hover:opacity-95 transition-opacity text-center sm:text-left">
              {currentItem.description}
            </p>

            <div className="flex justify-center sm:justify-start">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/25 hover:bg-white/40 text-white border-white/40 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-lg sm:rounded-xl group-hover:scale-105 min-w-[100px] sm:min-w-[120px] touch-manipulation"
                onClick={() => window.location.href = currentItem.link_url}
              >
                {currentItem.link_text}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Navigation Controls - Repositioned for better mobile experience */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 flex items-center gap-2 sm:gap-3">
          {/* Enhanced Dot Indicators */}
          <div className="flex gap-1.5 sm:gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 shadow-sm touch-manipulation ${index === currentIndex
                  ? 'bg-white scale-125 sm:scale-150 shadow-white/50'
                  : 'bg-white/60 hover:bg-white/80 hover:scale-110 sm:hover:scale-125'
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-white/25 hover:bg-white/40 text-white border-white/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 touch-manipulation"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-white/25 hover:bg-white/40 text-white border-white/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 touch-manipulation"
              onClick={goToNext}
              aria-label="Next slide"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-white/25 hover:bg-white/40 text-white border-white/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 touch-manipulation"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" /> : <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/25 backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-white to-white/90 shadow-sm"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            key={currentIndex}
          />
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
    </div>
  );
};

export default HeroCarousel;
