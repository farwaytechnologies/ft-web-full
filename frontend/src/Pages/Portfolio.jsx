// src/Pages/Portfolio.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/PagesStyle/Portfolio.css';
import im1 from '../assets/Image/app.jpg';
import im2 from '../assets/Image/webdesign.jpg';
import im3 from '../assets/Image/cctv.jpg'
import PagesCard from '../Components/PagesCard';
import bg from '../assets/Image/Card-bg.jpg';

const PROJECTS = [
  {
    id: 1,
    title: "Cam Eye Security Solutions",
    category: "Business Website (CCTV Company)",
    description: "A professional and responsive business website built for a CCTV and security solutions company. It showcases services, client testimonials, and contact information in a clean layout.",
    technologies: ["HTML", "CSS", "JavaScript"],
    features: [
      "Responsive multi-page layout",
      "Service showcase with icons",
      "Client testimonial section",
      "Contact form and map integration",
      "Cross-browser compatibility"
    ],
    image: im3,
    liveLink: "#",
  },
  {
    id: 2,
    title: "Syllabase",
    category: "EdTech Platform",
    description: "A comprehensive educational technology platform designed to streamline learning management and course delivery.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    features: [
      "Interactive course management system",
      "Student progress analytics",
      "Real-time messaging and collaboration",
      "Mobile-responsive design",
      "Secure user authentication"
    ],
    image: im1,
    liveLink: "#",
  },
  {
    id: 3,
    title: "Personal Custom Portfolio",
    category: "Web Development",
    description: "A bespoke portfolio website crafted for a creative professional to showcase their work and personal brand.",
    technologies: ["HTML5", "CSS3", "JavaScript", "SCSS"],
    features: [
      "Custom responsive design",
      "Smooth scroll animations",
      "Interactive project galleries",
      "Contact form integration",
      "SEO optimized"
    ],
    image: im2,
    liveLink: "#",
  }
];

function Portfolio() {
  return (
    <>
      <PagesCard
        heading="Portfolio"
        description="Explore our carefully crafted web solutions, from modern websites to comprehensive platforms."
        backgroundImage={bg}
      />

      <div className="portfolio-container">
        <div className="portfolio-header">
          <h1 className="portfolio-heading">Our Featured Projects</h1>
          <p className="portfolio-subtitle">Showcasing our latest projects and innovative solutions</p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="project-placeholder" style={{ display: 'none' }}>
                  <span className="project-icon">🖼️</span>
                </div>
              </div>

              <div className="project-content">
                <div className="project-main-info">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-category">{project.category}</p>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.liveLink} className="uni-button" target="_blank" rel="noopener noreferrer">View Live</a>
                    <Link to={`/case-study/${project.id}`} className="uni-button">View Case Study</Link>
                  </div>
                </div>

                <div className="project-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-stats">
          <div className="stat-item">
            <h3>15+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-item">
            <h3>10+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3>3+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Client Satisfaction</p>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Start Your Next Project?</h2>
          <p>Let's work together to bring your ideas to life</p>
          <button className="uni-button">Get In Touch</button>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
