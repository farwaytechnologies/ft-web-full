import React, { useState, useEffect } from 'react';
import '../Styles/HomeStyle/HomeTestimonialSection.css';

function HomeTestimonialSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 2,
      name: "Michael Chen",
      position: "Marketing Director",
      company: "Global Dynamics",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The strategic insights and implementation support we received were game-changing. Our brand visibility skyrocketed, and we're now industry leaders in our market.",
      rating: 5,
      industry: "Finance"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Founder",
      company: "Creative Solutions",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Working with this team felt like having an extension of our own company. Their personalized approach and attention to detail exceeded all our expectations.",
      rating: 5,
      industry: "Design"
    },
    {
      id: 4,
      name: "David Park",
      position: "Operations Manager",
      company: "InnovateLab",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "The results speak for themselves - 250% increase in qualified leads and a complete transformation of our sales funnel. Couldn't be happier with the partnership.",
      rating: 5,
      industry: "Healthcare"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      position: "CMO",
      company: "NextGen Retail",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      content: "From strategy to execution, every aspect was handled with professionalism and expertise. Our customer engagement rates have never been higher.",
      rating: 5,
      industry: "Retail"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="home-testimonial-section">
      <div className="testimonial-container">
        {/* Header */}
        <div className="testimonial-header">
          <h1>What Our Clients Say</h1>
          <p>Hear from industry leaders who have transformed their business with our expertise</p>
        </div>

        {/* Main Testimonial Display */}
        <div className="testimonial-main">
          <div className="testimonial-slider">
            <div
              className="testimonial-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-content">
                      <div className="quote-mark">"</div>
                      <p className="testimonial-text">{testimonial.content}</p>
                      <div className="testimonial-rating">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                        <div className="avatar-ring"></div>
                      </div>
                      <div className="author-info">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.position}</p>
                        <span className="company">{testimonial.company}</span>
                        <div className="industry-tag">{testimonial.industry}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button className="nav-btn prev-btn" onClick={prevSlide}>
            <span>‹</span>
          </button>
          <button className="nav-btn next-btn" onClick={nextSlide}>
            <span>›</span>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="testimonial-stats">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3>98%</h3>
            <p>Satisfaction Rate</p>
          </div>
          <div className="stat-item">
            <h3>300%</h3>
            <p>Average ROI Increase</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>Support Available</p>
          </div>
        </div>


      </div>
    </div>
  );
}

export default HomeTestimonialSection;
