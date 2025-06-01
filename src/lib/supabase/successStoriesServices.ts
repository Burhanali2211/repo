import { supabase } from '@/integrations/supabase/client';

export interface SuccessStory {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  client_name: string;
  client_role?: string;
  client_company?: string;
  story_content: string;
  client_image?: string;
  project_image?: string;
  results_achieved?: string;
  metrics?: Record<string, unknown>; // JSONB for storing key metrics
  project_duration?: string;
  technologies_used?: string[];
  is_featured: boolean;
  is_active: boolean;
  order_index: number;
  category?: string;
}

export interface CreateSuccessStoryData {
  title: string;
  client_name: string;
  client_role?: string;
  client_company?: string;
  story_content: string;
  client_image?: string;
  project_image?: string;
  results_achieved?: string;
  metrics?: Record<string, unknown>;
  project_duration?: string;
  technologies_used?: string[];
  is_featured?: boolean;
  is_active?: boolean;
  order_index?: number;
  category?: string;
}

/**
 * Get all success stories (public - only active and featured)
 */
export const getSuccessStories = async (limit?: number): Promise<SuccessStory[]> => {
  try {
    let query = supabase
      .from('success_stories')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching success stories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getSuccessStories:', error);
    return [];
  }
};

/**
 * Get featured success stories
 */
export const getFeaturedSuccessStories = async (limit: number = 3): Promise<SuccessStory[]> => {
  try {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('order_index', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured success stories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getFeaturedSuccessStories:', error);
    return [];
  }
};

/**
 * Get all success stories for admin (including inactive)
 */
export const getAllSuccessStoriesAdmin = async (): Promise<SuccessStory[]> => {
  try {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching success stories for admin:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllSuccessStoriesAdmin:', error);
    return [];
  }
};

/**
 * Get success stories by category
 */
export const getSuccessStoriesByCategory = async (category: string): Promise<SuccessStory[]> => {
  try {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('is_active', true)
      .eq('category', category)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching success stories by category:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getSuccessStoriesByCategory:', error);
    return [];
  }
};

/**
 * Create a new success story
 */
export const createSuccessStory = async (data: CreateSuccessStoryData): Promise<SuccessStory | null> => {
  try {
    const { data: story, error } = await supabase
      .from('success_stories')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error creating success story:', error);
      return null;
    }

    return story;
  } catch (error) {
    console.error('Error in createSuccessStory:', error);
    return null;
  }
};

/**
 * Update a success story
 */
export const updateSuccessStory = async (id: string, data: Partial<CreateSuccessStoryData>): Promise<SuccessStory | null> => {
  try {
    const { data: story, error } = await supabase
      .from('success_stories')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating success story:', error);
      return null;
    }

    return story;
  } catch (error) {
    console.error('Error in updateSuccessStory:', error);
    return null;
  }
};

/**
 * Delete a success story
 */
export const deleteSuccessStory = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('success_stories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting success story:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteSuccessStory:', error);
    return false;
  }
};

/**
 * Toggle success story featured status
 */
export const toggleSuccessStoryFeatured = async (id: string, isFeatured: boolean): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('success_stories')
      .update({ is_featured: isFeatured })
      .eq('id', id);

    if (error) {
      console.error('Error toggling success story featured status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in toggleSuccessStoryFeatured:', error);
    return false;
  }
};

/**
 * Toggle success story active status
 */
export const toggleSuccessStoryStatus = async (id: string, isActive: boolean): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('success_stories')
      .update({ is_active: isActive })
      .eq('id', id);

    if (error) {
      console.error('Error toggling success story status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in toggleSuccessStoryStatus:', error);
    return false;
  }
};

/**
 * Reorder success stories
 */
export const reorderSuccessStories = async (storyIds: string[]): Promise<boolean> => {
  try {
    const updates = storyIds.map((id, index) => ({
      id,
      order_index: index + 1
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from('success_stories')
        .update({ order_index: update.order_index })
        .eq('id', update.id);

      if (error) {
        console.error('Error reordering success story:', error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in reorderSuccessStories:', error);
    return false;
  }
};

/**
 * Subscribe to success stories changes
 */
export const subscribeToSuccessStories = (callback: (payload: unknown) => void) => {
  return supabase
    .channel('success_stories_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'success_stories'
      },
      callback
    )
    .subscribe();
};

/**
 * Get success story by ID
 */
export const getSuccessStoryById = async (id: string): Promise<SuccessStory | null> => {
  try {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching success story by ID:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getSuccessStoryById:', error);
    return null;
  }
};

/**
 * Get success story statistics
 */
export const getSuccessStoryStats = async () => {
  try {
    const { data, error } = await supabase
      .from('success_stories')
      .select('is_active, is_featured, category');

    if (error) {
      console.error('Error fetching success story stats:', error);
      return {
        total: 0,
        active: 0,
        featured: 0,
        categories: {}
      };
    }

    const stats = {
      total: data.length,
      active: data.filter(story => story.is_active).length,
      featured: data.filter(story => story.is_featured).length,
      categories: data.reduce((acc: Record<string, number>, story) => {
        if (story.category) {
          acc[story.category] = (acc[story.category] || 0) + 1;
        }
        return acc;
      }, {})
    };

    return stats;
  } catch (error) {
    console.error('Error in getSuccessStoryStats:', error);
    return {
      total: 0,
      active: 0,
      featured: 0,
      categories: {}
    };
  }
};
