-- Sample Enhanced Projects Data for EasyIo.tech
-- This script adds comprehensive project data to test the new "Our Work" page functionality

-- Clear existing sample data
DELETE FROM projects WHERE title IN ('Sample Project', 'E-commerce Platform', 'Brand Identity', 'Mobile App');

-- Insert enhanced sample projects
INSERT INTO projects (
  title, slug, description, category, image, technologies, client_name,
  testimonial_text, featured, order_index, year, results, project_link,
  status, gallery_images, project_duration, budget_range, team_size
) VALUES
(
  'EcoCommerce Platform',
  'ecocommerce-platform',
  'A comprehensive e-commerce platform focused on sustainable products with advanced filtering, AI-powered recommendations, and carbon footprint tracking for each purchase.',
  'Web Development',
  'https://via.placeholder.com/800x600/10b981/ffffff?text=EcoCommerce+Platform',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS', 'TypeScript'],
  'GreenTech Solutions',
  'EasyIo transformed our vision into reality. The platform exceeded our expectations and helped us achieve 300% growth in sustainable product sales.',
  true,
  1,
  2024,
  'Achieved 300% increase in sales, 50% reduction in cart abandonment, and 95% customer satisfaction rating',
  'https://ecocommerce-demo.com',
  'published',
  ARRAY[
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=300&fit=crop'
  ],
  '4 months',
  '$25k - $50k',
  6
),
(
  'HealthTech Mobile App',
  'healthtech-mobile-app',
  'A revolutionary healthcare mobile application that connects patients with healthcare providers, featuring telemedicine, appointment scheduling, and health tracking.',
  'Mobile Development',
  'https://via.placeholder.com/800x600/3b82f6/ffffff?text=HealthTech+Mobile+App',
  ARRAY['React Native', 'Firebase', 'Node.js', 'MongoDB', 'Socket.io'],
  'MediCare Plus',
  'The app has revolutionized how our patients interact with our services. User engagement increased by 400% and patient satisfaction scores reached an all-time high.',
  true,
  2,
  2024,
  '400% increase in user engagement, 60% reduction in missed appointments, 4.8/5 app store rating',
  'https://healthtech-app.com',
  'published',
  ARRAY[
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
  ],
  '6 months',
  '$50k - $100k',
  8
),
(
  'FinTech Dashboard',
  'fintech-dashboard',
  'An advanced financial analytics dashboard for investment firms, featuring real-time market data, portfolio management, and AI-driven investment insights.',
  'Web Development',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  ARRAY['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Redis', 'Chart.js'],
  'InvestPro Capital',
  'This dashboard has become the cornerstone of our investment operations. The real-time analytics and insights have improved our decision-making process significantly.',
  false,
  3,
  2023,
  '25% improvement in investment decision accuracy, 40% reduction in analysis time',
  'https://fintech-dashboard-demo.com',
  'published',
  ARRAY[
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
  ],
  '5 months',
  '$75k - $150k',
  5
),
(
  'EdTech Learning Platform',
  'edtech-learning-platform',
  'A comprehensive online learning platform with interactive courses, live streaming, progress tracking, and AI-powered personalized learning paths.',
  'Web Development',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
  ARRAY['React', 'Node.js', 'MongoDB', 'WebRTC', 'AWS', 'Machine Learning'],
  'EduFuture Academy',
  'The platform has transformed our online education delivery. Student engagement increased dramatically and completion rates improved by 70%.',
  true,
  4,
  2023,
  '70% improvement in course completion rates, 85% student satisfaction, 200% increase in enrollment',
  'https://edtech-platform.com',
  'published',
  ARRAY[
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
  ],
  '8 months',
  '$100k - $200k',
  10
),
(
  'Smart IoT Agriculture System',
  'smart-iot-agriculture',
  'An innovative IoT-based agriculture monitoring system with sensors, automated irrigation, weather prediction, and crop health analytics.',
  'IoT Development',
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
  ARRAY['Arduino', 'Raspberry Pi', 'Python', 'React', 'InfluxDB', 'MQTT'],
  'AgriTech Innovations',
  'This system has revolutionized our farming operations. We achieved 30% water savings and 25% increase in crop yield.',
  false,
  5,
  2023,
  '30% reduction in water usage, 25% increase in crop yield, 50% reduction in manual monitoring',
  null,
  'published',
  ARRAY[
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop'
  ],
  '3 months',
  '$15k - $30k',
  4
),
(
  'Blockchain Supply Chain',
  'blockchain-supply-chain',
  'A blockchain-based supply chain management system ensuring transparency, traceability, and authenticity of products from manufacturer to consumer.',
  'Blockchain Development',
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
  ARRAY['Solidity', 'Ethereum', 'Web3.js', 'React', 'Node.js', 'IPFS'],
  'GlobalTrade Corp',
  'The blockchain solution provided complete transparency in our supply chain. Customer trust increased significantly and we reduced counterfeit issues by 95%.',
  false,
  6,
  2022,
  '95% reduction in counterfeit products, 100% supply chain transparency, 40% improvement in customer trust',
  'https://blockchain-supply.com',
  'published',
  ARRAY[
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop'
  ],
  '7 months',
  '$80k - $120k',
  7
),
(
  'AI-Powered Content Management',
  'ai-content-management',
  'An intelligent content management system with AI-powered content generation, SEO optimization, and automated social media scheduling.',
  'AI Development',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
  ARRAY['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL', 'OpenAI API'],
  'ContentPro Media',
  'This AI system has transformed our content creation process. We now produce 5x more content with better quality and engagement.',
  true,
  7,
  2024,
  '500% increase in content production, 60% improvement in engagement rates, 80% time savings',
  null,
  'draft',
  ARRAY[
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
  ],
  '4 months',
  '$40k - $80k',
  6
),
(
  'Virtual Reality Training Platform',
  'vr-training-platform',
  'An immersive VR training platform for industrial safety training, featuring realistic simulations and progress tracking.',
  'VR Development',
  'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=600&fit=crop',
  ARRAY['Unity', 'C#', 'Oculus SDK', 'WebXR', 'Node.js', 'MongoDB'],
  'SafetyFirst Industries',
  'The VR training platform has significantly improved our safety training effectiveness. Incident rates dropped by 60% after implementation.',
  false,
  8,
  2023,
  '60% reduction in workplace incidents, 90% improvement in training retention, 50% reduction in training costs',
  'https://vr-training-demo.com',
  'published',
  ARRAY[
    'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=300&fit=crop'
  ],
  '6 months',
  '$60k - $100k',
  5
);

-- Update the sample project count for better testing
UPDATE projects SET order_index = order_index + 10 WHERE order_index < 10;
