import React from 'react';
import '../styles/HomeStyle/HomeMainSection.css';
import bgVideo from '../assets/Video/Video-3.mp4';
import { Link } from 'react-router-dom';

function HomeMainSection() {
  return (
    <div className="home-main-section">
      {/* Background video */}
      <video autoPlay muted loop playsInline className="bg-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div className="overlay-wrapper">
        <div className="overlay-content">
          <h1>Welcome to Our Website</h1>
          <p>
            "We are committed to delivering the most effective and innovative IT solutions—crafted by experienced and qualified professionals—to help boost your business performance, drive growth, and exceed expectations."
          </p>
          <Link to="/about" className="uni-button">Learn More</Link>
        </div>
      </div>
    </div>
  );
}

export default HomeMainSection;
