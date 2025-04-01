import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-maincolor">
        <Link to="/">SerenitySpa</Link>
      </div>
      <nav className="space-x-6">
        <Link to="/" href="#" className="text-gray-600 hover:text-maincolor">Home</Link>
        <Link to="/service" href="#" className="text-gray-600 hover:text-maincolor">Services</Link>
        <Link to="/product" href="#" className="text-gray-600 hover:text-maincolor">Products</Link>
        <Link to="/booknow" href="#" className="text-gray-600 hover:text-maincolor">Book Now</Link>
        <Link to="/booking" href="#" className="text-gray-600 hover:text-maincolor">Bookings</Link>
        <Link to="/about" href="#" className="text-gray-600 hover:text-maincolor">About</Link>
        <Link to="/contact" href="#" className="text-gray-600 hover:text-maincolor">Contact</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <span className="material-icons">
            <Link to="/cart">
              <ShoppingCartOutlined />  
            </Link>
          </span>
          <span className="absolute -top-2 -right-2 bg-maincolor text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">4</span>
        </div>
        <button className="text-gray-600 hover:text-maincolor">
            <Link to="/login">Login</Link>
        </button>
        <button className="bg-maincolor text-white px-4 py-2 rounded-md hover:bg-blue-800">
            <Link to="/register">Register</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;