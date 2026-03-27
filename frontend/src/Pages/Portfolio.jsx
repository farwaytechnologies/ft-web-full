import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';
import { Link } from 'react-router-dom';
import '../Styles/PagesStyle/Portfolio.css';
import PagesCard from '../Components/PagesCard';
import bg from '../assets/Image/Card-bg.jpg';

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/portfolio`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
          {loading ? (
            <p>Loading...</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="project-card">
                <div className="project-image">
                  <img
                    src={project.heroImage}
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
                      <p className="project-category">{project.subtitle}</p>
                    </div>
                    <p className="project-description">{project.about}</p>
                    <div className="project-tech">
                      {project.services?.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={project.link || '#'} className="uni-button" target="_blank" rel="noopener noreferrer">
                        View Live
                      </a>
                      <Link to={`/portfolio-details/${project._id}`} className="uni-button">View details</Link>
                    </div>
                  </div>

                  <div className="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {project.solutions?.map((feature, index) => (
                        <li key={index}>{feature.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Portfolio;
