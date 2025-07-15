import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyle/CoursesDropdown.css';
import im1 from '../assets/Image/cours-1.jpg';
import im2 from '../assets/Image/cours-2.jpg';
import im3 from '../assets/Image/cours-3.jpg';
import im4 from '../assets/Image/cours-4.jpg';

function CoursesDropdown() {
  const courses = [
    {
      name: 'Full Stack Web Development',
      path: '/courses/full-stack-web-development',
      image: im1,
    },
    {
      name: 'Data Science & Machine Learning',
      path: '/courses/data-science-machine-learning',
      image: im2,
    },
    {
      name: 'Digital Marketing',
      path: '/courses/digital-marketing',
      image: im3,
    },
    {
      name: 'UI/UX Design',
      path: '/courses/ui-ux-design',
      image: im4,
    },
  ];

  return (
    <div className="courses-dropdown-wrapper">
      <div className="courses-dropdown-content">
        {/* Left: Header */}
        <div className="courses-dropdown-header">
          <h1>Courses We Offer</h1>
          <p>
          "Explore our industry-relevant courses to boost your skills and career. Whether you're a beginner or upskilling, our expert-crafted programs are completely free!"
          </p>
        </div>

        {/* Right: Cards */}
        <div className="courses-dropdown-card-row">
          {courses.map((course, index) => (
            <Link
              to={course.path}
              key={index}
              className="courses-dropdown-card-link"
            >
              <div className="courses-dropdown-card">
                <img
                  src={course.image}
                  alt={course.name}
                  className="courses-dropdown-image"
                />
                <h3>{course.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursesDropdown;
