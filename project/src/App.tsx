import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import WhyChooseUs from './components/WhyChooseUs';
import FeaturedVehicles from './components/FeaturedVehicles';
import Promotions from './components/Promotions';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <WhyChooseUs />
        <FeaturedVehicles />
        <Promotions />
        <Testimonials />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;