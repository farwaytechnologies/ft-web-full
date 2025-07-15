import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeStyle/HomeWhyUsSection.css';
import whyUsVideo from '../assets/Video/Video-2.mp4';
import {
  FiMonitor,
  FiCloud,
  FiShield,
  FiHeadphones
} from 'react-icons/fi';

function HomeWhyUsSection() {
  return (
    <div className="home-whyus-section">
      {/* Background Video */}
      <video autoPlay muted loop playsInline className="whyus-bg-video">
        <source src={whyUsVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground Content */}
      <div className="home-whyus-container">
        <div className="home-whyus-content">
          <div className="whyus-layout">
            {/* Left Side */}
            <div className="whyus-left">
              <h1>Why Choose Us?</h1>
              <p>
                We provide innovative IT solutions to help businesses grow, automate, and stay secure in the digital age.
              </p>
              <Link to="/about" className="uni-button">Learn More About Us</Link>
            </div>

            {/* Right Side */}
            <div className="whyus-right">
              <div className="whyus-list">
                <div className="whyus-item">
                  <div className="item-icon"><FiMonitor /></div>
                  <div className="item-content">
                    <h4>Full-Stack Expertise</h4>
                    <p>We specialize in building scalable web applications using modern technologies tailored to your business needs.</p>
                  </div>
                </div>

                <div className="whyus-item">
                  <div className="item-icon"><FiCloud /></div>
                  <div className="item-content">
                    <h4>Cloud Integration</h4>
                    <p>Deploy and manage your applications in the cloud with optimized performance, security, and scalability.</p>
                  </div>
                </div>

                <div className="whyus-item">
                  <div className="item-icon"><FiShield /></div>
                  <div className="item-content">
                    <h4>Secure Solutions</h4>
                    <p>Security is built into everything we do—from code to deployment, ensuring your data and systems are protected.</p>
                  </div>
                </div>

                <div className="whyus-item">
                  <div className="item-icon"><FiHeadphones /></div>
                  <div className="item-content">
                    <h4>Reliable Support</h4>
                    <p>Our dedicated support team is available around the clock to resolve issues and keep your business running smoothly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWhyUsSection;
