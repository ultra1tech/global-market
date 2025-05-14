
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface BlogLayoutProps {
  children: React.ReactNode;
}

const categories = [
  { name: "Seller Stories", slug: "seller-stories" },
  { name: "Cultural Insights", slug: "cultural-insights" },
  { name: "Shopping Guides", slug: "shopping-guides" },
  { name: "Artisan Spotlights", slug: "artisan-spotlights" },
  { name: "Sustainable Practices", slug: "sustainable-practices" },
  { name: "Market Trends", slug: "market-trends" }
];

const featuredPosts = [
  { title: "From Kerala to Kansas: A Spice Seller's Journey", slug: "spice-sellers-journey" },
  { title: "Handwoven Baskets: Centuries of Tradition", slug: "handwoven-baskets" },
  { title: "How to Spot Authentic Handmade Goods", slug: "authentic-handmade-goods" },
];

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {children}
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.slug}>
                    <Link 
                      to={`/blog/category/${category.slug}`} 
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Featured Posts</h3>
              <ul className="space-y-4">
                {featuredPosts.map(post => (
                  <li key={post.slug}>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest articles and marketplace news delivered to your inbox.
              </p>
              <div className="space-y-3">
                <Input placeholder="Enter your email" />
                <Button className="w-full">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogLayout;
