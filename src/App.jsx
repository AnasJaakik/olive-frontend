// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Impressum from "./pages/Impressum";
import Privacy from "./pages/Privacy";   


import ScrollToTop from "./components/ScrollToTop";

function PurchaseStatusBanner() {
  const location = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("success")) {
      alert("Thanks! Your order was placed successfully.");
    } else if (url.searchParams.get("canceled")) {
      alert("Payment canceled. You can try again.");
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <ScrollToTop />
      <PurchaseStatusBanner />

      <div
        style={{ flex: 1 }}
        className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route
            path="*"
            element={
              <div style={{ padding: 40 }}>
                Oops! Nothing here — check your URL.
              </div>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

