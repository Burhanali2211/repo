import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTestimonials, Testimonial } from '@/hooks/useTestimonials';

interface TestimonialModalProps {
  testimonial: any | null;
  isOpen: boolean;
  onClose: () => void;
}

const TestimonialModal = ({ testimonial, isOpen, onClose }: TestimonialModalProps) => {
  const { createTestimonial, updateTestimonial } = useTestimonials();
  const [formData, setFormData] = useState({
    author: '',
    position: '',
    company: '',
    content: '',
    image: '',
    rating: 5,
    featured: false,
    order_index: 0
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        author: testimonial.author || '',
        position: testimonial.position || '',
        company: testimonial.company || '',
        content: testimonial.content || '',
        image: testimonial.image || '',
        rating: testimonial.rating || 5,
        featured: testimonial.featured || false,
        order_index: testimonial.order_index || 0
      });
    } else {
      setFormData({
        author: '',
        position: '',
        company: '',
        content: '',
        image: '',
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="author">Author Name</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="position">Position/Title</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
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
            <Label htmlFor="image">Image URL (Optional)</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
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
                    className={`h-6 w-6 ${
                      rating <= formData.rating
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
  );
};

export default TestimonialModal;
