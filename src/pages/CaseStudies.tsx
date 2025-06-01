import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  DollarSign,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import ImageWithFallback from '@/components/ui/image-with-fallback';

const CaseStudies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const caseStudies = [
    {
      id: 1,
      title: "EcoCommerce Platform Transformation",
      client: "GreenTech Solutions",
      category: "E-commerce",
      duration: "6 months",
      team: "8 developers",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      description: "Complete digital transformation of a sustainable products marketplace with AI-powered recommendations.",
      challenge: "Legacy system couldn't handle growing traffic and needed modern e-commerce features.",
      solution: "Built a scalable React/Node.js platform with microservices architecture and AI recommendations.",
      results: [
        { metric: "Revenue Increase", value: "150%" },
        { metric: "Page Load Speed", value: "3x Faster" },
        { metric: "User Engagement", value: "+85%" },
        { metric: "Mobile Conversions", value: "+120%" }
      ],
      technologies: ["React", "Node.js", "MongoDB", "AWS", "AI/ML"],
      featured: true
    },
    {
      id: 2,
      title: "HealthTech Telemedicine Platform",
      client: "MedConnect",
      category: "Healthcare",
      duration: "8 months",
      team: "12 specialists",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      description: "HIPAA-compliant telemedicine platform connecting patients with healthcare providers globally.",
      challenge: "Need for secure, scalable telemedicine solution during pandemic with strict compliance requirements.",
      solution: "Developed end-to-end encrypted platform with video consultations, prescription management, and patient records.",
      results: [
        { metric: "Patient Consultations", value: "50K+ Monthly" },
        { metric: "Provider Satisfaction", value: "98%" },
        { metric: "Platform Uptime", value: "99.9%" },
        { metric: "Response Time", value: "<2 seconds" }
      ],
      technologies: ["React Native", "WebRTC", "Node.js", "PostgreSQL", "AWS"],
      featured: true
    },
    {
      id: 3,
      title: "FinTech Investment Dashboard",
      client: "InvestPro",
      category: "Finance",
      duration: "4 months",
      team: "6 developers",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description: "Real-time investment analytics dashboard with AI-powered insights and portfolio management.",
      challenge: "Complex financial data visualization with real-time updates and regulatory compliance.",
      solution: "Built responsive dashboard with real-time data streams, advanced charting, and automated reporting.",
      results: [
        { metric: "Data Processing", value: "10x Faster" },
        { metric: "User Adoption", value: "95%" },
        { metric: "Trading Volume", value: "+200%" },
        { metric: "Client Retention", value: "98%" }
      ],
      technologies: ["Vue.js", "Python", "Redis", "WebSocket", "D3.js"],
      featured: false
    },
    {
      id: 4,
      title: "EdTech Learning Management System",
      client: "EduFuture",
      category: "Education",
      duration: "10 months",
      team: "15 specialists",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
      description: "Comprehensive LMS with interactive courses, live streaming, and AI-powered personalized learning.",
      challenge: "Creating engaging online learning experience with personalized content delivery at scale.",
      solution: "Developed adaptive learning platform with AI-driven content recommendations and interactive features.",
      results: [
        { metric: "Student Engagement", value: "+180%" },
        { metric: "Course Completion", value: "89%" },
        { metric: "Learning Outcomes", value: "+65%" },
        { metric: "Platform Users", value: "100K+" }
      ],
      technologies: ["React", "Django", "TensorFlow", "WebRTC", "PostgreSQL"],
      featured: false
    }
  ];

  const categories = ['all', ...Array.from(new Set(caseStudies.map(study => study.category)))];

  const filteredStudies = caseStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || study.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Explore our success stories and see how we've helped businesses transform 
              digitally and achieve remarkable results.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-12"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {filteredStudies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No case studies found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search criteria or filters.
              </p>
              <Button onClick={() => { setSearchTerm(''); setCategoryFilter('all'); }}>
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <ImageWithFallback
                        src={study.image}
                        alt={study.title}
                        className="w-full h-48 object-cover"
                      />
                      {study.featured && (
                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                          Featured
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{study.category}</Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{study.client}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {study.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                        {study.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                          {study.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                          {study.team}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {study.results.slice(0, 2).map((result, idx) => (
                          <div key={idx} className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                              {result.value}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {result.metric}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {study.technologies.slice(0, 3).map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {study.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{study.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        asChild 
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      >
                        <Link to={`/case-studies/${study.id}`}>
                          View Full Case Study
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="px-8 py-3 rounded-xl">
                <Link to="/our-work">View Our Portfolio</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
