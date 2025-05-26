import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Mock blog data
const blogPosts = [
  {
    id: '1',
    title: 'The Future of Digital Identity',
    excerpt: 'Exploring how blockchain and decentralized technologies are transforming digital identity management.',
    author: 'Alex Johnson',
    date: '2025-05-10',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Securing Your Online Presence',
    excerpt: 'Best practices for protecting your digital identity and personal information in an increasingly connected world.',
    author: 'Samantha Lee',
    date: '2025-05-05',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Web3 and Identity: A New Paradigm',
    excerpt: 'How Web3 technologies are enabling self-sovereign identity and changing the way we think about digital ownership.',
    author: 'Michael Chen',
    date: '2025-04-28',
    category: 'Web3',
    image: 'https://images.unsplash.com/photo-1642059889111-3a55ad767045?q=80&w=1000',
    readTime: '8 min read'
  },
  {
    id: '4',
    title: 'The Role of Biometrics in Modern Authentication',
    excerpt: 'Examining how biometric technologies are enhancing security while simplifying the user experience.',
    author: 'Rachel Green',
    date: '2025-04-20',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000',
    readTime: '6 min read'
  },
  {
    id: '5',
    title: 'Privacy in the Age of AI',
    excerpt: 'Balancing the benefits of artificial intelligence with the need to protect personal data and identity.',
    author: 'David Wilson',
    date: '2025-04-15',
    category: 'Privacy',
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1000',
    readTime: '9 min read'
  },
  {
    id: '6',
    title: 'Digital Identity for the Unbanked',
    excerpt: 'How new identity solutions are helping bring financial services to underserved populations around the world.',
    author: 'Elena Rodriguez',
    date: '2025-04-08',
    category: 'Inclusion',
    image: 'https://images.unsplash.com/photo-1607968565043-35d210b7e4e8?q=80&w=1000',
    readTime: '7 min read'
  }
];

// Available categories for filtering
const categories = ['All', 'Technology', 'Security', 'Web3', 'Privacy', 'Inclusion'];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-purple-600 bg-clip-text text-transparent">
          Our Blog
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Insights, updates, and expert perspectives on digital identity and technology
        </p>
        
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 bg-gray-800 border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category 
                  ? "bg-gradient-to-r from-yellow-400 to-purple-600 text-white" 
                  : "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <article 
              key={post.id} 
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <span>{formatDate(post.date)}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-white hover:text-yellow-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-purple-600 flex items-center justify-center text-white font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <span className="ml-2 text-sm text-gray-300">{post.author}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <h3 className="text-xl font-medium text-gray-300 mb-2">No matching articles found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      {/* Newsletter signup */}
      <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="text-gray-400">Subscribe to our newsletter for the latest articles and insights</p>
        </div>
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 bg-gray-800 border-gray-700 text-white"
          />
          <Button className="bg-gradient-to-r from-yellow-400 to-purple-600 text-white hover:opacity-90">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
