import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, X, Check, Palette, TrendingUp, Code, Megaphone, Shield, Globe, Cloud, Smartphone, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

// No fallback data needed

// Import Supabase service functions
import { getAllServices, createService, updateService, deleteService, type Service as SupabaseService, type ExtendedService } from '@/lib/supabase/services';

// Icon name mapping for database storage
const iconMapping: Record<string, string> = {
  Code: 'Code',
  Palette: 'Palette',
  TrendingUp: 'TrendingUp',
  Megaphone: 'Megaphone',
  Shield: 'Shield',
  Globe: 'Globe',
  Cloud: 'Cloud',
  Smartphone: 'Smartphone'
};

// Reverse mapping to get the icon component from name
const getIconComponent = (iconName: string): React.ElementType => {
  switch (iconName) {
    case 'Code': return Code;
    case 'Palette': return Palette;
    case 'TrendingUp': return TrendingUp;
    case 'Megaphone': return Megaphone;
    case 'Shield': return Shield;
    case 'Globe': return Globe;
    case 'Cloud': return Cloud;
    case 'Smartphone': return Smartphone;
    default: return Code; // Default fallback
  }
};

// No initial services needed as we'll load directly from database

// Local UI Service type definition - iconName is stored locally for UI but not in DB
type Service = {
  id: string;
  icon: React.ElementType;
  iconName: string; // Stored locally for UI, not in database
  title: string;
  description: string;
  link: string;
  color: string;
  gradient: string;
};

// Type for imported services
type ImportedService = Omit<Service, 'id'> & { id?: string };

// Available icons for selection
const iconOptions = [
  { name: 'Globe', component: Globe },
  { name: 'Search', component: Search },
  { name: 'TrendingUp', component: TrendingUp },
  { name: 'Palette', component: Palette },
  { name: 'Cloud', component: Cloud },
  { name: 'Smartphone', component: Smartphone },
  { name: 'Code', component: Code },
  { name: 'Megaphone', component: Megaphone },
  { name: 'Shield', component: Shield },
];

// Color options for services
const colorOptions = [
  { name: 'Purple', color: 'bg-purple-500', gradient: 'from-purple-600 to-indigo-600' },
  { name: 'Blue', color: 'bg-blue-500', gradient: 'from-blue-600 to-cyan-600' },
  { name: 'Pink', color: 'bg-pink-500', gradient: 'from-pink-600 to-rose-600' },
  { name: 'Amber', color: 'bg-amber-500', gradient: 'from-amber-600 to-orange-600' },
  { name: 'Sky', color: 'bg-sky-500', gradient: 'from-sky-600 to-blue-600' },
  { name: 'Green', color: 'bg-green-500', gradient: 'from-green-600 to-emerald-600' },
  { name: 'Red', color: 'bg-red-500', gradient: 'from-red-600 to-rose-600' },
  { name: 'Indigo', color: 'bg-indigo-500', gradient: 'from-indigo-600 to-purple-600' },
];

