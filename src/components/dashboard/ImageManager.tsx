import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Download, 
  Eye, 
  Copy, 
  FolderOpen,
  Grid3X3,
  List,
  Search,
  Filter,
  BarChart3
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { 
  uploadFile, 
  uploadMultipleFiles, 
  listFiles, 
  deleteFile, 
  deleteMultipleFiles,
  getStorageStats
} from '@/lib/supabase/services/storage';

interface ImageFile {
  name: string;
  publicUrl: string;
  fullPath: string;
  created_at?: string;
  updated_at?: string;
  metadata?: {
    size: number;
    mimetype: string;
  };
}

interface StorageStats {
  totalFiles: number;
  totalSize: number;
  totalSizeMB: string;
  folderStats: Record<string, { count: number; size: number }>;
}

const ImageManager: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [stats, setStats] = useState<StorageStats | null>(null);
  const [currentUploadFile, setCurrentUploadFile] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  // Load images on component mount
  useEffect(() => {
    loadImages();
    loadStats();
  }, [selectedFolder]);

  const loadImages = async () => {
    try {
      setLoading(true);
      const files = await listFiles(selectedFolder);
      setImages(files);
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: 'Error loading images',
        description: 'Failed to load images from storage',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const storageStats = await getStorageStats();
      setStats(storageStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSingleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(0);
      setCurrentUploadFile(file.name);

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

      const url = await uploadFile(file, selectedFolder);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      toast({
        title: 'Upload successful',
        description: `${file.name} has been uploaded successfully`
      });

      // Refresh images list
      await loadImages();
      await loadStats();
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload image',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setCurrentUploadFile('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleMultipleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      const results = await uploadMultipleFiles(
        files, 
        selectedFolder, 
        (progress, fileName) => {
          setUploadProgress(progress);
          setCurrentUploadFile(fileName);
        }
      );

      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;

      toast({
        title: 'Upload completed',
        description: `${successful} files uploaded successfully${failed > 0 ? `, ${failed} failed` : ''}`
      });

      // Refresh images list
      await loadImages();
      await loadStats();
      
    } catch (error) {
      console.error('Multiple upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload images',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setCurrentUploadFile('');
      if (multiFileInputRef.current) {
        multiFileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedImages.length === 0) return;

    try {
      setLoading(true);
      await deleteMultipleFiles(selectedImages);
      
      toast({
        title: 'Images deleted',
        description: `${selectedImages.length} images deleted successfully`
      });

      setSelectedImages([]);
      await loadImages();
      await loadStats();
      
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Delete failed',
        description: 'Failed to delete selected images',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'URL copied',
      description: 'Image URL copied to clipboard'
    });
  };

  const toggleImageSelection = (url: string) => {
    setSelectedImages(prev => 
      prev.includes(url) 
        ? prev.filter(u => u !== url)
        : [...prev, url]
    );
  };

  const filteredImages = images.filter(image => 
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const folders = [...new Set(images.map(img => img.fullPath.split('/')[0]).filter(Boolean))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Image Manager</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Upload, organize, and manage your images
          </p>
        </div>
        
        {stats && (
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stats.totalFiles} files • {stats.totalSizeMB} MB used
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Images</CardTitle>
              <CardDescription>
                Upload single or multiple images to your storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Single Upload */}
              <div className="space-y-2">
                <Label>Single Image Upload</Label>
                <div className="flex items-center space-x-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleSingleUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex-1"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Image
                  </Button>
                </div>
              </div>

              {/* Multiple Upload */}
              <div className="space-y-2">
                <Label>Multiple Images Upload</Label>
                <div className="flex items-center space-x-2">
                  <input
                    ref={multiFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => multiFileInputRef.current?.click()}
                    disabled={uploading}
                    variant="outline"
                    className="flex-1"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Multiple Images
                  </Button>
                </div>
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading: {currentUploadFile}</span>
                    <span>{uploadProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              {/* Folder Selection */}
              <div className="space-y-2">
                <Label>Upload to Folder</Label>
                <Input
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  placeholder="Enter folder name (optional)"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          {/* Gallery Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              
              {folders.length > 0 && (
                <select
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="">All Folders</option>
                  {folders.map(folder => (
                    <option key={folder} value={folder}>{folder}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {selectedImages.length > 0 && (
                <Button
                  onClick={handleDeleteSelected}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected ({selectedImages.length})
                </Button>
              )}
              
              <Button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                variant="outline"
                size="sm"
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Image Gallery */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading images...</p>
              </div>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No images found</p>
                <p className="text-sm text-gray-500">Upload some images to get started</p>
              </div>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              : "space-y-2"
            }>
              {filteredImages.map((image) => (
                <Card 
                  key={image.publicUrl} 
                  className={`${viewMode === 'grid' ? 'aspect-square' : ''} ${
                    selectedImages.includes(image.publicUrl) ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <CardContent className={`p-2 ${viewMode === 'grid' ? 'h-full' : 'flex items-center space-x-4'}`}>
                    {viewMode === 'grid' ? (
                      <>
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-2">
                          <img
                            src={image.publicUrl}
                            alt={image.name}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => toggleImageSelection(image.publicUrl)}
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium truncate" title={image.name}>
                            {image.name}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {image.metadata?.size ? `${(image.metadata.size / 1024).toFixed(1)}KB` : ''}
                            </span>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleCopyUrl(image.publicUrl)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => window.open(image.publicUrl, '_blank')}
                                className="h-6 w-6 p-0"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                          <img
                            src={image.publicUrl}
                            alt={image.name}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => toggleImageSelection(image.publicUrl)}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate" title={image.name}>
                            {image.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {image.metadata?.size ? `${(image.metadata.size / 1024).toFixed(1)}KB` : ''}
                            {image.created_at && ` • ${new Date(image.created_at).toLocaleDateString()}`}
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopyUrl(image.publicUrl)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(image.publicUrl, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalFiles}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSizeMB} MB</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Folders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Object.keys(stats.folderStats).length}</div>
                </CardContent>
              </Card>
              
              {Object.keys(stats.folderStats).length > 0 && (
                <Card className="md:col-span-2 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Folder Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(stats.folderStats).map(([folder, data]) => (
                        <div key={folder} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <div className="flex items-center space-x-2">
                            <FolderOpen className="h-4 w-4" />
                            <span className="font-medium">{folder}</span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {data.count} files • {(data.size / (1024 * 1024)).toFixed(2)} MB
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageManager;
