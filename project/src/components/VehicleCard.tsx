import React from 'react';
import { MapPin, Heart, Eye } from 'lucide-react';
import { Vehicle } from './FeaturedVehicles';
import { Link } from './ui/Link';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 group">
      <div className="relative">
        {vehicle.new && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs py-1 px-2 rounded z-10">
            New
          </span>
        )}
        {vehicle.featured && (
          <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs py-1 px-2 rounded z-10">
            Featured
          </span>
        )}
        <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
          <img 
            src={vehicle.imageUrl} 
            alt={vehicle.title} 
            className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex justify-between">
            <span className="text-white font-bold">
              {formatPrice(vehicle.price)}
            </span>
            {vehicle.oldPrice && (
              <span className="text-gray-300 line-through text-sm">
                {formatPrice(vehicle.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
          <Link href={`/vehicle/${vehicle.id}`} className="hover:text-red-600">
            {vehicle.title}
          </Link>
        </h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{vehicle.location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="font-medium">Year:</span>
            <span className="ml-1">{vehicle.year}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Mileage:</span>
            <span className="ml-1">{vehicle.mileage === 0 ? 'NEW' : `${vehicle.mileage} mi`}</span>
          </div>
        </div>
        
        <div className="border-t pt-3 flex justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            <span>{vehicle.views}</span>
          </div>
          <div className="flex items-center">
            <Heart className="h-3 w-3 mr-1" />
            <span>{vehicle.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;