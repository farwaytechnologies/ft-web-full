import React from 'react';
import '../Styles/PagesStyle/About.css'; // External CSS
import PagesCard from '../Components/PagesCard';
import bgImage from '../assets/Image/Card-bg.jpg';
function About() {
  return (

    <>

          <PagesCard
        heading="About Us"
        description="Build robust, scalable, and high-performance web applications with modern technologies."
        backgroundImage={bgImage}
      />

       <div className="about-container">
      <div className="about-hero">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">
          We are committed to delivering innovative, high-quality web solutions for modern businesses and learners.
        </p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Empower individuals and businesses by building scalable, efficient, and engaging web platforms tailored to user needs.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            To become a global leader in the edtech and web development space by embracing cutting-edge technology and design.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Experienced Full Stack Developers</li>
            <li>Client-Centered Design Approach</li>
            <li>Modern Tech Stack & Scalable Architecture</li>
            <li>Reliable Support and Maintenance</li>
          </ul>
        </section>
      </div>
    </div>
    </>
 
  );
}

export default About;
