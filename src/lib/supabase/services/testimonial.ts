import { supabase } from '../client';
import type { PostgrestError } from '@supabase/supabase-js';

// Testimonial type definition
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
};

// Type for creating a new testimonial
export type CreateTestimonialDTO = Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>;

// Response type
export type TestimonialResponse = {
  data: Testimonial[] | Testimonial | null;
  error: PostgrestError | null;
};

// Constants
const TABLE_NAME = 'testimonials';

/**
 * Fetch all testimonials from Supabase
 */
export const getAllTestimonials = async (): Promise<TestimonialResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
};

/**
 * Fetch a single testimonial by ID
 */
export const getTestimonialById = async (id: string): Promise<TestimonialResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
};

/**
 * Get featured testimonials
 */
export const getFeaturedTestimonials = async (): Promise<TestimonialResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  return { data, error };
};

/**
 * Create a new testimonial
 */
export const createTestimonial = async (testimonial: CreateTestimonialDTO): Promise<TestimonialResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(testimonial)
    .select()
    .single();

  return { data, error };
};

/**
 * Update an existing testimonial
 */
export const updateTestimonial = async (id: string, testimonial: Partial<CreateTestimonialDTO>): Promise<TestimonialResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(testimonial)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};

/**
 * Delete a testimonial
 */
export const deleteTestimonial = async (id: string): Promise<TestimonialResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};
