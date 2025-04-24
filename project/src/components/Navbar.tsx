import React from 'react';
import { Car, Search } from 'lucide-react';
import { Link } from './ui/Link';

const Navbar: React.FC = () => {
  return (
    <header className="bg-black py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Car className="h-6 w-6 text-red-600 mr-1" />
            <span className="text-white font-bold text-xl">Carlist</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-red-500 text-sm font-medium">Home</Link>
          <Link href="/vendors" className="text-white hover:text-red-500 text-sm font-medium">Vendors</Link>
          <Link href="/cars" className="text-white hover:text-red-500 text-sm font-medium">Cars</Link>
          <Link href="/shop" className="text-white hover:text-red-500 text-sm font-medium">Shop</Link>
          <Link href="/blog" className="text-white hover:text-red-500 text-sm font-medium">Blog</Link>
          <Link href="/pages" className="text-white hover:text-red-500 text-sm font-medium">Pages</Link>
          <Link href="/faq" className="text-white hover:text-red-500 text-sm font-medium">FAQ</Link>
          <Link href="/contact" className="text-white hover:text-red-500 text-sm font-medium">Contact</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="text-white p-2 rounded-full hover:bg-gray-800">
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/login"
            className="hidden md:flex text-white bg-transparent border border-gray-700 px-3 py-1 rounded hover:bg-gray-800 text-sm"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;