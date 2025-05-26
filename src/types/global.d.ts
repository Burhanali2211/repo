// Global type declarations for the dashboard
import * as React from 'react';

// Augment the React namespace
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
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
    content_data: any;
    order_index: number;
    is_active: boolean;
  }
}

// Make TypeScript happy with module exports
export {};
