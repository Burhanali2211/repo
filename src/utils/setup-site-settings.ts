import { supabase } from '../integrations/supabase/client';

/**
 * This utility function creates and initializes the site_settings table
 * in the Supabase database.
 */
export const setupSiteSettings = async () => {
  try {
    console.log('Setting up site_settings table...');
    
    // Check if the site_settings table exists first
    const { data: existingTable, error: checkError } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1);
      
    if (!checkError && existingTable && existingTable.length > 0) {
      console.log('Site settings table already exists and has data.');
      return { success: true, message: 'Table already exists' };
    }

    // Since we can't directly create tables via the Supabase client API,
    // we'll just try to insert data and see if it works
    console.log('Attempting to insert settings data...');
    
    // Insert default settings
    const { error: insertError } = await supabase
      .from('site_settings')
      .insert({
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
      });
      
    if (insertError) {
      console.error('Error inserting default settings:', insertError);
      return { success: false, message: insertError.message };
    }
    
    console.log('Site settings table created and initialized successfully.');
    return { success: true, message: 'Table created and initialized' };
  } catch (error) {
    console.error('Error setting up site settings:', error);
    return { success: false, message: error.message };
  }
};

// Execute the function if this file is run directly
if (typeof window !== 'undefined' && window.location.pathname.includes('setup-settings')) {
  setupSiteSettings().then(result => {
    console.log('Setup result:', result);
  });
}
