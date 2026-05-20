import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';
import { Link } from 'react-router-dom';
import PagesCard from '../Components/PagesCard';
import bgImage from '../assets/Image/Card-bg.jpg';
import '../Styles/PagesStyle/Courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/courses`)
      .then(r => r.json())
      .then(data => { setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <PagesCard
        heading="Courses"
        description="Expand your skills with our free professional courses."
        backgroundImage={bgImage}
      />
      <div className="courses-page-container">
        <div className="courses-page-header">
          <h1 className="courses-page-heading">All Courses</h1>
          <p className="courses-page-subheading">
            Learn at your own pace — all courses are free to enroll.
          </p>
          <Link to="/my-learning" className="courses-my-learning-btn">📚 My Learning</Link>
        </div>

        {loading ? (
          <div className="courses-loading">
            <div className="courses-spinner" />
            <p>Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="courses-empty">No courses available yet.</div>
        ) : (
          <div className="courses-page-grid">
            {courses.map(course => (
              <Link to={`/courses/${course._id}`} key={course._id} className="courses-page-card">
                <div className="courses-page-card-image">
                  <img src={course.image} alt={course.title} />
                  <div className="courses-card-overlay" />
                </div>
                <div className="courses-page-card-content">
                  <div className="courses-card-meta">
                    {course.level && <span className="courses-badge courses-badge--level">{course.level}</span>}
                    {course.category && <span className="courses-badge courses-badge--cat">{course.category}</span>}
                  </div>
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                  <div className="courses-card-footer">
                    {course.lessons?.length > 0 && (
                      <span className="courses-card-lessons">🎬 {course.lessons.length} lessons</span>
                    )}
                    {course.duration && <span className="courses-card-dur">⏱ {course.duration}</span>}
                    <span className="courses-card-cta">Enroll Free →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Courses;
