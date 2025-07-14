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
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500'}
              rounded-full px-6 py-2 transition-all duration-300
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
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
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project)}
            >
              {/* Enhanced Card Container with Gradient Border */}
              <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-purple-300 dark:group-hover:border-purple-600 transition-all duration-500">

                {/* Project Image with Enhanced Overlay */}
                <div className="h-64 w-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 overflow-hidden relative">
                  <ImageWithFallback
                    src={project.image || ''}
                    fallbackSrc={`https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(project.title)}`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Dynamic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                  {/* Floating Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                      {project.category}
                    </span>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-black/40 text-white rounded-full backdrop-blur-sm border border-white/20">
                      {project.year}
                    </span>
                  </div>

                  {/* Hover Overlay with CTA */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-purple-600/90 to-blue-600/90 backdrop-blur-sm">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-white font-semibold text-lg">View Project Details</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Content Section */}
                <div className="p-6 space-y-4">
                  {/* Project Title with Gradient Accent */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                      {project.title}
                    </h3>
                    <div className="h-0.5 w-0 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-500"></div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(project.technologies) && project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600 group-hover:bg-gradient-to-r group-hover:from-purple-100 group-hover:to-blue-100 dark:group-hover:from-purple-900/30 dark:group-hover:to-blue-900/30 group-hover:border-purple-200 dark:group-hover:border-purple-600 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {Array.isArray(project.technologies) && project.technologies.length > 3 && (
                      <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-600">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Results with Icon */}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">Results:</span> {project.results}
                    </span>
                  </div>

                  {/* Enhanced CTA Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project);
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 group/btn"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      <span>View Details</span>
                    </Button>
                    {project.link && project.link !== '/our-work' && (
                      <Button
                        asChild
                        variant="outline"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-3 rounded-xl border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20 transition-all duration-300"
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View live ${project.title} project`}>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-xl"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View all projects button */}
      <div className="text-center mt-16">
        <Link to="/our-work">
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white dark:text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span className="mr-2">View All Projects</span>
            <ArrowRight className="h-5 w-5 inline-block group-hover:translate-x-1 transition-transform duration-300" />
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
