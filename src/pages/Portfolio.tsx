
import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Web Development', 'E-commerce', 'Branding', 'Mobile App'];

  const projects = [
    {
      title: 'TechCorp Website',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      description: 'Modern corporate website with custom CMS',
      technologies: ['React', 'Node.js', 'MongoDB'],
      client: 'TechCorp Inc.',
      testimonial: 'Exceeded our expectations in every way. Professional and innovative.'
    },
    {
      title: 'Fashion Store',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
      description: 'Full-featured e-commerce platform with payment integration',
      technologies: ['Shopify', 'JavaScript', 'Stripe'],
      client: 'Fashion Forward',
      testimonial: 'Our sales increased by 300% after the new website launch.'
    },
    {
      title: 'Brand Identity',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      description: 'Complete brand redesign including logo and guidelines',
      technologies: ['Illustrator', 'Photoshop', 'Figma'],
      client: 'StartupXYZ',
      testimonial: 'The new brand identity perfectly captures our vision.'
    },
    {
      title: 'Fitness App',
      category: 'Mobile App',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      description: 'Cross-platform fitness tracking mobile application',
      technologies: ['React Native', 'Firebase', 'Redux'],
      client: 'FitLife',
      testimonial: 'User engagement increased by 250% with the new app design.'
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-600 to-indigo-700 text-white dark:from-indigo-800 dark:to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-amber-300 dark:text-amber-300">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our latest work and see how we've helped businesses 
            achieve their digital goals.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800">
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
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {filteredProjects.map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src={project.image}
                    alt={project.title}
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
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-gray-900/30">
                  <p className="text-gray-600 dark:text-gray-400 italic mb-2">"{project.testimonial}"</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">- {project.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
