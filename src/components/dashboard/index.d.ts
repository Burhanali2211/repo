import * as React from 'react';
import * as LucideReact from 'lucide-react';

// Re-export the React namespace to ensure components have access to React types
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      className?: string;
    }
  }
}

// Define icon props interface
declare module 'lucide-react' {
  interface IconProps extends React.SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
    className?: string;
  }
}

// Project related types
interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image?: string;
  technologies: string[];
  client?: string;
  testimonial?: string;
  featured: boolean;
  order_index: number;
}

// Service related types
interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  featured: boolean;
  order_index: number;
}

// Testimonial related types
interface Testimonial {
  id: string;
  author: string;
  position: string;
  company?: string;
  content: string;
  image?: string;
  rating: number;
  featured: boolean;
  order_index: number;
}

// WhatWeDo related types
interface WhatWeDo {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  featured: boolean;
  order_index: number;
}

// AboutContent related types
interface AboutContent {
  id: string;
  section_type: string;
  title: string;
  description?: string;
  year?: string;
  content_data: Record<string, unknown>;
  order_index: number;
  is_active: boolean;
}

// Define props for modal components
interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
}

interface WhatWeDoModalProps {
  item: WhatWeDo | null;
  isOpen: boolean;
  onClose: () => void;
}

interface AboutContentModalProps {
  content: AboutContent | null;
  isOpen: boolean;
  onClose: () => void;
}
