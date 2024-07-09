import React, { useRef, useState } from "react";

const Navbar = ({ onAddToCart }) => {
  const [cartItems, setCartItems] = useState([]);

  const navbarRef = useRef();
  const searchRef = useRef();
  const cartRef = useRef();

  const navbarHandler = () => {
    navbarRef.current.classList.toggle("active");
    searchRef.current.classList.remove("active");
    cartRef.current.classList.remove("active");
  };

  const searchHandler = () => {
    searchRef.current.classList.toggle("active");
    navbarRef.current.classList.remove("active");
    cartRef.current.classList.remove("active");
  };

  const cartHandler = () => {
    cartRef.current.classList.toggle("active");
    searchRef.current.classList.remove("active");
    navbarRef.current.classList.remove("active");
  };
  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    onAddToCart(item);
  };

  return (
    <>
      <header className="header">
        <a href="#" className="logo">
        </a>
        <nav className="navbar" ref={navbarRef}>
          <a></a>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#products">Desserts</a>
          <a href="#review">Review</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="icons">
          <div
            className="fas fa-search"
            id="search-btn"
            onClick={searchHandler}
          ></div>
          <div
            className="fas fa-bars"
            id="menu-btn"
            onClick={navbarHandler}
          ></div>
        </div>
        <div className="search-form" ref={searchRef}>
          <input type="search" id="search-box" placeholder="search here..." />
          <label htmlFor="search-box" className="fas fa-search"></label>
        </div>
        
      </header>
    </>
  );
};

export default Navbar;
