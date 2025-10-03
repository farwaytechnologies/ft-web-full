import React, { useEffect, useState } from 'react';
import '../Styles/ComponentsStyle/ServicesDropdown.css';

function ServicesDropdown() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://ft-backend-c703.onrender.com/api/services')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched services:', data); // Log the full data
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
    <div className="services-dropdown-container">
      <div className="services-dropdown-heading">
        <h1 className="services-dropdown-title">Services We Provide</h1>
        <p className="services-dropdown-description">
          Discover our diverse range of cutting-edge services designed to accelerate your business growth. We leverage the latest technologies to deliver innovative solutions — all at highly affordable prices tailored to suit your needs.
        </p>
      </div>

      <div className="services-dropdown-list-wrapper">
        {loading ? (
          <p style={{ color: '#fff' }}>Loading services...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error loading services</p>
        ) : services.length === 0 ? (
          <p style={{ color: '#ccc' }}>No services found</p>
        ) : (
          <ul className="services-dropdown-list">
            {services.map((service, index) => {
              console.log('Service item:', service); // Log each item
              return (
                <li key={service._id || index} className="services-dropdown-list-item">
                  <div className="services-dropdown-link">
                    {service.name || service.title || 'Unnamed Service'}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ServicesDropdown;
