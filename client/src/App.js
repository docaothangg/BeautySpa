import React from 'react';
import { Route, Routes } from 'react-router';
import Header from './components/Header';
import Home from './pages/Home';
import Service from './pages/Service';
import Products from './pages/Products';
import Booknow from './pages/Booknow';
import Bookings from './pages/Bookings';
import Contacts from './pages/Contacts';
import About from './pages/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './pages/Cart';


function App() {
  return (
    <div className="font-sans">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/product" element={<Products />} />
        <Route path="/booknow" element={<Booknow />} />
        <Route path="/booking" element={<Bookings />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;