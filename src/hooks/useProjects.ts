import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image?: string;
  technologies: string[];
  // Renamed client to client_name to match database schema
  client_name?: string;
  testimonial_text?: string;
  featured: boolean;
  order_index: number;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      console.log('Fetching projects...');
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      console.log('Projects data:', data, fetchError);

      if (fetchError) {
        console.error('Error fetching projects:', fetchError);
        setError(fetchError.message);
        return;
      }

      const mappedProjects = (data || []).map(project => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        category: project.category,
        image: project.image,
        technologies: project.technologies || [],
        client_name: project.client_name,
        testimonial_text: project.testimonial_text,
        featured: project.featured,
        order_index: project.order_index
      }));

      setProjects(mappedProjects);
    } catch (error) {
      console.error('Exception in fetchProjects:', error);
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (projectData: Omit<Project, 'id'>) => {
    // Create a new object with the correct field names for the database
    const dbProjectData = {
      title: projectData.title,
      slug: projectData.slug,
      description: projectData.description,
      category: projectData.category,
      image: projectData.image,
      technologies: projectData.technologies,
      client_name: projectData.client_name,
      testimonial_text: projectData.testimonial_text,
      featured: projectData.featured,
      order_index: projectData.order_index
    };
    try {
      console.log('Creating project:', projectData);
      const { data, error } = await supabase
        .from('projects')
        .insert([dbProjectData])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        throw error;
      }

      console.log('Project created:', data);
      await fetchProjects();
      return data;
    } catch (error) {
      console.error('Exception in createProject:', error);
      throw error;
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    // Create a new object with the correct field names for the database
    const dbProjectData: any = {};
    
    // Map the fields to the correct database column names
    if (projectData.title !== undefined) dbProjectData.title = projectData.title;
    if (projectData.slug !== undefined) dbProjectData.slug = projectData.slug;
    if (projectData.description !== undefined) dbProjectData.description = projectData.description;
    if (projectData.category !== undefined) dbProjectData.category = projectData.category;
    if (projectData.image !== undefined) dbProjectData.image = projectData.image;
    if (projectData.technologies !== undefined) dbProjectData.technologies = projectData.technologies;
    if (projectData.client_name !== undefined) dbProjectData.client_name = projectData.client_name;
    if (projectData.testimonial_text !== undefined) dbProjectData.testimonial_text = projectData.testimonial_text;
    if (projectData.featured !== undefined) dbProjectData.featured = projectData.featured;
    if (projectData.order_index !== undefined) dbProjectData.order_index = projectData.order_index;
    
    try {
      console.log('Updating project with ID:', id);
      
      // IMPORTANT: Don't use .single() when checking existence
      // This causes the error when no rows are found
      const { data: existingProjects, error: checkError } = await supabase
        .from('projects')
        .select('id')
        .eq('id', id);
      
      // Properly handle check errors
      if (checkError) {
        console.error('Error checking project existence:', checkError);
        throw checkError;
      }
      
      // Check if project exists based on array length
      const projectExists = existingProjects && existingProjects.length > 0;
      console.log('Project exists?', projectExists);
      
      let result;
      
      // If project doesn't exist, create it with the specified ID
      if (!projectExists) {
        console.log('Project not found, creating a new one with ID:', id);
        
        // Create full project data with all required fields
        const fullProjectData = {
          id, // Use the specified ID
          title: projectData.title || 'New Project',
          slug: projectData.slug || `project-${Date.now()}`,
          description: projectData.description || '',
          category: projectData.category || 'Other',
          technologies: projectData.technologies || [],
          featured: projectData.featured !== undefined ? projectData.featured : false,
          order_index: projectData.order_index !== undefined ? projectData.order_index : 0,
          client_name: projectData.client_name || '',
          testimonial_text: projectData.testimonial_text || ''
        };
        
        console.log('Creating project with data:', fullProjectData);
        
        // Insert the new project
        result = await supabase
          .from('projects')
          .insert([fullProjectData])
          .select();
          
        console.log('Insert result:', result);
      } else {
        // Project exists, update it
        console.log('Project exists, updating with data:', dbProjectData);
        
        result = await supabase
          .from('projects')
          .update(dbProjectData)
          .eq('id', id)
          .select();
          
        console.log('Update result:', result);
      }
      
      // Handle errors from either insert or update
      if (result.error) {
        console.error('Error with project operation:', result.error);
        throw result.error;
      }

      // Use result.data instead of data
      console.log('Project updated:', result.data);
      await fetchProjects();
      return result.data;
    } catch (error) {
      console.error('Exception in updateProject:', error);
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      console.log('Deleting project:', id);
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        throw error;
      }

      console.log('Project deleted:', id);
      await fetchProjects();
    } catch (error) {
      console.error('Exception in deleteProject:', error);
      throw error;
    }
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
};
