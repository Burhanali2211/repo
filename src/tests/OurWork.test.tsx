import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import OurWork from '../pages/OurWork';

// Mock the usePortfolio hook
jest.mock('../lib/supabase/hooks/usePortfolio', () => ({
  usePortfolio: () => ({
    data: [
      {
        id: 'test-1',
        title: 'Test Project with Technologies',
        category: 'Web Development',
        image: 'https://example.com/image.jpg',
        description: 'Test description',
        technologies: ['React', 'TypeScript', 'Node.js'],
        year: 2024,
        results: 'Test results',
        project_link: '/test-project',
        slug: 'test-project',
        status: 'published'
      },
      {
        id: 'test-2',
        title: 'Test Project with Null Technologies',
        category: 'Mobile Development',
        image: 'https://example.com/image2.jpg',
        description: 'Test description 2',
        technologies: null, // Test null case
        year: 2024,
        results: 'Test results 2',
        project_link: '/test-project-2',
        slug: 'test-project-2',
        status: 'published'
      },
      {
        id: 'test-3',
        title: 'Test Project with Undefined Technologies',
        category: 'IoT Solutions',
        image: 'https://example.com/image3.jpg',
        description: 'Test description 3',
        technologies: undefined, // Test undefined case
        year: 2024,
        results: 'Test results 3',
        project_link: '/test-project-3',
        slug: 'test-project-3',
        status: 'published'
      }
    ],
    isLoading: false,
    fetchByCategory: jest.fn()
  })
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>
}));

// Mock AnimatedSection
jest.mock('../components/AnimatedSection', () => {
  return function MockAnimatedSection({ children }: any) {
    return <div>{children}</div>;
  };
});

// Mock ImageWithFallback
jest.mock('../components/ui/image-with-fallback', () => {
  return function MockImageWithFallback({ alt, ...props }: any) {
    return <img alt={alt} {...props} />;
  };
});

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('OurWork Component', () => {
  test('renders without crashing', () => {
    renderWithProviders(<OurWork />);
    expect(screen.getByText('Our')).toBeInTheDocument();
  });

  test('handles technologies array correctly', () => {
    renderWithProviders(<OurWork />);
    
    // Should display technologies for the first project
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  test('handles null technologies gracefully without crashing', () => {
    renderWithProviders(<OurWork />);
    
    // Should not crash when technologies is null
    expect(screen.getByText('Test Project with Null Technologies')).toBeInTheDocument();
    
    // Should not display any technology badges for null technologies
    const projectCard = screen.getByText('Test Project with Null Technologies').closest('[data-testid]') || 
                       screen.getByText('Test Project with Null Technologies').closest('div');
    expect(projectCard).toBeInTheDocument();
  });

  test('handles undefined technologies gracefully without crashing', () => {
    renderWithProviders(<OurWork />);
    
    // Should not crash when technologies is undefined
    expect(screen.getByText('Test Project with Undefined Technologies')).toBeInTheDocument();
  });

  test('displays project titles and descriptions', () => {
    renderWithProviders(<OurWork />);
    
    expect(screen.getByText('Test Project with Technologies')).toBeInTheDocument();
    expect(screen.getByText('Test Project with Null Technologies')).toBeInTheDocument();
    expect(screen.getByText('Test Project with Undefined Technologies')).toBeInTheDocument();
    
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Test description 2')).toBeInTheDocument();
    expect(screen.getByText('Test description 3')).toBeInTheDocument();
  });

  test('displays search input', () => {
    renderWithProviders(<OurWork />);
    
    const searchInput = screen.getByPlaceholderText('Search projects...');
    expect(searchInput).toBeInTheDocument();
  });

  test('displays category filter buttons', () => {
    renderWithProviders(<OurWork />);
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Mobile Development')).toBeInTheDocument();
  });
});
