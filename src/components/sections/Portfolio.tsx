import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { usePortfolio } from '@/lib/supabase/hooks/usePortfolio';
import { initialProjects as projects, categories } from '@/lib/data/portfolioData';
import ImageWithFallback from '@/components/ui/image-with-fallback';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { data: projectsFromDB, isLoading, fetchByCategory } = usePortfolio();

  // Fetch projects when component mounts
  useEffect(() => {
    fetchByCategory(activeCategory);
  }, []);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    fetchByCategory(category);
  };

  // Use projects from database, fallback to static data if empty
  const displayProjects = projectsFromDB && projectsFromDB.length > 0 ? projectsFromDB : projects;

  return (
    <div className="w-full">
      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => handleCategoryChange(category)}
            className={`
              ${activeCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500'}
              rounded-full px-6 py-2 transition-all duration-300
            `}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Portfolio grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: project.id * 0.1 }}
              className="group relative overflow-hidden rounded-xl"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image with Fallback */}
              <div className="h-80 w-full bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                <ImageWithFallback
                  src={project.image || ''}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay (always present, but more visible if image fails) */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 to-blue-600/50 dark:from-purple-900/80 dark:to-blue-900/80 opacity-20 dark:opacity-40 group-hover:opacity-40 dark:group-hover:opacity-70 transition-opacity duration-500"></div>
              </div>

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0 w-full">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-purple-600 dark:bg-purple-700 text-white rounded-full">
                      {project.category}
                    </span>
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-black/40 dark:bg-white/10 backdrop-blur-sm rounded-full text-white">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-white text-shadow">{project.title}</h3>
                  <p className="text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-shadow">
                    {project.description}
                  </p>

                  {/* Technologies used */}
                  <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-shadow"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-white/90 text-shadow">
                      <span className="font-semibold">Results:</span> {project.results}
                    </p>
                  </div>

                  <Link to={project.link} className="block w-full" aria-label={`View ${project.title} project`} tabIndex={0}>
                    <Button
                      variant="outline"
                      className="border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-purple-900 dark:border-white dark:hover:text-purple-900 transition-all duration-300 shadow-md w-full"
                    >
                      View Project
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View all projects button */}
      <div className="text-center mt-16">
        <Link to="/portfolio">
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white dark:text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span className="mr-2">View All Projects</span>
            <ArrowRight className="h-5 w-5 inline-block group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
