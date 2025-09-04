import React from 'react';
import './Contact.css';

const Contact = () => (
  <section className="contact-section">
    <h2 className="contact-title">Contact Us</h2>
    <p className="contact-desc">
      We’d love to hear from you! Reach out for orders, questions, or just to say hello.
    </p>
    <form className="contact-form" onSubmit={e => e.preventDefault()}>
      <input type="text" className="contact-input" placeholder="Your Name" required />
      <input type="email" className="contact-input" placeholder="Your Email" required />
      <textarea className="contact-textarea" placeholder="Your Message" rows={5} required />
      <button type="submit" className="contact-btn">Send</button>
    </form>
    <div className="contact-info">
      <div>Email: <a href="mailto:info@abdeljaliloliveoil.com">info@abdeljaliloliveoil.com</a></div>
      
      {/* Add your physical location or WhatsApp if you want */}
    </div>
  </section>
);

export default Contact;
