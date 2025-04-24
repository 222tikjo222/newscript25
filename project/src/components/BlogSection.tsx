import React from 'react';
import { Link } from './ui/Link';
import { Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Driving into the Future: Exploring Car Safety and Technology Innovations',
    excerpt: 'Discover the latest technological innovations that are making vehicles safer and more connected than ever before.',
    date: 'April 15, 2025',
    imageUrl: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: 'driving-into-future-safety-tech'
  },
  {
    id: 2,
    title: 'Embarking on Your First Interstate Motortrip: Making the Drive a Real Adventure',
    excerpt: 'Planning your first long-distance road trip? Read our essential tips for a memorable journey.',
    date: 'April 10, 2025',
    imageUrl: 'https://images.pexels.com/photos/1118785/pexels-photo-1118785.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: 'first-interstate-road-trip'
  },
  {
    id: 3,
    title: 'Winter Car Care: Essential Tips to Prepare Your Vehicle for Cold Weather Challenges',
    excerpt: 'Learn how to properly prepare your vehicle for the upcoming winter season with these essential maintenance tips.',
    date: 'April 5, 2025',
    imageUrl: 'https://images.pexels.com/photos/18493191/pexels-photo-18493191/free-photo-of-snow-covering-car-during-winter.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: 'winter-car-care-tips'
  }
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">Read our latest blogs</h2>
          <Link href="/blog" className="text-red-600 hover:text-red-700 font-medium text-sm">
            All Posts
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </Link>
              
              <div className="p-6">
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="text-red-600 hover:text-red-700 text-sm font-medium inline-block border-b border-red-600 hover:border-red-700"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;