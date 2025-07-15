import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServicesDropdown from './ServicesDropdown';
import CoursesDropdown from './CoursesDropdown';
import '../Styles/ComponentsStyle/Navebar.css';
import logoDark from '../assets/logo/logo_white_trimmed.png';
import logoLight from '../assets/logo/logo_colored_trimmed.png';

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setOpenDropdown(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isWhite = scrolled || hovered;

  return (
    <nav
      className={`navbar ${isWhite ? 'white-bg' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="navbar-logo">
        <Link to="/" onClick={closeMobileMenu}>
          <img
            src={isWhite ? logoLight : logoDark}
            alt="Farway Technologies Logo"
            className="logo-image"
          />
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li className="dropdown" onMouseEnter={() => handleMouseEnter('services')} onMouseLeave={handleMouseLeave}>
          <Link to="/services">Services</Link>
          {openDropdown === 'services' && (
            <div className="dropdown-menu" onMouseEnter={() => handleMouseEnter('services')} onMouseLeave={handleMouseLeave}>
              <ServicesDropdown />
            </div>
          )}
        </li>

        <li className="dropdown" onMouseEnter={() => handleMouseEnter('courses')} onMouseLeave={handleMouseLeave}>
          <Link to="/courses">
            Courses <span className="badge">Free</span>
          </Link>
          {openDropdown === 'courses' && (
            <div className="dropdown-menu" onMouseEnter={() => handleMouseEnter('courses')} onMouseLeave={handleMouseLeave}>
              <CoursesDropdown />
            </div>
          )}
        </li>

        <li><Link to="/portfolio">Portfolio <span className="badge">New</span></Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/careers">Careers</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {mobileMenuOpen && (
        <div className={`mobile-menu ${isWhite ? 'white-bg' : ''}`}>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          <Link to="/services" onClick={closeMobileMenu}>Services</Link>
          <Link to="/courses" onClick={closeMobileMenu}>Courses <span className="badge">Free</span></Link>
          <Link to="/portfolio" onClick={closeMobileMenu}>Portfolio <span className="badge">New</span></Link>
          <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
          <Link to="/about" onClick={closeMobileMenu}>About</Link>
          <Link to="/careers" onClick={closeMobileMenu}>Careers</Link>
          <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
