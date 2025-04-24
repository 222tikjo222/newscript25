import React from 'react';
import { Search } from 'lucide-react';

const SearchForm: React.FC = () => {
  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden mt-8">
      <div className="flex items-center p-3 bg-red-600">
        <button className="py-1 px-3 rounded bg-red-700 text-white text-sm font-medium">All</button>
        <div className="flex ml-4 space-x-4 text-white text-sm">
          <button className="hover:text-red-200">New</button>
          <button className="hover:text-red-200">Used</button>
          <button className="hover:text-red-200">Certified Pre-Owned (CPO)</button>
          <button className="hover:text-red-200">Auction</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x">
        <div className="p-3">
          <label className="block text-gray-500 text-xs mb-1">Vehicle</label>
          <select className="w-full p-1 text-sm border-0 focus:ring-0">
            <option>Any Make</option>
          </select>
        </div>
        
        <div className="p-3">
          <label className="block text-gray-500 text-xs mb-1">Location</label>
          <select className="w-full p-1 text-sm border-0 focus:ring-0">
            <option>All Locations</option>
          </select>
        </div>
        
        <div className="p-3">
          <label className="block text-gray-500 text-xs mb-1">Price ($)</label>
          <select className="w-full p-1 text-sm border-0 focus:ring-0">
            <option>No Max Price</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between p-3">
          <div>
            <label className="block text-gray-500 text-xs mb-1">Make</label>
            <select className="w-full p-1 text-sm border-0 focus:ring-0">
              <option>All Makes</option>
            </select>
          </div>
          
          <button className="bg-red-600 text-white p-2 rounded-sm hover:bg-red-700 transition-colors">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;