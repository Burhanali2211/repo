import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  // Remove featured and order_index as they don't exist in the database
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      console.log('Fetching services...');
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*');

      console.log('Services data:', data, fetchError);

      if (fetchError) {
        console.error('Error fetching services:', fetchError);
        setError(fetchError.message);
        return;
      }

      const mappedServices = (data || []).map(service => ({
        id: service.id,
        title: service.title,
        slug: service.slug,
        description: service.description,
        icon: service.icon,
        image: service.image
      }));

      setServices(mappedServices);
    } catch (error) {
      console.error('Exception in fetchServices:', error);
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
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
