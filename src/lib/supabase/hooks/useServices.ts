import { useSupabaseData } from './useSupabaseData';
import {
  getPublicServices,
  getAllServices,
  createService,
  updateService,
  deleteService,
  type Service as SupabaseService
} from '../services';
import { Globe, Leaf, GraduationCap, Building2, Users, Wrench } from 'lucide-react';

// Available icons for selection (same as in the Services component)
const iconOptions = [
  { name: 'Globe', component: Globe },
  { name: 'Leaf', component: Leaf },
  { name: 'GraduationCap', component: GraduationCap },
  { name: 'Building2', component: Building2 },
  { name: 'Users', component: Users },
  { name: 'Wrench', component: Wrench },
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

// Default services data as fallback
const defaultServices: Service[] = [
  {
    id: 'default-1',
    icon: Leaf,
    title: 'Sustainable Agriculture Technology',
    description: 'Smart farming systems and eco-friendly agricultural solutions',
    link: '/services/agriculture-tech',
    color: 'bg-green-500',
    gradient: 'from-green-600 to-emerald-600',
    iconName: 'Leaf'
  },
  {
    id: 'default-2',
    icon: GraduationCap,
    title: 'School Management Systems',
    description: 'Comprehensive educational technology solutions',
    link: '/services/school-management',
    color: 'bg-blue-500',
    gradient: 'from-blue-600 to-indigo-600',
    iconName: 'GraduationCap'
  },
  {
    id: 'default-3',
    icon: Building2,
    title: 'Business Solutions',
    description: 'Enterprise software and business automation',
    link: '/services/business-solutions',
    color: 'bg-purple-500',
    gradient: 'from-purple-600 to-violet-600',
    iconName: 'Building2'
  },
  {
    id: 'default-4',
    icon: Users,
    title: 'Digital Marketing',
    description: 'SEO, social media, and online marketing strategies',
    link: '/services/digital-marketing',
    color: 'bg-pink-500',
    gradient: 'from-pink-600 to-rose-600',
    iconName: 'Users'
  },
  {
    id: 'default-5',
    icon: Globe,
    title: 'Web Development',
    description: 'Modern websites and web applications',
    link: '/services/web-development',
    color: 'bg-cyan-500',
    gradient: 'from-cyan-600 to-blue-600',
    iconName: 'Globe'
  },
  {
    id: 'default-6',
    icon: Wrench,
    title: 'Technical Services',
    description: 'IT support and technical consulting',
    link: '/services/technical-services',
    color: 'bg-orange-500',
    gradient: 'from-orange-600 to-red-600',
    iconName: 'Wrench'
  }
];

// Create a hook for working with services
export const useServices = () => {
  // Use the generic Supabase data hook with service-specific config
  return useSupabaseData<Service>({
    initialData: defaultServices,
    fetchFunction: getPublicServices,
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
