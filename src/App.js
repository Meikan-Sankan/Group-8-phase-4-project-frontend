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
import Register from "./components/Register";
import AdminLogin from "./components/AdminLogin";
import AdminPage from "./components/AdminPage";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [contactCount, setContactCount] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const productsRef = useRef();

  useEffect(() => {
    // Check for user login state
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setIsLoggedIn(true);
    }
    
    // Check for admin login state
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setIsAdminLoggedIn(true);
    }
  }, []);

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
    setSearchTerm(query);
  };

  const handleLogin = ({ email, password }) => {
    setIsLoggedIn(true);
    localStorage.setItem("userToken", "dummyToken"); // Replace with actual token
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userToken");
  };

  const handleAdminLogin = ({ email, password }) => {
    setIsAdminLoggedIn(true);
    localStorage.setItem("adminToken", "dummyAdminToken"); // Replace with actual token
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("adminToken");
  };

  return (
    <Router>
      <AppContent
        isLoggedIn={isLoggedIn}
        isAdminLoggedIn={isAdminLoggedIn}
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
        handleAdminLogin={handleAdminLogin}
        handleAdminLogout={handleAdminLogout}
        setIsLoggedIn={setIsLoggedIn}
        searchTerm={searchTerm}
      />
    </Router>
  );
};

const AppContent = ({
  isLoggedIn,
  isAdminLoggedIn,
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
  handleAdminLogin,
  handleAdminLogout,
  setIsLoggedIn,
  searchTerm,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isAdminLoggedIn && window.location.pathname !== "/register" && window.location.pathname !== "/admin/login") {
      navigate("/login");
    }
  }, [isLoggedIn, isAdminLoggedIn, navigate]);

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
        <Route path="/menu" element={<Menu onAddToCart={handleAddToCart} searchTerm={searchTerm} />} />
        <Route path="/products" element={<div ref={productsRef}><Products onAddToCart={handleAddToCart} searchTerm={searchTerm} /></div>} />
        <Route path="/review" element={<Review />} />
        <Route path="/contact" element={<Contact onContact={handleContact} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={() => setIsLoggedIn(true)} />} />
        <Route path="/admin/login" element={<AdminLogin onAdminLogin={handleAdminLogin} />} />
        <Route path="/admin" element={<AdminPage onAdminLogout={handleAdminLogout} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
