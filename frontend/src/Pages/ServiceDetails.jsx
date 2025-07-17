import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PagesStyle/ServiceDetails.css';

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/services/${id}`)
      .then(res => res.json())
      .then(data => setService(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!service) return <div className="loading">Loading...</div>;

  return (
    <div className="service-details-container">
      <div className="service-details-banner">
        <img src={service.image} alt={service.title} />
        <h1>{service.title}</h1>
      </div>

      <div className="service-details-content">
        <p className="service-details-description">{service.detailedDescription}</p>

        {service.features && (
          <ul className="service-details-features">
            {service.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ServiceDetails;
