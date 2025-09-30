// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyle/Footer.css';

import { FaInstagram } from "react-icons/fa";
import { IoLogoFacebook, IoLogoYoutube, IoLogoLinkedin } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiGooglemaps } from "react-icons/si";
import { GoMail } from "react-icons/go";
import { FiPhone } from "react-icons/fi";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">

          <div className="contact-info">
            <div className="contact-item">
              <SiGooglemaps className="contact-icon" />
              <a
                href="https://www.google.com/maps/search/PETER'S+Nine+Building,+Idukki+Rd,+Thodupuzha,+Kerala+685584"
                target="_blank"
                rel="noopener noreferrer"
              >
                GLOBAL 247, PETER'S Nine Building,<br />
                Thodupuzha, Kerala 685584
              </a>
            </div>
            <div className="contact-item">
              <GoMail className="contact-icon" />
              <a href="mailto:mail@farwaytechnologies.com">mail@farwaytechnologies.com</a>
            </div>
            <div className="contact-item">
              <FiPhone className="contact-icon" />
              <a href="tel:+917511143736">+91 75111 43736</a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} Farway Technologies Private Limited. All rights reserved.
        </p>
        <div className="social-links">
          <a href="https://www.instagram.com/farway.technologies/" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/farwaytechnologies" target="_blank" rel="noopener noreferrer" className="social-link">
            <IoLogoFacebook />
          </a>
          {/* <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <IoLogoYoutube />
          </a> */}
          {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaSquareXTwitter />
          </a> */}
          <a href="https://www.linkedin.com/company/farwaytechnologies/" target="_blank" rel="noopener noreferrer" className="social-link">
            <IoLogoLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
