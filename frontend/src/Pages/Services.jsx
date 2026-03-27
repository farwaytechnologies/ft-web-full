import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/PagesStyle/Services.css';

import PagesCard from '../Components/PagesCard';
import bgImage from '../assets/Image/Card-bg.jpg';
import { API_BASE_URL } from '../api';

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <PagesCard
        heading="Service"
        description="We offer customized solutions in web development."
        backgroundImage={bgImage}
      />

      <div className="services-page-container">
        <h1 className="services-page-heading">Our Custom Services</h1>
        <p className="services-page-subheading">
          Explore our range of professional services crafted for your success.
        </p>

        <div className="services-page-grid">
          {services.map((service, index) => (
            <Link to={service.path} key={index} className="services-page-card-link">
              <div className="services-page-card">
                <div className="services-page-card-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="services-page-card-content">
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
