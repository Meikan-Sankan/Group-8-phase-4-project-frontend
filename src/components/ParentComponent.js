import React, { useState } from 'react';
import Menu from './Menu';
import Navbar from './Navbar';

const ParentComponent = () => {
  const handleAddToCart = (item) => {
    console.log('Adding item to cart:', item);
  };

  return (
    <>
      <Navbar />
      <Menu onAddToCart={handleAddToCart} />
      <div className="cart-items-container" ref={cartRef}>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <span className="fas fa-times"></span>
              <img src={item.img} alt={item.name} />
              <div className="content">
                <h3>{item.name}</h3>
                <div className="price">{item.price}/-</div>
              </div>
            </div>
          ))}
          <a href="#" className="btn">
            checkout now
          </a>
        </div>
    </>
  );
};

export default ParentComponent;
