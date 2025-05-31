import * as React from 'react';
const { useState, useEffect, useCallback } = React;
import { supabase } from '../integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '../integrations/supabase/types';

// Business hours type definition
export interface BusinessHours {
  monday: { open: string; close: string; closed: boolean };
  tuesday: { open: string; close: string; closed: boolean };
  wednesday: { open: string; close: string; closed: boolean };
  thursday: { open: string; close: string; closed: boolean };
  friday: { open: string; close: string; closed: boolean };
  saturday: { open: string; close: string; closed: boolean };
  sunday: { open: string; close: string; closed: boolean };
}

// Extended site settings type with additional fields
export interface ExtendedSiteSettings extends Tables<'site_settings'> {
  site_tagline?: string;
  site_description?: string;
  site_logo_light?: string;
  site_logo_dark?: string;
  accent_color?: string;
  background_color?: string;
  background_color_dark?: string;
  text_color?: string;
  text_color_dark?: string;
  border_color?: string;
  border_color_dark?: string;
  font_family?: string;
  font_size?: string;
  line_height?: string;
  font_weight?: string;
  contact_phone_secondary?: string;
  address?: string;
  business_hours?: BusinessHours;
  meta_keywords?: string;
  google_analytics_id?: string;
  google_tag_manager_id?: string;
  facebook_pixel_id?: string;
  custom_css?: string;
}

export type SiteSettings = ExtendedSiteSettings;
export type SiteSettingsInsert = TablesInsert<'site_settings'> & Partial<ExtendedSiteSettings>;
export type SiteSettingsUpdate = TablesUpdate<'site_settings'> & Partial<ExtendedSiteSettings>;

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
        // Validate and sanitize the data before setting
        const sanitizedData = {
          ...data,
          // Ensure script fields are strings or null
          header_scripts: typeof data.header_scripts === 'string' ? data.header_scripts : null,
          footer_scripts: typeof data.footer_scripts === 'string' ? data.footer_scripts : null,
        };
        setSettings(sanitizedData);
        return sanitizedData;
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
        site_name: 'EasyIo.tech',
        site_tagline: 'Simplifying Technology',
        site_description: 'Founded in 2023, EasyIo.tech simplifies technology to make it more accessible, sustainable, and meaningful. From IoT to Digital transformation, we\'re your creative tech partner.',
        site_logo: '/logo.svg',
        site_logo_light: '',
        site_logo_dark: '',
        primary_color: '#2563EB',
        secondary_color: '#4F46E5',
        accent_color: '#10B981',
        background_color: '#FFFFFF',
        background_color_dark: '#1F2937',
        text_color: '#1F2937',
        text_color_dark: '#F9FAFB',
        border_color: '#E5E7EB',
        border_color_dark: '#374151',
        font_family: 'Inter',
        font_size: '16',
        line_height: '1.6',
        font_weight: '400',
        contact_email: 'hello@easyio.tech',
        contact_phone: '+1 (555) 123-4567',
        contact_phone_secondary: '',
        address: '123 Tech Street, Innovation City, IC 12345',
        business_hours: {
          monday: { open: '09:00', close: '17:00', closed: false },
          tuesday: { open: '09:00', close: '17:00', closed: false },
          wednesday: { open: '09:00', close: '17:00', closed: false },
          thursday: { open: '09:00', close: '17:00', closed: false },
          friday: { open: '09:00', close: '17:00', closed: false },
          saturday: { open: '10:00', close: '14:00', closed: false },
          sunday: { open: '10:00', close: '14:00', closed: true }
        },
        meta_title: 'EasyIo.tech - Simplifying Technology',
        meta_description: 'Founded in 2023, EasyIo.tech simplifies technology to make it more accessible, sustainable, and meaningful. From IoT to Digital transformation, we\'re your creative tech partner.',
        meta_keywords: 'technology, IoT, digital transformation, sustainable tech, business solutions',
        google_analytics_id: '',
        google_tag_manager_id: '',
        facebook_pixel_id: '',
        custom_css: '',
        footer_text: '© 2024 EasyIo.tech. All rights reserved.',
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

      // Format and sanitize the data
      const formattedData = { ...data };

      // Make sure social_links is in the right format for JSONB
      if (formattedData.social_links && typeof formattedData.social_links === 'object') {
        // social_links is already an object, no need to reassign
      }

      // Sanitize script fields to prevent injection issues
      if (formattedData.header_scripts !== undefined) {
        formattedData.header_scripts = typeof formattedData.header_scripts === 'string'
          ? formattedData.header_scripts.trim() || null
          : null;
      }
      if (formattedData.footer_scripts !== undefined) {
        formattedData.footer_scripts = typeof formattedData.footer_scripts === 'string'
          ? formattedData.footer_scripts.trim() || null
          : null;
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

      // Sanitize the returned data as well
      const sanitizedUpdatedData = {
        ...updatedData,
        header_scripts: typeof updatedData.header_scripts === 'string' ? updatedData.header_scripts : null,
        footer_scripts: typeof updatedData.footer_scripts === 'string' ? updatedData.footer_scripts : null,
      };

      console.log('Settings updated successfully:', sanitizedUpdatedData);
      setSettings(sanitizedUpdatedData);
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
        site_name: 'EasyIo.tech',
        site_tagline: 'Simplifying Technology',
        site_description: 'Founded in 2023, EasyIo.tech simplifies technology to make it more accessible, sustainable, and meaningful. From IoT to Digital transformation, we\'re your creative tech partner.',
        site_logo: '/logo.svg',
        site_logo_light: '',
        site_logo_dark: '',
        primary_color: '#2563EB',
        secondary_color: '#4F46E5',
        accent_color: '#10B981',
        background_color: '#FFFFFF',
        background_color_dark: '#1F2937',
        text_color: '#1F2937',
        text_color_dark: '#F9FAFB',
        border_color: '#E5E7EB',
        border_color_dark: '#374151',
        font_family: 'Inter',
        font_size: '16',
        line_height: '1.6',
        font_weight: '400',
        contact_email: 'hello@easyio.tech',
        contact_phone: '+1 (555) 123-4567',
        contact_phone_secondary: '',
        address: '123 Tech Street, Innovation City, IC 12345',
        business_hours: {
          monday: { open: '09:00', close: '17:00', closed: false },
          tuesday: { open: '09:00', close: '17:00', closed: false },
          wednesday: { open: '09:00', close: '17:00', closed: false },
          thursday: { open: '09:00', close: '17:00', closed: false },
          friday: { open: '09:00', close: '17:00', closed: false },
          saturday: { open: '10:00', close: '14:00', closed: false },
          sunday: { open: '10:00', close: '14:00', closed: true }
        },
        meta_title: 'EasyIo.tech - Simplifying Technology',
        meta_description: 'Founded in 2023, EasyIo.tech simplifies technology to make it more accessible, sustainable, and meaningful. From IoT to Digital transformation, we\'re your creative tech partner.',
        meta_keywords: 'technology, IoT, digital transformation, sustainable tech, business solutions',
        google_analytics_id: '',
        google_tag_manager_id: '',
        facebook_pixel_id: '',
        custom_css: '',
        footer_text: '© 2024 EasyIo.tech. All rights reserved.',
        social_links: {},
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
