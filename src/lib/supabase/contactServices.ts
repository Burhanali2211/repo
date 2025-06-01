import { supabase } from '@/integrations/supabase/client';

export interface ContactMessage {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  source: string;
  ip_address?: string;
  user_agent?: string;
  admin_notes?: string;
  replied_at?: string;
  replied_by?: string;
}

export interface CreateContactMessageData {
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
  ip_address?: string;
  user_agent?: string;
}

export interface UpdateContactMessageData {
  status?: 'new' | 'read' | 'replied' | 'archived';
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  admin_notes?: string;
  replied_at?: string;
  replied_by?: string;
}

/**
 * Create a new contact message
 */
export const createContactMessage = async (data: CreateContactMessageData): Promise<ContactMessage | null> => {
  try {
    console.log('Creating contact message with data:', data);

    const insertData = {
      name: data.name,
      email: data.email,
      company: data.company || null,
      message: data.message,
      source: data.source || 'contact_form',
      ip_address: data.ip_address || null,
      user_agent: data.user_agent || null,
    };

    console.log('Insert data:', insertData);

    const { data: message, error } = await supabase
      .from('contact_messages')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating contact message:', error);
      return null;
    }

    console.log('Contact message created successfully:', message);
    return message;
  } catch (error) {
    console.error('Exception creating contact message:', error);
    return null;
  }
};

/**
 * Get all contact messages with optional filtering
 */
export const getAllContactMessages = async (
  status?: string,
  priority?: string,
  limit?: number
): Promise<ContactMessage[]> => {
  try {
    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (priority) {
      query = query.eq('priority', priority);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data: messages, error } = await query;

    if (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }

    return messages || [];
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }
};

/**
 * Get a single contact message by ID
 */
export const getContactMessageById = async (id: string): Promise<ContactMessage | null> => {
  try {
    const { data: message, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching contact message:', error);
      return null;
    }

    return message;
  } catch (error) {
    console.error('Error fetching contact message:', error);
    return null;
  }
};

/**
 * Update a contact message
 */
export const updateContactMessage = async (
  id: string,
  data: UpdateContactMessageData
): Promise<ContactMessage | null> => {
  try {
    const { data: message, error } = await supabase
      .from('contact_messages')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating contact message:', error);
      return null;
    }

    return message;
  } catch (error) {
    console.error('Error updating contact message:', error);
    return null;
  }
};

/**
 * Delete a contact message
 */
export const deleteContactMessage = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact message:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return false;
  }
};

/**
 * Mark a message as read
 */
export const markMessageAsRead = async (id: string, userId?: string): Promise<boolean> => {
  try {
    const updateData: UpdateContactMessageData = {
      status: 'read'
    };

    const { error } = await supabase
      .from('contact_messages')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error marking message as read:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error marking message as read:', error);
    return false;
  }
};

/**
 * Mark a message as replied
 */
export const markMessageAsReplied = async (id: string, userId?: string): Promise<boolean> => {
  try {
    const updateData: UpdateContactMessageData = {
      status: 'replied',
      replied_at: new Date().toISOString(),
      replied_by: userId
    };

    const { error } = await supabase
      .from('contact_messages')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error marking message as replied:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error marking message as replied:', error);
    return false;
  }
};

/**
 * Get message statistics
 */
export const getMessageStats = async () => {
  try {
    const { data: messages, error } = await supabase
      .from('contact_messages')
      .select('status, priority, created_at');

    if (error) {
      console.error('Error fetching message stats:', error);
      return {
        total: 0,
        new: 0,
        read: 0,
        replied: 0,
        archived: 0,
        high_priority: 0,
        urgent: 0
      };
    }

    const stats = {
      total: messages.length,
      new: messages.filter(m => m.status === 'new').length,
      read: messages.filter(m => m.status === 'read').length,
      replied: messages.filter(m => m.status === 'replied').length,
      archived: messages.filter(m => m.status === 'archived').length,
      high_priority: messages.filter(m => m.priority === 'high').length,
      urgent: messages.filter(m => m.priority === 'urgent').length
    };

    return stats;
  } catch (error) {
    console.error('Error fetching message stats:', error);
    return {
      total: 0,
      new: 0,
      read: 0,
      replied: 0,
      archived: 0,
      high_priority: 0,
      urgent: 0
    };
  }
};

/**
 * Subscribe to real-time contact message changes
 */
export const subscribeToContactMessages = (callback: (payload: unknown) => void) => {
  return supabase
    .channel('contact_messages')
    .on('postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'contact_messages'
      },
      callback
    )
    .subscribe();
};
