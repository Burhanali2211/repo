import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Star, Quote, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// No fallback data - load from database only

// Testimonial type definition for UI
type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  featured: boolean;
};

const TestimonialsManagement = () => {
  // No default testimonials - load from database only

  // State management
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    image: '',
    content: '',
    rating: 5,
    featured: false,
  });

  // Load testimonials from Supabase
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);

        // Get testimonials from Supabase
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Map database records to our Testimonial type
          const mappedTestimonials: Testimonial[] = data.map(item => ({
            id: item.id,
            name: item.name,
            role: item.role || '',
            company: item.company || '',
            image: item.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(item.name),
            content: item.content,
            rating: item.rating || 5,
            featured: item.featured || false,
          }));

          setTestimonials(mappedTestimonials);
        } else {
          // Fallback to initial testimonials if no data
          setTestimonials(defaultTestimonials);
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
        toast({
          title: "Error loading testimonials",
          description: "There was a problem loading your testimonials. Using local data instead.",
          variant: "destructive"
        });
        // Fallback to initial data
        setTestimonials(defaultTestimonials);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [toast]);

  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle rating change
  const handleRatingChange = (value: number[]) => {
    setFormData({
      ...formData,
      rating: value[0]
    });
  };

  // Handle featured toggle
  const handleFeaturedChange = (checked: boolean) => {
    setFormData({
      ...formData,
      featured: checked
    });
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: '',
      role: '',
      company: '',
      image: '',
      content: '',
      rating: 5,
      featured: false,
    });
  };

  // Open add dialog
  const handleAddClick = () => {
    resetFormData();
    setIsAddDialogOpen(true);
  };

  // Open edit dialog with testimonial data
  const handleEditClick = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company || '',
      image: testimonial.image,
      content: testimonial.content,
      rating: testimonial.rating,
      featured: testimonial.featured || false,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  // Add new testimonial
  const handleAddTestimonial = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to add testimonials.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);

      const newId = crypto.randomUUID();

      // Add to Supabase
      const { error } = await supabase
        .from('testimonials')
        .insert([
          {
            id: newId,
            name: formData.name,
            role: formData.role,
            company: formData.company || null,
            image: formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}`,
            content: formData.content,
            rating: formData.rating,
            featured: formData.featured,
            created_at: new Date().toISOString(),
            user_id: user.id
          }
        ]);

      if (error) {
        throw error;
      }

      const newTestimonial: Testimonial = {
        id: newId,
        name: formData.name,
        role: formData.role,
        company: formData.company,
        image: formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}`,
        content: formData.content,
        rating: formData.rating,
        featured: formData.featured,
      };

      setTestimonials([...testimonials, newTestimonial]);

      toast({
        title: "Testimonial added",
        description: `Testimonial from ${formData.name} has been added successfully.`,
      });

      setIsAddDialogOpen(false);
      resetFormData();
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast({
        title: "Error adding testimonial",
        description: "There was a problem adding your testimonial. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update existing testimonial
  const handleUpdateTestimonial = async () => {
    if (!currentTestimonial || !user) return;

    try {
      setIsLoading(true);

      // Update in Supabase
      const { error } = await supabase
        .from('testimonials')
        .update({
          name: formData.name,
          role: formData.role,
          company: formData.company || null,
          image: formData.image,
          content: formData.content,
          rating: formData.rating,
          featured: formData.featured,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentTestimonial.id);

      if (error) {
        throw error;
      }

      const updatedTestimonials = testimonials.map(testimonial =>
        testimonial.id === currentTestimonial.id
          ? {
            ...testimonial,
            name: formData.name,
            role: formData.role,
            company: formData.company,
            image: formData.image,
            content: formData.content,
            rating: formData.rating,
            featured: formData.featured,
          }
          : testimonial
      );

      setTestimonials(updatedTestimonials);

      toast({
        title: "Testimonial updated",
        description: `Testimonial from ${formData.name} has been updated successfully.`,
      });

      setIsEditDialogOpen(false);
      resetFormData();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast({
        title: "Error updating testimonial",
        description: "There was a problem updating your testimonial. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete testimonial
  const handleDeleteTestimonial = async () => {
    if (!currentTestimonial || !user) return;

    try {
      setIsLoading(true);

      // Delete from Supabase
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', currentTestimonial.id);

      if (error) {
        throw error;
      }

      // Remove testimonial from state
      setTestimonials(testimonials.filter(t => t.id !== currentTestimonial.id));

      toast({
        title: "Testimonial deleted",
        description: `Testimonial from ${currentTestimonial.name} has been deleted successfully.`,
      });

      setIsDeleteDialogOpen(false);
      setCurrentTestimonial(null);
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error deleting testimonial",
        description: "There was a problem deleting your testimonial. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Testimonials</h1>
        <Button
          onClick={handleAddClick}
          className="bg-purple-600 hover:bg-purple-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          Add Testimonial
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search testimonials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditClick(testimonial)}
                  aria-label={`Edit testimonial from ${testimonial.name}`}
                  tabIndex={0}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClick(testimonial)}
                  aria-label={`Delete testimonial from ${testimonial.name}`}
                  tabIndex={0}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>

            <Quote className="h-8 w-8 text-yellow-400 mb-4" />

            <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>

            <div className="flex items-center">
              <div className="relative overflow-hidden rounded-full w-12 h-12 mr-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const initial = testimonial.name.charAt(0).toUpperCase();
                    const colors = [
                      '#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444',
                      '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316'
                    ];
                    const color = colors[initial.charCodeAt(0) % colors.length];

                    const canvas = document.createElement('canvas');
                    canvas.width = 100;
                    canvas.height = 100;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      ctx.fillStyle = color;
                      ctx.fillRect(0, 0, canvas.width, canvas.height);
                      ctx.fillStyle = 'white';
                      ctx.font = 'bold 48px Arial';
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
                      ctx.fillText(initial, canvas.width / 2, canvas.height / 2);
                      target.src = canvas.toDataURL('image/png');
                    }
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredTestimonials.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-lg shadow">
            <div className="mb-3">
              <Quote className="h-12 w-12 mx-auto text-gray-300" />
            </div>
            <p className="text-lg font-medium">No testimonials found</p>
            <p className="text-sm">Try a different search term or add a new testimonial</p>
          </div>
        )}
      </div>

      {/* Add Testimonial Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Testimonial</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Client name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Client role"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name (optional)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Testimonial</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="What the client said about your service..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <Slider
                defaultValue={[formData.rating]}
                min={1}
                max={5}
                step={1}
                onValueChange={handleRatingChange}
                className="py-4"
              />
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="flex flex-col items-center">
                    <Star
                      className={`h-4 w-4 ${num <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                    <span className="text-xs mt-1">{num}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={handleFeaturedChange}
              />
              <Label htmlFor="featured">Featured testimonial</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddTestimonial}
              disabled={isLoading || !formData.name || !formData.content}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? "Adding..." : "Add Testimonial"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Testimonial Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Input
                  id="edit-role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-company">Company</Label>
                <Input
                  id="edit-company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Profile Image URL</Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-content">Testimonial</Label>
              <Textarea
                id="edit-content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <Slider
                defaultValue={[formData.rating]}
                min={1}
                max={5}
                step={1}
                onValueChange={handleRatingChange}
                className="py-4"
              />
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="flex flex-col items-center">
                    <Star
                      className={`h-4 w-4 ${num <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                    <span className="text-xs mt-1">{num}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-featured"
                checked={formData.featured}
                onCheckedChange={handleFeaturedChange}
              />
              <Label htmlFor="edit-featured">Featured testimonial</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateTestimonial}
              disabled={isLoading || !formData.name || !formData.content}
              tabIndex={0}
              aria-label="Update testimonial"
            >
              Update Testimonial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the testimonial from {currentTestimonial?.name}?</p>
            <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteTestimonial}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Export both the named component and as default
const Testimonials = TestimonialsManagement;
export { TestimonialsManagement };
export default Testimonials;
