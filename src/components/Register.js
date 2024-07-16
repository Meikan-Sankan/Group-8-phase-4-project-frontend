import React, { useState } from "react";
import axios from "axios";
import './register.css'; // Import the CSS file

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email: email.toLowerCase(),
        password
      });
      setError('');
      setSuccess('Registration successful!'); // Set the success message
      onRegister(response.data.message); // Pass the message to the onRegister handler
      console.log('Registration successful:', response.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
      setSuccess(''); // Clear success message on error
      console.error('Registration failed:', error);
    }
  };

  return (
    <section className="register">
      <h1 className="heading">Register</h1>
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
            type="email" 
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
        {success && <p className="success">{success}</p>}
        <input type="submit" value="Register" className="btn" />
      </form>
    </section>
  );
};

export default Register;
