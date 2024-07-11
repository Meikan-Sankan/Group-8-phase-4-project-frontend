import React from "react";
import dessertsData from "./desserts.json";

const Products = ({ onAddToCart, onLike, likedItems }) => {
  const desserts = dessertsData.desserts;

  const handleAddToCart = (item) => {
    onAddToCart(item);
  };

  const handleLike = (item) => {
    onLike(item);
  };

  return (
    <section className="products" id="products">
      <h1 className="heading">
        Our <span>Desserts</span>
      </h1>
      <div className="box-container">
        {desserts.map((dessert) => (
          <div className="box" key={dessert.id}>
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
