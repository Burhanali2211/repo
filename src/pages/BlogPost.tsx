import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

// Mock blog data - same as in Blog.tsx
const blogPosts = [
  {
    id: '1',
    title: 'The Future of Digital Identity',
    excerpt: 'Exploring how blockchain and decentralized technologies are transforming digital identity management.',
    content: `
      <p>Digital identity is undergoing a profound transformation, driven by blockchain technology and decentralized systems. These innovations are reshaping how we think about identity management, offering new paradigms for security, privacy, and user control.</p>
      
      <h2>The Problem with Traditional Identity Systems</h2>
      <p>For decades, our digital identities have been fragmented across countless platforms and services. Each requires its own credentials, creating security vulnerabilities and a poor user experience. Centralized identity providers hold enormous power over our data, often monetizing it without our explicit consent.</p>
      
      <p>This fragmentation leads to several critical issues:</p>
      <ul>
        <li>Password fatigue and reuse, creating security vulnerabilities</li>
        <li>Data breaches exposing personal information</li>
        <li>Limited user control over how identity data is used</li>
        <li>Exclusion of individuals without access to traditional identity documents</li>
      </ul>
      
      <h2>Blockchain and Self-Sovereign Identity</h2>
      <p>Blockchain technology enables a new approach: self-sovereign identity (SSI). This model gives individuals ownership and control over their digital identities without relying on centralized authorities.</p>
      
      <p>Key components of blockchain-based identity systems include:</p>
      <ul>
        <li><strong>Decentralized Identifiers (DIDs):</strong> Unique identifiers that users control independently of any central registry</li>
        <li><strong>Verifiable Credentials:</strong> Cryptographically secure attestations about an identity subject</li>
        <li><strong>Zero-Knowledge Proofs:</strong> Allowing users to prove specific attributes without revealing unnecessary information</li>
      </ul>
      
      <h2>Real-World Applications</h2>
      <p>These technologies are already finding practical applications across various sectors:</p>
      
      <p><strong>Financial Services:</strong> Streamlining KYC processes while enhancing privacy and reducing fraud</p>
      <p><strong>Healthcare:</strong> Giving patients control over their medical records while ensuring data integrity</p>
      <p><strong>Education:</strong> Creating tamper-proof academic credentials that can be instantly verified</p>
      <p><strong>Government Services:</strong> Developing digital ID systems that protect privacy while improving access to services</p>
      
      <h2>Challenges and Considerations</h2>
      <p>Despite its promise, blockchain-based identity faces significant hurdles:</p>
      <ul>
        <li>Technical complexity and usability issues</li>
        <li>Regulatory uncertainty across different jurisdictions</li>
        <li>Integration with legacy systems</li>
        <li>Ensuring inclusivity for all populations</li>
      </ul>
      
      <h2>The Path Forward</h2>
      <p>As these technologies mature, we're likely to see hybrid systems emerge that combine the best aspects of centralized and decentralized approaches. The key will be developing solutions that prioritize user control while meeting regulatory requirements and offering intuitive user experiences.</p>
      
      <p>The transformation of digital identity won't happen overnight, but the direction is clear: we're moving toward a future where individuals have greater agency over their digital selves, with profound implications for privacy, security, and digital interaction.</p>
    `,
    author: 'Alex Johnson',
    authorTitle: 'Blockchain Specialist',
    authorBio: 'Alex has been researching blockchain applications for digital identity since 2018. Previously worked at ConsenSys and the World Economic Forum.',
    date: '2025-05-10',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000',
    readTime: '5 min read',
    tags: ['Blockchain', 'Digital Identity', 'Self-Sovereign Identity', 'Privacy']
  },
  {
    id: '2',
    title: 'Securing Your Online Presence',
    excerpt: 'Best practices for protecting your digital identity and personal information in an increasingly connected world.',
    content: `
      <p>In today's hyper-connected world, your digital identity is as valuable as your physical one—perhaps even more so. Protecting it has never been more important or more challenging.</p>
      
      <h2>The Growing Threat Landscape</h2>
      <p>Cyber threats continue to evolve in sophistication and scale. From phishing attacks to data breaches, the risks to your personal information are numerous and constantly changing.</p>
      
      <p>Recent statistics paint a concerning picture:</p>
      <ul>
        <li>Identity theft affected over 15 million Americans last year</li>
        <li>The average cost of a data breach now exceeds $4 million</li>
        <li>Phishing attempts increased by 350% during the pandemic</li>
        <li>Credential stuffing attacks have risen by 750% since 2023</li>
      </ul>
      
      <h2>Essential Security Practices</h2>
      <p>While no security measure is foolproof, implementing these practices can significantly reduce your risk:</p>
      
      <h3>Password Management</h3>
      <p>Strong, unique passwords are your first line of defense. Consider these guidelines:</p>
      <ul>
        <li>Use a reputable password manager to generate and store complex passwords</li>
        <li>Enable two-factor authentication (2FA) whenever possible</li>
        <li>Regularly audit and update your credentials</li>
        <li>Consider passwordless authentication options where available</li>
      </ul>
      
      <h3>Data Minimization</h3>
      <p>The less information you share, the less vulnerable you are:</p>
      <ul>
        <li>Regularly review privacy settings on social media and other platforms</li>
        <li>Be selective about which services you share your data with</li>
        <li>Use temporary or alias email addresses for non-essential services</li>
        <li>Regularly delete accounts you no longer use</li>
      </ul>
      
      <h3>Network Security</h3>
      <p>Securing your connections is critical:</p>
      <ul>
        <li>Use a reputable VPN, especially on public Wi-Fi</li>
        <li>Keep your home router firmware updated</li>
        <li>Consider network segmentation for IoT devices</li>
        <li>Regularly scan for unauthorized devices on your network</li>
      </ul>
      
      <h2>Responding to Security Incidents</h2>
      <p>Even with the best precautions, breaches can occur. Having a response plan is essential:</p>
      <ol>
        <li>Change passwords immediately for affected accounts</li>
        <li>Enable additional security measures like credit freezes</li>
        <li>Report the incident to relevant authorities</li>
        <li>Monitor your accounts for suspicious activity</li>
      </ol>
      
      <h2>The Future of Personal Security</h2>
      <p>As threats evolve, so do protective measures. Keep an eye on emerging technologies:</p>
      <ul>
        <li>Biometric authentication becoming more sophisticated and secure</li>
        <li>Zero-knowledge proofs allowing verification without data exposure</li>
        <li>AI-powered threat detection for personal use</li>
        <li>Decentralized identity solutions reducing single points of failure</li>
      </ul>
      
      <p>Remember that security is not a one-time effort but an ongoing process. Staying informed about new threats and regularly updating your security practices is the best way to protect your digital identity in an ever-changing landscape.</p>
    `,
    author: 'Samantha Lee',
    authorTitle: 'Cybersecurity Analyst',
    authorBio: 'Samantha specializes in personal cybersecurity and has helped thousands of individuals protect their digital identities through her consulting practice and workshops.',
    date: '2025-05-05',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000',
    readTime: '7 min read',
    tags: ['Cybersecurity', 'Privacy', 'Password Management', 'Data Protection']
  },
  {
    id: '3',
    title: 'Web3 and Identity: A New Paradigm',
    excerpt: 'How Web3 technologies are enabling self-sovereign identity and changing the way we think about digital ownership.',
    content: 'Full article content here...',
    author: 'Michael Chen',
    authorTitle: 'Web3 Developer',
    authorBio: 'Michael builds decentralized applications focused on identity and data ownership. Former engineer at Ethereum Foundation.',
    date: '2025-04-28',
    category: 'Web3',
    image: 'https://images.unsplash.com/photo-1642059889111-3a55ad767045?q=80&w=1000',
    readTime: '8 min read',
    tags: ['Web3', 'Blockchain', 'Decentralization', 'Digital Ownership']
  },
  {
    id: '4',
    title: 'The Role of Biometrics in Modern Authentication',
    excerpt: 'Examining how biometric technologies are enhancing security while simplifying the user experience.',
    content: 'Full article content here...',
    author: 'Rachel Green',
    authorTitle: 'UX Researcher',
    authorBio: 'Rachel specializes in the intersection of security and user experience, with a focus on biometric authentication systems.',
    date: '2025-04-20',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000',
    readTime: '6 min read',
    tags: ['Biometrics', 'Authentication', 'UX Design', 'Security']
  },
  {
    id: '5',
    title: 'Privacy in the Age of AI',
    excerpt: 'Balancing the benefits of artificial intelligence with the need to protect personal data and identity.',
    content: 'Full article content here...',
    author: 'David Wilson',
    authorTitle: 'AI Ethics Researcher',
    authorBio: 'David studies the ethical implications of AI systems, particularly regarding privacy and identity. Author of "AI and the Future of Privacy".',
    date: '2025-04-15',
    category: 'Privacy',
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1000',
    readTime: '9 min read',
    tags: ['AI', 'Privacy', 'Ethics', 'Data Protection']
  },
  {
    id: '6',
    title: 'Digital Identity for the Unbanked',
    excerpt: 'How new identity solutions are helping bring financial services to underserved populations around the world.',
    content: 'Full article content here...',
    author: 'Elena Rodriguez',
    authorTitle: 'Financial Inclusion Advocate',
    authorBio: 'Elena works with NGOs to implement digital identity solutions for underserved communities, focusing on financial inclusion initiatives.',
    date: '2025-04-08',
    category: 'Inclusion',
    image: 'https://images.unsplash.com/photo-1607968565043-35d210b7e4e8?q=80&w=1000',
    readTime: '7 min read',
    tags: ['Financial Inclusion', 'Digital Identity', 'Global Development']
  }
];

