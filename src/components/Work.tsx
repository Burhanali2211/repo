
import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolio } from '@/lib/supabase/hooks/usePortfolio';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import ProjectPreviewModal from '@/components/ProjectPreviewModal';

// Fallback projects for when Supabase data is not available
const fallbackProjects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    description: 'A modern e-commerce solution with advanced features',
    technologies: ['React', 'Node.js', 'MongoDB'],
    year: 2024,
    results: 'Increased sales by 150%',
    link: 'https://example.com'
  },
  {
    id: '2',
    title: 'Brand Identity',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    description: 'Complete brand redesign for a tech startup',
    technologies: ['Adobe Creative Suite', 'Figma'],
    year: 2024,
    results: 'Brand recognition increased by 200%',
    link: 'https://example.com'
  },
  {
    id: '3',
    title: 'Mobile App',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    description: 'Cross-platform mobile application',
    technologies: ['React Native', 'Firebase'],
    year: 2024,
    results: '50K+ downloads in first month',
    link: 'https://example.com'
  }
];

const Work = () => {
  const { data: portfolioProjects, isLoading } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use Supabase data if available, otherwise fallback to hardcoded projects
  const projects = portfolioProjects && portfolioProjects.length > 0
    ? portfolioProjects.slice(0, 3) // Show only first 3 projects
    : fallbackProjects;

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <section id="work" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Work
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of successful projects that showcase our expertise and creativity.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id || index}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <ImageWithFallback
                  src={project.image}
                  fallbackSrc={`https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(project.title)}`}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                    <ExternalLink className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-sm text-purple-600 font-medium mb-2">{project.category}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 line-clamp-2">{project.description}</p>

              {/* View Project Button */}
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProjectClick(project);
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Project
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
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

export default Work;
