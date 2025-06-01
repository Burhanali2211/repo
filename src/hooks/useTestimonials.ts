import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating: number;
  featured: boolean;
  order_index: number;
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      console.log('Fetching testimonials...');
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true });

      console.log('Testimonials data:', data, fetchError);

      if (fetchError) {
        console.error('Error fetching testimonials:', fetchError);
        setError(fetchError.message);
        return;
      }

      const mappedTestimonials = (data || []).map(testimonial => {
        // Add null check and default values for all properties
        if (!testimonial) {
          console.warn('Received null or undefined testimonial from database');
          return null;
        }

        return {
          id: testimonial.id || '',
          name: testimonial.name || 'Unknown Author',
          role: testimonial.role || '',
          company: testimonial.company || '',
          content: testimonial.content || '',
          avatar: testimonial.avatar || null,
          rating: testimonial.rating || 5,
          featured: !!testimonial.featured,
          order_index: testimonial.order_index || 0
        };
      }).filter(Boolean);

      setTestimonials(mappedTestimonials);
    } catch (error) {
      console.error('Exception in fetchTestimonials:', error);
      setError('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const createTestimonial = async (testimonialData: Omit<Testimonial, 'id'>) => {
    try {
      console.log('Creating testimonial:', testimonialData);
      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonialData])
        .select()
        .single();

      if (error) {
        console.error('Error creating testimonial:', error);
        throw error;
      }

      console.log('Testimonial created:', data);
      await fetchTestimonials();
      return data;
    } catch (error) {
      console.error('Exception in createTestimonial:', error);
      throw error;
    }
  };

  const updateTestimonial = async (id: string, testimonialData: Partial<Testimonial>) => {
    try {
      console.log('Updating testimonial:', id, testimonialData);
      const { data, error } = await supabase
        .from('testimonials')
        .update(testimonialData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating testimonial:', error);
        throw error;
      }

      console.log('Testimonial updated:', data);
      await fetchTestimonials();
      return data;
    } catch (error) {
      console.error('Exception in updateTestimonial:', error);
      throw error;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      console.log('Deleting testimonial:', id);
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting testimonial:', error);
        throw error;
      }

      console.log('Testimonial deleted:', id);
      await fetchTestimonials();
    } catch (error) {
      console.error('Exception in deleteTestimonial:', error);
      throw error;
    }
  };

  return {
    testimonials,
    loading,
    error,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refetch: fetchTestimonials
  };
};
