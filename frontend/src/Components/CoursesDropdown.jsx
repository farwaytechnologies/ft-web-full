import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';
import { Link } from 'react-router-dom';
import '../Styles/ComponentsStyle/CoursesDropdown.css';

function CoursesDropdown() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/courses`);
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

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
          {courses.map((course) => (
            <Link
              to={`/courses/${course._id}`}
              key={course._id}
              className="courses-dropdown-card-link"
            >
              <div className="courses-dropdown-card">
                <img
                  src={course.image}
                  alt={course.title}
                  className="courses-dropdown-image"
                />
                <h3>{course.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursesDropdown;
