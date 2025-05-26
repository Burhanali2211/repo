import { useSupabaseData } from './useSupabaseData';
import { 
  getAllTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial,
  type Testimonial as SupabaseTestimonial 
} from '../services';
import { testimonials as initialTestimonialsData } from '@/components/sections/Testimonials';

// Testimonial type definition for UI
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string; // Mapped from avatar in Supabase
  content: string;
  rating: number;
  featured: boolean;
};

// Mapper function to convert Supabase testimonial to UI testimonial
const testimonialMapper = (item: SupabaseTestimonial): Testimonial => ({
  id: item.id,
  name: item.name,
  role: item.role,
  company: item.company || '',
  image: item.avatar, // Map from avatar to image
  content: item.content,
  rating: item.rating,
  featured: item.featured || false
});

// Default testimonials
const defaultTestimonials = initialTestimonialsData.map(testimonial => ({
  id: crypto.randomUUID(),
  name: testimonial.name,
  role: testimonial.role,
  company: '',
  image: testimonial.image,
  content: testimonial.content,
  rating: testimonial.rating,
  featured: false
}));

// Create a hook for working with testimonials
export const useTestimonials = () => {
  // Use the generic Supabase data hook with testimonial-specific config
  return useSupabaseData<Testimonial>({
    initialData: defaultTestimonials,
    fetchFunction: getAllTestimonials,
    createFunction: (testimonial) => {
      // Convert UI testimonial format to Supabase format
      const supabaseData = {
        ...testimonial,
        avatar: testimonial.image, // Map image to avatar
        // Remove the image field as it's not in the Supabase schema
        image: undefined as any
      };
      return createTestimonial(supabaseData);
    },
    updateFunction: (id, testimonial) => {
      // Convert UI testimonial format to Supabase format if image is present
      const supabaseData: any = { ...testimonial };
      if ('image' in testimonial) {
        supabaseData.avatar = testimonial.image;
        delete supabaseData.image;
      }
      return updateTestimonial(id, supabaseData);
    },
    deleteFunction: deleteTestimonial,
    resourceName: 'testimonial',
    mapper: testimonialMapper
  });
};
