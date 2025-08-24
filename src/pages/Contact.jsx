import React from 'react';
import { useState } from 'react';
import { db } from '../lib/supabase';
import { toast } from 'react-toastify';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await db.createContactMessage(formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact-section">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-desc">
        We'd love to hear from you! Reach out for orders, questions, or just to say hello.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name"
          className="contact-input" 
          placeholder="Your Name" 
          value={formData.name}
          onChange={handleChange}
          required 
        />
        <input 
          type="email" 
          name="email"
          className="contact-input" 
          placeholder="Your Email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <input 
          type="text" 
          name="subject"
          className="contact-input" 
          placeholder="Subject" 
          value={formData.subject}
          onChange={handleChange}
        />
        <textarea 
          name="message"
          className="contact-textarea" 
          placeholder="Your Message" 
          rows={5} 
          value={formData.message}
          onChange={handleChange}
          required 
        />
        <button type="submit" className="contact-btn" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      <div className="contact-info">
        <div>Email: <a href="mailto:info@zaytun.com">info@zaytun.com</a></div>
        <div>Phone: <a href="tel:+212600000000">+212 6 00 00 00 00</a></div>
      </div>
    </section>
  );
};

export default Contact;
