import React, { useRef, useEffect } from "react";
import menuData from "./menu.json";

const Menu = ({ onAddToCart, searchTerm }) => {
  const menuItems = Array.isArray(menuData.menu) ? menuData.menu : [];
  const refs = useRef([]);

  useEffect(() => {
    if (searchTerm) {
      const index = menuItems.findIndex(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      if (index !== -1 && refs.current[index]) {
        refs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        refs.current[index].classList.add('highlight');
        setTimeout(() => {
          refs.current[index].classList.remove('highlight');
        }, 3000);
      }
    }
  }, [searchTerm, menuItems]);

  const handleAddToCart = (item) => {
    onAddToCart(item);
  };

  return (
    <>
      <section className="menu" id="menu">
        <h1 className="heading">
          Our <span>Menu</span>
        </h1>

        <div className="box-container">
          {menuItems.map((item, index) => (
            <div
              className="box"
              key={item.id}
              id={`menu-item-${item.id}`}
              ref={el => refs.current[index] = el}
            >
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
