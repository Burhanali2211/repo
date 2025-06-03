import { useState, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { uploadFile, uploadMultipleFiles, validateImageFile } from '@/lib/supabase/services/storage';

interface UseImageUploadOptions {
  folder?: string;
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;
  compress?: boolean;
}

interface UseImageUploadReturn {
  // Single upload
  uploadImage: (file: File) => Promise<string | null>;
  isUploading: boolean;
  uploadProgress: number;
  
  // Multiple upload
  uploadMultiple: (files: File[]) => Promise<Array<{ success: boolean; file: string; url?: string; error?: string }>>;
  
  // File input helpers
  fileInputRef: React.RefObject<HTMLInputElement>;
  multiFileInputRef: React.RefObject<HTMLInputElement>;
  triggerFileSelect: () => void;
  triggerMultiFileSelect: () => void;
  
  // Validation
  validateFile: (file: File) => { valid: boolean; error?: string };
}

export const useImageUpload = (options: UseImageUploadOptions = {}): UseImageUploadReturn => {
  const { folder = '', onSuccess, onError, compress = true } = options;
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    return validateImageFile(file);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Validate file first
      const validation = validateFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const url = await uploadFile(file, folder, compress);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      toast({
        title: 'Upload successful',
        description: `${file.name} has been uploaded successfully`
      });

      onSuccess?.(url);
      return url;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      
      toast({
        title: 'Upload failed',
        description: errorMessage,
        variant: 'destructive'
      });

      onError?.(errorMessage);
      return null;
      
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const uploadMultiple = async (files: File[]) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Validate all files first
      for (const file of files) {
        const validation = validateFile(file);
        if (!validation.valid) {
          throw new Error(`${file.name}: ${validation.error}`);
        }
      }

      const results = await uploadMultipleFiles(
        files, 
        folder, 
        (progress, fileName) => {
          setUploadProgress(progress);
        }
      );

      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;

      toast({
        title: 'Upload completed',
        description: `${successful} files uploaded successfully${failed > 0 ? `, ${failed} failed` : ''}`
      });

      return results;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload images';
      
      toast({
        title: 'Upload failed',
        description: errorMessage,
        variant: 'destructive'
      });

      onError?.(errorMessage);
      return [];
      
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      
      // Clear file input
      if (multiFileInputRef.current) {
        multiFileInputRef.current.value = '';
      }
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const triggerMultiFileSelect = () => {
    multiFileInputRef.current?.click();
  };

  return {
    uploadImage,
    isUploading,
    uploadProgress,
    uploadMultiple,
    fileInputRef,
    multiFileInputRef,
    triggerFileSelect,
    triggerMultiFileSelect,
    validateFile
  };
};

// Helper hook for handling file input changes
export const useFileInputHandler = (onFilesSelected: (files: File[]) => void) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  return { handleFileChange };
};

// Helper hook for drag and drop functionality
export const useDragAndDrop = (onFilesDropped: (files: File[]) => void) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      onFilesDropped(files);
    }
  };

  return {
    isDragOver,
    dragProps: {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop
    }
  };
};

export default useImageUpload;
