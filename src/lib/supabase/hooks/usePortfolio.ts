import { useState } from 'react';
import { useSupabaseData } from './useSupabaseData';
import {
  getPublicProjects,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByCategory,
  type Project as SupabaseProject,
  type ProjectResponse
} from '../services';
import { PostgrestError } from '@supabase/supabase-js';

// Project type definition for UI
export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  year: number;
  results: string;
  link: string;
};

// Default projects data as fallback
const defaultProjects: Project[] = [
  {
    id: 'default-1',
    title: 'Smart Farm Management System',
    category: 'IoT Solutions',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
    description: 'Comprehensive IoT solution for modern agriculture with real-time monitoring and automated irrigation.',
    technologies: ['React', 'Node.js', 'IoT Sensors', 'MongoDB'],
    year: 2024,
    results: 'Increased crop yield by 40% and reduced water usage by 30%',
    link: '/our-work/smart-farm'
  },
  {
    id: 'default-2',
    title: 'School Management Portal',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    description: 'Complete school management system with student tracking, fee management, and parent portal.',
    technologies: ['React', 'Express.js', 'PostgreSQL', 'Stripe'],
    year: 2024,
    results: 'Streamlined operations for 500+ students and improved parent engagement by 60%',
    link: '/our-work/school-portal'
  },
  {
    id: 'default-3',
    title: 'E-Commerce Platform',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    description: 'Modern e-commerce platform with advanced analytics and inventory management.',
    technologies: ['Next.js', 'Supabase', 'Stripe', 'Tailwind CSS'],
    year: 2024,
    results: 'Processed $100K+ in sales within first month of launch',
    link: '/our-work/ecommerce-platform'
  }
];

// Create type-safe wrappers for the portfolio service functions
const fetchProjects = async (): Promise<{ data: Project[]; error: PostgrestError | null }> => {
  const response = await getPublicProjects();
  return {
    data: response.data as Project[] || [],
    error: response.error
  };
};

const addProject = async (project: Omit<Project, "id">): Promise<{ data: Project; error: PostgrestError | null }> => {
  const response = await createProject(project);
  return {
    data: response.data as Project,
    error: response.error
  };
};

const editProject = async (id: string, project: Partial<Omit<Project, "id">>): Promise<{ data: Project; error: PostgrestError | null }> => {
  const response = await updateProject(id, project);
  return {
    data: response.data as Project,
    error: response.error
  };
};

const removeProject = async (id: string): Promise<{ data: Project; error: PostgrestError | null }> => {
  const response = await deleteProject(id);
  return {
    data: response.data as Project,
    error: response.error
  };
};

// Create a hook for working with portfolio projects
export const usePortfolio = () => {
  // Use React's useState directly for managing loading state during category filtering
  const [filterLoading, setFilterLoading] = useState(false);

  // Use the generic Supabase data hook with project-specific config
  const hook = useSupabaseData<Project>({
    initialData: defaultProjects,
    fetchFunction: fetchProjects,
    createFunction: addProject,
    updateFunction: editProject,
    deleteFunction: removeProject,
    resourceName: 'project'
  });

  // Add an extra function to filter by category
  const fetchByCategory = async (category: string) => {
    if (category === 'All') {
      return hook.fetchData();
    }

    try {
      setFilterLoading(true);
      const { data, error } = await getProjectsByCategory(category);

      if (error) {
        throw error;
      }

      if (data) {
        // We can safely update the hook's data since we're returning it
        return { data: data as Project[], isLoading: filterLoading, fetchData: hook.fetchData, createItem: hook.createItem, updateItem: hook.updateItem, deleteItem: hook.deleteItem };
      }
    } catch (error) {
      console.error('Error filtering projects by category:', error);
    } finally {
      setFilterLoading(false);
    }

    // Return the original hook if there was an error
    return hook;
  };

  return {
    ...hook,
    fetchByCategory
  };
};
