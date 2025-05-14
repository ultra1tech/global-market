
import React from 'react';
import BlogLayout from './BlogLayout';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock blog posts data
const blogPosts = [
  {
    id: '1',
    title: "Traditional Artisans Meet Global Markets: Success Stories",
    excerpt: "How artisans from remote villages are finding success selling their handcrafted goods to international buyers through online marketplaces.",
    category: "Seller Stories",
    author: "Maria Rodriguez",
    date: "2023-05-15",
    imageUrl: "https://via.placeholder.com/600x400",
    slug: "artisans-global-markets"
  },
  {
    id: '2',
    title: "The Cultural Significance Behind Moroccan Pottery Designs",
    excerpt: "Explore the rich history and symbolism behind the vibrant patterns and colors found in traditional Moroccan pottery.",
    category: "Cultural Insights",
    author: "Ahmed Hassan",
    date: "2023-05-10",
    imageUrl: "https://via.placeholder.com/600x400",
    slug: "moroccan-pottery-designs"
  },
  {
    id: '3',
    title: "Sustainable Packaging Solutions for Small Sellers",
    excerpt: "Eco-friendly packaging options that won't break the bank for small businesses and independent artisans.",
    category: "Sustainable Practices",
    author: "Emily Chen",
    date: "2023-05-08",
    imageUrl: "https://via.placeholder.com/600x400",
    slug: "sustainable-packaging-solutions"
  },
  {
    id: '4',
    title: "From Grandmother's Kitchen to Global Brand: The Story of Maisa's Spices",
    excerpt: "How one woman turned her grandmother's secret spice blends into an international business selling authentic flavors worldwide.",
    category: "Seller Stories",
    author: "Priya Sharma",
    date: "2023-05-05",
    imageUrl: "https://via.placeholder.com/600x400",
    slug: "maisas-spices"
  },
  {
    id: '5',
    title: "The Art of Japanese Textiles: A Buyer's Guide",
    excerpt: "Everything you need to know about different Japanese textile techniques, materials, and what to look for when purchasing.",
    category: "Shopping Guides",
    author: "Kenji Tanaka",
    date: "2023-05-01",
    imageUrl: "https://via.placeholder.com/600x400",
    slug: "japanese-textiles-guide"
  },
  {
    id: '6',
    title: "How Fair Trade Marketplaces Are Transforming Rural Economies",
    excerpt: "The economic impact of fair trade practices and how digital marketplaces are helping remote communities thrive.",
    category: "Market Trends",
    author: "Daniel Wright",
    date: "2023-04-28",
    imageUrl: "https://via.placeholder.com/600x400",
    slug: "fair-trade-impact"
  }
];

const BlogPage: React.FC = () => {
  return (
    <BlogLayout>
      {/* Featured post - larger display */}
      <div className="mb-12">
        <div className="rounded-lg overflow-hidden">
          <img 
            src={blogPosts[0].imageUrl} 
            alt={blogPosts[0].title}
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="mt-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {blogPosts[0].category}
          </span>
          <h2 className="text-2xl font-bold mt-2 mb-3">
            <Link to={`/blog/${blogPosts[0].slug}`} className="hover:text-blue-600">
              {blogPosts[0].title}
            </Link>
          </h2>
          <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <p className="font-medium">{blogPosts[0].author}</p>
                <p className="text-xs text-gray-500">{blogPosts[0].date}</p>
              </div>
            </div>
            <Link to={`/blog/${blogPosts[0].slug}`}>
              <Button variant="outline">Read More</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.slice(1).map(post => (
            <Card key={post.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold mt-2 mb-2">
                  <Link to={`/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    By {post.author} • {post.date}
                  </div>
                  <Link to={`/blog/${post.slug}`} className="text-blue-600 text-sm hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" size="lg">Load More Articles</Button>
      </div>
    </BlogLayout>
  );
};

export default BlogPage;
