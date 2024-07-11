import React, { useRef } from "react";

const Navbar = ({ cartItems, likedItems, contactCount, onCheckout }) => {
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

  return (
    <>
      <header className="header">
        <a href="#" className="logo">
          YourLogo
        </a>
        <nav className="navbar" ref={navbarRef}>
          <a href="#home">home</a>
          <a href="#about">about</a>
          <a href="#menu">menu</a>
          <a href="#products">desserts</a>
          <a href="#review">review</a>
          <a href="#contact">contact</a>
        </nav>
        <div className="icons">
          <div
            className="icon"
            id="search-btn"
            onClick={searchHandler}
            role="button"
            tabIndex="0"
            aria-label="Search"
          >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfLXLVtEMiqg8UfD8XH2y9Yth31q6gSbX0hQ&s" alt="Search" />
          </div>
          <div
            className="icon"
            id="menu-btn"
            onClick={navbarHandler}
            role="button"
            tabIndex="0"
            aria-label="Menu"
          >
            <img src="your-menu-icon-url.png" alt="Menu" />
          </div>
          <div
            className="icon"
            id="cart-btn"
            onClick={cartHandler}
            role="button"
            tabIndex="0"
            aria-label="Cart"
          >
            <img src="https://cdn-icons-png.freepik.com/256/17006/17006707.png?semt=ais_hybrid" alt="Cart" />
            <span className="cart-count">{cartItems.length}</span>
          </div>
          <div className="icon" role="button" tabIndex="0" aria-label="Likes">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOdDNxOnbcJeZ-QTdx3XPZ5PtEydi2rRHeA&s" alt="Likes" />
            <span className="like-count">{likedItems.length}</span>
          </div>
          <div className="icon" role="button" tabIndex="0" aria-label="Messages">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF9kpr-Hsxi1gIi2cANoy6ulkGo6XtWrDYvQ&s" alt="Messages" />
            <span className="contact-count">{contactCount}</span>
          </div>
        </div>
        <div className="search-form" ref={searchRef}>
          <input
            type="search"
            id="search-box"
            placeholder="search here..."
            aria-label="Search Box"
          />
          <label htmlFor="search-box" className="fas fa-search"></label>
        </div>
        <div className="cart" ref={cartRef}>
          <h3>Cart Items</h3>
          <img 
            src="https://cdn-icons-png.freepik.com/256/17006/17006707.png?semt=ais_hybrid.png" 
            alt="Cart Icon" 
            className="cart-icon" 
          />
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ksh:{item.price}
              </li>
            ))}
          </ul>
          <button className="btn" onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
