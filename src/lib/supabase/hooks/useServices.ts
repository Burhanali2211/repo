import { useSupabaseData } from './useSupabaseData';
import { 
  getAllServices, 
  createService, 
  updateService, 
  deleteService,
  type Service as SupabaseService 
} from '../services';
import { services as initialServicesData } from '@/components/sections/Services';
import { Globe } from 'lucide-react';

// Available icons for selection (same as in the Services component)
const iconOptions = [
  { name: 'Globe', component: Globe },
  // Add other icons as needed - these should match the ones in your Services component
];

// Service type definition for UI
export type Service = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  color: string;
  gradient: string;
  iconName: string;
};

// Mapper function to convert Supabase service to UI service
const serviceMapper = (item: SupabaseService): Service => {
  // Find the icon component by name
  const iconOption = iconOptions.find(
    option => option.name === item.iconName
  );
  const iconComponent = iconOption ? iconOption.component : Globe;
  
  return {
    id: item.id,
    icon: iconComponent,
    title: item.title,
    description: item.description,
    link: item.link,
    color: item.color,
    gradient: item.gradient,
    iconName: item.iconName
  };
};

// Default services
const defaultServices = initialServicesData.map(service => ({
  ...service,
  id: crypto.randomUUID(),
  iconName: 'Globe' // Ensure iconName is included
}));

// Create a hook for working with services
export const useServices = () => {
  // Use the generic Supabase data hook with service-specific config
  return useSupabaseData<Service>({
    initialData: defaultServices,
    fetchFunction: getAllServices,
    createFunction: (service) => {
      // Convert UI service format to Supabase format
      const supabaseData = {
        title: service.title,
        description: service.description,
        link: service.link,
        color: service.color,
        gradient: service.gradient,
        iconName: service.iconName,
      };
      return createService(supabaseData);
    },
    updateFunction: (id, service) => {
      // Extract the relevant properties for Supabase
      const supabaseData = {
        ...(service.title !== undefined && { title: service.title }),
        ...(service.description !== undefined && { description: service.description }),
        ...(service.link !== undefined && { link: service.link }),
        ...(service.color !== undefined && { color: service.color }),
        ...(service.gradient !== undefined && { gradient: service.gradient }),
        ...(service.iconName !== undefined && { iconName: service.iconName }),
      };
      return updateService(id, supabaseData);
    },
    deleteFunction: deleteService,
    resourceName: 'service',
    mapper: serviceMapper
  });
};
