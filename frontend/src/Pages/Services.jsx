import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PagesCard from '../Components/PagesCard';
import bgImage from '../assets/Image/Card-bg.jpg';
import { API_BASE_URL } from '../api';
import '../Styles/PagesStyle/Services.css';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then(res => res.json())
      .then(data => { setServices(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  return (
    <>
      <PagesCard
        heading="Services"
        description="We offer customized solutions in web development, networking, and more."
        backgroundImage={bgImage}
      />

      <div className="services-page-container">
        <div className="services-page-header">
          <h1 className="services-page-heading">Our Services</h1>
          <p className="services-page-subheading">
            Explore our range of professional services crafted for your success.
          </p>
        </div>

        {loading ? (
          <div className="services-loading">
            <div className="services-spinner" />
            <p>Loading services...</p>
          </div>
        ) : (
          <div className="services-page-grid">
            {services.map((service) => (
              <Link to={`/services/${service._id}`} key={service._id} className="services-page-card-link">
                <div className="services-page-card">
                  <div className="services-page-card-image">
                    <img src={service.image} alt={service.title} />
                    <div className="services-card-overlay" />
                  </div>
                  <div className="services-page-card-content">
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <span className="services-card-cta">Learn More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Services;
