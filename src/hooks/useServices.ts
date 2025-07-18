import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  iconName?: string;
  image?: string;
  link?: string;
  color?: string;
  gradient?: string;
  featured?: boolean;
  order_index?: number;
}

// Default services to display when database is empty or unavailable
const defaultServices: Service[] = [
  {
    id: 'default-1',
    title: 'Sustainable Agriculture Technology',
    slug: 'agriculture-technology',
    description: 'Smart farming systems and eco-friendly agricultural solutions that revolutionize modern farming practices.',
    iconName: 'Leaf',
    link: '/services/agriculture-technology',
    color: 'bg-green-500',
    gradient: 'from-emerald-500 to-green-600',
    featured: true,
    order_index: 1
  },
  {
    id: 'default-2',
    title: 'School Management Systems',
    slug: 'school-management',
    description: 'Comprehensive educational technology solutions for modern schools and educational institutions.',
    iconName: 'GraduationCap',
    link: '/services/school-management',
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-cyan-600',
    featured: true,
    order_index: 2
  },
  {
    id: 'default-3',
    title: 'Business Solutions',
    slug: 'business-solutions',
    description: 'Custom business software and process optimization to streamline your operations and boost productivity.',
    iconName: 'Building2',
    link: '/services/business-solutions',
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-indigo-600',
    featured: true,
    order_index: 3
  },
  {
    id: 'default-4',
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    description: 'Complete digital transformation services to modernize your business and stay competitive.',
    iconName: 'Globe',
    link: '/services/digital-transformation',
    color: 'bg-sky-500',
    gradient: 'from-sky-500 to-blue-600',
    featured: true,
    order_index: 4
  },
  {
    id: 'default-5',
    title: 'Technical Services',
    slug: 'technical-services',
    description: 'Professional prototyping and technical design services including 3D printing and PCB design.',
    iconName: 'Wrench',
    link: '/services/technical-services',
    color: 'bg-pink-500',
    gradient: 'from-pink-500 to-rose-600',
    featured: true,
    order_index: 5
  },
  {
    id: 'default-6',
    title: 'Cloud Services',
    slug: 'cloud-services',
    description: 'Scalable cloud infrastructure and services to power your applications and ensure reliability.',
    iconName: 'Cloud',
    link: '/services/cloud-services',
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-blue-600',
    featured: true,
    order_index: 6
  }
];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      console.log('Fetching services...');
      setLoading(true);
      setError(null);

      // Simple database query without timeout for now
      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*');
      console.log('Supabase response:', { data, error: fetchError });

      if (fetchError) {
        console.warn('Error fetching services from database:', fetchError);
        console.log('Keeping default services as fallback');
        // Don't change services, keep the default ones
        setError(null); // Don't show error, just use defaults
        return;
      }

      // If we have data from the database, use it
      if (data && data.length > 0) {
        console.log('Found services in database:', data.length);
        const mappedServices = data.map(service => ({
          id: service.id,
          title: service.title,
          slug: service.slug,
          description: service.description,
          icon: service.icon,
          iconName: service.icon || service.iconName || 'Code', // Map icon to iconName for compatibility
          image: service.image,
          link: service.slug ? `/services/${service.slug}` : `/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`, // Generate link from slug or title
          color: service.color || 'bg-purple-500', // Default color
          gradient: service.gradient || 'from-purple-600 to-blue-600', // Default gradient
          featured: service.featured || false,
          order_index: service.order_index || 0
        }));

        setServices(mappedServices);
      } else {
        // If no data from database, use default services
        console.log('No services found in database, using default services');
        setServices(defaultServices);
      }
    } catch (error) {
      console.warn('Exception in fetchServices:', error);
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Database connection timed out, keeping default services');
      } else {
        console.log('Database error, keeping default services');
      }
      // Don't change services, keep the default ones that were set in useState
      setError(null); // Don't show error, just use defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set a maximum loading time of 3 seconds
    const maxLoadingTimeout = setTimeout(() => {
      if (loading) {
        console.log('Max loading time reached, showing default services');
        setLoading(false);
      }
    }, 3000);

    fetchServices().finally(() => {
      clearTimeout(maxLoadingTimeout);
    });

    return () => {
      clearTimeout(maxLoadingTimeout);
    };
  }, []);

  const createService = async (serviceData: Omit<Service, 'id'>) => {
    try {
      console.log('Creating service:', serviceData);
      const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select()
        .single();

      if (error) {
        console.error('Error creating service:', error);
        throw error;
      }

      console.log('Service created:', data);
      await fetchServices();
      return data;
    } catch (error) {
      console.error('Exception in createService:', error);
      throw error;
    }
  };

  const updateService = async (id: string, serviceData: Partial<Service>) => {
    try {
      console.log('Updating service:', id, serviceData);
      const { data, error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating service:', error);
        throw error;
      }

      console.log('Service updated:', data);
      await fetchServices();
      return data;
    } catch (error) {
      console.error('Exception in updateService:', error);
      throw error;
    }
  };

  const deleteService = async (id: string) => {
    try {
      console.log('Deleting service:', id);
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting service:', error);
        throw error;
      }

      console.log('Service deleted:', id);
      await fetchServices();
    } catch (error) {
      console.error('Exception in deleteService:', error);
      throw error;
    }
  };

  return {
    services,
    loading,
    error,
    createService,
    updateService,
    deleteService,
    refetch: fetchServices
  };
};
