
import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingElement from '@/components/FloatingElement';
import { Button } from '@/components/ui/button';

export const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b65c?w=100&h=100&fit=crop&crop=face',
    content: "easyio transformed our digital presence completely. Their strategic approach and attention to detail exceeded our expectations.",
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'CTO, InnovateCorp',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: "The team's expertise in digital strategy helped us achieve a 300% increase in online conversions. Highly recommended!",
    rating: 5
  },
  {
    name: 'Emily Davis',
    role: 'Marketing Director, GrowthLab',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: "Working with easyio was a game-changer for our business. Their innovative solutions delivered exceptional results.",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <section className="py-20 bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse" 
               style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" 
               style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <AnimatedSection threshold={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              Don't just take our word for it
              <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what our clients have to say about their experience working with us.
            </p>
          </div>
        </AnimatedSection>

        {/* Desktop view: Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 200} threshold={0.1}>
              <div 
                className="bg-gray-100 dark:bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-500 group relative overflow-hidden h-full shadow-md dark:shadow-none"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FloatingElement key={i} amplitude={2} frequency={0.003} phase={i * 0.5}>
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      </FloatingElement>
                    ))}
                  </div>
                  
                  <Quote className="h-8 w-8 text-yellow-400 mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="relative overflow-hidden rounded-full w-12 h-12 group-hover:ring-2 group-hover:ring-yellow-400 transition-all duration-300">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        {/* Mobile view: Carousel */}
        <div className="lg:hidden relative">
          <AnimatedSection threshold={0.1}>
            <div className="bg-gray-100 dark:bg-white/10 backdrop-blur-sm rounded-xl p-8 relative overflow-hidden mb-8 shadow-md dark:shadow-none">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-30 dark:opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <FloatingElement key={i} amplitude={2} frequency={0.003} phase={i * 0.5}>
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    </FloatingElement>
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-yellow-400 mb-4" />
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonials[activeIndex].content}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="relative overflow-hidden rounded-full w-12 h-12 ring-2 ring-yellow-400/50">
                    <img 
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white"
                onClick={handlePrevious}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-yellow-400 w-6' : 'bg-gray-400/50 dark:bg-white/30 hover:bg-gray-500 dark:hover:bg-white/50'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Testimonials;
