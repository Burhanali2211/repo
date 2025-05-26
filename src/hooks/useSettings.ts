import * as React from 'react';
const { useState, useEffect, useCallback } = React;
import { supabase } from '../integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '../integrations/supabase/types';

export type SiteSettings = Tables<'site_settings'>;
export type SiteSettingsInsert = TablesInsert<'site_settings'>;
export type SiteSettingsUpdate = TablesUpdate<'site_settings'>;

interface UseSettingsReturn {
  settings: SiteSettings | null;
  loading: boolean;
  error: Error | null;
  fetchSettings: () => Promise<void>;
  updateSettings: (data: SiteSettingsUpdate) => Promise<{ success: boolean; error: Error | null }>;
  resetSettings: () => Promise<{ success: boolean; error: Error | null }>;
}

export const useSettings = (): UseSettingsReturn => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // Only throw for errors other than 'no rows returned'
        throw new Error(fetchError.message);
      }

      if (data) {
        setSettings(data);
        return data;
      } else {
        console.log('No settings found, will try to create default settings');
        // Try to initialize settings if none exist
        return await createDefaultSettings();
      }
    } catch (err) {
      console.error('Error fetching site settings:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred while fetching settings'));
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper function to create default settings if none exist
  const createDefaultSettings = async () => {
    try {
      const defaultSettings = {
        site_name: 'Easyio Technologies',
        site_logo: '/logo.svg',
        primary_color: '#2563EB',
        secondary_color: '#4F46E5',
        contact_email: 'contact@example.com',
        meta_title: 'Easyio Technologies - Digital Identity Solutions',
        meta_description: 'Providing cutting-edge digital identity solutions for modern businesses',
        footer_text: '© 2023-2024 Easyio Technologies. All rights reserved.',
        social_links: {},
        is_maintenance_mode: false
      };

      const { data, error: insertError } = await supabase
        .from('site_settings')
        .insert(defaultSettings)
        .select()
        .single();

      if (insertError) {
        console.error('Error creating default settings:', insertError);
        throw new Error(insertError.message);
      }

      setSettings(data);
      return data;
    } catch (err) {
      console.error('Error creating default settings:', err);
      throw err;
    }
  };

  const updateSettings = useCallback(async (data: SiteSettingsUpdate) => {
    try {
      setLoading(true);
      setError(null);

      // If settings don't exist yet, create them
      if (!settings?.id) {
        console.log('No existing settings found, creating new...');
        try {
          const newSettings = await createDefaultSettings();
          // Now update with the provided data
          return await updateSettings(data);
        } catch (err) {
          throw new Error('Failed to create initial settings: ' + (err instanceof Error ? err.message : String(err)));
        }
      }

      // Format social_links if it's provided as an object
      let formattedData = {...data};
      
      // Make sure social_links is in the right format for JSONB
      if (formattedData.social_links && typeof formattedData.social_links === 'object') {
        formattedData.social_links = formattedData.social_links;
      }

      console.log('Updating settings with ID:', settings.id, formattedData);
      
      const { data: updatedData, error: updateError } = await supabase
        .from('site_settings')
        .update(formattedData)
        .eq('id', settings.id)
        .select()
        .single();

      if (updateError) {
        console.error('Supabase update error:', updateError);
        throw new Error(updateError.message);
      }

      console.log('Settings updated successfully:', updatedData);
      setSettings(updatedData);
      return { success: true, error: null };
    } catch (err) {
      console.error('Error updating site settings:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred while updating settings'));
      return { success: false, error: err instanceof Error ? err : new Error('Failed to update settings') };
    } finally {
      setLoading(false);
    }
  }, [settings]);

  const resetSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const defaultSettings: SiteSettingsUpdate = {
        site_name: 'Easyio Technologies',
        site_logo: '/logo.svg',
        primary_color: '#2563EB',
        secondary_color: '#4F46E5',
        contact_email: 'contact@example.com',
        meta_title: 'Easyio Technologies - Digital Identity Solutions',
        meta_description: 'Providing cutting-edge digital identity solutions for modern businesses',
        footer_text: '© 2023-2024 Easyio Technologies. All rights reserved.',
        is_maintenance_mode: false
      };

      if (!settings?.id) {
        throw new Error('No settings found to reset');
      }

      const { data: resetData, error: resetError } = await supabase
        .from('site_settings')
        .update(defaultSettings)
        .eq('id', settings.id)
        .select()
        .single();

      if (resetError) {
        throw new Error(resetError.message);
      }

      setSettings(resetData);
      return { success: true, error: null };
    } catch (err) {
      console.error('Error resetting site settings:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred while resetting settings'));
      return { success: false, error: err instanceof Error ? err : new Error('Failed to reset settings') };
    } finally {
      setLoading(false);
    }
  }, [settings]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    resetSettings
  };
};
