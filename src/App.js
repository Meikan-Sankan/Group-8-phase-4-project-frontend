import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/style.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Products from "./components/Products";
import Review from "./components/Review";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from './components/Register'; // Import your Register component

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [contactCount, setContactCount] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const productsRef = useRef();

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

  const handleSearch = (query) => {
    const productElements = productsRef.current.querySelectorAll(".product-item");
    productElements.forEach((element) => {
      if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
        element.scrollIntoView({ behavior: "smooth" });
        element.classList.add("highlight");
        setTimeout(() => {
          element.classList.remove("highlight");
        }, 2000);
      }
    });
  };

  return (
    <Router>
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <Navbar 
          cartItems={cartItems} 
          likedItems={likedItems} 
          contactCount={contactCount} 
          contacts={contacts} 
          onCheckout={handleCheckout} 
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onSearch={handleSearch}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu onAddToCart={handleAddToCart} />} />
          <Route
            path="/products"
            element={
              <div ref={productsRef}>
                <Products
                  onAddToCart={handleAddToCart}
                  onLike={handleLike}
                  likedItems={likedItems}
                  onCheckoutPrompt={handleCheckoutPrompt}
                />
              </div>
            }
          />
          <Route path="/login" element={<Login onLogin={() => {}} />} />
          <Route path="/register" element={<Register onRegister={() => {}} />} /> {/* Define route for "/register" */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
