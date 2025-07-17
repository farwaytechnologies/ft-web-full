import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PagesStyle/Courses.css';

import PagesCard from '../Components/PagesCard';
import bgImage from '../assets/Image/Card-bg.jpg';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/courses');
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

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
          {courses.map((course) => (
            <Link to={`/courses/${course._id}`} key={course._id} className="courses-page-card">
              <div className="courses-page-card-image">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="courses-page-card-content">
                <h2>{course.title}</h2>
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
