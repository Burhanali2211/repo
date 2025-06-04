import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SectionErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import ComprehensiveSEO from '@/components/SEO/ComprehensiveSEO';
import { Button } from '@/components/ui/button';
import { safeLazySection, safeLazyIcon } from '@/lib/utils/safe-lazy-loading';

// Safe lazy load ALL heavy components for better initial performance
const Hero = safeLazySection(() => import('@/components/sections/Hero'), 'Hero');

const Services = safeLazySection(() => import('@/components/sections/Services'), 'Services');
const Testimonials = safeLazySection(() => import('@/components/sections/Testimonials'), 'Testimonials');
const FAQ = safeLazySection(() => import('@/components/sections/FAQ'), 'FAQ');
const Portfolio = safeLazySection(() => import('@/components/sections/Portfolio'), 'Portfolio');
const Industries = safeLazySection(() => import('@/components/sections/Industries'), 'Industries');
const CallToAction = safeLazySection(() => import('@/components/sections/CallToAction'), 'Call to Action');

// Safe lazy load icons to reduce initial bundle
const Star = safeLazyIcon('Star');
const Zap = safeLazyIcon('Zap');
const ArrowRight = safeLazyIcon('ArrowRight');
const BookOpen = safeLazyIcon('BookOpen');
const Rocket = safeLazyIcon('Rocket');
const Users = safeLazyIcon('Users');
const Trophy = safeLazyIcon('Trophy');
const Sparkles = safeLazyIcon('Sparkles');
const Clock = safeLazyIcon('Clock');

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
  </div>
);

const Home = () => {
  return (
    <>
      <ComprehensiveSEO
        title="EasyIo.tech - Simplifying Technology"
        description="EasyIo.tech (EasyIoTech) - Leading technology company specializing in IoT, automation, digital transformation, and innovative solutions. EasyIoTechnology makes complex tech accessible and sustainable for businesses worldwide."
        pageType="home"
        keywords={['easyio', 'easyiotech', 'easylotech', 'easyiot', 'easyiotechnology', 'technology solutions', 'IoT solutions', 'automation services', 'digital transformation']}
      />

      <main className="flex flex-col w-full">
        {/* Hero Section - Full screen with dynamic elements */}
        <SectionErrorBoundary sectionName="Hero">
          <Suspense fallback={<SectionLoader />}>
            <Hero />
          </Suspense>
        </SectionErrorBoundary>

        {/* Services Section - Our comprehensive service offerings */}
        <section className="relative py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-950 overflow-hidden w-full">
          {/* Background elements for visual depth */}
          <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-15 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '12s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-green-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '18s', animationDelay: '4s' }}></div>
            </div>
          </div>

          <div className="container-safe mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 mobile-safe w-full">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-mobile-safe">
                Our Services
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
                Comprehensive technology solutions designed to transform your business and drive innovation
              </p>
              <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 mx-auto rounded-full"></div>
            </div>

            <SectionErrorBoundary sectionName="Services">
              <Suspense fallback={<SectionLoader />}>
                <Services />
              </Suspense>
            </SectionErrorBoundary>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>

          {/* Gradient transition to next section */}
          <div className="section-transition-overlay gradient-transition-to-light dark:gradient-transition-to-dark"></div>
        </section>

        {/* Portfolio/Work Section - Showcasing recent projects */}
        <section className="relative py-12 sm:py-16 md:py-20 bg-white dark:bg-black overflow-hidden">
          {/* Background elements similar to testimonials */}
          <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-pink-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '11s' }}></div>
              <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '13s', animationDelay: '1.5s' }}></div>
            </div>
          </div>

          <div className="container-safe mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 mobile-safe">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-mobile-safe">
                Our Work
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
                Each project is a testament to our commitment to creativity, strategy, and results-driven design.
              </p>
              <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 via-cyan-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            <Suspense fallback={<SectionLoader />}>
              <Portfolio />
            </Suspense>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl"></div>

          {/* Gradient transition to Industries section */}
          <div className="section-transition-overlay gradient-transition-to-gray-light dark:gradient-transition-to-gray-dark"></div>
        </section>

        {/* Industries Section - Industries we serve */}
        <section className="relative py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-950 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-15 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/3 w-88 h-88 bg-indigo-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '14s' }}></div>
              <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-teal-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '10s', animationDelay: '3s' }}></div>
            </div>
          </div>

          <div className="container-safe mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 mobile-safe">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-mobile-safe">
                Industries We Serve
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
                Specialized solutions for diverse industry needs
              </p>
              <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 via-teal-500 to-blue-500 mx-auto rounded-full"></div>
            </div>
            <Suspense fallback={<SectionLoader />}>
              <Industries />
            </Suspense>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-3xl"></div>

          {/* Gradient transition to Testimonials section */}
          <div className="section-transition-overlay gradient-transition-to-light dark:gradient-transition-to-dark"></div>
        </section>

        {/* Testimonials Section - Social proof (keeping original styling as reference) */}
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>

        {/* FAQ Section - Common questions */}
        <section className="relative py-12 sm:py-16 md:py-20 bg-white dark:bg-black overflow-hidden">
          {/* Background elements matching testimonials style */}
          <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-violet-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '9s' }}></div>
              <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
            </div>
          </div>

          <div className="container-safe mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 mobile-safe">
            <Suspense fallback={<SectionLoader />}>
              <FAQ />
            </Suspense>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl"></div>

          {/* Gradient transition to Call to Action section */}
          <div className="section-transition-overlay gradient-transition-to-gray-light dark:gradient-transition-to-gray-dark"></div>
        </section>

        {/* Call to Action Section */}
        <section className="relative py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-950 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-15 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '15s' }}></div>
              <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-red-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '11s', animationDelay: '1s' }}></div>
            </div>
          </div>

          <div className="relative z-10">
            <Suspense fallback={<SectionLoader />}>
              <CallToAction />
            </Suspense>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl"></div>
        </section>
      </main>
    </>
  );
};

export default Home;
