import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeStyle/HomeContactSection.css';
import { FaInstagram, FaSquareXTwitter, FaYoutube } from 'react-icons/fa6';
import { IoLogoFacebook, IoLogoLinkedin } from 'react-icons/io5';

function HomeContactSection() {
  return (
    <div className="home-contact-section">
      <div className="home-contact-container">
        <div className="home-contact-text">
          <h1>Get in Touch</h1>
          <p>
            We’d love to hear from you. Reach out with any questions or feedback.
          </p>
          <p>
            Let’s collaborate and create something great together. We are available on all major platforms.
          </p>
          <h3>Follow Our Socials</h3>
          <div className="home-contact-social-links">
            <a href="https://www.instagram.com/farway.technologies/" target="_blank" rel="noreferrer" className="home-contact-icon">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/farwaytechnologies" target="_blank" rel="noreferrer" className="home-contact-icon">
              <IoLogoFacebook />
            </a>
            <a href="https://www.linkedin.com/company/farwaytechnologies/" target="_blank" rel="noreferrer" className="home-contact-icon">
              <IoLogoLinkedin />
            </a>
          </div>
          <Link to="/contact" className="uni-button">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}

export default HomeContactSection;
