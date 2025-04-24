import React from 'react';
import { Link } from './ui/Link';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Car className="h-6 w-6 text-red-600 mr-1" />
              <span className="text-white font-bold text-xl">Carlist</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Setting the standard in automobile classifieds over 20 years of connecting sellers and buyers with exceptional service for a trusted automotive buying experience.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Helpful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link>
              </li>
              <li>
                <Link href="/inventory" className="text-gray-400 hover:text-white text-sm">Inventory</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white text-sm">FAQs</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm">123 Main Street, New York, USA</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+1 (123) 456-7890</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@carlistingsite.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Subscribe To</h3>
            <p className="text-gray-400 text-sm mb-4">Get updates about our latest cars and offers!</p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 text-white text-sm rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-red-600"
                />
                <button 
                  type="submit" 
                  className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>Copyright ©2025. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;