import React, { useRef, useEffect, useState } from "react";
import menuData from "./menu.json"; // Import JSON data
import { Link } from "react-router-dom";

const Menu = ({ onAddToCart, searchTerm }) => {
  const menuItems = Array.isArray(menuData.menu) ? menuData.menu : [];
  const refs = useRef([]);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const index = menuItems.findIndex(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
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

  const handleLike = (id) => {
    setLikedItems(prevLikedItems => {
      if (prevLikedItems.includes(id)) {
        return prevLikedItems.filter(itemId => itemId !== id);
      } else {
        return [...prevLikedItems, id];
      }
    });
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
              className={`box ${likedItems.includes(item.id) ? 'liked' : ''}`}
              key={item.id}
              id={`menu-item-${item.id}`}
              ref={el => (refs.current[index] = el)}
            >
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <div className="price">
                Ksh {item.price} <span>Ksh {item.discountedPrice}</span>
              </div>
              <button className="btn" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
              <button
                className={`like-btn ${likedItems.includes(item.id) ? 'liked' : ''}`}
                onClick={() => handleLike(item.id)}
              >
                {likedItems.includes(item.id) ? 'Unlike' : 'Like'}
              </button>
              <Link to="/menu" className="nav-link">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Menu;
