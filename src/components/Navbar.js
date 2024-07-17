import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Navbar = ({
  cartItems,
  likedItems,
  contactCount,
  contacts,
  onCheckout,
  isDarkMode,
  toggleTheme,
  onSearch,
  onLogout,
  isAuthenticated,
}) => {
  const navbarRef = useRef();
  const searchRef = useRef();
  const cartRef = useRef();
  const navigate = useNavigate(); // Hook for navigation

  const [isHeartModalOpen, setHeartModalOpen] = useState(false);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);

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

  const handleCheckoutPrompt = () => {
    const confirmCheckout = window.confirm("Proceed to checkout?");
    if (confirmCheckout) {
      onCheckout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx2HqipxvFWcg1vwTRY1s7DenIsV2RK9cE1A&s"
            alt="Delicacies Hub"
          />
          <span className="project-handle">Delicacies Hub</span>
        </Link>
        <nav className="navbar" ref={navbarRef}>
          <Link to="/" onClick={navbarHandler}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2d3TV8_YZhiMGAO9DCa5isUw6AK0o9ddq4A&s"
              alt="Home"
              className="nav-icon"
            />
            HOME
          </Link>
          <Link to="/about" onClick={navbarHandler}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIugHu_Ha2ELTgbaIcPCJ6mxISjnpabFd7og&s"
              alt="About"
              className="nav-icon"
            />
            ABOUT
          </Link>
          <Link to="/menu" onClick={navbarHandler}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFOI3wNVFQIZIhWqrrmoR0cFxT9LSCd8TilQ&s"
              alt="Menu"
              className="nav-icon"
            />
            MENU
          </Link>
          <Link to="/products" onClick={navbarHandler}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC9-Iuu1IyILgixFhrPldHxP6bmDGjk38ZCw&s"
              alt="Desserts"
              className="nav-icon"
            />
            PRODUCTS
          </Link>
          <Link to="/review" onClick={navbarHandler}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCOsX32l5w2TSbzsndlLvQCwRA7CgpiCcX_g&s"
              alt="Review"
              className="nav-icon"
            />
            REVIEW
          </Link>
          <Link to="/contact" onClick={navbarHandler}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmGeRiuzmYScbj0hnVpZHQl0xR5bOpJ0LF3w&s"
              alt="Contact"
              className="nav-icon"
            />
            CONTACT
          </Link>
          {isAuthenticated ? (
            <Link to="#logout" onClick={handleLogout}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
                alt="Logout"
                className="nav-icon"
              />
              LOGOUT
            </Link>
          ) : (
            <Link to="/login">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828506.png"
                alt="Login"
                className="nav-icon"
              />
              LOGIN
            </Link>
          )}
        </nav>
        <div className="icons">
          <div
            className="icon"
            id="theme-toggle"
            onClick={toggleTheme}
            role="button"
            tabIndex="0"
          >
            {isDarkMode ? (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbIZvUqnScwHtkNVnF4RtohX3PbZTqoFQ_Pg&s"
                alt="Dark Mode"
              />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY26aTGKPoJBvo3bgP5W8aEgxQhG5r3VGkeQ&s"
                alt="Light Mode"
              />
            )}
          </div>
          <div
            className="icon"
            id="search-btn"
            onClick={searchHandler}
            role="button"
            tabIndex="0"
            aria-label="Search"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfLXLVtEMiqg8UfD8XH2y9Yth31q6gSbX0hQ&s"
              alt="Search"
            />
          </div>
          <div
            className="icon"
            id="menu-btn"
            onClick={navbarHandler}
            role="button"
            tabIndex="0"
            aria-label="Menu"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828506.png"
              alt="Menu"
            />
          </div>
          <div
            className="icon"
            id="cart-btn"
            onClick={cartHandler}
            role="button"
            tabIndex="0"
            aria-label="Cart"
          >
            <img
              src="https://cdn-icons-png.freepik.com/256/17006/17006707.png?semt=ais_hybrid"
              alt="Cart"
            />
            <span className="cart-count">{cartItems.length}</span>
          </div>
          <div
            className="icon"
            role="button"
            tabIndex="0"
            aria-label="Likes"
            onClick={() => setHeartModalOpen(true)}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOdDNxOnbcJeZ-QTdx3XPZ5PtEydi2rRHeA&s"
              alt="Likes"
            />
            <span className="like-count">{likedItems ? likedItems.length : 0}</span>
          </div>
          <div
            className="icon"
            role="button"
            tabIndex="0"
            aria-label="Messages"
            onClick={() => setMessageModalOpen(true)}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF9kpr-Hsxi1gIi2cANoy6ulkGo6XtWrDYvQ&s"
              alt="Messages"
            />
            <span className="contact-count">{contactCount}</span>
          </div>
        </div>
        <div className="search-form" ref={searchRef}>
          <input
            type="search"
            id="search-box"
            placeholder="search here..."
            aria-label="Search Box"
            onChange={(e) => onSearch(e.target.value)}
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
                {item.name} - Ksh:{item.price}
              </li>
            ))}
          </ul>
          <button className="btn" onClick={handleCheckoutPrompt}>
            Checkout
          </button>
        </div>
      </header>

      {isHeartModalOpen && (
        <Modal onClose={() => setHeartModalOpen(false)} title="Liked Items">
          <ul>
            {likedItems.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </Modal>
      )}

      {isMessageModalOpen && (
        <Modal onClose={() => setMessageModalOpen(false)} title="Contacts">
          <ul>
            {contacts.map((contact, index) => (
              <li key={index}>
                <p>Name: {contact.name}</p>
                <p>Email: {contact.email}</p>
                <p>Phone: {contact.phone}</p>
                <p>Comment: {contact.comment}</p>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </>
  );
};

export default Navbar;
