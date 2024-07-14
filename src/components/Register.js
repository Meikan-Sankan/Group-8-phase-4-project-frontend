import React, { useState } from "react";
import axios from "axios";

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        password
      });
      onRegister(response.data.token);
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <section className="register">
        <h1 className="heading">
          Register
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
          <div className="inputBox">
            <input 
              type="password" 
              placeholder="Confirm Password" 
              required 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </div>
          {error && <p className="error">{error}</p>}
          <input type="submit" value="Register" className="btn" />
        </form>
      </section>
    </>
  );
};

export default Register;
