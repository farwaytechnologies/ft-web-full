import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeStyle/HomeServicesSection.css';
//import im1 from '../assets/Image/cours-3.jpg';bg image 
// COMMENTED OUT IMAGE IMPORTS - USING BG COLORS INSTEAD
// import img1 from '../assets/Image/hardware.jpg'
// import img2 from  '../assets/Image/app.jpg'
// import img3 from  '../assets/Image/webdesign.jpg'
// import img4 from  '../assets/Image/digital.jpg'
// import img5 from  '../assets/Image/cpmpu.jpg'
// import img6 from  '../assets/Image/network.jpg'
// import img7 from  '../assets/Image/design.jpg'
// import img8 from  '../assets/Image/sequ.jpg'

const services = [
  {
    title: 'Computer Hardware & Networking',
    description:
      'Efficient solutions for assembling, troubleshooting, and maintaining computer systems and networks.',
    link: '/services/website-design',
    // image: img1, // COMMENTED OUT - using bg color instead
  },
  {
    title: 'App Development',
    description:
      'We create custom mobile applications for Android & iOS with robust functionality and sleek interfaces.',
    link: '/services/website-design',
    // image: img2, // COMMENTED OUT - using bg color instead
  },
  {
    title: 'Web Development',
    description:
      'Build scalable, fast-loading, and SEO-friendly websites tailored to your business needs.',
    link: '/services/portfolio-design',
    // image: img3, // COMMENTED OUT - using bg color instead
  },
  {
    title: 'Web Design',
    description:
      'Appealing and functional designs that capture attention and drive conversions for your website.',
    link: '/services/digital-marketing',
    // image: img4, // COMMENTED OUT - using bg color instead
  },
  {
    title: 'UI / UX Design',
    description:
      'Optimized user interfaces and seamless user experiences for apps and websites across all platforms.',
    link: '/services/digital-marketing',
    // image: img5, // COMMENTED OUT - using bg color instead
  },
  {
    title: 'Branding',
    description:
      'We help you build a strong brand identity with logos, colors, and messaging that reflects your values.',
    link: '/services/digital-marketing',
    // image: img6, // COMMENTED OUT - using bg color instead
  },
  {
    title: 'Digital Marketing',
    description:
      'Boost your reach with targeted social media, SEO, and email marketing campaigns.',
    link: '/services/digital-marketing',
    // image: img7, // COMMENTED OUT - using bg color instead
  },
  {
    title: 'Cybersecurity',
    description:
      'Protect your systems with advanced security audits, threat detection, and secure infrastructures.',
    link: '/services/e-commerce-website',
    // image: img8, // COMMENTED OUT - using bg color instead
  },
];

function HomeServicesSection() {
  return (
    <div className="home-services-section">
      <div className="home-services-overlay">
        <h1 className="home-services-heading">Our Services</h1>
        <p className="home-services-subheading">
          Discover the range of solutions we offer to help your business grow.
        </p>
        <div className="home-services-cards-container">
          {services.map((service, index) => (
            <Link 
              to={service.link} 
              className="home-services-card" 
              key={index}
            >
              {/* <img 
                src={service.image}
                alt={service.title}
                className="home-services-card-image"
              /> */}
              <div className="home-services-card-content">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <Link to="/services" className="uni-button">All Services</Link>
      </div>
    </div>
  );
}

export default HomeServicesSection;