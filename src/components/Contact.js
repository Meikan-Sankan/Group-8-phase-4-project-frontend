import React from "react";

const Contact = ({ onContact }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onContact();
  };

  return (
    <>
      <section className="contact" id="contact">
        <h1 className="heading">
          <span>contact</span> us
        </h1>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <h3>get in touch</h3>
            <div className="inputBox">
              <span className="fas fa-user"></span>
              <input type="text" placeholder="name" required />
            </div>
            <div className="inputBox">
              <span className="fas fa-envelope"></span>
              <input type="email" placeholder="email" required />
            </div>
            <div className="inputBox">
              <span className="fas fa-phone"></span>
              <input type="number" placeholder="number" required />
            </div>
            <input type="submit" value="contact now" className="btn" />
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
