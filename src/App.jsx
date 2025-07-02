import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Process from './pages/Process';
import Navbar from './components/Navbar';
import Footer from './components/footer';

const App = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Navbar />
      {/* Main content area grows/shrinks as needed */}
      <div
        style={{ flex: 1 }}
        className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:productsId' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/process' element={<Process />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

