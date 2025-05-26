import { supabase, isAuthenticated, getCurrentUser } from '../client';
import type { PostgrestError } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';

// Service type definition
export type Service = {
  id: string;
  title: string;
  description: string;
  link: string;
  color: string;
  gradient: string;
  iconName: string; // Added iconName field for icon storage
  created_at?: string;
  updated_at?: string;
  user_id?: string; // User ID for RLS
};

// Extended service type for UI with additional fields
export type ExtendedService = Service & {
  // Any additional UI-specific fields would go here
};

// Type for creating a new service
export type CreateServiceDTO = Omit<Service, 'id' | 'created_at' | 'updated_at'>;

// Response type
export type ServiceResponse = {
  data: Service[] | Service | null;
  error: PostgrestError | null;
};

// Constants
const TABLE_NAME = 'services';

/**
 * Fetch all services from Supabase for the authenticated user
 */
export const getAllServices = async (): Promise<ServiceResponse> => {
  try {
    // Check if user is authenticated
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      console.error('Authentication required to fetch services');
      return { 
        data: null, 
        error: {
          message: 'Authentication required',
          details: 'User must be logged in to access services',
          hint: 'Please log in and try again',
          code: '42501',
          name: 'auth_required'
        } 
      };
    }

    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      console.error('Failed to get current user');
      return { 
        data: null, 
        error: {
          message: 'User not found',
          details: 'Failed to retrieve current user',
          hint: 'Please log in again',
          code: '42501',
          name: 'user_not_found'
        } 
      };
    }

    // Fetch services for the current user
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('user_id', user.id) // Filter by user_id to satisfy RLS policy
      .order('created_at', { ascending: false });

    return { data, error };
  } catch (error) {
    console.error('Unexpected error in getAllServices:', error);
    return { 
      data: null, 
      error: error as PostgrestError 
    };
  }
};

/**
 * Validate if string is a valid UUID
 */
const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuid ? uuidRegex.test(uuid) : false;
};

/**
 * Fetch a single service by ID for the authenticated user
 */
export const getServiceById = async (id: string): Promise<ServiceResponse> => {
  try {
    // Validate UUID before making the request
    if (!id || !isValidUUID(id)) {
      console.error('Invalid UUID format:', id);
      return {
        data: null,
        error: {
          message: 'Invalid UUID format',
          details: 'The provided ID is not a valid UUID',
          hint: 'Ensure the ID is in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
          code: '22P02',
          name: 'invalid_uuid_format'
        }
      };
    }
    
    // Check if user is authenticated
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      console.error('Authentication required to fetch service');
      return { 
        data: null, 
        error: {
          message: 'Authentication required',
          details: 'User must be logged in to access services',
          hint: 'Please log in and try again',
          code: '42501',
          name: 'auth_required'
        } 
      };
    }
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      console.error('Failed to get current user');
      return { 
        data: null, 
        error: {
          message: 'User not found',
          details: 'Failed to retrieve current user',
          hint: 'Please log in again',
          code: '42501',
          name: 'user_not_found'
        } 
      };
    }

    // Fetch service for the current user
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id) // Filter by user_id to satisfy RLS policy
      .single();

    return { data, error };
  } catch (error) {
    console.error('Unexpected error in getServiceById:', error);
    return { 
      data: null, 
      error: error as PostgrestError 
    };
  }
};

/**
 * Create a new service for the authenticated user
 */
export const createService = async (service: CreateServiceDTO): Promise<ServiceResponse> => {
  try {
    // Check if user is authenticated
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      console.error('Authentication required to create service');
      return { 
        data: null, 
        error: {
          message: 'Authentication required',
          details: 'User must be logged in to create services',
          hint: 'Please log in and try again',
          code: '42501',
          name: 'auth_required'
        } 
      };
    }
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      console.error('Failed to get current user');
      return { 
        data: null, 
        error: {
          message: 'User not found',
          details: 'Failed to retrieve current user',
          hint: 'Please log in again',
          code: '42501',
          name: 'user_not_found'
        } 
      };
    }

    // Add user_id to the service to satisfy RLS policy
    const serviceWithUserId = {
      ...service,
      user_id: user.id
    };

    // Create the service
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert(serviceWithUserId)
      .select()
      .single();

    if (error) {
      console.error('Error creating service:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error in createService:', error);
    return { 
      data: null, 
      error: error as PostgrestError 
    };
  }
};

/**
 * Update an existing service for the authenticated user
 */
