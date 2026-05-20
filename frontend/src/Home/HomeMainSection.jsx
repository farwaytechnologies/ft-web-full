import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';
import '../Styles/HomeStyle/HomeMainSection.css';
import { Link } from 'react-router-dom';
import whyUsVideo from '../assets/Video/Video-3.mp4';

function HomeMainSection() {
  const [homeContent, setHomeContent] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/home`);
        const data = await res.json();
        setHomeContent(data);
      } catch (err) {
        console.error('Failed to fetch home section content:', err);
      }
    };

    fetchHomeData();
  }, []);

  if (!homeContent) return null;

  return (
    <div className="home-main-section">
      {/* Background Video */}
      <video autoPlay muted loop playsInline className="whyus-bg-video">
        <source src={whyUsVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay content */}
      <div className="overlay-wrapper">
        <div className="overlay-content">
          <h1>{homeContent.heading}</h1>
          <p>{homeContent.description}</p>
          <Link to={homeContent.buttonLink} className="uni-button">
            {homeContent.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeMainSection;
