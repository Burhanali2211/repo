import { useState } from 'react';
import { useSupabaseData } from './useSupabaseData';
import { 
  getAllProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  getProjectsByCategory,
  type Project as SupabaseProject,
  type ProjectResponse
} from '../services';
import { initialProjects as initialProjectsData } from '@/lib/data/portfolioData';
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

// Default projects
const defaultProjects = initialProjectsData.map(project => ({
  ...project,
  id: project.id ? project.id.toString() : crypto.randomUUID()
}));

// Create type-safe wrappers for the portfolio service functions
const fetchProjects = async (): Promise<{ data: Project[]; error: PostgrestError | null }> => {
  const response = await getAllProjects();
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
