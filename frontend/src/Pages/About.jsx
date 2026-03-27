import React, { useEffect, useState } from 'react';
import '../Styles/PagesStyle/About.css';
import PagesCard from '../Components/PagesCard';
import bgImage from '../assets/Image/Card-bg.jpg';

import api from '../api';

function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await api.get('/about');
        setAboutData(res.data);
      } catch (err) {
        console.error('Error fetching about data:', err);
      }
    };
    fetchAboutData();
  }, []);

  if (!aboutData) return <div>Loading...</div>;

  return (
    <>
      <PagesCard
        heading="About Us"
        description="Build robust, scalable, and high-performance web applications with modern technologies."
        backgroundImage={bgImage}
      />

      <div className="about-container">
        <div className="about-hero">
          <h1 className="about-title">{aboutData.heroTitle}</h1>
          <p className="about-subtitle">{aboutData.heroSubtitle}</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>{aboutData.mission}</p>
          </section>

          <section className="about-section">
            <h2>Our Vision</h2>
            <p>{aboutData.vision}</p>
          </section>

          <section className="about-section">
            <h2>Why Choose Us?</h2>
            <ul>
              {aboutData.reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default About;
