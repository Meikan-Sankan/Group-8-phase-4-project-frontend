import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        email: email.toLowerCase(),
        password
      });

      const token = response.data.access_token;
      if (token) {
        navigate('/admin');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <section className="login">
      <h1 className="heading">Admin Login</h1>
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
        <div className="inputBox">
          <button type="submit" className="btn">Login</button>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;
