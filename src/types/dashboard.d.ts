// Type definitions for dashboard components
import React from 'react';

// Define common types used across dashboard components
declare global {
  // Icon type for lucide-react icons
  interface IconType {
    (props: { className?: string; size?: number | string }): JSX.Element;
  }

  // User type from AuthContext
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'client';
    company?: string;
  }

  // Project type from useProjects hook
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

  // Service type from useServices hook
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

  // Testimonial type from useTestimonials hook
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

  // WhatWeDo type from useWhatWeDo hook
  interface WhatWeDo {
    id: string;
    title: string;
    description: string;
    icon?: string;
    image?: string;
    featured: boolean;
    order_index: number;
  }

  // AboutContent type from useAboutContent hook
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

export {};
