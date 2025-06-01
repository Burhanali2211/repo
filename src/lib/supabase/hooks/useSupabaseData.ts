import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { PostgrestError } from '@supabase/supabase-js';

type SupabaseDataHookOptions<T> = {
  initialData: T[];
  fetchFunction: () => Promise<{ data: T[] | null; error: PostgrestError | null }>;
  createFunction: (item: Omit<T, 'id'>) => Promise<{ data: T | null; error: PostgrestError | null }>;
  updateFunction: (id: string, item: Partial<Omit<T, 'id'>>) => Promise<{ data: T | null; error: PostgrestError | null }>;
  deleteFunction: (id: string) => Promise<{ data: T | null; error: PostgrestError | null }>;
  resourceName: string;
  mapper?: (data: unknown) => T;
};

/**
 * A reusable hook for handling CRUD operations with Supabase
 */
export const useSupabaseData = <T extends { id: string }>({
  initialData,
  fetchFunction,
  createFunction,
  updateFunction,
  deleteFunction,
  resourceName,
  mapper
}: SupabaseDataHookOptions<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to fetch data
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: fetchedData, error } = await fetchFunction();

      if (error) {
        throw error;
      }

      if (fetchedData) {
        // Apply custom mapping if provided
        const mappedData = mapper
          ? fetchedData.map(item => mapper(item))
          : fetchedData;

        setData(mappedData as T[]);
      } else {
        // Fallback to initial data if no data from Supabase
        setData(initialData);
      }
    } catch (error) {
      console.error(`Error loading ${resourceName}:`, error);
      toast({
        title: `Error loading ${resourceName}`,
        description: `There was a problem loading your ${resourceName}. Using local data instead.`,
        variant: 'destructive'
      });
      setData(initialData);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, initialData, mapper, resourceName, toast]);

  // Function to create a new item
  const createItem = useCallback(async (item: Omit<T, 'id'>) => {
    try {
      setIsLoading(true);
      const { data: createdData, error } = await createFunction(item);

      if (error) {
        throw error;
      }

      if (createdData) {
        // Apply custom mapping if provided
        const mappedItem = mapper
          ? mapper(createdData)
          : createdData;

        setData(prevData => [...prevData, mappedItem as T]);
        toast({
          title: `${resourceName} added`,
          description: `The ${resourceName} has been added successfully.`,
        });
        return { success: true, data: mappedItem as T };
      }
      return { success: false, data: null };
    } catch (error) {
      console.error(`Error adding ${resourceName}:`, error);
      toast({
        title: `Error adding ${resourceName}`,
        description: `There was a problem adding your ${resourceName}. Please try again.`,
        variant: 'destructive'
      });
      return { success: false, data: null, error };
    } finally {
      setIsLoading(false);
    }
  }, [createFunction, mapper, resourceName, toast]);

  // Function to update an item
  const updateItem = useCallback(async (id: string, item: Partial<Omit<T, 'id'>>) => {
    try {
      setIsLoading(true);
      const { data: updatedData, error } = await updateFunction(id, item);

      if (error) {
        throw error;
      }

      if (updatedData) {
        // Apply custom mapping if provided
        const mappedItem = mapper
          ? mapper(updatedData)
          : updatedData;

        setData(prevData => prevData.map(d => d.id === id ? (mappedItem as T) : d));
        toast({
          title: `${resourceName} updated`,
          description: `The ${resourceName} has been updated successfully.`,
        });
        return { success: true, data: mappedItem as T };
      }
      return { success: false, data: null };
    } catch (error) {
      console.error(`Error updating ${resourceName}:`, error);
      toast({
        title: `Error updating ${resourceName}`,
        description: `There was a problem updating your ${resourceName}. Please try again.`,
        variant: 'destructive'
      });
      return { success: false, data: null, error };
    } finally {
      setIsLoading(false);
    }
  }, [updateFunction, mapper, resourceName, toast]);

  // Function to delete an item
  const deleteItem = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const { error } = await deleteFunction(id);

      if (error) {
        throw error;
      }

      setData(prevData => prevData.filter(d => d.id !== id));
      toast({
        title: `${resourceName} deleted`,
        description: `The ${resourceName} has been deleted successfully.`,
      });
      return { success: true };
    } catch (error) {
      console.error(`Error deleting ${resourceName}:`, error);
      toast({
        title: `Error deleting ${resourceName}`,
        description: `There was a problem deleting your ${resourceName}. Please try again.`,
        variant: 'destructive'
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  }, [deleteFunction, resourceName, toast]);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    fetchData,
    createItem,
    updateItem,
    deleteItem
  };
};
