import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { encryptApiKey, decryptApiKey, validateApiKey } from '@/services/ai/encryption';
import type { AISettings } from '@/services/ai/types';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type AISettingsRow = Tables<'ai_settings'>;
export type AISettingsInsert = TablesInsert<'ai_settings'>;
export type AISettingsUpdate = TablesUpdate<'ai_settings'>;

interface UseAISettingsReturn {
  settings: AISettings | null;
  loading: boolean;
  error: Error | null;
  fetchSettings: () => Promise<void>;
  updateSettings: (data: Partial<AISettings>) => Promise<{ success: boolean; error: Error | null }>;
  resetSettings: () => Promise<{ success: boolean; error: Error | null }>;
  testConnection: (provider: string, apiKey: string, model?: string) => Promise<{ success: boolean; error: Error | null }>;
}

export const useAISettings = (): UseAISettingsReturn => {
  const [settings, setSettings] = useState<AISettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.id) {
        setSettings(null);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('ai_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw new Error(fetchError.message);
      }

      if (!data) {
        // Create default settings if none exist
        const defaultSettings = await createDefaultSettings();
        setSettings(defaultSettings);
      } else {
        // Transform database row to AISettings
        const aiSettings: AISettings = {
          ...data,
          ai_features_enabled: data.ai_features_enabled as Record<string, boolean> | null
        };
        setSettings(aiSettings);
      }
    } catch (err) {
      console.error('Error fetching AI settings:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch AI settings'));
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const createDefaultSettings = async (): Promise<AISettings> => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const defaultSettings: AISettingsInsert = {
        user_id: user.id,
        ai_enabled: false,
        ai_provider: 'openai',
        ai_model: 'gpt-3.5-turbo',
        ai_api_key_encrypted: null,
        ai_features_enabled: {
          analytics: true,
          recommendations: true,
          queries: true,
          alerts: true,
          visualization: true
        },
        ai_analytics_enabled: true,
        ai_recommendations_enabled: true,
        ai_queries_enabled: true,
        ai_alerts_enabled: true,
        ai_visualization_enabled: true
      };

      const { data, error: insertError } = await supabase
        .from('ai_settings')
        .insert(defaultSettings)
        .select()
        .single();

      if (insertError) {
        throw new Error(insertError.message);
      }

      return {
        ...data,
        ai_features_enabled: data.ai_features_enabled as Record<string, boolean> | null
      };
    } catch (err) {
      console.error('Error creating default AI settings:', err);
      throw err;
    }
  };

  const updateSettings = useCallback(async (updates: Partial<AISettings>) => {
    try {
      setLoading(true);
      setError(null);

      if (!settings?.id) {
        throw new Error('No AI settings found to update');
      }

      // Handle API key encryption if provided
      const updateData: AISettingsUpdate = { ...updates };
      
      if ('ai_api_key_encrypted' in updates && updates.ai_api_key_encrypted) {
        // If it's a plain text key, encrypt it
        if (!updates.ai_api_key_encrypted.includes('=')) { // Simple check if already encrypted
          updateData.ai_api_key_encrypted = encryptApiKey(updates.ai_api_key_encrypted);
        }
      }

      // Validate API key if provider or key changed
      if (updateData.ai_provider && updateData.ai_api_key_encrypted) {
        const plainKey = decryptApiKey(updateData.ai_api_key_encrypted);
        const validation = validateApiKey(plainKey, updateData.ai_provider);
        if (!validation.valid) {
          throw new Error(validation.message);
        }
      }

      const { data: updatedData, error: updateError } = await supabase
        .from('ai_settings')
        .update(updateData)
        .eq('id', settings.id)
        .select()
        .single();

      if (updateError) {
        throw new Error(updateError.message);
      }

      const updatedSettings: AISettings = {
        ...updatedData,
        ai_features_enabled: updatedData.ai_features_enabled as Record<string, boolean> | null
      };

      setSettings(updatedSettings);
      return { success: true, error: null };
    } catch (err) {
      console.error('Error updating AI settings:', err);
      const error = err instanceof Error ? err : new Error('Failed to update AI settings');
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [settings]);

  const resetSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!settings?.id || !user?.id) {
        throw new Error('No AI settings found to reset');
      }

      const defaultSettings: AISettingsUpdate = {
        ai_enabled: false,
        ai_provider: 'openai',
        ai_model: 'gpt-3.5-turbo',
        ai_api_key_encrypted: null,
        ai_features_enabled: {
          analytics: true,
          recommendations: true,
          queries: true,
          alerts: true,
          visualization: true
        },
        ai_analytics_enabled: true,
        ai_recommendations_enabled: true,
        ai_queries_enabled: true,
        ai_alerts_enabled: true,
        ai_visualization_enabled: true
      };

      const { data: resetData, error: resetError } = await supabase
        .from('ai_settings')
        .update(defaultSettings)
        .eq('id', settings.id)
        .select()
        .single();

      if (resetError) {
        throw new Error(resetError.message);
      }

      const resetSettings: AISettings = {
        ...resetData,
        ai_features_enabled: resetData.ai_features_enabled as Record<string, boolean> | null
      };

      setSettings(resetSettings);
      return { success: true, error: null };
    } catch (err) {
      console.error('Error resetting AI settings:', err);
      const error = err instanceof Error ? err : new Error('Failed to reset AI settings');
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [settings, user?.id]);

  const testConnection = useCallback(async (provider: string, apiKey: string, model?: string) => {
    try {
      // Validate API key format first
      const validation = validateApiKey(apiKey, provider);
      if (!validation.valid) {
        throw new Error(validation.message);
      }

      // Here you would implement actual API testing
      // For now, we'll simulate a test
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success for valid-looking keys
      return { success: true, error: null };
    } catch (err) {
      console.error('Error testing AI connection:', err);
      const error = err instanceof Error ? err : new Error('Failed to test AI connection');
      return { success: false, error };
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchSettings();
    }
  }, [fetchSettings, user?.id]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    resetSettings,
    testConnection
  };
};
