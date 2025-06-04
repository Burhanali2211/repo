import { supabase } from '../integrations/supabase/client';

/**
 * This utility function creates and initializes the ai_settings table
 * in the Supabase database.
 */
export const setupAISettings = async () => {
  try {
    console.log('Setting up ai_settings table...');

    // Check if the ai_settings table exists first
    const { data: existingTable, error: checkError } = await supabase
      .from('ai_settings')
      .select('id')
      .limit(1);

    if (!checkError && existingTable && existingTable.length > 0) {
      console.log('AI settings table already exists and has data.');
      return { success: true, message: 'Table already exists' };
    }

    // If table doesn't exist or is empty, we need to create it
    // Note: In a real application, you would run this SQL in your Supabase dashboard
    // or through a migration script. This is just for demonstration.
    
    console.log('AI settings table needs to be created. Please run the following SQL in your Supabase dashboard:');
    console.log(`
      CREATE TABLE IF NOT EXISTS ai_settings (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        ai_enabled BOOLEAN DEFAULT false NOT NULL,
        ai_provider TEXT DEFAULT 'openai' NOT NULL,
        ai_model TEXT,
        ai_api_key_encrypted TEXT,
        ai_features_enabled JSONB DEFAULT '{}',
        ai_analytics_enabled BOOLEAN DEFAULT true NOT NULL,
        ai_recommendations_enabled BOOLEAN DEFAULT true NOT NULL,
        ai_queries_enabled BOOLEAN DEFAULT true NOT NULL,
        ai_alerts_enabled BOOLEAN DEFAULT true NOT NULL,
        ai_visualization_enabled BOOLEAN DEFAULT true NOT NULL,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
      );

      -- Create RLS policies
      ALTER TABLE ai_settings ENABLE ROW LEVEL SECURITY;

      CREATE POLICY "Users can view their own AI settings" ON ai_settings
        FOR SELECT USING (auth.uid() = user_id);

      CREATE POLICY "Users can insert their own AI settings" ON ai_settings
        FOR INSERT WITH CHECK (auth.uid() = user_id);

      CREATE POLICY "Users can update their own AI settings" ON ai_settings
        FOR UPDATE USING (auth.uid() = user_id);

      CREATE POLICY "Users can delete their own AI settings" ON ai_settings
        FOR DELETE USING (auth.uid() = user_id);

      -- Create updated_at trigger
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = timezone('utc'::text, now());
        RETURN NEW;
      END;
      $$ language 'plpgsql';

      CREATE TRIGGER update_ai_settings_updated_at
        BEFORE UPDATE ON ai_settings
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    return { 
      success: false, 
      message: 'Please create the ai_settings table using the SQL above in your Supabase dashboard' 
    };

  } catch (error) {
    console.error('Error setting up AI settings:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Check if AI settings table exists and is properly configured
 */
export const checkAISettingsTable = async () => {
  try {
    const { data, error } = await supabase
      .from('ai_settings')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === '42P01') {
        // Table doesn't exist
        return { exists: false, error: 'Table does not exist' };
      }
      return { exists: false, error: error.message };
    }

    return { exists: true, error: null };
  } catch (error) {
    return { 
      exists: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

/**
 * Create default AI settings for a user
 */
export const createDefaultAISettings = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('ai_settings')
      .insert({
        user_id: userId,
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
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data, error: null };
  } catch (error) {
    console.error('Error creating default AI settings:', error);
    return { 
      success: false, 
      data: null, 
      error: error instanceof Error ? error : new Error('Unknown error') 
    };
  }
};

// Execute the function if this file is run directly
if (typeof window !== 'undefined' && window.location.pathname.includes('setup-ai-settings')) {
  setupAISettings().then(result => {
    console.log('AI Setup result:', result);
  });
}
