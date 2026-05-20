import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api';
import '../Styles/ComponentsStyle/ServicesDropdown.css';

function ServicesDropdown() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then(res => res.json())
      .then(data => { setServices(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="services-dropdown-container">
      <div className="services-dropdown-heading">
        <h1 className="services-dropdown-title">Services We Provide</h1>
        <p className="services-dropdown-description">
          Cutting-edge solutions designed to accelerate your business growth at affordable prices.
        </p>
      </div>

      <div className="services-dropdown-list-wrapper">
        {loading ? (
          <p style={{ color: '#94a3b8' }}>Loading...</p>
        ) : services.length === 0 ? (
          <p style={{ color: '#64748b' }}>No services found</p>
        ) : (
          <ul className="services-dropdown-list">
            {services.map((service) => (
              <li key={service._id} className="services-dropdown-list-item">
                <Link to={`/services/${service._id}`} className="services-dropdown-link">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ServicesDropdown;
