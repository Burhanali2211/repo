
import React from 'react';
import { Target, TrendingUp, Zap } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingElement from '@/components/FloatingElement';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedSection direction="left" threshold={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 relative">
                We optimize, grow, and transform businesses
                <span className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our mission is to help businesses navigate the digital transformation journey with confidence and achieve sustainable growth through innovative technology solutions.
              </p>
            </AnimatedSection>
            <div className="space-y-6">
              <AnimatedSection direction="left" delay={200} threshold={0.2}>
                <div className="flex items-center space-x-4 group hover:bg-purple-50 dark:hover:bg-purple-900/20 p-3 rounded-lg transition-colors duration-300">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors duration-300">
                    <Target className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300">Strategic Focus</h3>
                    <p className="text-gray-600 dark:text-gray-400">Data-driven strategies that deliver results</p>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={400} threshold={0.2}>
                <div className="flex items-center space-x-4 group hover:bg-blue-50 dark:hover:bg-blue-900/20 p-3 rounded-lg transition-colors duration-300">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-300">
                    <TrendingUp className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">Growth Mindset</h3>
                    <p className="text-gray-600 dark:text-gray-400">Scalable solutions for long-term success</p>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={600} threshold={0.2}>
                <div className="flex items-center space-x-4 group hover:bg-yellow-50 dark:hover:bg-yellow-900/20 p-3 rounded-lg transition-colors duration-300">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800 transition-colors duration-300">
                    <Zap className="h-6 w-6 text-yellow-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors duration-300">Innovation</h3>
                    <p className="text-gray-600 dark:text-gray-400">Cutting-edge technology and creative solutions</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
          <AnimatedSection direction="right" threshold={0.2}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-blue-200 dark:bg-blue-800 rounded-full opacity-50"></div>
              
              <div className="relative overflow-hidden rounded-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" 
                  alt="Modern workspace"
                  className="rounded-lg shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 dark:from-purple-500/40 dark:to-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <FloatingElement amplitude={5} frequency={0.002}>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <span className="text-2xl font-bold text-black">5+</span>
                </div>
              </FloatingElement>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
