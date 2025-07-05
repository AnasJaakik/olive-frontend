import React from 'react';
import './Products.css';

const products = [
  {
    name: 'Haouzia Olive Oil 250ml',
    description: 'Perfect for tasting, gifts, or small households. Cold-pressed from Marrakech’s unique Haouzia olives.',
    price: '€7.99',
    img: '/assets/olive-250ml.png', // add your image to public/assets/ or use placeholder
  },
  {
    name: 'Haouzia Olive Oil 500ml',
    description: 'Our most popular size. Versatile and elegant, for everyday meals and recipes.',
    price: '€12.99',
    img: '/assets/olive-500ml.png',
  },
  {
    name: 'Haouzia Olive Oil 750ml',
    description: 'For families, home chefs, and true olive oil lovers. Best value per ml.',
    price: '€17.99',
    img: '/assets/olive-750ml.png',
  },
];

const Products = () => (
  <section className="products-section">
    <h2 className="products-title">Our Products</h2>
    <div className="products-grid">
      {products.map((product, idx) => (
        <div className="product-card" key={idx}>
          {/* Uncomment the line below when you have images */}
          {/* <img src={product.img} alt={product.name} className="product-img" /> */}
          <h3 className="product-name">{product.name}</h3>
          <p className="product-desc">{product.description}</p>
          <p className="product-price">{product.price}</p>
          <button className="product-btn">Add to Cart</button>
        </div>
      ))}
    </div>
  </section>
);

export default Products;



