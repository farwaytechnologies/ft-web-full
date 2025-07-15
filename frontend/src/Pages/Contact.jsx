import React from 'react';
import '../Styles/PagesStyle/Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-form-wrapper">
        <h1 className="contact-heading">Get in Touch</h1>
        <form className="contact-form">
          <div className="contact-row">
            <input type="text" name="name" placeholder="Your Name" required />
          </div>

          <div className="contact-row">
            <input type="email" name="email" placeholder="Your Email" required />
            <input type="tel" name="phone" placeholder="Phone Number" required />
          </div>

          <div className="contact-row">
            <input type="text" name="subject" placeholder="Subject" required />
            <select name="type" required>
              <option value="">Select Enquiry Type</option>
              <option value="customer">Already a Customer</option>
              <option value="new">New Enquiry</option>
            </select>
          </div>

          <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
