import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
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
import Register from './components/Register';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [contactCount, setContactCount] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    if (productsRef.current) {
      const productElements = productsRef.current.querySelectorAll(".box");
      productElements.forEach((element) => {
        const productName = element.querySelector("h3").textContent.toLowerCase();
        if (productName.includes(query.toLowerCase())) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          element.classList.add("highlight");
          setTimeout(() => {
            element.classList.remove("highlight");
          }, 2000);
        }
      });
    }
  };

  const handleLogin = ({ email, password }) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <AppContent
        isLoggedIn={isLoggedIn}
        isDarkMode={isDarkMode}
        cartItems={cartItems}
        likedItems={likedItems}
        contactCount={contactCount}
        contacts={contacts}
        productsRef={productsRef}
        toggleTheme={toggleTheme}
        handleAddToCart={handleAddToCart}
        handleLike={handleLike}
        handleContact={handleContact}
        handleCheckout={handleCheckout}
        handleCheckoutPrompt={handleCheckoutPrompt}
        handleSearch={handleSearch}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        setIsLoggedIn={setIsLoggedIn}
      />
    </Router>
  );
};

const AppContent = ({
  isLoggedIn,
  isDarkMode,
  cartItems,
  likedItems,
  contactCount,
  contacts,
  productsRef,
  toggleTheme,
  handleAddToCart,
  handleLike,
  handleContact,
  handleCheckout,
  handleCheckoutPrompt,
  handleSearch,
  handleLogin,
  handleLogout,
  setIsLoggedIn,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname !== "/register") {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

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
        onSearch={handleSearch}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />} />
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
        <Route path="/review" element={<Review />} />
        <Route path="/contact" element={<Contact onContact={handleContact} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={() => setIsLoggedIn(true)} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
