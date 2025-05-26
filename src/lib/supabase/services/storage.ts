import { supabase } from '../client';
import { v4 as uuidv4 } from 'uuid';

// Constants
const BUCKET_NAME = 'images'; // Use the default bucket name

/**
 * Check if we can access the storage bucket
 */
export const checkBucketAccess = async () => {
  try {
    // Try to list files in the bucket to see if we have access
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list();
    
    if (error) {
      console.warn('Storage bucket access check failed:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.warn('Error checking bucket access:', error);
    return false;
  }
};

/**
 * Upload a file to Supabase storage
 * @param file File to upload
 * @param path Optional path within the bucket
 * @returns URL of the uploaded file
 */
export const uploadFile = async (file: File, path = ''): Promise<string> => {
  try {
    console.log('Starting file upload process...');
    // Check bucket access
    const hasAccess = await checkBucketAccess();
    if (!hasAccess) {
      console.warn('No access to storage bucket, but proceeding with upload attempt anyway');
    }
    
    // Generate a unique filename to prevent collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;
    
    console.log(`Uploading file to path: ${filePath}`);
    
    // Upload the file
    const { error, data: uploadData } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type // Explicitly set content type
      });
    
    if (error) {
      console.error('Supabase storage upload error:', error);
      throw error;
    }
    
    console.log('File uploaded successfully, getting public URL...');
    
    // Get the public URL
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);
    
    if (!data || !data.publicUrl) {
      throw new Error('Failed to get public URL for uploaded file');
    }
    
    console.log(`Generated public URL: ${data.publicUrl}`);
    
    // Test if the URL is accessible
    try {
      const testRequest = await fetch(data.publicUrl, { method: 'HEAD' });
      console.log(`URL accessibility test status: ${testRequest.status}`);
    } catch (testError) {
      console.warn('Could not verify URL accessibility, but continuing:', testError);
    }
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadFile function:', error);
    throw error;
  }
};

/**
 * Delete a file from Supabase storage
 * @param fileUrl Full URL of the file to delete
 */
export const deleteFile = async (fileUrl: string): Promise<void> => {
  try {
    // Extract the file path from the URL
    const urlObj = new URL(fileUrl);
    const pathSegments = urlObj.pathname.split('/');
    const filePath = pathSegments.slice(pathSegments.indexOf(BUCKET_NAME) + 1).join('/');
    
    if (!filePath) {
      throw new Error('Invalid file URL');
    }
    
    // Delete the file
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
