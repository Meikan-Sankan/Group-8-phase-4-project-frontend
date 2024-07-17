import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css'; 
const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch food data from backend
    const fetchFoodData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/foods'); // Adjust the URL as needed
        setFoods(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="menu">
      {foods.map(food => (
        <div key={food.id} className="card">
          <img src={food.image} alt={food.name} className="card-img" />
          <div className="card-body">
            <h5 className="card-title">{food.name}</h5>
            <p className="card-text">{food.description}</p>
            <p className="card-price">ksh:{food.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
