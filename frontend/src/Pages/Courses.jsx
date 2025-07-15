import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PagesStyle/Courses.css';

import PagesCard from '../Components/PagesCard';
import bgImage from '../assets/Image/Card-bg.jpg';

// Sample course images
import img1 from '../assets/Image/cpmpu.jpg';
import img2 from'../assets/Image/cpmpu.jpg';
import img3 from '../assets/Image/cpmpu.jpg';
import img4 from'../assets/Image/cpmpu.jpg';

const courses = [
  {
    name: 'Full Stack Web Development',
    path: '/courses/full-stack-web-development',
    description:
      'Learn to build complete web applications from frontend to backend using popular technologies like React, Node.js, and MongoDB.',
    image: img1,
  },
  {
    name: 'Data Science & Machine Learning',
    path: '/courses/data-science-machine-learning',
    description:
      'Master data analysis, visualization, and machine learning using Python, Pandas, and Scikit-learn with real-world datasets.',
    image: img2,
  },
  {
    name: 'Digital Marketing',
    path: '/courses/digital-marketing',
    description:
      'Understand SEO, social media strategies, PPC, and analytics to grow businesses online effectively.',
    image: img3,
  },
  {
    name: 'React Js',
    path: '/courses/ui-ux-design',
    description:
      'Build dynamic and responsive UIs with React.js, hooks, context API, and master modern frontend development.',
    image: img4,
  },
];

function Courses() {
  return (
    <>
      <PagesCard
        heading="Courses"
        description="Explore our expertly curated courses designed to help you thrive in tech."
        backgroundImage={bgImage}
      />

      <div className="courses-page-container">
        <h1 className="courses-page-heading">Courses We Offer</h1>
        <p className="courses-page-subheading">
          Master in-demand skills through hands-on learning and real-world projects.
        </p>

        <div className="courses-page-grid">
          {courses.map((course, index) => (
            <Link to={course.path} key={index} className="courses-page-card">
              <div className="courses-page-card-image">
                <img src={course.image} alt={course.name} />
              </div>
              <div className="courses-page-card-content">
                <h2>{course.name}</h2>
                <p>{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Courses;
