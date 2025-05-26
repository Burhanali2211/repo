import React from 'react';
const { useState, useEffect } = React;
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WhatWeDo {
  id: string;
  title: string;
  description: string;
  icon?: string;
  link?: string;
  link_text?: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export const useWhatWeDo = () => {
  const [whatWeDo, setWhatWeDo] = useState<WhatWeDo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchWhatWeDo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('what_we_do')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setWhatWeDo(data || []);
    } catch (error) {
      console.error('Error fetching what we do:', error);
      toast({
        title: "Error",
        description: "Failed to fetch what we do items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createWhatWeDo = async (item: Omit<WhatWeDo, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('what_we_do')
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      
      await fetchWhatWeDo();
      toast({
        title: "Success",
        description: "Item created successfully",
      });
      return data;
    } catch (error) {
      console.error('Error creating what we do item:', error);
      toast({
        title: "Error",
        description: "Failed to create item",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateWhatWeDo = async (id: string, updates: Partial<WhatWeDo>) => {
    try {
      const { data, error } = await supabase
        .from('what_we_do')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchWhatWeDo();
      toast({
        title: "Success",
        description: "Item updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating what we do item:', error);
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteWhatWeDo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('what_we_do')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchWhatWeDo();
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting what we do item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchWhatWeDo();
  }, []);

  return {
    whatWeDo,
    loading,
    createWhatWeDo,
    updateWhatWeDo,
    deleteWhatWeDo,
    refetch: fetchWhatWeDo
  };
};
