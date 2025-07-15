import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PagesStyle/Services.css';

import img1 from '../assets/Image/hardware.jpg';
import img2 from '../assets/Image/hardware.jpg';
import img3 from '../assets/Image/hardware.jpg';
import img4 from '../assets/Image/hardware.jpg';
import img5 from '../assets/Image/hardware.jpg';
import img6 from '../assets/Image/hardware.jpg';
import img7 from '../assets/Image/hardware.jpg';
import img8 from '../assets/Image/hardware.jpg';

import PagesCard from '../Components/PagesCard';
import bgImage from '../assets/Image/Card-bg.jpg';

const serviceList = [
  {
    title: 'Computer Hardware & Networking',
    description: 'Efficient solutions for assembling, troubleshooting, and maintaining computer systems and networks.',
    image: img1,
    path: '/services/hardware-networking',
  },
  {
    title: 'App Development',
    description: 'Custom mobile applications for Android & iOS with robust functionality and sleek interfaces.',
    image: img2,
    path: '/services/app-development',
  },
  {
    title: 'Web Development',
    description: 'Scalable, SEO-friendly websites tailored to your business needs.',
    image: img3,
    path: '/services/web-development',
  },
  {
    title: 'Web Design',
    description: 'Visually engaging designs to enhance user engagement and conversions.',
    image: img4,
    path: '/services/web-design',
  },
  {
    title: 'UI / UX Design',
    description: 'Seamless user experiences and intuitive interfaces across platforms.',
    image: img5,
    path: '/services/ui-ux-design',
  },
  {
    title: 'Branding',
    description: 'Build a strong brand identity with impactful visuals and messaging.',
    image: img6,
    path: '/services/branding',
  },
  {
    title: 'Digital Marketing',
    description: 'Grow your business with targeted SEO, SMM, and email campaigns.',
    image: img7,
    path: '/services/digital-marketing',
  },
  {
    title: 'Cybersecurity',
    description: 'Secure your digital infrastructure with expert threat analysis and protection.',
    image: img8,
    path: '/services/cybersecurity',
  },
];

function Services() {
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
          {serviceList.map((service, index) => (
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
