import React, { useRef, useEffect, useState } from "react";
import dessertsData from "./desserts.json";

const Products = ({ onAddToCart, searchTerm }) => {
  const desserts = dessertsData.desserts;
  const refs = useRef([]);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    if (searchTerm && refs.current.length > 0) {
      const index = desserts.findIndex(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (index !== -1 && refs.current[index] && refs.current[index].current) {
        refs.current[index].current.scrollIntoView({ behavior: 'smooth', block: 'start' });

        refs.current.forEach(ref => {
          if (ref.current) {
            ref.current.classList.remove('highlight');
          }
        });
        setTimeout(() => {
          if (refs.current[index] && refs.current[index].current) {
            refs.current[index].current.classList.add('highlight');
            setTimeout(() => {
              if (refs.current[index] && refs.current[index].current) {
                refs.current[index].current.classList.remove('highlight');
              }
            }, 2000);
          }
        }, 50);
      }
    }
  }, [searchTerm, desserts]);

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
    <section className="products" id="products">
      <h1 className="heading">
        Our <span>Desserts</span>
      </h1>
      <div className="box-container">
        {desserts.map((dessert, index) => {
          refs.current[index] = useRef(null); // Initialize ref for each dessert

          return (
            <div
              className={`box ${likedItems.includes(dessert.id) ? 'liked' : ''}`}
              key={dessert.id}
              id={`product-item-${dessert.id}`}
              ref={refs.current[index]}
            >
              <div className="image">
                <img src={dessert.img} alt={dessert.name} />
              </div>
              <div className="content">
                <h3>{dessert.name}</h3>
                <div className="price">
                  Ksh {dessert.price} <span>Ksh {dessert.discountedPrice}</span>
                </div>
                <button className="btn" onClick={() => handleAddToCart(dessert)}>
                  Add to Cart
                </button>
                <button
                  className={`like-btn ${likedItems.includes(dessert.id) ? 'liked' : ''}`}
                  onClick={() => handleLike(dessert.id)}
                >
                  {likedItems.includes(dessert.id) ? 'Unlike' : 'Like'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
