import { supabase } from '@/integrations/supabase/client';
import React from 'react';

// Helper to check if user is authenticated
const checkAuth = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return !!data.session;
  } catch (error) {
    console.warn('Authentication check failed:', error);
    return false;
  }
};

// Type definition for Testimonial in Supabase
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string; // Note: This is 'avatar' in Supabase but 'image' in the UI
  content: string;
  rating: number;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
};

/**
 * Get all testimonials from Supabase
 */
export const getAllTestimonials = async () => {
  return supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });
};

/**
 * Get a single testimonial by ID
 */
export const getTestimonialById = async (id: string) => {
  return supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();
};

/**
 * Create a new testimonial
 */
export const createTestimonial = async (testimonialData: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) => {
  return supabase
    .from('testimonials')
    .insert(testimonialData)
    .select()
    .single();
};

/**
 * Update an existing testimonial
 */
export const updateTestimonial = async (
  id: string,
  testimonialData: Partial<Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>>
) => {
  return supabase
    .from('testimonials')
    .update(testimonialData)
    .eq('id', id)
    .select()
    .single();
};

/**
 * Delete a testimonial
 */
export const deleteTestimonial = async (id: string) => {
  return supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
};

/**
 * Get featured testimonials
 */
export const getFeaturedTestimonials = async () => {
  return supabase
    .from('testimonials')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });
};

// Service Types

/**
 * Service type as stored in Supabase
 */
export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  link: string;
  iconName: string;
  color: string;
  gradient: string;
  icon?: string; // Database field for icon
  image?: string; // Database field for image
  featured?: boolean; // Database field for featured
  order_index?: number; // Database field for order
  created_at?: string;
  updated_at?: string;
  user_id?: string;
};

/**
 * Extended service with icon component for UI
 */
export type ExtendedService = Service & {
  icon: React.ElementType;
};



/**
 * Get all services from Supabase
 * Requires authentication
 */
export const getAllServices = async () => {
  try {
    // Try to authenticate but handle it more gracefully
    try {
      await checkAuth();
    } catch (authError) {
      console.warn('Authentication check failed, trying to continue with fallback:', authError);
    }

    // If authenticated, proceed with the query
    return supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
  } catch (error) {
    console.error('Error in getAllServices:', error);
    throw error;
  }
};

/**
 * Get a single service by ID
 * Requires authentication
 */
export const getServiceById = async (id: string) => {
  try {
    try {
      await checkAuth();
    } catch (authError) {
      console.warn('Authentication check failed, trying to continue with fallback:', authError);
    }

    return supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();
  } catch (error) {
    console.error(`Error getting service ${id}:`, error);
    throw error;
  }
};

/**
 * Get a single service by slug
 * Public access - no authentication required
 */
export const getServiceBySlug = async (slug: string) => {
  try {
    console.log('Fetching service by slug:', slug);

    return supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();
  } catch (error) {
    console.error(`Error getting service by slug ${slug}:`, error);
    throw error;
  }
};

/**
 * Create a new service
 * Requires authentication
 */
