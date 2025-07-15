import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyle/ServicesDropdown.css';

function ServicesDropdown() {
  const services = [
    { name: 'Computer Hardware & Networking', path: '/services/website-design' },
    { name: 'App Development', path: '/services/website-design' },
    { name: 'Web Development', path: '/services/portfolio-design' },
    { name: 'Web Design', path: '/services/digital-marketing' },
    { name: 'UI / UX Design', path: '/services/digital-marketing' },
    { name: 'Branding', path: '/services/digital-marketing' },
    { name: 'Digital Marketing', path: '/services/digital-marketing' },
    { name: 'Cybersecurity', path: '/services/e-commerce-website' }
  ];

  return (
    <div className="services-dropdown-container">
      <div className="services-dropdown-heading">
        <h1 className="services-dropdown-title">Services We Provide</h1>
        <p className="services-dropdown-description">
          Discover our diverse range of cutting-edge services designed to accelerate your business growth. We leverage the latest technologies to deliver innovative solutions — all at highly affordable prices tailored to suit your needs.
        </p>
      </div>
      <div className="services-dropdown-list-wrapper">
        <ul className="services-dropdown-list">
          {services.map((service, index) => (
            <li key={index} className="services-dropdown-list-item">
              <Link to={service.path} className="services-dropdown-link">
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ServicesDropdown;
