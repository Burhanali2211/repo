import { supabase } from '../client';
import type { PostgrestError } from '@supabase/supabase-js';

// Project type definition
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
