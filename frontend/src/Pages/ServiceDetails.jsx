import { API_BASE_URL } from '../api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/services/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch service data');
        return res.json();
      })
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!service) return <div className="error">Service not found.</div>;

  return (
    <div className="service-details-container">
      <div className="service-details-banner">
        {service.image ? (
          <img src={service.image} alt={service.title || 'Service Image'} />
        ) : (
          <div className="placeholder-image">No Image Available</div>
        )}
        <h1>{service.title || 'Untitled Service'}</h1>
      </div>

      <div className="service-details-content">
        <p className="service-details-description">
          {service.detailedDescription || 'No detailed description provided.'}
        </p>

        {service.features && service.features.length > 0 ? (
          <ul className="service-details-features">
            {service.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p>No features listed.</p>
        )}
      </div>
    </div>
  );
}

export default ServiceDetails;
