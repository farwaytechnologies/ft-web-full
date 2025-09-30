import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/PagesStyle/PortfolioDetails.css';

function PortfolioDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`https://backend-iz8p.onrender.com/api/portfolio/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div className="portfolio-details-loading">Loading...</div>;
  if (!project) return <div className="portfolio-details-error">Project not found.</div>;

  return (
    <div className="portfolio-details-container">
      <header className="portfolio-details-header">
        <h1>{project.title}</h1>
        <p>{project.subtitle}</p>
      </header>

      <section className="portfolio-details-hero">
        <img src={project.heroImage} alt={project.title} />
      </section>

      <section className="portfolio-details-about">
        <h2>About the Project</h2>
        <p>{project.about}</p>

        <div className="portfolio-details-meta">
          <p><strong>Platform:</strong> {project.system}</p>
          <p><strong>Language:</strong> {project.language}</p>
          <p><strong>Launch Date:</strong> {project.launchDate}</p>
          <p><strong>Live Link:</strong> <a href={project.link} target="_blank" rel="noreferrer">{project.link}</a></p>
        </div>

        <div className="portfolio-details-tags">
          {project.services?.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </section>

      <section className="portfolio-details-gallery">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {project.gallery?.map((item, idx) => (
            <div key={idx} className="gallery-item">
              {item.type === 'image' ? (
                <img src={item.src} alt={`Gallery ${idx}`} />
              ) : (
                <video controls src={item.src}></video>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-details-section">
        <h2>Challenges</h2>
        <ul>
          {project.challenges?.map((item, idx) => (
            <li key={idx}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="portfolio-details-section">
        <h2>Solutions</h2>
        <ul>
          {project.solutions?.map((item, idx) => (
            <li key={idx}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default PortfolioDetails;