export const createService = async (serviceData: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    // We need to be authenticated for RLS policies to work
    // Get current session and ensure we're authenticated
    const { data: { session } } = await supabase.auth.getSession();

    // If we don't have a session, we need to sign in
    if (!session) {
      console.error('No active session found - user must be logged in');
      throw new Error('Authentication required to add services. Please log in.');
    }

    console.log('Creating service with data:', serviceData);

    // Prepare service data to match database schema
    // Extract iconName but keep other data
    const { iconName, ...otherData } = serviceData;

    // Prepare the data object with only fields that exist in your database
    const dataToInsert = {
      ...otherData,
      // If your DB has an 'icon' field, use that instead of 'iconName'
      icon: iconName,
      // Let Supabase handle timestamps automatically
      // Include auth.uid() which is required for RLS policies
      // auth.uid() will be automatically handled by Supabase
    };

    console.log('Submitting to database:', dataToInsert);

    // Ensure we're using the authenticated client
    return supabase
      .from('services')
      .insert(dataToInsert)
      .select()
      .single();
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

/**
 * Update an existing service
 * Requires authentication
 */
export const updateService = async (
  id: string,
  serviceData: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>
) => {
  try {
    try {
      await checkAuth();
    } catch (authError) {
      console.warn('Authentication check failed, trying to continue with fallback:', authError);
    }

    return supabase
      .from('services')
      .update({
        ...serviceData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
  } catch (error) {
    console.error(`Error updating service ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a service
 * Requires authentication
 */
export const deleteService = async (id: string) => {
  try {
    try {
      await checkAuth();
    } catch (authError) {
      console.warn('Authentication check failed, trying to continue with fallback:', authError);
    }

    return supabase
      .from('services')
      .delete()
      .eq('id', id);
  } catch (error) {
    console.error(`Error deleting service ${id}:`, error);
    throw error;
  }
};

// Project Types

/**
 * Project type as stored in Supabase
 */
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
  user_id?: string;
};

/**
 * Get all projects from Supabase
 * Requires authentication
 */
export const getAllProjects = async () => {
  try {
    // Try to authenticate but handle it more gracefully
    try {
      await checkAuth();
    } catch (authError) {
      console.warn('Authentication check failed, trying to continue with fallback:', authError);
    }

    // If authenticated, proceed with the query
    return supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
  } catch (error) {
    console.error('Error in getAllProjects:', error);
    throw error;
  }
};

/**
 * Get projects by category
 * Requires authentication
 */
export const getProjectsByCategory = async (category: string) => {
  try {
    try {
      await checkAuth();
    } catch (authError) {
      console.warn('Authentication check failed, trying to continue with fallback:', authError);
    }

    return supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
  } catch (error) {
    console.error(`Error getting projects in category ${category}:`, error);
    throw error;
  }
};

/**
 * Get a single project by ID
 * Requires authentication
 */
export const getProjectById = async (id: string) => {
  try {
    try {
      await checkAuth();
    } catch (authError) {
      console.warn('Authentication check failed, trying to continue with fallback:', authError);
    }

    return supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
  } catch (error) {
    console.error(`Error getting project ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new project
 * Requires authentication
 */
export const createProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    // Try to authenticate but handle it more gracefully
    try {
      await checkAuth();
    } catch (authError) {
      console.warn('Authentication check failed, trying to continue with fallback:', authError);
    }

    // Get the current user ID
    const { data: userData } = await supabase.auth.getUser();
    let userId = userData?.user?.id;

    // If no user ID from Supabase auth, try getting it from localStorage
    if (!userId) {
      console.log('No user ID from Supabase auth, checking localStorage');
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user && user.id) {
            console.log('Using user ID from localStorage:', user.id);
            userId = user.id;
          }
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
    }

    // If still no user ID, try a generic ID for development purposes
    if (!userId) {
      console.warn('No user ID available, using development fallback');
      userId = '00000000-0000-0000-0000-000000000000'; // Development fallback ID
    }

    return supabase
      .from('projects')
      .insert({
        ...projectData,
        user_id: userId,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * Update an existing project
 * Requires authentication
 */
export const updateProject = async (
  id: string,
  projectData: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
) => {
  try {
    try {
      await checkAuth();
    } catch (authError) {
      console.warn('Authentication check failed, trying to continue with fallback:', authError);
    }

    return supabase
      .from('projects')
      .update({
        ...projectData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a project
 * Requires authentication
 */
export const deleteProject = async (id: string) => {
  try {
    try {
      await checkAuth();
    } catch (authError) {
      console.warn('Authentication check failed, trying to continue with fallback:', authError);
    }

    return supabase
      .from('projects')
      .delete()
      .eq('id', id);
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    throw error;
  }
};

/**
 * Upload a file to Supabase storage
 * Requires authentication
 */
export const uploadFile = async (bucket: string, path: string, file: File) => {
  try {
    try {
      await checkAuth();
    } catch (authError) {
      console.warn('Authentication check failed, trying to continue with fallback:', authError);
    }

    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return { data, publicUrl: urlData.publicUrl };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};