import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: username,  // Assuming your backend expects 'email' instead of 'username'
        password
      });
      const token = response.data.access_token;  // Assuming your backend returns 'access_token'
      onLogin(token);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('Login failed. Please try again later.');  // Generic error message for other errors
      }
    }
  };

  return (
    <>
      <section className="login">
        <h1 className="heading">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input 
              type="text" 
              placeholder="Username" 
              required 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
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
          <input type="submit" value="Login" className="btn" />
        </form>
      </section>
    </>
  );
};

export default Login;
