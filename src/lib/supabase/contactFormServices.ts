import { supabase } from '@/integrations/supabase/client';

export interface ContactFormField {
  id: string;
  created_at: string;
  updated_at: string;
  field_name: string;
  field_label: string;
  field_type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  field_placeholder?: string;
  field_options?: any; // JSONB for select, checkbox, radio options
  is_required: boolean;
  is_active: boolean;
  order_index: number;
  validation_rules?: any; // JSONB for validation rules
  help_text?: string;
}

export interface CreateContactFormFieldData {
  field_name: string;
  field_label: string;
  field_type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  field_placeholder?: string;
  field_options?: any;
  is_required?: boolean;
  is_active?: boolean;
  order_index?: number;
  validation_rules?: any;
  help_text?: string;
}

/**
 * Get all contact form fields
 */
export const getAllContactFormFields = async (): Promise<ContactFormField[]> => {
  try {
    const { data, error } = await supabase
      .from('contact_form_fields')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching contact form fields:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllContactFormFields:', error);
    return [];
  }
};

/**
 * Get all contact form fields (including inactive)
 */
export const getAllContactFormFieldsAdmin = async (): Promise<ContactFormField[]> => {
  try {
    const { data, error } = await supabase
      .from('contact_form_fields')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching contact form fields for admin:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllContactFormFieldsAdmin:', error);
    return [];
  }
};

/**
 * Create a new contact form field
 */
export const createContactFormField = async (data: CreateContactFormFieldData): Promise<ContactFormField | null> => {
  try {
    const { data: field, error } = await supabase
      .from('contact_form_fields')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error creating contact form field:', error);
      return null;
    }

    return field;
  } catch (error) {
    console.error('Error in createContactFormField:', error);
    return null;
  }
};

/**
 * Update a contact form field
 */
export const updateContactFormField = async (id: string, data: Partial<CreateContactFormFieldData>): Promise<ContactFormField | null> => {
  try {
    const { data: field, error } = await supabase
      .from('contact_form_fields')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating contact form field:', error);
      return null;
    }

    return field;
  } catch (error) {
    console.error('Error in updateContactFormField:', error);
    return null;
  }
};

/**
 * Delete a contact form field
 */
export const deleteContactFormField = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('contact_form_fields')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact form field:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteContactFormField:', error);
    return false;
  }
};

/**
 * Reorder contact form fields
 */
export const reorderContactFormFields = async (fieldIds: string[]): Promise<boolean> => {
  try {
    const updates = fieldIds.map((id, index) => ({
      id,
      order_index: index + 1
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from('contact_form_fields')
        .update({ order_index: update.order_index })
        .eq('id', update.id);

      if (error) {
        console.error('Error reordering contact form field:', error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in reorderContactFormFields:', error);
    return false;
  }
};

/**
 * Subscribe to contact form fields changes
 */
export const subscribeToContactFormFields = (callback: (payload: any) => void) => {
  return supabase
    .channel('contact_form_fields_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'contact_form_fields'
      },
      callback
    )
    .subscribe();
};

/**
 * Toggle contact form field active status
 */
export const toggleContactFormFieldStatus = async (id: string, isActive: boolean): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('contact_form_fields')
      .update({ is_active: isActive })
      .eq('id', id);

    if (error) {
      console.error('Error toggling contact form field status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in toggleContactFormFieldStatus:', error);
    return false;
  }
};

/**
 * Get contact form field by ID
 */
export const getContactFormFieldById = async (id: string): Promise<ContactFormField | null> => {
  try {
    const { data, error } = await supabase
      .from('contact_form_fields')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching contact form field by ID:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getContactFormFieldById:', error);
    return null;
  }
};

/**
 * Duplicate a contact form field
 */
export const duplicateContactFormField = async (id: string): Promise<ContactFormField | null> => {
  try {
    const originalField = await getContactFormFieldById(id);
    if (!originalField) return null;

    const duplicateData: CreateContactFormFieldData = {
      field_name: `${originalField.field_name}_copy`,
      field_label: `${originalField.field_label} (Copy)`,
      field_type: originalField.field_type,
      field_placeholder: originalField.field_placeholder,
      field_options: originalField.field_options,
      is_required: originalField.is_required,
      is_active: false, // Start as inactive
      order_index: originalField.order_index + 1,
      validation_rules: originalField.validation_rules,
      help_text: originalField.help_text
    };

    return await createContactFormField(duplicateData);
  } catch (error) {
    console.error('Error in duplicateContactFormField:', error);
    return null;
  }
};
