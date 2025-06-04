import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Grid3X3, 
  List, 
  Smartphone, 
  Eye, 
  ArrowRight, 
  CheckCircle,
  Star,
  Zap,
  Sparkles
} from 'lucide-react';

// Import our enhanced service components
import Services from '@/components/sections/Services';
import EnhancedServices from '@/components/sections/EnhancedServices';
import MobileOptimizedServices from '@/components/sections/MobileOptimizedServices';

const ServicesDemo = () => {
  const [activeDemo, setActiveDemo] = useState('enhanced');

  const demoOptions = [
    {
      id: 'original',
      title: 'Original Design',
      description: 'Current card-based layout with 3-column grid',
      icon: Grid3X3,
      component: Services,
      pros: ['Familiar layout', 'Good visual hierarchy', 'Consistent spacing'],
      cons: ['Visual monotony', 'Limited mobile optimization', 'No filtering options']
    },
    {
      id: 'enhanced',
      title: 'Enhanced Multi-Layout',
      description: 'Multiple view modes with search and filtering',
      icon: Eye,
      component: EnhancedServices,
      pros: ['Multiple view modes', 'Search & filter', 'Category organization', 'Better scalability'],
      cons: ['More complex interface', 'Learning curve for users']
    },
    {
      id: 'mobile',
      title: 'Mobile-Optimized',
      description: 'Mobile-first design with progressive disclosure',
      icon: Smartphone,
      component: MobileOptimizedServices,
      pros: ['Mobile-first approach', 'Progressive disclosure', 'Touch-friendly', 'Reduced cognitive load'],
      cons: ['Less information density', 'May require more interactions']
    }
  ];

  const improvements = [
    {
      title: 'Visual Variety',
      description: 'Different card styles and layouts to reduce monotony',
      icon: Sparkles,
      color: 'bg-purple-500'
    },
    {
      title: 'Mobile Responsiveness',
      description: 'Optimized layouts for different screen sizes',
      icon: Smartphone,
      color: 'bg-blue-500'
    },
    {
      title: 'Search & Filter',
      description: 'Easy discovery with category-based filtering',
      icon: Eye,
      color: 'bg-green-500'
    },
    {
      title: 'Progressive Disclosure',
      description: 'Show essential info first, reveal details on demand',
      icon: List,
      color: 'bg-orange-500'
    }
  ];

  const currentDemo = demoOptions.find(demo => demo.id === activeDemo);
  const DemoComponent = currentDemo?.component || Services;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Services UI Improvements Demo
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore different approaches to displaying services with improved user experience, 
              mobile responsiveness, and reduced visual monotony.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose a Layout</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {demoOptions.map((demo) => {
              const IconComponent = demo.icon;
              const isActive = activeDemo === demo.id;
              
              return (
                <Card 
                  key={demo.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    isActive 
                      ? 'ring-2 ring-purple-500 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setActiveDemo(demo.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-purple-500' : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <IconComponent className={`w-5 h-5 ${
                          isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                        }`} />
                      </div>
                      <CardTitle className="text-lg">{demo.title}</CardTitle>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {demo.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">Pros:</h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {demo.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-orange-700 dark:text-orange-400 mb-1">Considerations:</h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {demo.cons.map((con, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="w-3 h-3 rounded-full bg-orange-200 dark:bg-orange-800 flex-shrink-0 mt-0.5"></span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Key Improvements */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Improvements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {improvements.map((improvement, idx) => {
                const IconComponent = improvement.icon;
                return (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${improvement.color} mb-3`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{improvement.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{improvement.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Demo Info */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                Currently Viewing: {currentDemo?.title}
              </h3>
            </div>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              {currentDemo?.description}
            </p>
          </div>
        </div>

        {/* Demo Component */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">Live Demo</h3>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                {currentDemo?.title}
              </Badge>
            </div>
          </div>
          
          <div className="min-h-[600px]">
            <DemoComponent />
          </div>
        </div>

        {/* Implementation Notes */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Implementation Notes</h3>
          <div className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
            <p>• <strong>Enhanced Multi-Layout:</strong> Provides the most flexibility with grid, list, and compact views</p>
            <p>• <strong>Mobile-Optimized:</strong> Best for mobile-first applications with touch interactions</p>
            <p>• <strong>Search & Filtering:</strong> Essential for 12+ services to improve discoverability</p>
            <p>• <strong>Progressive Disclosure:</strong> Reduces cognitive load by showing details on demand</p>
            <p>• <strong>Category Organization:</strong> Helps users find relevant services quickly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDemo;
