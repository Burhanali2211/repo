import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTestimonials, type Testimonial } from '@/lib/supabase/hooks/useTestimonials';

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
}

const TestimonialModal = ({ testimonial, isOpen, onClose }: TestimonialModalProps) => {
  const { createItem: createTestimonial, updateItem: updateTestimonial } = useTestimonials();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    avatar: '',
    rating: 5,
    featured: false,
    order_index: 0
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name || '',
        role: testimonial.role || '',
        company: testimonial.company || '',
        content: testimonial.content || '',
        avatar: testimonial.avatar || '',
        rating: testimonial.rating || 5,
        featured: testimonial.featured || false,
        order_index: testimonial.order_index || 0
      });
    } else {
      setFormData({
        name: '',
        role: '',
        company: '',
        content: '',
        avatar: '',
        rating: 5,
        featured: false,
        order_index: 0
      });
    }
  }, [testimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (testimonial) {
        await updateTestimonial(testimonial.id, formData);
      } else {
        await createTestimonial(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <h2 id="testimonial-modal-title" className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
            {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="role">Role/Position</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="content">Testimonial Content</Label>
              <textarea
                id="content"
                className="w-full p-2 border rounded-md"
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="avatar">Avatar URL (Optional)</Label>
              <Input
                id="avatar"
                value={formData.avatar}
                onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
              />
            </div>

            <div>
              <Label>Rating</Label>
              <div className="flex items-center space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingChange(rating)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${rating <= formData.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="order_index">Order Index</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="featured">Featured Testimonial</Label>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                {testimonial ? 'Update' : 'Create'} Testimonial
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimonialModal;
