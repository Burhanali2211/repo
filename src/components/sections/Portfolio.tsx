import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { usePortfolio, type Project } from '@/lib/supabase/hooks/usePortfolio';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import ProjectPreviewModal from '@/components/ProjectPreviewModal';

// Define a unified project type for the component
type UnifiedProject = {
  id: string | number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  year: number;
  results: string;
  link: string;
};

// Categories for filtering
const categories = ['All', 'Web Development', 'Mobile Development', 'IoT Solutions', 'Design', 'E-Commerce'];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | number | null>(null);
  const [selectedProject, setSelectedProject] = useState<UnifiedProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Transform Supabase data to match component expectations
  const transformSupabaseProject = (project: Project): UnifiedProject => {
    // Ensure technologies is always an array
    let technologies: string[] = [];
    if (Array.isArray(project.technologies)) {
      technologies = project.technologies;
    } else if (project.technologies && typeof project.technologies === 'string') {
      // Handle case where technologies might be a JSON string
      try {
        const parsed = JSON.parse(project.technologies);
        technologies = Array.isArray(parsed) ? parsed : [];
      } catch {
        // If parsing fails, treat as a single technology
        technologies = [project.technologies];
      }
    }

    return {
      id: project.id,
      title: project.title,
      category: project.category,
      image: project.image || `https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(project.title)}`,
      description: project.description,
      technologies,
      year: project.year,
      results: project.results || 'Successful project completion',
      link: project.project_link || `/our-work/${project.slug || project.id}`
    };
  };

  // Use only projects from database - no fallback data
  const displayProjects: UnifiedProject[] = projectsFromDB
    ? projectsFromDB.map(transformSupabaseProject).slice(0, 6) // Show only first 6 projects on homepage
    : [];

  // Handle project click
  const handleProjectClick = (project: UnifiedProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className="w-full" aria-labelledby="portfolio-heading">
      {/* Category filters */}
      <nav className="flex flex-wrap justify-center gap-4 mb-12" role="tablist" aria-label="Portfolio categories">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => handleCategoryChange(category)}
            role="tab"
            aria-selected={activeCategory === category}
            aria-controls={`portfolio-panel-${category.toLowerCase().replace(/\s+/g, '-')}`}
            className={`
              ${activeCategory === category
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}
              rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300
            `}
          >
            {category}
          </Button>
        ))}
      </nav>

      {/* Portfolio grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20" role="status" aria-label="Loading portfolio projects">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          <span className="sr-only">Loading portfolio projects...</span>
        </div>
      ) : displayProjects.length === 0 ? (
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
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          role="tabpanel"
          id={`portfolio-panel-${activeCategory.toLowerCase().replace(/\s+/g, '-')}`}
          aria-label={`${activeCategory} portfolio projects`}
        >
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              {/* Minimalistic Card Container */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 overflow-hidden h-full">

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={project.image || ''}
                    fallbackSrc={`https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(project.title)}`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Simple Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-xs font-medium bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 rounded-md backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 space-y-3">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {Array.isArray(project.technologies) && project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {Array.isArray(project.technologies) && project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer with Year and CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {project.year}
                    </span>
                    <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                      <span className="mr-1">View project</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View all projects button */}
      <div className="text-center mt-12">
        <Link to="/our-work">
          <Button
            variant="outline"
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white px-6 py-3 font-medium transition-all duration-300 group"
          >
            <span className="mr-2">View All Projects</span>
            <ArrowRight className="h-4 w-4 inline-block group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>

      {/* Project Preview Modal */}
      <ProjectPreviewModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Portfolio;
