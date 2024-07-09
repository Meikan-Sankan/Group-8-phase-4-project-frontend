// Menu.js
import React from "react";
import menuData from "./menu.json";

const Menu = ({ onAddToCart }) => {
  const menuItems = Array.isArray(menuData.menu) ? menuData.menu : [];

  const handleAddToCart = (item) => {
    // Call the onAddToCart function with the selected item
    onAddToCart(item);
  };

  return (
    <>
      <section className="menu" id="menu">
        <h1 className="heading">
          Our <span>Menu</span>
        </h1>

        <div className="box-container">
          {menuItems.map((item) => (
            <div className="box" key={item.id}>
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <div className="price">
                ksh:{item.price} <span>ksh:{item.discountedPrice}</span>
              </div>
              <button className="btn" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Menu;
