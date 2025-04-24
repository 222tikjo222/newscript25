import React from 'react';
import { Link } from './ui/Link';

interface Category {
  name: string;
  count: string;
  imageUrl: string;
}

const categories: Category[] = [
  {
    name: 'Convertible',
    count: '4',
    imageUrl: 'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Coupe',
    count: '3',
    imageUrl: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Crossover',
    count: '10',
    imageUrl: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Hatchback',
    count: '1',
    imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Pickup Truck',
    count: '6',
    imageUrl: 'https://images.pexels.com/photos/2676561/pexels-photo-2676561.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Sedan',
    count: '7',
    imageUrl: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Sports',
    count: '8',
    imageUrl: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'SUV',
    count: '4',
    imageUrl: 'https://images.pexels.com/photos/6891/sunrise-sun-shining-thick-fog.jpg?auto=compress&cs=tinysrgb&w=300'
  }
];

const Categories: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Explore Popular Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group">
              <Link href={`/category/${category.name.toLowerCase()}`} className="block">
                <div className="relative overflow-hidden rounded-md">
                  <div className="aspect-w-4 aspect-h-3">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name}
                      className="object-cover w-full h-32 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                    <div className="w-full">
                      <h3 className="text-white font-medium">{category.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">({category.count})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;