import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Eye, ExternalLink, Calendar, Award, Code, Users, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/hooks/useProjects';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingElement from '@/components/FloatingElement';

// Enhanced Project Preview Modal
interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="relative p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
            <div className="absolute inset-0 bg-black/20 rounded-t-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {project.category}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  ×
                </Button>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Project Image & Gallery */}
              <div className="space-y-6">
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gallery Images */}
                {project.gallery_images && project.gallery_images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {project.gallery_images.slice(0, 3).map((img: string, index: number) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <ImageWithFallback
                          src={img}
                          alt={`${project.title} gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {project.project_link && (
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <a href={project.project_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live Project
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Project Overview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Code className="mr-2 h-5 w-5 text-purple-600" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span className="text-sm">Year</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white">{project.year}</p>
                  </div>

                  {project.team_size && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                        <Users className="mr-2 h-4 w-4" />
                        <span className="text-sm">Team Size</span>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">{project.team_size} members</p>
                    </div>
                  )}

                  {project.project_duration && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                        <Clock className="mr-2 h-4 w-4" />
                        <span className="text-sm">Duration</span>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">{project.project_duration}</p>
                    </div>
                  )}

                  {project.budget_range && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span className="text-sm">Budget</span>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">{project.budget_range}</p>
                    </div>
                  )}
                </div>

                {/* Results */}
                {project.results && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Award className="mr-2 h-5 w-5 text-yellow-500" />
                      Results & Impact
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.results}
                    </p>
                  </div>
                )}

                {/* Client Testimonial */}
                {project.testimonial_text && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Client Testimonial
                    </h3>
                    <blockquote className="text-gray-700 dark:text-gray-300 italic">
                      "{project.testimonial_text}"
                    </blockquote>
                    {project.client_name && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        — {project.client_name}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const OurWork = () => {
  const { projects, loading } = useProjects();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const isPublished = project.status === 'published';
    return matchesSearch && matchesCategory && isPublished;
  });

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Dark Mode Design */}
      <section className="py-20 bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
        {/* Animated background elements - matching testimonials design */}
        <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection threshold={0.2}>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 relative inline-block">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Work</span>
                <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Explore our portfolio of successful projects that showcase our expertise, creativity, and commitment to delivering exceptional results.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

        {/* Gradient transition */}
        <div className="section-transition-overlay gradient-transition-to-light dark:gradient-transition-to-dark"></div>
      </section>

      {/* Filters and Search Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    : "border-gray-200 dark:border-gray-700"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-9 w-9 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-9 w-9 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white dark:bg-black relative overflow-hidden">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No projects found matching your criteria.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className={viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-8"
              }
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group cursor-pointer ${viewMode === 'list' ? 'flex gap-6 items-center' : ''
                    }`}
                  onClick={() => handleProjectClick(project)}
                >
                  {/* Project Card */}
                  <div className={`bg-gray-100 dark:bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-500 group relative shadow-md dark:shadow-none ${viewMode === 'list' ? 'flex-shrink-0 w-64' : 'h-full'
                    }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Project Image */}
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'h-40' : 'h-64'}`}>
                      <ImageWithFallback
                        src={project.image || `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(project.title)}`}
                        fallbackSrc={`https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(project.title)}`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                      {project.featured && (
                        <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                          {project.category}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.slice(0, 3).map((tech: string, techIndex: number) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="text-xs bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies?.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Project Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        {project.client_name && (
                          <span>Client: {project.client_name}</span>
                        )}
                        {project.project_duration && (
                          <span>{project.project_duration}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* List View Additional Content */}
                  {viewMode === 'list' && (
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {project.description}
                      </p>
                      {project.results && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <Award className="inline h-4 w-4 mr-1" />
                          {project.results}
                        </p>
                      )}
                      <div className="flex items-center gap-4">
                        <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                          {project.category}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {project.year}
                        </span>
                        {project.project_link && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={project.project_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Live
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default OurWork;