const ServicesManagement = () => {
  // UUID generation function that works in all environments
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // State management
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [authError, setAuthError] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedIcon, setSelectedIcon] = useState<string>('Globe');
  const [selectedColor, setSelectedColor] = useState<{ name: string, color: string, gradient: string }>(colorOptions[0]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
  });

  // Load services from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      if (!user) {
        setAuthError(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setAuthError(false);

        // Get services from Supabase
        const { data, error } = await getAllServices();

        if (error) {
          throw error;
        }

        if (data && Array.isArray(data)) {
          // Map database services to UI services with icon components
          const mappedServices = data.map(dbService => {
            // Use the iconName directly from the database or fallback to a default
            const iconName = dbService.iconName || 'Code';

            return {
              ...dbService,
              iconName: iconName,
              icon: getIconComponent(iconName)
            };
          });

          setServices(mappedServices);
        } else {
          // Set empty services array if no data
          setServices([]);
        }
      } catch (error: unknown) {
        console.error('Error loading services:', error);

        const errorObj = error as { name?: string };
        if (errorObj.name === 'auth_required') {
          setAuthError(true);
          toast({
            title: "Authentication Required",
            description: "Please log in to access your services.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error loading services",
            description: "There was a problem loading your services.",
            variant: "destructive"
          });
          // Don't fall back to dummy data
          setServices([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [user, toast]);

  // Filter services based on search term
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      link: '',
    });
    setSelectedIcon('Globe');
    setSelectedColor(colorOptions[0]);
  };

  // Open add dialog
  const handleAddClick = () => {
    resetFormData();
    setIsAddDialogOpen(true);
  };

  // Open edit dialog with service data
  const handleEditClick = (service: Service) => {
    setCurrentService(service);
    setFormData({
      title: service.title,
      description: service.description,
      link: service.link,
    });

    // Find the icon and color from options
    const iconName = iconOptions.find(icon => icon.component === service.icon)?.name || 'Globe';
    setSelectedIcon(iconName);

    const colorName = colorOptions.find(color => color.gradient === service.gradient) || colorOptions[0];
    setSelectedColor(colorName);

    setIsEditDialogOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (service: Service) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  // Add new service
  const handleAddService = async () => {
    try {
      setIsLoading(true);

      // Prepare service data with iconName included
      const newServiceData = {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        color: selectedColor.color,
        gradient: selectedColor.gradient,
        iconName: selectedIcon // Include iconName for the database
      };

      // Use the create service function which is simpler
      const { data, error } = await createService(newServiceData);

      if (error) {
        console.error('Service creation error:', error);
        throw error;
      }

      if (data) {
        console.log('Service created successfully:', data);

        // Convert database service to UI service with icon component
        // Handle the case where data might be an array
        const serviceData = Array.isArray(data) ? data[0] : data;
        const newService: Service = {
          ...serviceData as SupabaseService,
          iconName: serviceData.iconName || selectedIcon, // Use the one from the database or fallback
          icon: getIconComponent(serviceData.iconName || selectedIcon)
        };

        setServices([...services, newService]);
        toast({
          title: "Service added",
          description: `${formData.title} has been added successfully.`,
        });
      }

      setIsAddDialogOpen(false);
      resetFormData();
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: "Error adding service",
        description: "There was a problem adding your service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update existing service
  const handleUpdateService = async () => {
    if (!currentService) return;

    try {
      setIsLoading(true);
      console.log('Updating service with ID:', currentService.id);

      // Prepare service data with iconName included
      const updatedServiceData = {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        color: selectedColor.color,
        gradient: selectedColor.gradient,
        iconName: selectedIcon // Include iconName for the database
      };

      // Use updateService with the current service ID to properly update the existing record
      const { data, error } = await updateService(currentService.id, updatedServiceData);

      if (error) {
        console.error('Service update error:', error);
        throw error;
      }

      if (data) {
        console.log('Service updated successfully:', data);

        // Remove the old service from the UI
        const filteredServices = services.filter(s => s.id !== currentService.id);

        // Add the updated service with the new data
        // Handle the case where data might be an array
        const serviceData = Array.isArray(data) ? data[0] : data;
        const updatedService: Service = {
          ...serviceData as SupabaseService,
          iconName: serviceData.iconName || selectedIcon, // Use the one from the database or fallback
          icon: getIconComponent(serviceData.iconName || selectedIcon)
        };

        setServices([...filteredServices, updatedService]);
        toast({
          title: "Service updated",
          description: `${formData.title} has been updated successfully.`,
        });
      }

      setIsEditDialogOpen(false);
      resetFormData();
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error updating service",
        description: "There was a problem updating your service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete service
  const handleDeleteService = async () => {
    if (!currentService) return;

    try {
      setIsLoading(true);
      const { error } = await deleteService(currentService.id);

      if (error) {
        throw error;
      }

      const updatedServices = services.filter(service => service.id !== currentService.id);
      setServices(updatedServices);
      setIsDeleteDialogOpen(false);

      toast({
        title: "Service deleted",
        description: `${currentService.title} has been deleted.`,
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error deleting service",
        description: "There was a problem deleting your service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      {authError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You need to be logged in to manage services. Please log in and try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Button
          onClick={handleAddClick}
          className="bg-purple-600 hover:bg-purple-700"
          disabled={isLoading || authError}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          Add Service
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Services List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${service.gradient}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{service.title}</div>
                    <div className="text-sm text-gray-500">{service.link}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2">{service.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-6 h-6 rounded-full ${service.color}`}></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(service)}
                        aria-label={`Edit ${service.title}`}
                        tabIndex={0}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleDeleteClick(service)}
                        aria-label={`Delete ${service.title}`}
                        tabIndex={0}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredServices.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  No services found. Try a different search or add a new service.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Select
                  value={selectedIcon}
                  onValueChange={setSelectedIcon}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon.name} value={icon.name}>
                        <div className="flex items-center">
                          <icon.component className="h-4 w-4 mr-2" />
                          {icon.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Select
                  value={selectedColor.name}
                  onValueChange={(value) => {
                    const color = colorOptions.find(c => c.name === value);
                    if (color) setSelectedColor(color);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.name} value={color.name}>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${color.color} mr-2`}></div>
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Service title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of the service"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="/services/your-service"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              tabIndex={0}
              aria-label="Cancel adding service"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddService}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={!formData.title || !formData.description || !formData.link}
              tabIndex={0}
              aria-label="Add new service"
            >
              Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-icon">Icon</Label>
                <Select
                  value={selectedIcon}
                  onValueChange={setSelectedIcon}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon.name} value={icon.name}>
                        <div className="flex items-center">
                          <icon.component className="h-4 w-4 mr-2" />
                          {icon.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-color">Color</Label>
                <Select
                  value={selectedColor.name}
                  onValueChange={(value) => {
                    const color = colorOptions.find(c => c.name === value);
                    if (color) setSelectedColor(color);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.name} value={color.name}>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${color.color} mr-2`}></div>
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Service title"
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of the service"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-link">Link</Label>
              <Input
                id="edit-link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="/services/your-service"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              tabIndex={0}
              aria-label="Cancel editing service"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateService}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={!formData.title || !formData.description || !formData.link}
              tabIndex={0}
              aria-label="Update service"
            >
              Update Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-500">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{currentService?.title}</span>?
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              tabIndex={0}
              aria-label="Cancel deletion"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteService}
              tabIndex={0}
              aria-label="Confirm deletion"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Export both the named component and as default
const Services = ServicesManagement;
export { ServicesManagement };
export default Services;
