import React from 'react';
import { Link } from './ui/Link';

const Promotions: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-md overflow-hidden shadow-lg p-6 relative">
            <div className="relative z-10">
              <h3 className="text-white text-xl font-bold mb-2">Get A Free Service</h3>
              <h4 className="text-white text-lg mb-6">For First Person</h4>
              <Link 
                href="/promotion/free-service" 
                className="inline-block bg-white text-red-600 px-5 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                Get Free Service
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 z-0">
              <img 
                src="https://images.pexels.com/photos/1605310/pexels-photo-1605310.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="White sedan" 
                className="h-32 object-contain"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-md overflow-hidden shadow-lg p-6 relative">
            <div className="relative z-10">
              <h3 className="text-white text-xl font-bold mb-2">Get Up To 20%</h3>
              <h4 className="text-white text-lg mb-6">Discount</h4>
              <Link 
                href="/promotion/discount" 
                className="inline-block bg-white text-blue-600 px-5 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                Claim Discount
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 z-0">
              <img 
                src="https://images.pexels.com/photos/5063560/pexels-photo-5063560.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Blue SUV" 
                className="h-32 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;