import React, { useState } from 'react';
import { Car, MapPin, Heart, Eye } from 'lucide-react';
import VehicleCard from './VehicleCard';
import { Link } from './ui/Link';

// Vehicle data type
export interface Vehicle {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  location: string;
  year: number;
  mileage: number;
  views: number;
  likes: number;
  imageUrl: string;
  featured?: boolean;
  new?: boolean;
  category?: string;
}

// Sample vehicle data
const vehicles: Vehicle[] = [
  {
    id: 1,
    title: "Explorers Excellence Turbodiesel 2023 Model",
    price: 32000,
    location: "Boston",
    year: 2023,
    mileage: 0,
    views: 60,
    likes: 14,
    imageUrl: "https://images.pexels.com/photos/1381816/pexels-photo-1381816.jpeg?auto=compress&cs=tinysrgb&w=640",
    featured: true,
    new: true
  },
  {
    id: 2,
    title: "Sleek Coupe For Speed Lovers Elite 2022",
    price: 28000,
    oldPrice: 31000,
    location: "New York",
    year: 2022,
    mileage: 12000,
    views: 120,
    likes: 32,
    imageUrl: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=640",
    featured: true
  },
  {
    id: 3,
    title: "Dynamic New Sedan Features with Premium Package",
    price: 35990,
    location: "Chicago",
    year: 2023,
    mileage: 5000,
    views: 75,
    likes: 18,
    imageUrl: "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=640",
    featured: true,
    new: true
  },
  {
    id: 4,
    title: "American Muscle Premium Sports Car For Fast Rides",
    price: 42000,
    location: "Los Angeles",
    year: 2023,
    mileage: 1200,
    views: 112,
    likes: 34,
    imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=640",
    featured: true
  },
  {
    id: 5,
    title: "Fast Explorer: Stunning New Adventurer for Wilderness",
    price: 38560,
    location: "Denver",
    year: 2023,
    mileage: 850,
    views: 89,
    likes: 24,
    imageUrl: "https://images.pexels.com/photos/2676561/pexels-photo-2676561.jpeg?auto=compress&cs=tinysrgb&w=640",
    featured: true
  },
  {
    id: 6,
    title: "Comforting SUV 4 Series with Pilot Plus Feature Package",
    price: 27800,
    location: "Seattle",
    year: 2022,
    mileage: 18000,
    views: 95,
    likes: 22,
    imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=640",
    featured: true
  },
  {
    id: 7,
    title: "Premium Engineering Mastery SUV-KP-9 Sports Automobile",
    price: 52000,
    location: "Miami",
    year: 2023,
    mileage: 100,
    views: 65,
    likes: 31,
    imageUrl: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=640",
    featured: true
  },
  {
    id: 8,
    title: "Streamlined Excellence: Limited Elite Model Coupe Edition",
    price: 62000,
    location: "Dallas",
    year: 2023,
    mileage: 0,
    views: 130,
    likes: 48,
    imageUrl: "https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&w=640",
    featured: true
  }
];

const FeaturedVehicles: React.FC = () => {
  const [activeTab, setActiveTab] = useState('featured');
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Top Featured Vehicles</h2>
        
        <div className="flex flex-wrap justify-center mb-8 border-b">
          <button 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'featured' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('featured')}
          >
            Featured
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'recent' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('recent')}
          >
            Recent
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'used' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('used')}
          >
            Used
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'special' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('special')}
          >
            Special Offers
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'all' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.slice(0, 8).map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium">
            View All Vehicles
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;