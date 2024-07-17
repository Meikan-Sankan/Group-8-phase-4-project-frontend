import React, { useState, useEffect } from 'react';
import qouteImg from '../assets/images/quote-img.png';


const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Simulating fetching data from reviews.json
    setReviews(reviewsData.reviews);
  }, []);

  return (
    <section className="review" id="review">
      <h1 className="heading">
        Customer's <span>Reviews</span>
      </h1>
      <div className="box-container">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div className="box" key={review.id}>
              <img src={qouteImg} alt="" className="quote" />
              <p>{review.review}</p>
              <h3>{review.name}</h3>
              <div className="stars">
                {Array.from({ length: review.rating }, (_, i) => (
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
    </section>
  );
};

export default Review;
