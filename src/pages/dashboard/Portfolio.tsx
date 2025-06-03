import * as React from 'react';
const { useState, useEffect, useRef } = React;
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useImageUpload } from '@/hooks/useImageUpload';

// No fallback data - load from database only

// Import Supabase project functions
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByCategory,
  uploadFile,
  type Project as SupabaseProject
} from '@/lib/supabase/services';

// Project type definition
type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  year: number;
  results: string;
  link: string;
};

// Categories for filtering
const categories = ['All', 'Web Development', 'Mobile Development', 'IoT Solutions', 'Design', 'E-Commerce'];

const PortfolioManagement = () => {
  // No default projects - load from database only

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    technologiesInput: '',
    year: new Date().getFullYear(),
    results: '',
    link: '',
  });

  // Image upload hook
  const {
    uploadImage,
    isUploading,
    uploadProgress,
    fileInputRef,
    triggerFileSelect,
    validateFile
  } = useImageUpload({
    folder: 'projects',
    onSuccess: (url) => {
      setFormData(prev => ({ ...prev, image: url }));
      toast({
        title: "Image uploaded",
        description: "Your project image has been uploaded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error,
        variant: "destructive"
      });
    }
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  // Load projects from Supabase on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await getAllProjects();

        if (error) {
          throw error;
        }

        if (data && Array.isArray(data)) {
          setProjects(data as Project[]);
        }
      } catch (error) {
        console.error('Error loading portfolio projects:', error);
        toast({
          title: "Error loading projects",
          description: "There was a problem loading your projects from the database.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // We don't need to save to localStorage anymore as we're using Supabase

  // Filter projects based on search term and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === 'All' || project.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle year input change with validation
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const yearValue = parseInt(e.target.value);
    if (!isNaN(yearValue) && yearValue >= 1900 && yearValue <= new Date().getFullYear() + 5) {
      setFormData({
        ...formData,
        year: yearValue
      });
    }
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      title: '',
      category: categories[1] || 'Web Development', // First non-"All" category
      image: '',
      description: '',
      technologiesInput: '',
      year: new Date().getFullYear(),
      results: '',
      link: '',
    });
    setImagePreview('');
  };

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file first
      const validation = validateFile(file);
      if (!validation.valid) {
        toast({
          title: "Invalid file",
          description: validation.error,
          variant: "destructive"
        });
        return;
      }

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Upload the file immediately
      await uploadImage(file);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    triggerFileSelect();
  };

  // Open add dialog
  const handleAddClick = () => {
    resetFormData();
    setIsAddDialogOpen(true);
  };

  // Open view dialog
  const handleViewClick = (project: Project) => {
    setCurrentProject(project);
    setIsViewDialogOpen(true);
  };

  // Open edit dialog with project data
  const handleEditClick = (project: Project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      image: project.image,
      description: project.description,
      technologiesInput: project.technologies.join(', '),
      year: project.year,
      results: project.results,
      link: project.link,
    });
    // Set image preview from existing project image
    if (project.image) {
      setImagePreview(project.image);
    }
    setIsEditDialogOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (project: Project) => {
    setCurrentProject(project);
    setIsDeleteDialogOpen(true);
  };

  // Parse technologies from comma-separated string
  const parseTechnologies = (techString: string): string[] => {
    return techString
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech !== '');
  };

  // Add new project
  const handleAddProject = async () => {
    try {
      setIsLoading(true);

      const technologies = parseTechnologies(formData.technologiesInput);

      const newProjectData = {
        title: formData.title,
        category: formData.category,
        image: formData.image, // Image URL is already set by the upload hook
        description: formData.description,
        technologies,
        year: formData.year,
        results: formData.results,
        link: formData.link,
      };

      const { data, error } = await createProject(newProjectData);

      if (error) {
        throw error;
      }

      if (data) {
        const newProject = data as Project;
        setProjects([...projects, newProject]);

        toast({
          title: "Project added",
          description: `${formData.title} has been added successfully.`,
        });
      }

      setIsAddDialogOpen(false);
      resetFormData();
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error adding project",
        description: "There was a problem adding your project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter based on category
  const handleCategoryFilter = async (category: string) => {
    setCategoryFilter(category);

    try {
      setIsLoading(true);

      // If 'All' is selected, fetch all projects, otherwise filter by category
      if (category === 'All') {
        const { data, error } = await getAllProjects();

        if (error) {
          throw error;
        }

        if (data) {
          setProjects(data as Project[]);
        }
      } else {
        const { data, error } = await getProjectsByCategory(category);

        if (error) {
          throw error;
        }

        if (data) {
          setProjects(data as Project[]);
        }
      }
    } catch (error) {
      console.error('Error filtering projects:', error);
      toast({
        title: "Error filtering projects",
        description: "There was a problem filtering your projects. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update existing project
  const handleUpdateProject = async () => {
    if (!currentProject) return;

    try {
      setIsLoading(true);

      const technologies = parseTechnologies(formData.technologiesInput);

      const updatedProjectData = {
        title: formData.title,
        category: formData.category,
        image: formData.image, // Image URL is already set by the upload hook
        description: formData.description,
        technologies,
        year: formData.year,
        results: formData.results,
        link: formData.link,
      };

      const { data, error } = await updateProject(currentProject.id, updatedProjectData);

      if (error) {
        throw error;
      }

      if (data) {
        const updatedProjects = projects.map(project =>
          project.id === currentProject.id
            ? {
              ...project,
              ...data as SupabaseProject
            }
            : project
        );

        setProjects(updatedProjects);

        toast({
          title: "Project updated",
          description: `${formData.title} has been updated successfully.`,
        });
      }

      setIsEditDialogOpen(false);
      resetFormData();
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error updating project",
        description: "There was a problem updating your project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete project
  const handleDeleteProject = async () => {
    if (!currentProject) return;

    try {
      setIsLoading(true);
      const { error } = await deleteProject(currentProject.id);

      if (error) {
        throw error;
      }

      const updatedProjects = projects.filter(project => project.id !== currentProject.id);
      setProjects(updatedProjects);

      toast({
        title: "Project deleted",
        description: `${currentProject.title} has been deleted.`,
      });

      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error deleting project",
        description: "There was a problem deleting your project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
    setIsDeleteDialogOpen(false);

    toast({
      title: "Project deleted",
      description: `${currentProject.title} has been deleted.`,
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Portfolio</h1>
        <Button onClick={handleAddClick} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full md:w-64">
          <Select
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className="h-48 bg-gray-200 relative"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <Badge className="mb-2 bg-purple-600">{project.category}</Badge>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="bg-gray-100">
                    +{project.technologies.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">Year: {project.year}</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewClick(project)}
                    aria-label={`View ${project.title}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(project)}
                    aria-label={`Edit ${project.title}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteClick(project)}
                    aria-label={`Delete ${project.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-lg shadow">
            <div className="mb-3">
              <Search className="h-12 w-12 mx-auto text-gray-300" />
            </div>
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm">Try a different search term or category filter</p>
          </div>
        )}
      </div>

      {/* View Project Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
          </DialogHeader>

          {currentProject && (
            <div className="py-4">
              <div
                className="h-60 bg-gray-200 rounded-lg mb-4"
                style={{
                  backgroundImage: `url(${currentProject.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{currentProject.title}</h3>
                <Badge>{currentProject.category}</Badge>
              </div>

              <p className="text-gray-700 mb-4">{currentProject.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">Year</h4>
                  <p>{currentProject.year}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">Results</h4>
                  <p>{currentProject.results}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">Project Link</h4>
                <a
                  href={currentProject.link}
                  className="text-purple-600 hover:text-purple-700 inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {currentProject.link}
                  <Edit className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Project Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Modern E-commerce Website"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="image">Project Image</Label>
                <div className="space-y-2">
                  {/* Upload Button - Primary Option */}
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      onClick={handleUploadClick}
                      className="flex-1"
                      disabled={isUploading}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {isUploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {/* URL Input - Secondary Option */}
                  <div className="relative">
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Or enter image URL"
                      className="text-sm"
                    />
                  </div>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="mt-2">
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Image upload progress */}
                {isUploading && (
                  <div className="mt-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
                  </div>
                )}

                {/* Image preview */}
                {imagePreview && (
                  <div className="mt-2 relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-md border border-gray-200"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => {
                        setImagePreview('');
                        setSelectedFile(null);
                        setFormData(prev => ({ ...prev, image: '' }));
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the project"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="technologiesInput">Technologies (comma-separated)</Label>
              <Input
                id="technologiesInput"
                name="technologiesInput"
                value={formData.technologiesInput}
                onChange={handleInputChange}
                placeholder="React, Node.js, MongoDB, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleYearChange}
                  min={1900}
                  max={new Date().getFullYear() + 5}
                />
              </div>
              <div>
                <Label htmlFor="results">Results</Label>
                <Input
                  id="results"
                  name="results"
                  value={formData.results}
                  onChange={handleInputChange}
                  placeholder="e.g., 40% increase in sales"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="link">Project Link</Label>
              <Input
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="/portfolio/project-name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddProject}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={!formData.title || !formData.category || !formData.image || !formData.description}
            >
              Add Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div>
              <Label htmlFor="edit-title">Project Title</Label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Modern E-commerce Website"
              />
            </div>

            <div>
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the project"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-technologiesInput">Technologies (comma-separated)</Label>
              <Input
                id="edit-technologiesInput"
                name="technologiesInput"
                value={formData.technologiesInput}
                onChange={handleInputChange}
                placeholder="React, Node.js, MongoDB, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-year">Year</Label>
                <Input
                  id="edit-year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleYearChange}
                  min={1900}
                  max={new Date().getFullYear() + 5}
                />
              </div>
              <div>
                <Label htmlFor="edit-results">Results</Label>
                <Input
                  id="edit-results"
                  name="results"
                  value={formData.results}
                  onChange={handleInputChange}
                  placeholder="e.g., 40% increase in sales"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-link">Project Link</Label>
              <Input
                id="edit-link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="/portfolio/project-name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateProject}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={!formData.title || !formData.category || !formData.image || !formData.description}
            >
              Update Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-500">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{currentProject?.title}</span>?
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProject}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioManagement;
