// App.js
import React, { useState } from "react";
import "./assets/css/style.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Products from "./components/Products";
import Review from "./components/Review";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [contactCount, setContactCount] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleLike = (item) => {
    setLikedItems((prevLikedItems) => {
      if (prevLikedItems.includes(item)) {
        return prevLikedItems.filter((likedItem) => likedItem !== item);
      } else {
        return [...prevLikedItems, item];
      }
    });
  };

  const handleContact = (contact) => {
    setContacts([...contacts, contact]);
    setContactCount(contactCount + 1);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout with items: " + JSON.stringify(cartItems));
    setCartItems([]);
  };

  const handleCheckoutPrompt = () => {
    const confirmCheckout = window.confirm("Proceed to checkout?");
    if (confirmCheckout) {
      handleCheckout();
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Navbar 
        cartItems={cartItems} 
        likedItems={likedItems} 
        contactCount={contactCount} 
        contacts={contacts} 
        onCheckout={handleCheckout} 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <Home />
      <About />
      <Menu onAddToCart={handleAddToCart} />
      <Products 
        onAddToCart={handleAddToCart} 
        onLike={handleLike} 
        likedItems={likedItems} 
        onCheckoutPrompt={handleCheckoutPrompt} 
      />
      <Review />
      <Contact onContact={handleContact} />
      <Footer />
    </div>
  );
};

export default App;
