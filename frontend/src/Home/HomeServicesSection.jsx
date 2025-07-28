import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeStyle/HomeServicesSection.css';

function HomeServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/services')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched services:', data);
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch services:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-services-section">
      <div className="home-services-overlay">
        <h1 className="home-services-heading">Our Services</h1>
        <p className="home-services-subheading">
          Discover the range of solutions we offer to help your business grow.
        </p>

        {loading && <p className="loading-text">Loading services...</p>}
        {error && <p className="error-text">Failed to load services. Please try again later.</p>}

        {!loading && !error && (
          <div className="home-services-cards-container">
            {services.map((service, index) => (
              <Link
                to={service.link || '/services'}
                className="home-services-card"
                key={index}
                style={{
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="home-services-card-content">
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link to="/services" className="uni-button">All Services</Link>
      </div>
    </div>
  );
}

export default HomeServicesSection;
