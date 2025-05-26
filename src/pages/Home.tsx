import React from 'react';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Newsletter from '@/components/sections/Newsletter';
import Portfolio from '@/components/sections/Portfolio';
import Industries from '@/components/sections/Industries';
import CallToAction from '@/components/sections/CallToAction';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Full screen with dynamic elements */}
      <Hero />
      
      {/* Services Section - Showcasing key offerings with modern cards */}
      <section className="py-24 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">easyioing businesses to reach their full digital potential</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </div>
          <Services />
        </div>
      </section>
      
      {/* About Section - Company vision and values */}
      <section className="py-24 bg-gradient-to-b from-gray-200 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">We create digital strategy experiences based on business analysis</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </div>
          <About />
        </div>
      </section>
      
      {/* Portfolio/Work Section - Showcasing recent projects */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Work</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Each project is a testament to our commitment to creativity, strategy, and results-driven design.</p>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
          </div>
          <Portfolio />
        </div>
      </section>
      
      {/* Industries Section - Industries we serve */}
      <section className="py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Industries We Serve</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Specialized solutions for diverse industry needs</p>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
          </div>
          <Industries />
        </div>
      </section>
      
      {/* Testimonials Section - Social proof */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Driving Growth Through Partnerships</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Don't just take our word for it</p>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
          </div>
          <Testimonials />
        </div>
      </section>
      
      {/* FAQ Section - Common questions */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </div>
          <FAQ />
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950">
        <CallToAction />
      </section>
      
      {/* Newsletter Section */}
      <section className="py-24 bg-gray-200 dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <Newsletter />
        </div>
      </section>
    </div>
  );
};

export default Home;
