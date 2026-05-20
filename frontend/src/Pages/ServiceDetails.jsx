import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api';
import { useParams, Link } from 'react-router-dom';
import '../Styles/PagesStyle/ServiceDetails.css';

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/services/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Service not found');
        return res.json();
      })
      .then(data => { setService(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="sd-state">
      <div className="sd-spinner" />
      <p>Loading service...</p>
    </div>
  );

  if (error || !service) return (
    <div className="sd-state sd-error">
      <h2>Service not found</h2>
      <Link to="/services" className="sd-back-btn">← Back to Services</Link>
    </div>
  );

  return (
    <div className="sd-page">

      {/* Hero Banner */}
      <div className="sd-hero">
        {service.image && (
          <img src={service.image} alt={service.title} className="sd-hero-img" />
        )}
        <div className="sd-hero-overlay">
          <div className="sd-hero-content">
            <Link to="/services" className="sd-breadcrumb">← All Services</Link>
            <h1 className="sd-hero-title">{service.title}</h1>
            <p className="sd-hero-desc">{service.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="sd-body">
        <div className="sd-container">

          {/* About */}
          <section className="sd-section">
            <h2 className="sd-section-title">About This Service</h2>
            <p className="sd-section-text">{service.detailedDescription}</p>
          </section>

          {/* Features */}
          {service.features?.length > 0 && (
            <section className="sd-section">
              <h2 className="sd-section-title">What's Included</h2>
              <ul className="sd-features">
                {service.features.map((f, i) => (
                  <li key={i} className="sd-feature-item">
                    <span className="sd-feature-icon">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Video */}
          {service.video && (
            <section className="sd-section">
              <h2 className="sd-section-title">See It In Action</h2>
              <div className="sd-video-wrapper">
                <video controls className="sd-video">
                  <source src={service.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="sd-cta">
            <h3>Ready to get started?</h3>
            <p>Let's discuss how we can help you with {service.title}.</p>
            <Link to="/contact" className="sd-cta-btn">Get In Touch</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
