import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeStyle/HomeAboutSection.css';
import aboutImg from '../assets/Image/chat.png';

function HomeAboutSection() {
  return (
    <div className="home-about-section">
      <div className="home-about-container">
        <div className="home-about-text">
          <h1>About Us</h1>
          <p>
            By embedding ourselves within your organization, we analyze your challenges
            and deliver IT strategies and solutions that align seamlessly with both your
            short- and long-term goals.
          </p>
          <p>
            We have the expertise and experience to empower organizations with cutting-edge
            computing technologies that elevate performance.
          </p>
          <h3>We’re Specialized In</h3>
          <ul className="home-about-specializations">
            <li>Application Development</li>
            <li>Web Development</li>
            <li>UI/UX Design</li>
            <li>Graphic Design</li>
            <li>Digital Marketing</li>
            <li>Cyber-Security</li>
          </ul>
          <Link to="/about" className="uni-button"> More About Us</Link>
        </div>

        <div className="home-about-image">
          <img src={aboutImg} alt="About Us" />
        </div>
      </div>
    </div>
  );
}

export default HomeAboutSection;
