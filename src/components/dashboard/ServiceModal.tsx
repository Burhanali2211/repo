import * as React from 'react';
const { useState, useEffect } = React;
import { X } from 'lucide-react';
// Import icons individually to avoid TypeScript errors
import RefreshCwIcon from 'lucide-react/dist/esm/icons/refresh-cw';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useServices, Service } from '@/hooks/useServices';
import { useToast } from '@/components/ui/use-toast';

interface ServiceModalProps {
  service: any | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  const { createService, updateService, services } = useServices();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    icon: '',
    image: ''
  });
  const [slugEdited, setSlugEdited] = useState(false);

  // Generate a slug from title
  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Ensure slug is unique by appending a number if needed
    const existingSlugs = services.map(s => s.slug);
    let uniqueSlug = slug;
    let counter = 1;

    while (existingSlugs.includes(uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  };

  // Auto-generate slug when title changes (if slug wasn't manually edited)
  useEffect(() => {
    if (formData.title && !slugEdited && !service) {
      const newSlug = generateSlug(formData.title);
      setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  }, [formData.title, slugEdited, services]);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        slug: service.slug || '',
        description: service.description || '',
        icon: service.icon || '',
        image: service.image || ''
      });
      setSlugEdited(true); // Don't auto-generate slug when editing
    } else {
      setFormData({
        title: '',
        slug: '',
        description: '',
        icon: '',
        image: ''
      });
      setSlugEdited(false);
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate slug format
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
        toast({
          title: "Invalid Slug",
          description: "Slug must contain only lowercase letters, numbers, and hyphens",
          variant: "destructive"
        });
        return;
      }

      // Check for duplicate slug
      const isDuplicateSlug = services.some(s =>
        s.slug === formData.slug && (!service || s.id !== service.id)
      );

      if (isDuplicateSlug) {
        toast({
          title: "Duplicate Slug",
          description: "This slug already exists. Please use a different one.",
          variant: "destructive"
        });
        return;
      }

      if (service) {
        await updateService(service.id, formData);
      } else {
        await createService(formData);
      }

      toast({
        title: service ? "Service Updated" : "Service Created",
        description: `Successfully ${service ? 'updated' : 'created'} ${formData.title}`,
        variant: "default"
      });

      onClose();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "Error",
        description: "There was a problem saving the service. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Generate a new unique slug
  const regenerateSlug = () => {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Please enter a title first",
        variant: "destructive"
      });
      return;
    }

    const newSlug = generateSlug(formData.title);
    setFormData(prev => ({ ...prev, slug: newSlug }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <h2 id="service-modal-title" className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
            {service ? 'Edit Service' : 'Add New Service'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-80px)]">

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, slug: e.target.value }));
                    setSlugEdited(true);
                  }}
                  required
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={regenerateSlug}
                  title="Generate unique slug"
                >
                  <RefreshCwIcon className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (automatically generated from title)</p>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full p-2 border rounded-md"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="icon">Icon</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                placeholder="e.g., 'code' or 'phone'"
              />
              <p className="text-xs text-gray-500 mt-1">Enter a Lucide icon name</p>
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              />
            </div>

            {/* Removed order_index and featured fields as they don't exist in the database */}

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                {service ? 'Update' : 'Create'} Service
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
