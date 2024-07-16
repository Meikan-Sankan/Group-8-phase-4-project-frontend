import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import "./Home.css"; // Import custom CSS file for Home component

const Home = () => {
  // Example images as data URIs (replace with your own image data)
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbWO-gzC0WcSML-boaefKFAVSn0Gn0dWPIOw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbCVeiWEZ7cKsmSC79nUG0KSiHwZTwzPkw6g&s",
    "https://i.pinimg.com/736x/68/53/7c/68537c1912811d9499d2c1b7402db0d2.jpg",
    "https://i.ebayimg.com/images/g/5VUAAOSwVAxdc9tF/s-l1200.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvcIgPRDvY_NkNBTLcQCN5ZEp97BVYFwqf9A&s",
    "https://www.shutterstock.com/image-vector/hot-cold-coffee-beverage-different-260nw-2331549433.jpg",
  ];

  return (
    <section className="home" id="home">
      <div className="content">
        <div className="intro-text">
          <p>Welcome to our Delicacies Hub</p>
          <h3>
            fresh <span>food in the </span>morning
          </h3>
        </div>
      </div>
      <div className="carousel-container">
        <Carousel autoPlay={true} interval={2000} showThumbs={false} infiniteLoop={true}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="carousel-image"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Home;