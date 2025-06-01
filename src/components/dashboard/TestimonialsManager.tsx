import * as React from 'react';
const { useState } = React;
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTestimonials } from '@/hooks/useTestimonials';
import TestimonialModal from '@/components/dashboard/TestimonialModal';

const TestimonialsManager = () => {
  const { testimonials, loading, deleteTestimonial } = useTestimonials();
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTestimonials = testimonials.filter(testimonial => {
    // Add safety checks for all properties
    const nameMatch = testimonial?.name ? testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const companyMatch = testimonial?.company ? testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const contentMatch = testimonial?.content ? testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) : false;

    return nameMatch || companyMatch || contentMatch;
  });

  const handleEdit = (testimonial: any) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      await deleteTestimonial(id);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
        <Button onClick={handleCreate} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Testimonials</h2>
        </div>
        <div className="p-6">
          <div className="grid gap-6">
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map((testimonial, index) => (
                <div key={testimonial?.id || index} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{testimonial?.name || 'Unknown Author'}</h3>
                        {testimonial?.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {testimonial?.role || ''}{testimonial?.company ? `, ${testimonial.company}` : ''}
                      </p>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < (testimonial?.rating || 5)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 italic mb-4">"{testimonial?.content || 'No content'}"</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => testimonial && handleEdit(testimonial)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => testimonial?.id && handleDelete(testimonial.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No testimonials found. Create your first testimonial to get started!
              </div>
            )}
          </div>
        </div>
      </div>

      <TestimonialModal
        testimonial={selectedTestimonial}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTestimonial(null);
        }}
      />
    </div>
  );
};

export default TestimonialsManager;
