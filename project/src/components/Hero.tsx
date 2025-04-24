import React from 'react';
import SearchForm from './SearchForm';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative bg-black/90 h-[600px] flex items-center"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Are You Looking For A Car?
          </h1>
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;