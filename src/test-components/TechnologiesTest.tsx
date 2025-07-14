import React from 'react';
import { Badge } from '@/components/ui/badge';

// Test component to verify technologies handling
const TechnologiesTest = () => {
  // Test data with different scenarios
  const testProjects = [
    {
      id: '1',
      title: 'Project with Array Technologies',
      technologies: ['React', 'TypeScript', 'Node.js']
    },
    {
      id: '2', 
      title: 'Project with Null Technologies',
      technologies: null
    },
    {
      id: '3',
      title: 'Project with Undefined Technologies',
      technologies: undefined
    },
    {
      id: '4',
      title: 'Project with Empty Array Technologies',
      technologies: []
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Technologies Handling Test</h1>
      
      {testProjects.map((project) => (
        <div key={project.id} className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
          
          {/* Test the old way (would cause error) */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Old Way (Commented Out - Would Cause Error):</h3>
            <div className="text-xs text-gray-500">
              {/* This would cause the error: project.technologies?.slice(0, 3).map(...) */}
              {/* {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                <Badge key={index} variant="secondary">{tech}</Badge>
              ))} */}
              Commented out to prevent error
            </div>
          </div>

          {/* Test the new way (safe) */}
          <div>
            <h3 className="text-sm font-medium text-green-600 mb-2">New Way (Safe):</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(project.technologies) && project.technologies.slice(0, 3).map((tech: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                  {tech}
                </Badge>
              ))}
              {Array.isArray(project.technologies) && project.technologies.length > 3 && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  +{project.technologies.length - 3} more
                </Badge>
              )}
              {!Array.isArray(project.technologies) && (
                <span className="text-gray-500 text-sm">No technologies available</span>
              )}
            </div>
          </div>

          {/* Show raw data for debugging */}
          <div className="mt-2 text-xs text-gray-400">
            Raw data: {JSON.stringify(project.technologies)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechnologiesTest;
