import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Portfolio from '../components/sections/Portfolio';

// Mock the usePortfolio hook
jest.mock('../lib/supabase/hooks/usePortfolio', () => ({
  usePortfolio: () => ({
    data: [
      {
        id: 'test-1',
        title: 'Test Project',
        category: 'Web Development',
        image: 'https://example.com/image.jpg',
        description: 'Test description',
        technologies: ['React', 'TypeScript', 'Node.js'],
        year: 2024,
        results: 'Test results',
        project_link: '/test-project',
        slug: 'test-project'
      },
      {
        id: 'test-2',
        title: 'Test Project 2',
        category: 'Mobile Development',
        image: 'https://example.com/image2.jpg',
        description: 'Test description 2',
        technologies: null, // Test null case
        year: 2024,
        results: 'Test results 2',
        project_link: '/test-project-2',
        slug: 'test-project-2'
      },
      {
        id: 'test-3',
        title: 'Test Project 3',
        category: 'IoT Solutions',
        image: 'https://example.com/image3.jpg',
        description: 'Test description 3',
        technologies: '["Vue.js", "Python"]', // Test JSON string case
        year: 2024,
        results: 'Test results 3',
        project_link: '/test-project-3',
        slug: 'test-project-3'
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
  }
}));

// Mock ProjectPreviewModal
jest.mock('../components/ProjectPreviewModal', () => {
  return function MockProjectPreviewModal() {
    return <div data-testid="project-preview-modal">Mock Modal</div>;
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

describe('Portfolio Component', () => {
  test('renders without crashing', () => {
    renderWithProviders(<Portfolio />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  test('handles technologies array correctly', () => {
    renderWithProviders(<Portfolio />);
    
    // Should display technologies for the first project
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  test('handles null technologies gracefully', () => {
    renderWithProviders(<Portfolio />);
    
    // Should not crash when technologies is null
    expect(screen.getByText('Test Project 2')).toBeInTheDocument();
  });

  test('handles JSON string technologies correctly', () => {
    renderWithProviders(<Portfolio />);
    
    // Should parse and display technologies from JSON string
    expect(screen.getByText('Vue.js')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  test('displays project categories', () => {
    renderWithProviders(<Portfolio />);
    
    // Check if category filter buttons are rendered
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Mobile Development')).toBeInTheDocument();
  });

  test('displays project descriptions', () => {
    renderWithProviders(<Portfolio />);
    
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Test description 2')).toBeInTheDocument();
    expect(screen.getByText('Test description 3')).toBeInTheDocument();
  });
});
