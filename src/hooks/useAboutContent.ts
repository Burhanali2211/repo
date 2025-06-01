import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export interface AboutContentData {
  icon?: string;
  color?: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export interface AboutContent {
  id: string;
  section_type: string;
  title: string;
  description?: string;
  year?: string;
  content_data: AboutContentData | null;
  order_index: number;
  is_active: boolean;
}

// Use Supabase generated types
type AboutContentInsert = Database['public']['Tables']['about_content']['Insert'];
type AboutContentUpdate = Database['public']['Tables']['about_content']['Update'];

export const useAboutContent = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAboutContent = async () => {
    try {
      console.log('Fetching about content...');
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('about_content')
        .select('*')
        .order('order_index', { ascending: true });

      console.log('About content data:', data, fetchError);

      if (fetchError) {
        console.error('Error fetching about content:', fetchError);
        setError(fetchError.message);
        return;
      }

      const mappedContent = (data || []).map(content => ({
        id: content.id,
        section_type: content.section_type,
        title: content.title,
        description: content.description,
        year: content.year,
        content_data: content.content_data,
        order_index: content.order_index,
        is_active: content.is_active
      }));

      setAboutContent(mappedContent);
    } catch (error) {
      console.error('Exception in fetchAboutContent:', error);
      setError('Failed to fetch about content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const createAboutContent = async (contentData: Omit<AboutContent, 'id'>) => {
    try {
      console.log('Creating about content:', contentData);

      // Convert to database-compatible format
      const dbData: AboutContentInsert = {
        section_type: contentData.section_type,
        title: contentData.title,
        description: contentData.description,
        year: contentData.year,
        content_data: contentData.content_data as Database['public']['Tables']['about_content']['Insert']['content_data'],
        order_index: contentData.order_index,
        is_active: contentData.is_active
      };

      const { data, error } = await supabase
        .from('about_content')
        .insert([dbData])
        .select()
        .single();

      if (error) {
        console.error('Error creating about content:', error);
        throw error;
      }

      console.log('About content created:', data);
      await fetchAboutContent();
      return data;
    } catch (error) {
      console.error('Exception in createAboutContent:', error);
      throw error;
    }
  };

  const updateAboutContent = async (id: string, contentData: Partial<AboutContent>) => {
    try {
      console.log('Updating about content:', id, contentData);

      // Convert to database-compatible format
      const dbData: AboutContentUpdate = {
        section_type: contentData.section_type,
        title: contentData.title,
        description: contentData.description,
        year: contentData.year,
        content_data: contentData.content_data as Database['public']['Tables']['about_content']['Update']['content_data'],
        order_index: contentData.order_index,
        is_active: contentData.is_active
      };

      const { data, error } = await supabase
        .from('about_content')
        .update(dbData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating about content:', error);
        throw error;
      }

      console.log('About content updated:', data);
      await fetchAboutContent();
      return data;
    } catch (error) {
      console.error('Exception in updateAboutContent:', error);
      throw error;
    }
  };

  const deleteAboutContent = async (id: string) => {
    try {
      console.log('Deleting about content:', id);
      const { error } = await supabase
        .from('about_content')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting about content:', error);
        throw error;
      }

      console.log('About content deleted:', id);
      await fetchAboutContent();
    } catch (error) {
      console.error('Exception in deleteAboutContent:', error);
      throw error;
    }
  };

  return {
    aboutContent,
    loading,
    error,
    createAboutContent,
    updateAboutContent,
    deleteAboutContent,
    refetch: fetchAboutContent
  };
};
