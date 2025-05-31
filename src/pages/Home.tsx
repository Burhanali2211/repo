import React from 'react';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Portfolio from '@/components/sections/Portfolio';
import Industries from '@/components/sections/Industries';
import CallToAction from '@/components/sections/CallToAction';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Full screen with dynamic elements */}
      <Hero />

      {/* Services Section - Showcasing key offerings with modern cards */}
      <section className="relative py-24 bg-white dark:bg-black overflow-hidden">
        {/* Subtle background elements matching testimonials style */}
        <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Empowering Innovation Through Simplified Technology</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </div>
          <Services />
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>

        {/* Gradient transition to About section */}
        <div className="section-transition-overlay gradient-transition-to-gray-light dark:gradient-transition-to-gray-dark"></div>
      </section>

      {/* About Section - Company vision and values */}
      <section className="relative py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-15 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-green-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '12s' }}></div>
            <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-yellow-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '9s', animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Making Innovation Accessible, Meaningful, and Enduring</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </div>
          <About />
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500/10 dark:bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-full blur-3xl"></div>

        {/* Gradient transition to Portfolio section */}
        <div className="section-transition-overlay gradient-transition-to-light dark:gradient-transition-to-dark"></div>
      </section>

      {/* Portfolio/Work Section - Showcasing recent projects */}
      <section className="relative py-24 bg-white dark:bg-black overflow-hidden">
        {/* Background elements similar to testimonials */}
        <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-pink-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '11s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '13s', animationDelay: '1.5s' }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Work</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Each project is a testament to our commitment to creativity, strategy, and results-driven design.</p>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
          </div>
          <Portfolio />
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl"></div>

        {/* Gradient transition to Industries section */}
        <div className="section-transition-overlay gradient-transition-to-gray-light dark:gradient-transition-to-gray-dark"></div>
      </section>

      {/* Industries Section - Industries we serve */}
      <section className="relative py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-15 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/3 w-88 h-88 bg-indigo-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '14s' }}></div>
            <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-teal-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '10s', animationDelay: '3s' }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Industries We Serve</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Specialized solutions for diverse industry needs</p>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
          </div>
          <Industries />
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-3xl"></div>

        {/* Gradient transition to Testimonials section */}
        <div className="section-transition-overlay gradient-transition-to-light dark:gradient-transition-to-dark"></div>
      </section>

      {/* Testimonials Section - Social proof (keeping original styling as reference) */}
      <Testimonials />

      {/* FAQ Section - Common questions */}
      <section className="relative py-24 bg-white dark:bg-black overflow-hidden">
        {/* Background elements matching testimonials style */}
        <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-violet-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '9s' }}></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FAQ />
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl"></div>

        {/* Gradient transition to Call to Action section */}
        <div className="section-transition-overlay gradient-transition-to-gray-light dark:gradient-transition-to-gray-dark"></div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden">
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
          <CallToAction />
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default Home;
