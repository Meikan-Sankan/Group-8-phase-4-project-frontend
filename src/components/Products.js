import React, { useRef, useEffect } from "react";
import dessertsData from "./desserts.json";

const Products = ({ onAddToCart, onLike, likedItems, onCheckoutPrompt, searchTerm }) => {
  const desserts = dessertsData.desserts;
  const refs = useRef([]);

  useEffect(() => {
    if (searchTerm) {
      const index = desserts.findIndex(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      if (index !== -1 && refs.current[index]) {
        refs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        refs.current[index].classList.add('highlight');
        setTimeout(() => {
          refs.current[index].classList.remove('highlight');
        }, 3000);
      }
    }
  }, [searchTerm, desserts]);

  const handleAddToCart = (item) => {
    onAddToCart(item);
  };

  const handleLike = (item) => {
    onLike(item);
    onCheckoutPrompt();
  };

  return (
    <section className="products" id="products">
      <h1 className="heading">
        Our <span>Desserts</span>
      </h1>
      <div className="box-container">
        {desserts.map((dessert, index) => (
          <div
            className="box"
            key={dessert.id}
            id={`product-item-${dessert.id}`}
            ref={el => refs.current[index] = el}
          >
            <div className="icons">
              <a href="#" className="fas fa-shopping-cart" onClick={() => handleAddToCart(dessert)}></a>
              <a href="#" className={`fas fa-heart ${likedItems.includes(dessert) ? 'liked' : ''}`} onClick={() => handleLike(dessert)}></a>
            </div>
            <div className="image">
              <img src={dessert.img} alt={dessert.name} />
            </div>
            <div className="content">
              <h3>{dessert.name}</h3>
              <div className="stars">
                {Array.from({ length: Math.floor(dessert.rating) }, (_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
                {dessert.rating % 1 !== 0 && (
                  <i className="fas fa-star-half-alt"></i>
                )}
              </div>
              <div className="price">
                ksh:{dessert.price} <span>ksh{dessert.discountedPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;

