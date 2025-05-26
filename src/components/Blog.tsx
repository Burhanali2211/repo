
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const blogPosts = [
  {
    title: 'The Future of Web Development: Trends to Watch in 2024',
    excerpt: 'Explore the latest trends shaping the web development landscape, from AI integration to progressive web apps.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    author: 'Alex Chen',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Development'
  },
  {
    title: 'Building Brand Identity in the Digital Age',
    excerpt: 'Learn how to create a compelling brand identity that resonates with your audience across all digital platforms.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    author: 'Maya Patel',
    date: '2024-01-12',
    readTime: '7 min read',
    category: 'Design'
  },
  {
    title: 'SEO Strategies That Actually Work in 2024',
    excerpt: 'Discover proven SEO techniques that drive real results, from technical optimization to content strategy.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop',
    author: 'David Rodriguez',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Marketing'
  }
];

const Blog = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed with our latest thoughts on design, development, and digital strategy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <Button variant="ghost" className="p-0 h-auto text-purple-600 hover:text-purple-700 font-medium">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
