import { supabase } from '../integrations/supabase/client';

/**
 * Utility to clean up malformed script content in the database
 * This helps resolve syntax errors caused by HTML content in script fields
 */
export const cleanupScriptContent = async () => {
  try {
    console.log('Checking for malformed script content...');

    // Get current settings
    const { data: settings, error: fetchError } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching settings:', fetchError);
      return { success: false, message: fetchError.message };
    }

    if (!settings) {
      console.log('No settings found');
      return { success: true, message: 'No settings to clean' };
    }

    let needsUpdate = false;
    const updates: Record<string, unknown> = {};

    // Check header_scripts
    if (settings.header_scripts) {
      const hasHtmlTags = /<[^>]+>/g.test(settings.header_scripts);
      if (hasHtmlTags) {
        console.log('Found HTML content in header_scripts, clearing...');
        updates.header_scripts = null;
        needsUpdate = true;
      } else {
        // Try to validate as JavaScript
        try {
          new Function(settings.header_scripts);
          console.log('header_scripts is valid JavaScript');
        } catch (error) {
          console.log('header_scripts contains invalid JavaScript, clearing...');
          updates.header_scripts = null;
          needsUpdate = true;
        }
      }
    }

    // Check footer_scripts
    if (settings.footer_scripts) {
      const hasHtmlTags = /<[^>]+>/g.test(settings.footer_scripts);
      if (hasHtmlTags) {
        console.log('Found HTML content in footer_scripts, clearing...');
        updates.footer_scripts = null;
        needsUpdate = true;
      } else {
        // Try to validate as JavaScript
        try {
          new Function(settings.footer_scripts);
          console.log('footer_scripts is valid JavaScript');
        } catch (error) {
          console.log('footer_scripts contains invalid JavaScript, clearing...');
          updates.footer_scripts = null;
          needsUpdate = true;
        }
      }
    }

    if (needsUpdate) {
      console.log('Updating settings to remove malformed scripts...');
      const { error: updateError } = await supabase
        .from('site_settings')
        .update(updates)
        .eq('id', settings.id);

      if (updateError) {
        console.error('Error updating settings:', updateError);
        return { success: false, message: updateError.message };
      }

      console.log('Successfully cleaned up script content');
      return { success: true, message: 'Script content cleaned up' };
    } else {
      console.log('No cleanup needed');
      return { success: true, message: 'No cleanup needed' };
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Function to safely set script content with validation
 */
export const setSafeScriptContent = async (headerScripts?: string | null, footerScripts?: string | null) => {
  try {
    const updates: Record<string, unknown> = {};

    // Validate and clean header scripts
    if (headerScripts !== undefined) {
      if (headerScripts && typeof headerScripts === 'string') {
        const cleanHeader = headerScripts.trim();
        if (cleanHeader) {
          // Check if it's HTML or JavaScript
          const hasHtmlTags = /<[^>]+>/g.test(cleanHeader);
          if (hasHtmlTags) {
            console.warn('Header scripts contain HTML tags, this may cause issues');
            // You might want to extract JavaScript from HTML here
          } else {
            try {
              new Function(cleanHeader);
              updates.header_scripts = cleanHeader;
            } catch (error) {
              console.error('Invalid JavaScript in header scripts:', error);
              return { success: false, message: 'Invalid JavaScript in header scripts' };
            }
          }
        } else {
          updates.header_scripts = null;
        }
      } else {
        updates.header_scripts = null;
      }
    }

    // Validate and clean footer scripts
    if (footerScripts !== undefined) {
      if (footerScripts && typeof footerScripts === 'string') {
        const cleanFooter = footerScripts.trim();
        if (cleanFooter) {
          // Check if it's HTML or JavaScript
          const hasHtmlTags = /<[^>]+>/g.test(cleanFooter);
          if (hasHtmlTags) {
            console.warn('Footer scripts contain HTML tags, this may cause issues');
            // You might want to extract JavaScript from HTML here
          } else {
            try {
              new Function(cleanFooter);
              updates.footer_scripts = cleanFooter;
            } catch (error) {
              console.error('Invalid JavaScript in footer scripts:', error);
              return { success: false, message: 'Invalid JavaScript in footer scripts' };
            }
          }
        } else {
          updates.footer_scripts = null;
        }
      } else {
        updates.footer_scripts = null;
      }
    }

    // Get current settings to update
    const { data: settings, error: fetchError } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1)
      .maybeSingle();

    if (fetchError || !settings) {
      return { success: false, message: 'Could not find settings to update' };
    }

    // Update the settings
    const { error: updateError } = await supabase
      .from('site_settings')
      .update(updates)
      .eq('id', settings.id);

    if (updateError) {
      return { success: false, message: updateError.message };
    }

    return { success: true, message: 'Scripts updated successfully' };
  } catch (error) {
    console.error('Error setting script content:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
};
