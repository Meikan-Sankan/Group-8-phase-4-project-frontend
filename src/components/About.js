import React from "react";
import AboutImg from "../assets/images/about-img";
const About = () => {
  return (
    <>
      <section className="about" id="about">
        <h1 className="heading">
          <span>about</span> us
        </h1>

        <div className="row">
          <div className="image">
            <img src={AboutImg} alt="" />
          </div>

          <div className="content">
            <h3>what makes our bevarages special?</h3>
            <p>
              Elevate your taste experience with our carefully curated selection of beverages. Crafted with precision and passion, each sip embodies a symphony of flavors that dance on your palate. From the subtle notes of freshly brewed coffee to the tantalizing aroma of handpicked teas, every cup is a journey of indulgence.
            </p>
            <p>
               Immerse yourself in the essence of luxury with our beverages, meticulously sourced from the finest ingredients around the globe. Delight in the richness of tradition blended seamlessly with modern sophistication. With each sip, discover a new realm of taste, where quality meets excellence, and satisfaction knows no bounds.
            </p>
          
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
