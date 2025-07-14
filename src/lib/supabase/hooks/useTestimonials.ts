import { useSupabaseData } from './useSupabaseData';
import {
  getPublicTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  type Testimonial as SupabaseTestimonial
} from '../services';

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

// Default testimonials data as fallback
const defaultTestimonials: Testimonial[] = [
  {
    id: 'default-1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc.',
    image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff',
    content: 'EasyIo.tech transformed our business with their innovative IoT solutions. Their team delivered exceptional results that exceeded our expectations.',
    rating: 5,
    featured: true
  },
  {
    id: 'default-2',
    name: 'Michael Chen',
    role: 'Principal',
    company: 'Greenfield Academy',
    image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=10b981&color=fff',
    content: 'The school management system they developed has streamlined our operations completely. Student tracking and administration has never been easier.',
    rating: 5,
    featured: true
  },
  {
    id: 'default-3',
    name: 'Emily Rodriguez',
    role: 'Farm Owner',
    company: 'Rodriguez Organic Farms',
    image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=f59e0b&color=fff',
    content: 'Their sustainable agriculture technology helped us increase crop yield by 40% while reducing water usage. Truly innovative solutions!',
    rating: 5,
    featured: true
  }
];

// Create a hook for working with testimonials
export const useTestimonials = () => {
  // Use the generic Supabase data hook with testimonial-specific config
  return useSupabaseData<Testimonial>({
    initialData: defaultTestimonials,
    fetchFunction: getPublicTestimonials,
    createFunction: (testimonial) => {
      // Convert UI testimonial format to Supabase format
      const supabaseData = {
        ...testimonial,
        avatar: testimonial.image, // Map image to avatar
        // Remove the image field as it's not in the Supabase schema
        image: undefined as unknown
      };
      return createTestimonial(supabaseData);
    },
    updateFunction: (id, testimonial) => {
      // Convert UI testimonial format to Supabase format if image is present
      const supabaseData: Record<string, unknown> = { ...testimonial };
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
