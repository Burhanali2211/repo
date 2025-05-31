import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

// Icon mapping for dynamic icon rendering
const iconMap = {
  Cpu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Leaf: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  Cloud: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  Smartphone: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
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

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl animate-pulse flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];
  const IconComponent = iconMap[currentItem.icon_name as keyof typeof iconMap];

  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/50">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br transition-all duration-1000 ease-in-out"
        style={{
          background: `linear-gradient(135deg, ${currentItem.gradient_from}, ${currentItem.gradient_to})`
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-between p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-1 text-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                {IconComponent && <IconComponent />}
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">{currentItem.title}</h3>
                <p className="text-lg opacity-90">{currentItem.subtitle}</p>
              </div>
            </div>
            
            <p className="text-base md:text-lg opacity-80 mb-6 max-w-2xl leading-relaxed">
              {currentItem.description}
            </p>
            
            <Button
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300"
              onClick={() => window.location.href = currentItem.link_url}
            >
              {currentItem.link_text}
            </Button>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex flex-col items-center gap-4 ml-8">
          {/* Previous/Next Buttons */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              onClick={goToNext}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Play/Pause Button */}
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          {/* Dot Indicators */}
          <div className="flex flex-col gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            key={currentIndex}
          />
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
