
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogLayout from './BlogLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Facebook, Twitter, Linkedin, Share2, Bookmark } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // In a real app, fetch the blog post based on the slug
  // For now, we'll use mock data
  const post = {
    title: "Traditional Artisans Meet Global Markets: Success Stories",
    content: `
      <p class="mb-4">In the remote village of Santa María Tlahuitoltepec, Oaxaca, Mexico, a group of women artisans have been creating traditional blouses known as "huipiles" for generations. These intricate garments take weeks to create, with patterns that tell stories of their Mixe culture and heritage.</p>
      
      <p class="mb-4">For centuries, these artisans sold their work locally or to the occasional tourist who ventured to their mountain village. The limited market meant their exquisite craftsmanship often sold for a fraction of its true value.</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">The Digital Transformation</h2>
      
      <p class="mb-4">Today, things are different. Maria Gonzalez, the leader of the collective, navigates her smartphone with ease, checking new orders that have come in from customers in New York, Tokyo, and Berlin. Her collective now earns five times what they made just three years ago, selling directly to global consumers who value the authenticity and craftsmanship of their work.</p>
      
      <p class="mb-4">"The marketplace opened doors we never knew existed," Maria explains. "We now set our own prices that reflect the time and skill in our work. But more importantly, we're preserving our traditions because young people see there is a future in our crafts."</p>
      
      <blockquote class="border-l-4 border-blue-500 pl-4 italic my-6">
        "Technology hasn't changed how we make our textiles - we still use techniques passed down for generations. What's changed is who can appreciate and purchase our work." - Maria Gonzalez
      </blockquote>
      
      <h2 class="text-xl font-bold mt-8 mb-4">Challenges and Solutions</h2>
      
      <p class="mb-4">The journey wasn't without challenges. Language barriers, shipping logistics, and digital literacy were initial hurdles. This is where marketplaces that specifically cater to artisans have made a difference.</p>
      
      <p class="mb-4">Platforms like B.A.W. Marketplace provide more than just a place to list products. They offer translation services, shipping solutions, and even photography assistance to help artisans present their work effectively to a global audience.</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">Success Stories Beyond Mexico</h2>
      
      <p class="mb-4">Similar stories are emerging worldwide. In northern Thailand, Hmong embroiderers are selling traditional baby carriers to conscious consumers in Scandinavia. In rural Rwanda, basket weavers supply high-end home decor stores in America.</p>
      
      <p class="mb-4">These artisans share a common theme in their journey: online marketplaces have provided them with both economic opportunity and cultural validation. Their traditional skills, rather than becoming obsolete in our digital age, are finding new appreciation.</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">The Future of Artisan Commerce</h2>
      
      <p class="mb-4">The global handmade market is projected to reach $984 billion by 2023, suggesting the trend toward authentic, handcrafted goods is more than a passing fancy. As consumers increasingly seek meaningful alternatives to mass-produced items, artisans who can share their stories and connect with this market stand to benefit significantly.</p>
      
      <p class="mb-4">For Maria's collective and thousands of others like them, the future looks bright. Technology hasn't replaced their traditional skills—it has amplified their reach and impact, ensuring these cultural treasures will continue for generations to come.</p>
    `,
    author: "Maria Rodriguez",
    authorBio: "Maria Rodriguez is a journalist specializing in global craft traditions and their evolution in the digital marketplace.",
    date: "May 15, 2023",
    category: "Seller Stories",
    readTime: "6 min read",
    featuredImage: "https://via.placeholder.com/900x500",
    tags: ["artisans", "global commerce", "traditional crafts", "digital marketplace"]
  };

  return (
    <BlogLayout>
      <div className="mb-6">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {post.category}
        </span>
        <h1 className="text-3xl font-bold mt-2">{post.title}</h1>
        <div className="flex items-center mt-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
          <div>
            <p className="font-medium">{post.author}</p>
            <div className="flex text-sm text-gray-500">
              <p>{post.date}</p>
              <span className="mx-2">•</span>
              <p>{post.readTime}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden mb-8">
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-auto"
        />
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <Facebook className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Twitter className="h-4 w-4 mr-2" />
            Tweet
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Linkedin className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
      
      <article className="prose lg:prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }}>
      </article>
      
      <div className="flex flex-wrap gap-2 mb-10">
        {post.tags.map(tag => (
          <Link 
            key={tag} 
            to={`/blog/tag/${tag}`}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
          >
            #{tag}
          </Link>
        ))}
      </div>
      
      <Card className="p-6 mb-10">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
          <div>
            <h3 className="font-bold text-lg mb-2">About {post.author}</h3>
            <p className="text-gray-600 mb-4">{post.authorBio}</p>
            <Button variant="outline">View All Articles</Button>
          </div>
        </div>
      </Card>
      
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-6">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://via.placeholder.com/300x200" 
                  alt="Related article"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold mb-2">Another Amazing Seller Story</h4>
                <p className="text-sm text-gray-600 mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Link to="/blog/another-post" className="text-blue-600 hover:underline text-sm">
                  Read More →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="border-t pt-10">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold">Enjoy this article?</h3>
          <p className="text-gray-600">Subscribe to our newsletter to get the latest insights on global artisans and marketplace trends.</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 border rounded-lg" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogPostPage;
