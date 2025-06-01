
import React from 'react';
import {
  Star,
  Heart,
  User,
  Search,
  Settings,
  Shield,
  AlertCircle,
  Eye,
  Target,
  TrendingUp,
  Zap
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { useAboutContent } from '@/hooks/useAboutContent';

// Icon mapping for about content with proper typing
interface IconProps {
  className?: string;
  size?: number;
}

// About content type definition
interface AboutContent {
  id: string;
  section_type: string;
  is_active: boolean;
  content_data?: {
    icon?: string;
    color?: string;
    title?: string;
    description?: string;
  };
  title?: string;
  description?: string;
}

const iconMap: { [key: string]: React.ComponentType<IconProps> } = {
  Target: AlertCircle, // Using AlertCircle as fallback for Target
  TrendingUp: Search, // Using Search as fallback for TrendingUp
  Zap: Star, // Using Star as fallback for Zap
  Star,
  Heart,
  Shield,
  Award: Star, // Using Star as fallback for Award
  Users: User, // Using User as fallback for Users
  Globe: Settings, // Using Settings as fallback for Globe
  User,
  Search,
  Settings,
  AlertCircle,
  Eye
};

const About = () => {
  const { aboutContent, loading, error } = useAboutContent();

  // Helper function to get icon component
  const getIconComponent = (iconName: string | null) => {
    if (!iconName || !iconMap[iconName]) {
      return AlertCircle; // Default icon
    }
    return iconMap[iconName];
  };

  // Filter content by section type with proper typing
  const heroContent = aboutContent.filter((content: AboutContent) => content.section_type === 'hero' && content.is_active);
  const featuresContent = aboutContent.filter((content: AboutContent) => content.section_type === 'features' && content.is_active);

  // Loading state
  if (loading) {
    return (
      <section id="about" className="overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="about" className="overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="text-center py-20">
            <p className="text-red-500 dark:text-red-400">Error loading about content: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Get main hero content or use default
  const mainHero = heroContent[0] || {
    title: 'Simplifying Technology for Everyone',
    description: 'Founded in 2023, EasyIo.tech is built on the belief that simplicity drives innovation. We\'re dedicated to making technology more accessible, sustainable, and meaningful for everyone - from turning bold ideas into reality to helping businesses run smarter and students think like innovators.'
  };

  // Get features or use defaults
  const features = featuresContent.length > 0 ? featuresContent : [
    {
      title: 'Innovation & Simplicity',
      description: 'Cutting through complexity to build tools that work beautifully',
      content_data: { icon: 'Target', color: 'purple' }
    },
    {
      title: 'Sustainability Focus',
      description: 'Technology that\'s kind to the planet and meaningful for the future',
      content_data: { icon: 'TrendingUp', color: 'blue' }
    },
    {
      title: 'Creative Partnership',
      description: 'Your creative tech partner in shaping the future',
      content_data: { icon: 'Zap', color: 'yellow' }
    }
  ];

  return (
    <section id="about" className="overflow-hidden relative py-16 sm:py-20 md:py-24 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-blue-200/30 dark:from-purple-800/20 dark:to-blue-800/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 dark:from-blue-800/20 dark:to-indigo-800/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200/20 to-emerald-200/20 dark:from-green-800/10 dark:to-emerald-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Centered Main Heading */}
        <AnimatedSection direction="up" threshold={0.2}>
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
              <span className="relative inline-block">
                {mainHero.title}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full shadow-lg"></div>
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12">
              {mainHero.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">5+</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">100+</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">50+</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {features.map((feature: AboutContent, index: number) => {
            const IconComponent = getIconComponent(feature.content_data?.icon);
            const color = feature.content_data?.color || 'purple';

            // Define color classes to avoid dynamic class generation issues
            const colorClasses = {
              purple: {
                hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
                bg: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50',
                groupHover: 'group-hover:bg-purple-200 dark:group-hover:bg-purple-800',
                icon: 'text-purple-600 dark:text-purple-400',
                text: 'group-hover:text-purple-700 dark:group-hover:text-purple-300',
                border: 'border-purple-200 dark:border-purple-700'
              },
              blue: {
                hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
                bg: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50',
                groupHover: 'group-hover:bg-blue-200 dark:group-hover:bg-blue-800',
                icon: 'text-blue-600 dark:text-blue-400',
                text: 'group-hover:text-blue-700 dark:group-hover:text-blue-300',
                border: 'border-blue-200 dark:border-blue-700'
              },
              yellow: {
                hover: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
                bg: 'bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900/50 dark:to-orange-800/50',
                groupHover: 'group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800',
                icon: 'text-yellow-600 dark:text-yellow-400',
                text: 'group-hover:text-yellow-700 dark:group-hover:text-yellow-300',
                border: 'border-yellow-200 dark:border-yellow-700'
              }
            };

            const currentColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.purple;

            return (
              <AnimatedSection key={feature.id || index} direction="up" delay={300 + (index * 200)} threshold={0.2}>
                <div className={`group ${currentColor.hover} p-6 sm:p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:scale-105 bg-white dark:bg-gray-800 border ${currentColor.border} relative overflow-hidden`}>
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 dark:to-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 text-center space-y-4">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 ${currentColor.bg} rounded-2xl flex items-center justify-center ${currentColor.groupHover} transition-all duration-500 shadow-lg group-hover:shadow-xl mx-auto group-hover:scale-110`}>
                      <IconComponent className={`h-8 w-8 sm:h-10 sm:w-10 ${currentColor.icon} group-hover:scale-110 transition-transform duration-500`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className={`font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-100 ${currentColor.text} transition-colors duration-500`}>{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg">{feature.description}</p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
