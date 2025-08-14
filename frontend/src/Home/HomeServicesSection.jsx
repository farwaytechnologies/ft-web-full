import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeStyle/HomeServicesSection.css';

function HomeServicesSection() {
  const [metrics, setMetrics] = useState({
    projectsCompleted: 0,
    happyClients: 0,
    teamMembers: 0,
    yearsExperience: 0
  });

  useEffect(() => {
    // Animate metrics on component mount
    const animateMetrics = () => {
      const finalMetrics = {
        projectsCompleted: 500,
        happyClients: 200,
        teamMembers: 25,
        yearsExperience: 8
      };

      let current = {
        projectsCompleted: 0,
        happyClients: 0,
        teamMembers: 0,
        yearsExperience: 0
      };

      const duration = 2500;
      const steps = 60;
      const increment = duration / steps;

      const timer = setInterval(() => {
        current.projectsCompleted = Math.min(current.projectsCompleted + finalMetrics.projectsCompleted / steps, finalMetrics.projectsCompleted);
        current.happyClients = Math.min(current.happyClients + finalMetrics.happyClients / steps, finalMetrics.happyClients);
        current.teamMembers = Math.min(current.teamMembers + finalMetrics.teamMembers / steps, finalMetrics.teamMembers);
        current.yearsExperience = Math.min(current.yearsExperience + finalMetrics.yearsExperience / steps, finalMetrics.yearsExperience);

        setMetrics({
          projectsCompleted: Math.floor(current.projectsCompleted),
          happyClients: Math.floor(current.happyClients),
          teamMembers: Math.floor(current.teamMembers),
          yearsExperience: Math.floor(current.yearsExperience)
        });

        if (current.projectsCompleted >= finalMetrics.projectsCompleted) {
          clearInterval(timer);
          setMetrics(finalMetrics);
        }
      }, increment);
    };

    const timeout = setTimeout(animateMetrics, 800);
    return () => clearTimeout(timeout);
  }, []);

  const coreServices = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading"]
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Native and cross-platform mobile apps for iOS and Android",
      features: ["React Native", "Flutter", "Native iOS/Android"]
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment solutions",
      features: ["AWS", "Azure", "Google Cloud"]
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "User-centered design that converts visitors into customers",
      features: ["User Research", "Prototyping", "Design Systems"]
    },
    {
      icon: "🔧",
      title: "DevOps & Automation",
      description: "Streamlined development workflows and automated deployments",
      features: ["CI/CD Pipelines", "Docker", "Kubernetes"]
    },
    {
      icon: "🚀",
      title: "Digital Marketing",
      description: "Growth-focused marketing strategies to scale your business",
      features: ["SEO/SEM", "Social Media", "Content Strategy"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "We analyze your needs and define project requirements"
    },
    {
      step: "02", 
      title: "Strategy",
      description: "Create a comprehensive plan and technical roadmap"
    },
    {
      step: "03",
      title: "Development",
      description: "Build your solution using agile development practices"
    },
    {
      step: "04",
      title: "Launch",
      description: "Deploy, test, and provide ongoing support and maintenance"
    }
  ];

  const industries = [
    "E-commerce",
    "Healthcare",
    "Finance",
    "Education",
    "Real Estate",
    "Technology"
  ];

  const testimonial = {
    text: "Working with this team transformed our digital presence. The quality of work and attention to detail exceeded our expectations.",
    author: "Sarah Johnson",
    position: "CEO, TechStart Inc.",
    rating: 5
  };

  return (
    <div className="home-services-section">
      <div className="home-services-container">
        {/* Hero Section */}
        <div className="services-hero">
          <div className="hero-badge">
            <span className="badge-text">🚀 Full-Stack Digital Solutions</span>
          </div>
          
          <h1 className="home-services-heading">
            Transform Your Business with
            <span className="gradient-text"> Premium Services</span>
          </h1>
          
          <p className="home-services-subheading">
            From concept to launch, we deliver end-to-end digital solutions that drive growth, 
            enhance user experience, and position your business for long-term success in the digital landscape.
          </p>

          {/* Industries Pills */}
          <div className="industries-container">
            <p className="industries-label">Industries We Serve:</p>
            <div className="industries-pills">
              {industries.map((industry, index) => (
                <span key={index} className="industry-pill">
                  {industry}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <Link to="/services" className="primary-button">
              <span>Explore All Services</span>
              <svg className="button-arrow" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/contact" className="secondary-button">
              Get Free Consultation
            </Link>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="metrics-section">
          <div className="metric-item">
            <div className="metric-number">{metrics.projectsCompleted}+</div>
            <div className="metric-label">Projects Completed</div>
          </div>
          <div className="metric-item">
            <div className="metric-number">{metrics.happyClients}+</div>
            <div className="metric-label">Happy Clients</div>
          </div>
          <div className="metric-item">
            <div className="metric-number">{metrics.teamMembers}+</div>
            <div className="metric-label">Expert Team Members</div>
          </div>
          <div className="metric-item">
            <div className="metric-number">{metrics.yearsExperience}+</div>
            <div className="metric-label">Years of Experience</div>
          </div>
        </div>

        {/* Core Services Section */}
        <div className="core-services-section">
          <h2 className="section-title">Our Core Services</h2>
          <p className="section-subtitle">Comprehensive solutions tailored to your business needs</p>
          
          <div className="services-grid">
            {coreServices.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-features">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="service-hover-overlay">
                  <Link to="/services" className="service-link">Learn More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="process-section">
          <h2 className="section-title">Our Process</h2>
          <p className="section-subtitle">How we bring your vision to life</p>
          
          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="testimonial-section">
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="star">⭐</span>
              ))}
            </div>
            <blockquote className="testimonial-text">"{testimonial.text}"</blockquote>
            <div className="testimonial-author">
              <div className="author-info">
                <div className="author-name">{testimonial.author}</div>
                <div className="author-position">{testimonial.position}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to Start Your Project?</h2>
          <p className="cta-description">Let's discuss how we can help transform your business with our expert services.</p>
          <div className="cta-final-buttons">
            <Link to="/contact" className="primary-button large">
              Start Your Project
              <svg className="button-arrow" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/portfolio" className="secondary-button large">
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeServicesSection;