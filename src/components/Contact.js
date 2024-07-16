import React, { useState } from "react";

const Contact = ({ onContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onContact({ name, email, phone, comment });
    setName('');
    setEmail('');
    setPhone('');
    setComment('');
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
              <input 
                type="text" 
                placeholder="name" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div className="inputBox">
              <span className="fas fa-envelope"></span>
              <input 
                type="email" 
                placeholder="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="inputBox">
              <span className="fas fa-phone"></span>
              <input 
                type="number" 
                placeholder="number" 
                required 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
            <div className="inputBox">
              <span className="fas fa-comment"></span>
              <textarea 
                placeholder="comment" 
                required 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
              />
            </div>
            <input type="submit" value="contact now" className="btn" />
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
