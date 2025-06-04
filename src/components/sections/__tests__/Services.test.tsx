import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Services from '../Services';
import { useServices } from '@/hooks/useServices';

// Mock the useServices hook
jest.mock('@/hooks/useServices');
const mockUseServices = useServices as jest.MockedFunction<typeof useServices>;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock AnimatedSection
jest.mock('@/components/AnimatedSection', () => {
  return function MockAnimatedSection({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  };
});

const mockServices = [
  {
    id: '1',
    title: 'Test Service 1',
    slug: 'test-service-1',
    description: 'This is a test service description',
    iconName: 'Globe',
    link: '/services/test-service-1',
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-blue-600',
    featured: true,
    order_index: 1
  },
  {
    id: '2',
    title: 'Test Service 2',
    slug: 'test-service-2',
    description: 'This is another test service description',
    iconName: 'Code',
    link: '/services/test-service-2',
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-cyan-600',
    featured: true,
    order_index: 2
  }
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Services Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    mockUseServices.mockReturnValue({
      services: [],
      loading: true,
      error: null,
      refetch: jest.fn()
    });

    renderWithRouter(<Services />);
    
    // Should show skeleton loading cards
    const skeletonCards = screen.getAllByRole('generic');
    expect(skeletonCards.length).toBeGreaterThan(0);
  });

  it('renders services correctly when data is loaded', async () => {
    mockUseServices.mockReturnValue({
      services: mockServices,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    renderWithRouter(<Services />);

    await waitFor(() => {
      expect(screen.getByText('Test Service 1')).toBeInTheDocument();
      expect(screen.getByText('Test Service 2')).toBeInTheDocument();
      expect(screen.getByText('This is a test service description')).toBeInTheDocument();
      expect(screen.getByText('This is another test service description')).toBeInTheDocument();
    });

    // Check for CTA buttons
    const exploreButtons = screen.getAllByText('Explore Service');
    expect(exploreButtons).toHaveLength(2);

    // Check for trust indicators
    expect(screen.getByText('500+ Happy Clients')).toBeInTheDocument();
    expect(screen.getByText('4.9/5 Rating')).toBeInTheDocument();
    expect(screen.getByText('24/7 Support')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    mockUseServices.mockReturnValue({
      services: [],
      loading: false,
      error: 'Failed to load services',
      refetch: jest.fn()
    });

    renderWithRouter(<Services />);

    expect(screen.getByText('Unable to load services')).toBeInTheDocument();
    expect(screen.getByText('Failed to load services')).toBeInTheDocument();
  });

  it('renders empty state correctly', () => {
    mockUseServices.mockReturnValue({
      services: [],
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    renderWithRouter(<Services />);

    expect(screen.getByText('No services available')).toBeInTheDocument();
    expect(screen.getByText('Check back soon for our latest offerings.')).toBeInTheDocument();
  });

  it('renders main CTA button', async () => {
    mockUseServices.mockReturnValue({
      services: mockServices,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    renderWithRouter(<Services />);

    await waitFor(() => {
      expect(screen.getByText('View All Services')).toBeInTheDocument();
    });
  });

  it('renders social proof section', async () => {
    mockUseServices.mockReturnValue({
      services: mockServices,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    renderWithRouter(<Services />);

    await waitFor(() => {
      expect(screen.getByText(/EasyIo.tech transformed our business operations/)).toBeInTheDocument();
      expect(screen.getByText('— Sarah Johnson, CEO at TechCorp')).toBeInTheDocument();
    });
  });
});