// Related posts suggestion function
const getRelatedPosts = (currentPostId: string, category: string, tags: string[]) => {
  return blogPosts
    .filter(post => post.id !== currentPostId && 
      (post.category === category || post.tags.some(tag => tags.includes(tag))))
    .slice(0, 3);
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  
  useEffect(() => {
    // Find the post with the matching ID
    const foundPost = blogPosts.find(post => post.id === id);
    
    if (foundPost) {
      setPost(foundPost);
      // Get related posts based on category and tags
      setRelatedPosts(getRelatedPosts(foundPost.id, foundPost.category, foundPost.tags));
      
      // Scroll to top when post changes
      window.scrollTo(0, 0);
    }
  }, [id]);
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <p className="text-gray-400 mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog">
            <Button className="bg-gradient-to-r from-yellow-400 to-purple-600 text-white">
              Return to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all articles
        </Link>
        
        {/* Article header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-purple-600 bg-clip-text text-transparent">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
        
        {/* Featured image */}
        <div className="mb-10 rounded-xl overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Article content */}
        <div className="prose prose-lg prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag: string) => (
            <div 
              key={tag} 
              className="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full flex items-center"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </div>
          ))}
        </div>
        
        {/* Share buttons */}
        <div className="border-t border-gray-800 pt-8 mb-12">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Share2 className="h-4 w-4 mr-2" />
            Share this article
          </h3>
          <div className="flex gap-3">
            <Button variant="outline" size="icon" className="rounded-full border-gray-700 text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-gray-700 text-gray-400 hover:text-white hover:bg-blue-400 hover:border-blue-400">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-gray-700 text-gray-400 hover:text-white hover:bg-blue-700 hover:border-blue-700">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Author bio */}
        <div className="bg-gray-900 rounded-xl p-6 mb-16 border border-gray-800">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-purple-600">
              <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-purple-600 text-white text-xl">
                {post.author.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold mb-1">{post.author}</h3>
              <p className="text-purple-400 text-sm mb-3">{post.authorTitle}</p>
              <p className="text-gray-400 text-sm">{post.authorBio}</p>
            </div>
          </div>
        </div>
        
        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Card key={relatedPost.id} className="bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
                  <Link to={`/blog/${relatedPost.id}`} className="block">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-400 mb-2">
                        {formatDate(relatedPost.date)} • {relatedPost.readTime}
                      </div>
                      <h3 className="font-bold mb-2 line-clamp-2 hover:text-yellow-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Newsletter signup */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl border border-gray-800 text-center">
          <h3 className="text-2xl font-bold mb-2">Enjoyed this article?</h3>
          <p className="text-gray-400 mb-6">Subscribe to our newsletter for more insights on digital identity and technology</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Button className="bg-gradient-to-r from-yellow-400 to-purple-600 text-white hover:opacity-90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