export const updateService = async (id: string, service: Partial<CreateServiceDTO>): Promise<ServiceResponse> => {
  try {
    // Validate UUID
    if (!id || !isValidUUID(id)) {
      console.error('Invalid UUID format for update:', id);
      return {
        data: null,
        error: {
          message: 'Invalid UUID format',
          details: 'The provided ID is not a valid UUID',
          hint: 'Ensure the ID is in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
          code: '22P02',
          name: 'invalid_uuid_format'
        }
      };
    }

    // Check if user is authenticated
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      console.error('Authentication required to update service');
      return { 
        data: null, 
        error: {
          message: 'Authentication required',
          details: 'User must be logged in to update services',
          hint: 'Please log in and try again',
          code: '42501',
          name: 'auth_required'
        } 
      };
    }
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      console.error('Failed to get current user');
      return { 
        data: null, 
        error: {
          message: 'User not found',
          details: 'Failed to retrieve current user',
          hint: 'Please log in again',
          code: '42501',
          name: 'user_not_found'
        } 
      };
    }

    // First check if the service exists and belongs to the current user
    const { data: existingService, error: checkError } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id) // Ensure the service belongs to the user (RLS)
      .maybeSingle(); // Use maybeSingle to prevent errors if not found
    
    if (checkError) {
      console.error('Error checking for existing service:', checkError);
      return { data: null, error: checkError };
    }
    
    if (!existingService) {
      console.log('Service does not exist, creating new one for user:', user.id);
      
      // Prepare service data including iconName
      const newServiceData = {
        title: service.title,
        description: service.description,
        link: service.link,
        color: service.color,
        gradient: service.gradient,
        iconName: service.iconName // Include iconName for proper icon display
      };

      // Add user_id to the service to satisfy RLS policy
      const serviceWithUserId = {
        ...newServiceData,
        user_id: user.id
      };

      // If service doesn't exist, create a new one
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert(serviceWithUserId)
        .select()
        .single();
      
      return { data, error };
    }
    
    // If it exists, update it (ensuring it belongs to the current user)
    console.log('Updating existing service with ID:', id);
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(service)
      .eq('id', id)
      .eq('user_id', user.id) // Ensure the service belongs to the user (RLS)
      .select()
      .single();

    return { data, error };
  } catch (error) {
    console.error('Unexpected error in updateService:', error);
    return { data: null, error: error as PostgrestError };
  }
};

/**
 * Delete a service for the authenticated user
 */
export const deleteService = async (id: string): Promise<ServiceResponse> => {
  try {
    // Validate UUID before proceeding
    if (!id || !isValidUUID(id)) {
      console.error('Invalid UUID format for deletion:', id);
      return {
        data: null,
        error: {
          message: 'Invalid UUID format',
          details: 'The provided ID is not a valid UUID',
          hint: 'Ensure the ID is in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
          code: '22P02',
          name: 'invalid_uuid_format'
        }
      };
    }

    // Check if user is authenticated
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      console.error('Authentication required to delete service');
      return { 
        data: null, 
        error: {
          message: 'Authentication required',
          details: 'User must be logged in to delete services',
          hint: 'Please log in and try again',
          code: '42501',
          name: 'auth_required'
        } 
      };
    }
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      console.error('Failed to get current user');
      return { 
        data: null, 
        error: {
          message: 'User not found',
          details: 'Failed to retrieve current user',
          hint: 'Please log in again',
          code: '42501',
          name: 'user_not_found'
        } 
      };
    }

    // First check if the service exists and belongs to the current user
    const { data: existingData, error: checkError } = await supabase
      .from(TABLE_NAME)
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id) // Ensure the service belongs to the user (RLS)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking for existing service:', checkError);
      return { data: null, error: checkError };
    }

    if (!existingData) {
      console.warn(`Service with ID ${id} not found for deletion or doesn't belong to user ${user.id}`);
      return {
        data: null,
        error: {
          message: 'Service not found',
          details: `No service with ID ${id} exists for the current user`,
          hint: 'Check if the service was already deleted or belongs to another user',
          code: 'PGRST116',
          name: 'service_not_found'
        }
      };
    }

    // Now perform the delete operation - applying user_id filter for RLS
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id)
      .eq('user_id', user.id) // Ensure the service belongs to the user (RLS)
      .select();

    // Log the deletion result
    if (error) {
      console.error(`Error deleting service ${id}:`, error);
    } else {
      console.log(`Successfully deleted service ${id} for user ${user.id}`);
    }

    // Handle empty results - if delete was successful but no data returned
    if (!error && (!data || data.length === 0)) {
      return { data: null, error: null };
    }

    return { data: data?.[0] || null, error };
  } catch (error) {
    console.error('Unexpected error in deleteService:', error);
    return { data: null, error: error as PostgrestError };
  }
};
