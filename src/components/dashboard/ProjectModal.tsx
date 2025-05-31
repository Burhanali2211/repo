import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useProjects, Project } from '@/hooks/useProjects';
import { useToast } from '@/components/ui/use-toast';

interface ProjectModalProps {
  project: any | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const { createProject, updateProject } = useProjects();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: '',
    image: '',
    technologies: [] as string[],
    client_name: '',
    testimonial_text: '',
    featured: false,
    order_index: 0,
    year: new Date().getFullYear(),
    results: '',
    project_link: '',
    status: 'published' as 'draft' | 'published' | 'archived',
    gallery_images: [] as string[],
    project_duration: '',
    budget_range: '',
    team_size: undefined as number | undefined
  });

  const [techInput, setTechInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);

  // Categories for the select dropdown
  const categories = [
    'Web Development',
    'Mobile App',
    'E-commerce',
    'School Management',
    'Business Solutions',
    'Agriculture Tech',
    'Other'
  ];

  // Status options
  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ];

  // Budget range options
  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    'Over $100,000'
  ];

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        slug: project.slug || '',
        description: project.description || '',
        category: project.category || '',
        image: project.image || '',
        technologies: project.technologies || [],
        client_name: project.client_name || '',
        testimonial_text: project.testimonial_text || '',
        featured: project.featured || false,
        order_index: project.order_index || 0,
        year: project.year || new Date().getFullYear(),
        results: project.results || '',
        project_link: project.project_link || '',
        status: project.status || 'published',
        gallery_images: project.gallery_images || [],
        project_duration: project.project_duration || '',
        budget_range: project.budget_range || '',
        team_size: project.team_size
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        description: '',
        category: '',
        image: '',
        technologies: [],
        client_name: '',
        testimonial_text: '',
        featured: false,
        order_index: 0,
        year: new Date().getFullYear(),
        results: '',
        project_link: '',
        status: 'published',
        gallery_images: [],
        project_duration: '',
        budget_range: '',
        team_size: undefined
      });
    }
  }, [project]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title }));
    if (!slugEdited) {
      setFormData(prev => ({ ...prev, slug: generateSlug(title) }));
    }
  };

  const handleSlugChange = (slug: string) => {
    setSlugEdited(true);
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Project title is required",
        variant: "destructive"
      });
      return;
    }

    if (!formData.slug.trim()) {
      toast({
        title: "Validation Error",
        description: "Project slug is required",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      if (project) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
      // Error toast is handled in the hook
    } finally {
      setLoading(false);
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addGalleryImage = () => {
    if (galleryInput.trim() && !formData.gallery_images.includes(galleryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        gallery_images: [...prev.gallery_images, galleryInput.trim()]
      }));
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter(img => img !== imageUrl)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b pb-2">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter project title"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="project-url-slug"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger disabled={loading}>
                    <SelectValue placeholder="Select category" />
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

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'draft' | 'published' | 'archived' }))}>
                  <SelectTrigger disabled={loading}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the project..."
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Media & Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b pb-2">Media & Images</h3>

            <div>
              <Label htmlFor="image">Main Project Image</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                disabled={loading}
              />
            </div>

            <div>
              <Label>Gallery Images</Label>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  placeholder="Add gallery image URL"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
                  disabled={loading}
                />
                <Button type="button" onClick={addGalleryImage} disabled={loading}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.gallery_images.map((imageUrl, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span className="truncate max-w-[200px]">{imageUrl}</span>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(imageUrl)}
                      className="text-red-500 hover:text-red-700 ml-1"
                      disabled={loading}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b pb-2">Technologies</h3>

            <div>
              <Label>Technologies Used</Label>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Add technology (e.g., React, Node.js)"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  disabled={loading}
                />
                <Button type="button" onClick={addTechnology} disabled={loading}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="flex items-center space-x-1">
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-red-500 hover:text-red-700 ml-1"
                      disabled={loading}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b pb-2">Client Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client_name">Client Name</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                  placeholder="Client or company name"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="project_link">Project Link</Label>
                <Input
                  id="project_link"
                  type="url"
                  value={formData.project_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_link: e.target.value }))}
                  placeholder="https://example.com"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="testimonial_text">Client Testimonial</Label>
              <Textarea
                id="testimonial_text"
                rows={2}
                value={formData.testimonial_text}
                onChange={(e) => setFormData(prev => ({ ...prev, testimonial_text: e.target.value }))}
                placeholder="Client feedback or testimonial..."
                disabled={loading}
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b pb-2">Project Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="year">Project Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) || new Date().getFullYear() }))}
                  min="2000"
                  max="2030"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="project_duration">Duration</Label>
                <Input
                  id="project_duration"
                  value={formData.project_duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_duration: e.target.value }))}
                  placeholder="e.g., 3 months"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="team_size">Team Size</Label>
                <Input
                  id="team_size"
                  type="number"
                  value={formData.team_size || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, team_size: e.target.value ? parseInt(e.target.value) : undefined }))}
                  placeholder="Number of members"
                  min="1"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget_range">Budget Range</Label>
                <Select value={formData.budget_range} onValueChange={(value) => setFormData(prev => ({ ...prev, budget_range: value }))}>
                  <SelectTrigger disabled={loading}>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="order_index">Display Order</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="results">Results & Impact</Label>
              <Textarea
                id="results"
                rows={3}
                value={formData.results}
                onChange={(e) => setFormData(prev => ({ ...prev, results: e.target.value }))}
                placeholder="Describe the project results, impact, and achievements..."
                disabled={loading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                disabled={loading}
              />
              <Label htmlFor="featured" className="text-sm font-medium">
                Featured Project
              </Label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {project ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  {project ? 'Update' : 'Create'} Project
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
