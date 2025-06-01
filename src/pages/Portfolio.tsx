
import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import { usePortfolio } from '@/lib/supabase/hooks/usePortfolio';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const { data: portfolioProjects, isLoading } = usePortfolio();

  const categories = ['All', 'Web Development', 'E-Commerce', 'Travel & Tourism', 'Real Estate', 'IoT Solutions', 'Design'];

  // Use projects from database
  const projects = portfolioProjects || [];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-600 to-indigo-700 text-white dark:from-indigo-800 dark:to-gray-900 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-amber-300 dark:text-amber-300">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our latest work and see how we've helped businesses
            achieve their digital goals.
          </p>
        </div>

        {/* Gradient transition to Filter Tabs section */}
        <div className="section-transition-overlay gradient-transition-to-gray-light dark:gradient-transition-to-gray-dark"></div>
      </section>

      {/* Filter Tabs */}
      <section className="relative py-12 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? "default" : "outline"}
                className={filter === category ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Gradient transition to Projects Grid section */}
        <div className="section-transition-overlay gradient-transition-to-light dark:gradient-transition-to-dark"></div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black overflow-hidden">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Projects Available</h3>
              <p className="text-gray-500 dark:text-gray-400">Projects will appear here once they are added to the database.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {filteredProjects.map((project, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl mb-6">
                    <ImageWithFallback
                      src={project.image || ''}
                      alt={`${project.title} - ${project.description}`}
                      fallbackSrc={`https://via.placeholder.com/600x400/6366f1/ffffff?text=${encodeURIComponent(project.title)}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black dark:bg-black bg-opacity-50 dark:bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <Button size="sm" className="bg-white text-black hover:bg-gray-200 dark:bg-gray-200 dark:text-gray-900">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live
                      </Button>
                      <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">{project.category}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {(project.technologies || []).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.testimonial_text && project.client_name && (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-gray-900/30">
                      <p className="text-gray-600 dark:text-gray-400 italic mb-2">"{project.testimonial_text}"</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">- {project.client_name}</p>
                    </div>
                  )}

                  {project.results && (
                    <div className="mt-4 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        <span className="font-semibold">Results:</span> {project.results}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
