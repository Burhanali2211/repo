
import React, { useCallback, useState } from 'react';
import { Upload, X, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  projectId: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ projectId }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const { addDocument } = useData();
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, [projectId, handleFileUpload]);

  const handleFileUpload = async (files: File[]) => {
    for (const file of files) {
      setUploadingFiles(prev => [...prev, file.name]);

      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      addDocument({
        name: file.name,
        type: file.type,
        size: formatFileSize(file.size),
        uploadDate: new Date().toISOString().split('T')[0],
        projectId,
        url: URL.createObjectURL(file)
      });

      setUploadingFiles(prev => prev.filter(name => name !== file.name));

      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
        }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-lg font-medium text-gray-900 mb-2">Drop files here</p>
      <p className="text-gray-500 mb-4">or click to browse</p>

      <input
        type="file"
        multiple
        className="hidden"
        id="file-upload"
        onChange={(e) => {
          if (e.target.files) {
            handleFileUpload(Array.from(e.target.files));
          }
        }}
      />

      <Button asChild className="bg-purple-600 hover:bg-purple-700">
        <label htmlFor="file-upload" className="cursor-pointer">
          Choose Files
        </label>
      </Button>

      {uploadingFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadingFiles.map((fileName) => (
            <div key={fileName} className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
              <span>Uploading {fileName}...</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
