import React, { useState, useEffect } from 'react';
import axios from 'axios';
import quoteImg from '../assets/images/quote-img.png';
import './Review.css';

const apiUrl = 'http://localhost:5000/api/reviews';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', review: '', rating: 0 });

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post(apiUrl, newReview)
      .then(response => {
        setReviews([...reviews, response.data]);
        setNewReview({ name: '', review: '', rating: 0 });
      })
      .catch(error => console.error('Error adding review:', error));
  };

  return (
    <section className="review" id="review">
      <h1 className="heading">
        Customer's <span>Reviews</span>
      </h1>
      <div className="box-container">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div className="box" key={review.id}>
              <img src={quoteImg} alt="" className="quote" />
              <p>{review.review}</p>
              <h3>{review.name}</h3>
              <div className="stars">
                {Array.from({ length: Math.floor(review.rating) }, (_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
                {review.rating % 1 !== 0 && (
                  <i className="fas fa-star-half-alt"></i>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <h2>Add Your Review</h2>
      <form onSubmit={handleFormSubmit} className="review-form">
        <input
          type="text"
          name="name"
          value={newReview.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          required
        />
        <textarea
          name="review"
          value={newReview.review}
          onChange={handleInputChange}
          placeholder="Your Review"
          required
        ></textarea>
        <input
          type="number"
          name="rating"
          value={newReview.rating}
          onChange={handleInputChange}
          placeholder="Rating (0-5)"
          min="0"
          max="5"
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </section>
  );
};

export default Review;
