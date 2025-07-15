import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeStyle/HomeCoursesSection.css';
//import im1 from '../assets/Image/tec-bg2.jpg';
// COMMENTED OUT IMAGE IMPORTS - USING BG COLORS INSTEAD
// import img1 from '../assets/Image/cours-1.jpg';
// import img2 from '../assets/Image/cours-3.jpg';
// import img3 from '../assets/Image/cours-2.jpg';
// import img4 from '../assets/Image/cours-4.jpg';

const courses = [
  {
    name: 'Full Stack Web Development',
    path: '/courses/full-stack-web-development',
    // image: img1, // COMMENTED OUT - using bg color instead
  },
  {
    name: 'Data Science & Machine Learning',
    path: '/courses/data-science-machine-learning',
    // image: img2, // COMMENTED OUT - using bg color instead
  },
  {
    name: 'Digital Marketing',
    path: '/courses/digital-marketing',
    // image: img3, // COMMENTED OUT - using bg color instead
  },
  {
    name: 'React Js',
    path: '/courses/ui-ux-design',
    // image: img4, // COMMENTED OUT - using bg color instead
  },
];

function HomeCourseSection() {
  return (
    <div className="home-course-section">
      {/*<div
        className="home-course-bg-image"
        style={{ backgroundImage: `url(${im1})` }}
      ></div>*/}
      
      <div className="home-course-overlay">
        <h1 className="home-course-heading">Our Courses</h1>
        <p className="home-course-subheading">
          Explore a variety of courses designed to boost your skills.
        </p>
        
        <div className="home-course-cards-container">
          {courses.map((course, index) => (
            <Link to={course.path} className="home-course-card" key={index}>
              {/* COMMENTED OUT IMAGE ELEMENT - USING BG COLOR INSTEAD */}
              {/* <img
                src={course.image}
                alt={course.name}
                className="home-course-card-image"
              /> */}
              <div className="home-course-card-content">
                <h2>{course.name}</h2>
              </div>
            </Link>
          ))}
        </div>
        
        <Link to="/courses" className="uni-button">View Courses</Link>
      </div>
    </div>
  );
}

export default HomeCourseSection;