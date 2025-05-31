import { supabase } from '@/integrations/supabase/client';
import type { PostgrestError } from '@supabase/supabase-js';

// Enhanced Project type definition to match database schema
export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  image?: string;
  description: string;
  technologies: string[];
  client_name?: string;
  testimonial_text?: string;
  featured: boolean;
  order_index: number;
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
};

// Type for creating a new project
export type CreateProjectDTO = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

// Response type
export type ProjectResponse = {
  data: Project[] | Project | null;
  error: PostgrestError | null;
};

// Constants
const TABLE_NAME = 'projects';

/**
 * Fetch all projects from Supabase
 */
export const getAllProjects = async (): Promise<ProjectResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
};

/**
 * Fetch a single project by ID
 */
export const getProjectById = async (id: string): Promise<ProjectResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
};

/**
 * Fetch projects by category
 */
export const getProjectsByCategory = async (category: string): Promise<ProjectResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  return { data, error };
};

/**
 * Create a new project
 */
export const createProject = async (project: CreateProjectDTO): Promise<ProjectResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(project)
    .select()
    .single();

  return { data, error };
};

/**
 * Update an existing project
 */
export const updateProject = async (id: string, project: Partial<CreateProjectDTO>): Promise<ProjectResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(project)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};

/**
 * Delete a project
 */
export const deleteProject = async (id: string): Promise<ProjectResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};
