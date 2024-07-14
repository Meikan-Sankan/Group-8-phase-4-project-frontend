import React, { useState, useEffect } from "react";
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
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [contactCount, setContactCount] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // State for register and login forms
  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  // Handle checking login status on initial render
  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          const response = await fetch('/api/checkLoginStatus', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          const data = await response.json();
          if (response.ok) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Error checking login status:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Register user function
  const handleRegister = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message); // Registration successful message
        // Optionally, you can automatically log in the user after registration
        // handleLogin();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error registering user.");
    }
  };

  // Login user function
  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful");
        localStorage.setItem('accessToken', data.access_token);
        setIsLoggedIn(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error logging in.");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Router>
        <Navbar 
          cartItems={cartItems} 
          likedItems={likedItems} 
          contactCount={contactCount} 
          contacts={contacts} 
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/products" element={<Products />} />
              <Route path="/review" element={<Review />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
        <Footer />
      </Router>
      {!isLoggedIn && error && <div><p>{error}</p></div>}
    </div>
  );
};

export default App;
