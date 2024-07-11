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

  const handleContact = () => {
    setContactCount(contactCount + 1);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout with items: " + JSON.stringify(cartItems));
    setCartItems([]);
  };

  return (
    <>
      <Navbar 
        cartItems={cartItems} 
        likedItems={likedItems} 
        contactCount={contactCount}
        onCheckout={handleCheckout} 
      />
      <Home />
      <About />
      <Menu onAddToCart={handleAddToCart} />
      <Products onAddToCart={handleAddToCart} onLike={handleLike} likedItems={likedItems} />
      <Review />
      <Contact onContact={handleContact} />
      <Footer />
    </>
  );
};

export default App;
