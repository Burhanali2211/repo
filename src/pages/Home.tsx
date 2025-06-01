import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, Zap } from 'lucide-react';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import { SectionErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

// Lazy load heavy components for better performance
const Testimonials = React.lazy(() => import('@/components/sections/Testimonials'));
const FAQ = React.lazy(() => import('@/components/sections/FAQ'));
const Portfolio = React.lazy(() => import('@/components/sections/Portfolio'));
const Industries = React.lazy(() => import('@/components/sections/Industries'));
const CallToAction = React.lazy(() => import('@/components/sections/CallToAction'));

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
  </div>
);

const Home = () => {
  return (
    <>
      <Helmet>
        <title>EasyIo.tech - Simplifying Technology | Sustainable Agriculture, School Management & Business Solutions</title>
        <meta name="description" content="EasyIo.tech specializes in sustainable agriculture, school management, business solutions, student programs, and technical services. Making technology accessible, sustainable, and meaningful for businesses worldwide." />
        <meta name="keywords" content="technology solutions, sustainable agriculture, school management, business solutions, student programs, technical services, web development, digital marketing, cloud services, app development" />
        <meta property="og:title" content="EasyIo.tech - Simplifying Technology" />
        <meta property="og:description" content="Making technology accessible, sustainable, and meaningful with specialized solutions for diverse industries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://easyio.tech" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EasyIo.tech - Simplifying Technology" />
        <meta name="twitter:description" content="Making technology accessible, sustainable, and meaningful with specialized solutions for diverse industries." />
        <link rel="canonical" href="https://easyio.tech" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "EasyIo.tech",
            "description": "Technology solutions company specializing in sustainable agriculture, school management, business solutions, student programs, and technical services.",
            "url": "https://easyio.tech",
            "logo": "https://easyio.tech/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://linkedin.com/company/easyiotech",
              "https://twitter.com/easyiotech"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "foundingDate": "2024",
            "numberOfEmployees": "10-50",
            "industry": "Technology Services"
          })}
        </script>
      </Helmet>

      <main className="flex flex-col w-full">
        {/* Hero Section - Full screen with dynamic elements */}
        <SectionErrorBoundary sectionName="Hero">
          <Hero />
        </SectionErrorBoundary>

        {/* Enhanced Services Section with Psychological Design */}
        <section className="relative py-12 sm:py-16 md:py-20 bg-white dark:bg-black overflow-hidden">
          {/* Enhanced background elements with dynamic gradients */}
          <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '8s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            {/* Enhanced Header Section with Psychological Elements */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              {/* Trust Badge with Social Proof */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg border border-green-200/50 dark:border-green-500/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Trusted by 500+ Businesses Worldwide</span>
                <div className="flex items-center ml-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                </div>
              </div>

              {/* Enhanced Main Heading with Psychological Impact */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                <span className="relative inline-block">
                  Simplified Technology
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-full h-2 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-indigo-500/30 rounded-full blur-sm"></div>
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 animate-pulse">
                  for Everyone
                </span>
              </h2>

              {/* Compelling Subheading with Benefits */}
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-6">
                Transform your business with cutting-edge solutions that are
                <span className="font-semibold text-purple-600 dark:text-purple-400"> simple to use</span>,
                <span className="font-semibold text-blue-600 dark:text-blue-400"> powerful in impact</span>, and
                <span className="font-semibold text-indigo-600 dark:text-indigo-400"> designed for success</span>
              </p>

              {/* Social Proof Statistics */}
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mb-6">
                <div className="text-center group">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                    500+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                    99.9%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                    50%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cost Savings</div>
                </div>
              </div>

              {/* Urgency/Scarcity Element */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-4 animate-pulse">
                <Zap className="h-4 w-4 text-orange-500" />
                <span>Limited Time: Free Consultation Available</span>
              </div>

              {/* Enhanced Gradient Divider */}
              <div className="relative">
                <div className="h-1.5 w-32 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 mx-auto rounded-full shadow-lg"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-1.5 w-32 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 rounded-full blur-sm opacity-50"></div>
              </div>
            </div>

            <Services />
          </div>

          {/* Enhanced decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-20 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 -left-20 w-36 h-36 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-2xl"></div>

          {/* Gradient transition to Portfolio section */}
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

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
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

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
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

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
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
