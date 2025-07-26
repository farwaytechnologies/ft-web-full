import React, { useEffect, useState } from 'react';
import '../styles/HomeStyle/HomeMainSection.css';
import { Link } from 'react-router-dom';

function HomeMainSection() {
  const [homeContent, setHomeContent] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/home');
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
      {/* Background video */}
      <video autoPlay muted loop playsInline className="bg-video">
        <source src={homeContent.videoUrl} type="video/mp4" />
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
