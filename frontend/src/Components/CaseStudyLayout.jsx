import React, { useState, useEffect, useCallback } from 'react';
import '../Styles/ComponentsStyle/CaseStudyLayout.css';

const CaseStudyLayout = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Optimized navigation functions with useCallback
  const nextSlide = useCallback(() => {
    if (data.gallery && data.gallery.length > 0) {
      setCurrentSlide(prev => (prev + 1) % data.gallery.length);
    }
  }, [data.gallery]);

  const prevSlide = useCallback(() => {
    if (data.gallery && data.gallery.length > 0) {
      setCurrentSlide(prev => (prev - 1 + data.gallery.length) % data.gallery.length);
    }
  }, [data.gallery]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!data.gallery || data.gallery.length <= 1) return;

    const autoSlide = setInterval(nextSlide, 5000);
    return () => clearInterval(autoSlide);
  }, [data.gallery, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide]);

  return (
    <div className="case-study-page">
      {/* Hero Section */}
      <section className="case-study-hero" style={{ backgroundImage: `url(${data.heroImage})` }}>
        <div className="case-study-hero-overlay">
          <div className="case-study-hero-content">
            <h1 className="case-study-hero-title">{data.title}</h1>
            <p className="case-study-hero-subtitle">{data.subtitle}</p>
            <div className="case-study-hero-accent"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="case-study-section case-study-about">
        <div className="case-study-container">
          <div className="case-study-about-grid">
            <div className="case-study-about-content">
              <h2 className="case-study-about-title">About the Project</h2>
              <p className="case-study-about-description">{data.about}</p>
            </div>
            <div className="case-study-about-services">
              <h3 className="case-study-services-title">Services Provided</h3>
              <div className="case-study-services-list">
                {data.services?.map((service, index) => (
                  <span key={index} className="case-study-service-tag">{service}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="case-study-section case-study-context">
        <div className="case-study-container">
          <div className="case-study-context-grid">
            <div className="case-study-context-card">
              <h3 className="case-study-context-title">Project Details</h3>
              <div className="case-study-details">
                <div className="case-study-detail-item">
                  <span className="case-study-detail-label">Language:</span>
                  <span className="case-study-detail-value">{data.language}</span>
                </div>
                <div className="case-study-detail-item">
                  <span className="case-study-detail-label">Timescale:</span>
                  <span className="case-study-detail-value">{data.timescale}</span>
                </div>
                <div className="case-study-detail-item">
                  <span className="case-study-detail-label">Launch Date:</span>
                  <span className="case-study-detail-value">{data.launchDate}</span>
                </div>
                <div className="case-study-detail-item">
                  <span className="case-study-detail-label">System:</span>
                  <span className="case-study-detail-value">{data.system}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions Section */}
      <section className="case-study-section case-study-challenges">
        <div className="case-study-container">
          <div className="case-study-challenges-grid">
            <div className="case-study-challenges-column">
              <h2 className="case-study-section-title">Challenges</h2>
              <div className="case-study-list">
                {data.challenges?.map((challenge, index) => (
                  <div key={index} className="case-study-list-item">
                    <div className="case-study-list-icon">⚡</div>
                    <p className="case-study-list-text">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="case-study-challenges-column">
              <h2 className="case-study-section-title">Solutions</h2>
              <div className="case-study-list">
                {data.solutions?.map((solution, index) => (
                  <div key={index} className="case-study-list-item">
                    <div className="case-study-list-icon">✅</div>
                    <p className="case-study-list-text">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - No Title */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="case-study-gallery">
          <div className="case-study-gallery-container">
            <div className="case-study-gallery-main">
              <div className="case-study-gallery-slide">
                {data.gallery[currentSlide]?.type === 'image' ? (
                  <img 
                    src={data.gallery[currentSlide].src} 
                    alt={data.gallery[currentSlide].alt || `Gallery image ${currentSlide + 1}`}
                    className="case-study-gallery-image"
                    loading="lazy"
                  />
                ) : (
                  <video 
                    src={data.gallery[currentSlide]?.src}
                    className="case-study-gallery-video"
                    controls
                    poster={data.gallery[currentSlide]?.poster}
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              
              {data.gallery.length > 1 && (
                <>
                  <button 
                    className="case-study-gallery-btn case-study-gallery-prev" 
                    onClick={prevSlide}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button 
                    className="case-study-gallery-btn case-study-gallery-next" 
                    onClick={nextSlide}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            
            {data.gallery.length > 1 && (
              <div className="case-study-gallery-dots">
                {data.gallery.map((_, index) => (
                  <button 
                    key={index} 
                    className={`case-study-gallery-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="case-study-section case-study-cta">
        <div className="case-study-container">
          <div className="case-study-cta-content">
            <h2 className="case-study-cta-title">Ready to Explore?</h2>
            <p className="case-study-cta-subtitle">Check out the live project and see it in action</p>
            <a
              className="case-study-cta-button"
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="case-study-cta-icon">🚀</span>
              View Live Project
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyLayout;