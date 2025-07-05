import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
// Only include Login/Cart as scroll sections if you really want to

const App = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}
  >
    <Navbar />
    <div style={{ flex: 1 }} className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="products">
        <Products />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
    <Footer />
  </div>
);

export default App;
