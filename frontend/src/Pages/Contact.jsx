import React, { useState } from 'react';
import '../Styles/PagesStyle/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    type: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://ft-backend-c703.onrender.com/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Message sent');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          type: '',
          message: '',
        });
      } else {
        alert(data.error || 'Failed to send message');
      }
    } catch (err) {
      alert('❌ Server error');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form-wrapper">
        <h1 className="contact-heading">Get in Touch</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-row">
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="contact-row">
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="contact-row">
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select Enquiry Type</option>
              <option value="customer">Already a Customer</option>
              <option value="new">New Enquiry</option>
            </select>
          </div>
          <textarea name="message" rows="5" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
