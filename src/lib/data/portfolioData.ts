// Portfolio project data with fallback images to prevent loading issues
export const initialProjects = [
  {
    id: 1,
    title: 'Chinar Brand Saffron',
    category: 'E-Commerce',
    image: 'https://via.placeholder.com/800x600/f59e0b/ffffff?text=Chinar+Brand+Saffron',
    description: 'Premium saffron brand with a sophisticated e-commerce platform featuring product authentication, personalized recommendations, and secure checkout.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
    year: 2023,
    results: '45% increase in online sales',
    link: '/portfolio/chinar-brand'
  },
  {
    id: 2,
    title: 'Rakesh Travels',
    category: 'Travel & Tourism',
    image: 'https://via.placeholder.com/800x600/3b82f6/ffffff?text=Rakesh+Travels',
    description: 'Complete digital transformation for a travel agency with real-time booking, itinerary management, and virtual tour experiences.',
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Google Maps API'],
    year: 2024,
    results: '300% increase in online bookings',
    link: '/portfolio/rakesh-travels'
  },
  {
    id: 3,
    title: 'Kadeem Holidays',
    category: 'Travel & Tourism',
    image: 'https://via.placeholder.com/800x600/10b981/ffffff?text=Kadeem+Holidays',
    description: 'Immersive vacation booking platform with 360° previews, AI-powered travel recommendations, and dynamic pricing optimization.',
    technologies: ['Vue.js', 'Firebase', 'TensorFlow.js', 'Cloudinary'],
    year: 2023,
    results: '87% increase in customer engagement',
    link: '/portfolio/kadeem-holidays'
  },
  {
    id: 4,
    title: 'Sobha Sales Center',
    category: 'Real Estate',
    image: 'https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Sobha+Sales+Center',
    description: 'Interactive digital showcase for luxury real estate featuring 3D floor plans, virtual property tours, and investment analytics.',
    technologies: ['React', 'Three.js', 'Express', 'AWS'],
    year: 2024,
    results: '67% increase in lead generation',
    link: '/portfolio/sobha-sales'
  },
  {
    id: 5,
    title: 'Tiger Group',
    category: 'Corporate',
    image: 'https://via.placeholder.com/800x600/ef4444/ffffff?text=Tiger+Group',
    description: 'Enterprise-grade corporate website with multi-language support, integrated CRM, and real-time analytics dashboard.',
    technologies: ['Angular', 'ASP.NET Core', 'SQL Server', 'Power BI'],
    year: 2023,
    results: '52% reduction in bounce rate',
    link: '/portfolio/tiger-group'
  }
];

// Portfolio categories
export const categories = [
  'All',
  'E-Commerce',
  'Web Development',
  'Mobile Apps',
  'Branding',
  'Corporate',
  'Real Estate',
  'Travel & Tourism'
];
