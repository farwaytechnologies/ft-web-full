import { API_BASE_URL } from '../api';

function Careers() {
  const [careerPositions, setCareerPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/jobroles`); // ✅ Adjust if your API URL is different
        const data = await res.json();
        setCareerPositions(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch job roles:', error);
        setLoading(false);
      }
    };

    fetchJobRoles();
  }, []);

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
            {loading ? (
              <p style={{ textAlign: 'center', padding: '2rem' }}>Loading job roles...</p>
            ) : careerPositions.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem' }}>No job roles available at the moment.</p>
            ) : (
              careerPositions.map((position) => (
                <Link
                  to="/apply"
                  state={{ position }}
                  key={position._id}
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Careers;
