import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/PagesStyle/Careers.css';

const careerPositions = [
  {
    id: 1,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "3-5 years",
    description: "Drive strategic marketing initiatives and brand awareness across multiple channels.",
    requirements: ["3+ years marketing experience", "Digital marketing expertise", "Team leadership skills", "Analytics proficiency"]
  },
  {
    id: 2,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote / On-site",
    type: "Full-time",
    experience: "2-4 years",
    description: "Build engaging UI experiences using React and modern web technologies.",
    requirements: ["React.js expertise", "JavaScript/TypeScript", "Responsive design", "Version control (Git)"]
  },
  {
    id: 3,
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote / On-site",
    type: "Full-time",
    experience: "2-5 years",
    description: "Develop robust APIs and backend systems using Node.js, Express, and cloud technologies.",
    requirements: ["Node.js/Express", "Database design", "API development", "Cloud platforms (AWS/Azure)"]
  },
  {
    id: 4,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    experience: "1-3 years",
    description: "Manage SEO, SEM, and social media campaigns to grow our digital presence.",
    requirements: ["SEO/SEM expertise", "Social media management", "Content creation", "Analytics tools"]
  },
  {
    id: 5,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "2-4 years",
    description: "Create intuitive and visually appealing user interfaces and experiences.",
    requirements: ["Figma/Adobe Creative Suite", "User research", "Prototyping", "Design systems"]
  },
  {
    id: 6,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote / On-site",
    type: "Full-time",
    experience: "3-6 years",
    description: "Manage CI/CD pipelines, infrastructure automation, and cloud deployments.",
    requirements: ["Docker/Kubernetes", "CI/CD pipelines", "Cloud infrastructure", "Monitoring tools"]
  }
];

function Careers() {
  return (
    <div className="careers-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Join Our Team</h1>
          <p className="hero-subtitle">
            Shape the future of technology with us. Explore exciting opportunities at our innovative IT Solutions company.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Team Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="positions-section">
        <div className="positions-container">
          <div className="positions-header">
            <h2 className="positions-title">Open Positions</h2>
            <p className="positions-subtitle">Find the perfect role that matches your skills and passion</p>
          </div>

          <div className="positions-grid">
            {careerPositions.map((position) => (
              <Link
                to="/apply"
                state={{ position }}
                key={position.id}
                className="position-card"
                style={{ textDecoration: 'none' }}
              >
                <div className="position-header">
                  <div>
                    <h3 className="position-title">{position.title}</h3>
                    <div className="position-tags">
                      <span className="tag department-tag">{position.department}</span>
                      <span className="tag type-tag">{position.type}</span>
                    </div>
                  </div>
                </div>
                <p className="position-description">{position.description}</p>
                <div className="position-details">
                  <div className="detail-row">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{position.experience}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{position.location}</span>
                  </div>
                </div>
                <div className="position-requirements">
                  <p className="requirements-label">Key Requirements:</p>
                  <div className="requirements-tags">
                    {position.requirements.slice(0, 2).map((req, index) => (
                      <span key={index} className="requirement-tag">
                        {req}
                      </span>
                    ))}
                    {position.requirements.length > 2 && (
                      <span className="requirement-tag">
                        +{position.requirements.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Careers;
