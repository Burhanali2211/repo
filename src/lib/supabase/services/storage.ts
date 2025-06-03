import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// Constants
const BUCKET_NAME = 'images'; // Use the default bucket name

// Image optimization settings
const IMAGE_QUALITY = 85;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Check if we can access the storage bucket
 */
export const checkBucketAccess = async () => {
  try {
    // Try to list files in the bucket to see if we have access
    const { error } = await supabase.storage.from(BUCKET_NAME).list();

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
 * Validate image file before upload
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Check file type
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported file format. Supported formats: ${SUPPORTED_FORMATS.join(', ')}`
    };
  }

  // Check file size
  if (file.size > MAX_IMAGE_SIZE) {
    return {
      valid: false,
      error: `File size too large. Maximum size: ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`
    };
  }

  return { valid: true };
};

/**
 * Compress image file before upload
 */
export const compressImage = async (file: File, quality: number = IMAGE_QUALITY): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions (max 1920x1080 for optimization)
      const maxWidth = 1920;
      const maxHeight = 1080;
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file); // Fallback to original if compression fails
          }
        },
        file.type,
        quality / 100
      );
    };

    img.onerror = () => resolve(file); // Fallback to original if loading fails
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Upload a file to Supabase storage
 * @param file File to upload
 * @param path Optional path within the bucket
 * @returns URL of the uploaded file
 */
export const uploadFile = async (file: File, path = '', compress: boolean = true): Promise<string> => {
  try {
    console.log('Starting file upload process...');

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Check bucket access
    const hasAccess = await checkBucketAccess();
    if (!hasAccess) {
      console.warn('No access to storage bucket, but proceeding with upload attempt anyway');
    }

    // Compress image if requested and it's an image file
    let fileToUpload = file;
    if (compress && file.type.startsWith('image/')) {
      console.log('Compressing image...');
      fileToUpload = await compressImage(file);
      console.log(`Compression: ${file.size} -> ${fileToUpload.size} bytes (${((file.size - fileToUpload.size) / file.size * 100).toFixed(1)}% reduction)`);
    }

    // Generate a unique filename to prevent collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    console.log(`Uploading file to path: ${filePath}`);

    // Upload the file
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, fileToUpload, {
        cacheControl: '3600',
        upsert: true,
        contentType: fileToUpload.type // Explicitly set content type
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

/**
 * Upload multiple files with progress tracking
 */
export const uploadMultipleFiles = async (
  files: File[],
  path = '',
  onProgress?: (progress: number, fileName: string) => void
) => {
  const results = [];
  const total = files.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      onProgress?.(((i) / total) * 100, file.name);
      const result = await uploadFile(file, path);
      results.push({ success: true, file: file.name, url: result });
      onProgress?.(((i + 1) / total) * 100, file.name);
    } catch (error) {
      results.push({ success: false, file: file.name, error: error.message });
    }
  }

  return results;
};

/**
 * List files in storage with public URLs
 */
export const listFiles = async (path = '', limit: number = 100) => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(path, {
        limit,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) throw error;

    return data?.map(file => ({
      ...file,
      publicUrl: supabase.storage.from(BUCKET_NAME).getPublicUrl(path ? `${path}/${file.name}` : file.name).data.publicUrl,
      fullPath: path ? `${path}/${file.name}` : file.name
    })) || [];
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

/**
 * Delete multiple files by their URLs
 */
export const deleteMultipleFiles = async (fileUrls: string[]) => {
  try {
    const filePaths = fileUrls.map(url => {
      const urlObj = new URL(url);
      const pathSegments = urlObj.pathname.split('/');
      return pathSegments.slice(pathSegments.indexOf(BUCKET_NAME) + 1).join('/');
    }).filter(path => path); // Remove empty paths

    if (filePaths.length === 0) {
      throw new Error('No valid file paths found');
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(filePaths);

    if (error) throw error;

    return { success: true, deletedCount: filePaths.length };
  } catch (error) {
    console.error('Error deleting multiple files:', error);
    throw error;
  }
};

/**
 * Get storage usage statistics
 */
export const getStorageStats = async () => {
  try {
    const files = await listFiles('', 1000); // Get up to 1000 files for stats

    const totalFiles = files.length;
    const totalSize = files.reduce((sum, file) => sum + (file.metadata?.size || 0), 0);

    // Group by folder
    const folderStats = files.reduce((acc, file) => {
      const folder = file.fullPath.split('/')[0] || 'root';
      if (!acc[folder]) {
        acc[folder] = { count: 0, size: 0 };
      }
      acc[folder].count++;
      acc[folder].size += file.metadata?.size || 0;
      return acc;
    }, {} as Record<string, { count: number; size: number }>);

    return {
      totalFiles,
      totalSize,
      totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      folderStats
    };
  } catch (error) {
    console.error('Error getting storage stats:', error);
    throw error;
  }
};
