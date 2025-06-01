import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image?: string;
  technologies: string[];
  client_name?: string;
  testimonial_text?: string;
  featured: boolean;
  order_index: number;
  // Enhanced fields
  year: number;
  results?: string;
  project_link?: string;
  status: 'draft' | 'published' | 'archived';
  gallery_images?: string[];
  project_duration?: string;
  budget_range?: string;
  team_size?: number;
  created_at?: string;
  updated_at?: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProjects = useCallback(async () => {
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
        toast({
          title: "Error fetching projects",
          description: fetchError.message,
          variant: "destructive"
        });
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
        order_index: project.order_index,
        year: project.year || new Date().getFullYear(),
        results: project.results,
        project_link: project.project_link,
        status: project.status || 'published',
        gallery_images: project.gallery_images || [],
        project_duration: project.project_duration,
        budget_range: project.budget_range,
        team_size: project.team_size,
        created_at: project.created_at,
        updated_at: project.updated_at
      }));

      setProjects(mappedProjects);
    } catch (error) {
      console.error('Exception in fetchProjects:', error);
      const errorMessage = 'Failed to fetch projects';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Set up real-time subscription
  useEffect(() => {
    fetchProjects();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('projects-changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        (payload) => {
          console.log('Real-time project change:', payload);
          // Refetch projects when changes occur
          fetchProjects();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProjects]);

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
      order_index: projectData.order_index,
      year: projectData.year,
      results: projectData.results,
      project_link: projectData.project_link,
      status: projectData.status,
      gallery_images: projectData.gallery_images,
      project_duration: projectData.project_duration,
      budget_range: projectData.budget_range,
      team_size: projectData.team_size
    };

    try {
      console.log('Creating project:', projectData);
      setLoading(true);

      const { data, error } = await supabase
        .from('projects')
        .insert([dbProjectData])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        toast({
          title: "Error creating project",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      console.log('Project created:', data);
      toast({
        title: "Success",
        description: "Project created successfully",
      });

      // Don't refetch here as real-time subscription will handle it
      return data;
    } catch (error) {
      console.error('Exception in createProject:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    // Create a new object with the correct field names for the database
    const dbProjectData: Record<string, unknown> = {};

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
    if (projectData.year !== undefined) dbProjectData.year = projectData.year;
    if (projectData.results !== undefined) dbProjectData.results = projectData.results;
    if (projectData.project_link !== undefined) dbProjectData.project_link = projectData.project_link;
    if (projectData.status !== undefined) dbProjectData.status = projectData.status;
    if (projectData.gallery_images !== undefined) dbProjectData.gallery_images = projectData.gallery_images;
    if (projectData.project_duration !== undefined) dbProjectData.project_duration = projectData.project_duration;
    if (projectData.budget_range !== undefined) dbProjectData.budget_range = projectData.budget_range;
    if (projectData.team_size !== undefined) dbProjectData.team_size = projectData.team_size;

    try {
      console.log('Updating project with ID:', id);
      setLoading(true);

      // Simply update the project - if it doesn't exist, Supabase will return an error
      const { data, error } = await supabase
        .from('projects')
        .update(dbProjectData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        toast({
          title: "Error updating project",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      console.log('Project updated:', data);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });

      // Don't refetch here as real-time subscription will handle it
      return data;
    } catch (error) {
      console.error('Exception in updateProject:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      console.log('Deleting project:', id);
      setLoading(true);

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        toast({
          title: "Error deleting project",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      console.log('Project deleted:', id);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      // Don't refetch here as real-time subscription will handle it
    } catch (error) {
      console.error('Exception in deleteProject:', error);
      throw error;
    } finally {
      setLoading(false);
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
