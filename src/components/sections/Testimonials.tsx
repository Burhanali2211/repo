
import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingElement from '@/components/FloatingElement';
import { Button } from '@/components/ui/button';
import { useTestimonials } from '@/lib/supabase/hooks/useTestimonials';

const Testimonials = () => {
  const { data: testimonials, isLoading: loading } = useTestimonials();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    if (!testimonials || testimonials.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!testimonials || testimonials.length === 0) return;
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </section>
    );
  }



  // No testimonials state
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-20 bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-20 bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-30 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <AnimatedSection threshold={0.2}>
          <header className="text-center mb-16">
            <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              Don't just take our word for it
              <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" aria-hidden="true"></div>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what our clients have to say about their experience working with us.
            </p>
          </header>
        </AnimatedSection>

        {/* Desktop view: Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8" role="list" aria-label="Customer testimonials">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 200} threshold={0.1}>
              <article
                className="bg-gray-100 dark:bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-500 group relative overflow-hidden h-full shadow-md dark:shadow-none"
                role="listitem"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
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
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={`${testimonial.name}, ${testimonial.role}${testimonial.company ? `, ${testimonial.company}` : ''}`}
                          className="w-12 h-12 rounded-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                          {testimonial.name?.charAt(0) || 'T'}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile view: Carousel */}
        <div className="lg:hidden relative" role="region" aria-label="Testimonials carousel" aria-live="polite">
          <AnimatedSection threshold={0.1}>
            <article className="bg-gray-100 dark:bg-white/10 backdrop-blur-sm rounded-xl p-8 relative overflow-hidden mb-8 shadow-md dark:shadow-none">
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
                    {testimonials[activeIndex].avatar ? (
                      <img
                        src={testimonials[activeIndex].avatar}
                        alt={`${testimonials[activeIndex].name}, ${testimonials[activeIndex].role}${testimonials[activeIndex].company ? `, ${testimonials[activeIndex].company}` : ''}`}
                        className="w-12 h-12 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {testimonials[activeIndex].name?.charAt(0) || 'T'}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {testimonials[activeIndex].role}{testimonials[activeIndex].company ? `, ${testimonials[activeIndex].company}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            </article>

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

      {/* Gradient transition to FAQ section */}
      <div className="section-transition-overlay gradient-transition-to-light dark:gradient-transition-to-dark"></div>
    </section>
  );
};

export default Testimonials;
