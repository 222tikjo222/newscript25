import React from 'react';
import { Car, Users, Clock, PenTool as Tool } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="bg-gray-100 absolute inset-0 left-1/4 top-1/4 -z-10"></div>
            <img 
              src="https://images.pexels.com/photos/4077450/pexels-photo-4077450.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Orange SUV" 
              className="rounded-md shadow-lg mx-auto"
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-3">Why Did You Choose Our Car Listing Services?</h2>
            <p className="text-gray-600 mb-8">
              Whether you want to buy or sell your car, our platform makes it easy to find what you're looking for. 
              Browse our carefully curated inventory of premium vehicles and find the perfect car for your needs.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">500+</h3>
                  <p className="text-sm text-gray-600">Cars for Sale</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">700+</h3>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">24+</h3>
                  <p className="text-sm text-gray-600">Years in Service</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center">
                    <Tool className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">125+</h3>
                  <p className="text-sm text-gray-600">Certified & Skilled Mechanics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;