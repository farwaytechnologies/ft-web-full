import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeStyle/HomeCoursesSection.css';

function HomeCourseSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('https://backend-iz8p.onrender.com/api/courses');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="home-course-section">
      <div className="home-course-overlay">
        <h1 className="home-course-heading">Our Courses</h1>
        <p className="home-course-subheading">
          Explore a variety of courses designed to boost your skills.
        </p>

        {loading ? (
          <p className="home-course-message">Loading...</p>
        ) : error ? (
          <p className="home-course-message">{error}</p>
        ) : courses.length === 0 ? (
          <p className="home-course-message">No courses available.</p>
        ) : (
          <div className="home-course-cards-container">
            {courses.map((course) => (
              <Link
                to={`/courses/${course._id}`}
                className="home-course-card"
                key={course._id}
              >
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="home-course-card-image"
                  />
                )}
                <div className="home-course-card-content">
                  <h2>{course.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link to="/courses" className="uni-button">
          View Courses
        </Link>
      </div>
    </div>
  );
}

export default HomeCourseSection;
