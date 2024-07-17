import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css"; // Import your CSS file for styling

const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products"); // Adjust the URL as needed
      console.log("Products data:", response.data); // Log the response data for debugging
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products. Please try again later.");
    }
  };

  return (
    <div className="product-container">
      <h2>Products</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Product;
