import React, { useEffect, useState } from 'react';
import '../Styles/HomeStyle/HomeMainSection.css';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/Image/cours-3.jpg'; // Adjust path as needed

function HomeMainSection() {
  const [homeContent, setHomeContent] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch('https://backend-iz8p.onrender.com/api/home');
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
    <div
      className="home-main-section"
      style={{
        backgroundImage: `url(${homeContent.imageUrl || defaultImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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
