import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email.toLowerCase(),
        password
      });

      const token = response.data.access_token;
      if (token) {
        setSuccess('Login successful!');
        onLogin({ email, password });
        setEmail('');
        setPassword('');
        navigate('/');
      } else {
        setSuccess('');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <section className="login">
        <h1 className="heading">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input 
              type="text" 
              placeholder="Email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="inputBox">
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <div className="inputBox">
            <button type="submit" className="btn">Login</button>
          </div>
          <div className="inputBox">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
