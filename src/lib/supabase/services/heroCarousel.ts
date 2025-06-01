import { supabase } from '@/integrations/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

// Hero Carousel Item type definition
export interface HeroCarouselItem {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  icon_name: string | null;
  gradient_from: string;
  gradient_to: string;
  link_url: string | null;
  link_text: string;
  is_active: boolean;
  order_index: number;
}

// Response type for API calls
export interface HeroCarouselResponse {
  data: HeroCarouselItem[] | null;
  error: PostgrestError | null;
}

export interface HeroCarouselItemResponse {
  data: HeroCarouselItem | null;
  error: PostgrestError | null;
}

// Constants
const TABLE_NAME = 'hero_carousel_items';

/**
 * Fetch all active hero carousel items from Supabase
 */
export const getAllHeroCarouselItems = async (): Promise<HeroCarouselResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  return { data, error };
};

/**
 * Fetch all hero carousel items (including inactive) from Supabase
 * For admin dashboard use
 */
export const getAllHeroCarouselItemsAdmin = async (): Promise<HeroCarouselResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('order_index', { ascending: true });

  return { data, error };
};

/**
 * Get a single hero carousel item by ID
 */
export const getHeroCarouselItemById = async (id: string): Promise<HeroCarouselItemResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
};

/**
 * Create a new hero carousel item
 */
export const createHeroCarouselItem = async (
  item: Omit<HeroCarouselItem, 'id' | 'created_at' | 'updated_at'>
): Promise<HeroCarouselItemResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([item])
    .select()
    .single();

  return { data, error };
};

/**
 * Update an existing hero carousel item
 */
export const updateHeroCarouselItem = async (
  id: string,
  updates: Partial<Omit<HeroCarouselItem, 'id' | 'created_at' | 'updated_at'>>
): Promise<HeroCarouselItemResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};

/**
 * Delete a hero carousel item
 */
export const deleteHeroCarouselItem = async (id: string): Promise<HeroCarouselItemResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};

/**
 * Toggle the active status of a hero carousel item
 */
export const toggleHeroCarouselItemStatus = async (
  id: string,
  isActive: boolean
): Promise<HeroCarouselItemResponse> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ is_active: isActive })
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};

/**
 * Reorder hero carousel items
 */
export const reorderHeroCarouselItems = async (
  items: Array<{ id: string; order_index: number }>
): Promise<{ success: boolean; error?: PostgrestError }> => {
  try {
    // Update each item's order_index
    const updates = items.map(item =>
      supabase
        .from(TABLE_NAME)
        .update({ order_index: item.order_index })
        .eq('id', item.id)
    );

    // Execute all updates
    const results = await Promise.all(updates);

    // Check if any updates failed
    const hasError = results.some(result => result.error);
    if (hasError) {
      const firstError = results.find(result => result.error)?.error;
      return { success: false, error: firstError };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error as PostgrestError
    };
  }
};

/**
 * Get the next available order index for new items
 */
export const getNextOrderIndex = async (): Promise<number> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('order_index')
    .order('order_index', { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    return 1; // Start with 1 if no items exist
  }

  return (data[0].order_index || 0) + 1;
};

/**
 * Bulk update hero carousel items
 */
export const bulkUpdateHeroCarouselItems = async (
  updates: Array<{ id: string; updates: Partial<Omit<HeroCarouselItem, 'id' | 'created_at' | 'updated_at'>> }>
): Promise<{ success: boolean; error?: PostgrestError }> => {
  try {
    const updatePromises = updates.map(({ id, updates: itemUpdates }) =>
      supabase
        .from(TABLE_NAME)
        .update(itemUpdates)
        .eq('id', id)
    );

    const results = await Promise.all(updatePromises);

    // Check if any updates failed
    const hasError = results.some(result => result.error);
    if (hasError) {
      const firstError = results.find(result => result.error)?.error;
      return { success: false, error: firstError };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error as PostgrestError
    };
  }
};

// No default hero carousel items - load from database only
