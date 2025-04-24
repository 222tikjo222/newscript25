import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  avatar: string;
  location?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sophia Lee',
    rating: 5,
    text: 'I loved my car buying experience at this site. The staff was extremely friendly and helpful through the entire process. I found my dream car at a price I could afford, and the transaction was smooth and hassle-free.',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    location: 'Seattle'
  },
  {
    id: 2,
    name: 'Michael Collins',
    rating: 4,
    text: 'I was very satisfied with the selection of vehicles. I found exactly what I was looking for at a fair price. The only minor issue was the wait time for paperwork, but the service otherwise was excellent and I would recommend them.',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    location: 'New York'
  },
  {
    id: 3,
    name: 'Emily Parker',
    rating: 5,
    text: 'Exceptional service from start to finish. The team went above and beyond to help me find the perfect car within my budget. The entire process was transparent and the after-sales service has been excellent.',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    location: 'Chicago'
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">What Our Customers Say About Us</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-[300px] bg-gray-50 rounded-lg p-6 md:p-10 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-1 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{testimonials[activeIndex].name}</h3>
                  <div className="flex items-center justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-4">
                <p className="italic text-gray-700 mb-4">"{testimonials[activeIndex].text}"</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-2">
            <button 
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full ${activeIndex === index ? 'bg-red-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;