import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api';
import { useStudent } from '../context/StudentContext';
import '../Styles/PagesStyle/MyLearning.css';

// Read all enrollments for a student from localStorage
const getStudentEnrollments = (email) => {
  try {
    const all = JSON.parse(localStorage.getItem('lms_enrollments')) || {};
    return Object.values(all).filter(e => e.email === email);
  } catch { return []; }
};

function MyLearning() {
  const { student, logout } = useStudent();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student) { navigate('/student/auth'); return; }

    const localEnrollments = getStudentEnrollments(student.email);
    setEnrollments(localEnrollments);

    // Fetch course details for each enrollment from backend
    if (localEnrollments.length === 0) { setLoading(false); return; }

    Promise.all(
      localEnrollments.map(e =>
        fetch(`${API_BASE_URL}/courses/${e.courseId}`)
          .then(r => r.ok ? r.json() : null)
          .catch(() => null)
      )
    ).then(results => {
      const map = {};
      results.forEach((c, i) => {
        if (c) map[localEnrollments[i].courseId] = c;
      });
      setCourses(map);
      setLoading(false);
    });
  }, [student, navigate]);

  const getProgress = (enrollment) => {
    const course = courses[enrollment.courseId];
    const total = course?.lessons?.length || 0;
    if (!total) return 0;
    return Math.round(((enrollment.completedLessons?.length || 0) / total) * 100);
  };

  const handleLogout = () => { logout(); navigate('/student/auth'); };

  if (!student) return null;

  return (
    <div className="ml-page">
      <div className="ml-container">

        <div className="ml-header">
          <div>
            <h1 className="ml-title">My Learning</h1>
            <p className="ml-subtitle">Welcome back, <strong>{student.name}</strong></p>
          </div>
          <div className="ml-header-actions">
            <Link to="/courses" className="ml-browse-btn">Browse Courses</Link>
            <button className="ml-logout-btn" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>

        <div className="ml-stats">
          <div className="ml-stat-card">
            <span className="ml-stat-num">{enrollments.length}</span>
            <span className="ml-stat-label">Enrolled</span>
          </div>
          <div className="ml-stat-card">
            <span className="ml-stat-num">
              {enrollments.filter(e => getProgress(e) === 100).length}
            </span>
            <span className="ml-stat-label">Completed</span>
          </div>
          <div className="ml-stat-card">
            <span className="ml-stat-num">
              {enrollments.filter(e => { const p = getProgress(e); return p > 0 && p < 100; }).length}
            </span>
            <span className="ml-stat-label">In Progress</span>
          </div>
        </div>

        {loading ? (
          <div className="ml-loading">
            <div className="ml-spinner" />
            <p>Loading your courses...</p>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="ml-empty">
            <div className="ml-empty-icon">📚</div>
            <h3>No courses yet</h3>
            <p>Enroll in a course to start learning.</p>
            <Link to="/courses" className="ml-browse-btn">Browse Courses</Link>
          </div>
        ) : (
          <div className="ml-grid">
            {enrollments.map(enrollment => {
              const course = courses[enrollment.courseId];
              if (!course) return null;
              const progress = getProgress(enrollment);
              const total = course.lessons?.length || 0;
              const done  = enrollment.completedLessons?.length || 0;
              return (
                <Link to={`/courses/${enrollment.courseId}`} key={enrollment.courseId} className="ml-card">
                  <div className="ml-card-image">
                    <img src={course.image} alt={course.title} />
                    {progress === 100 && <div className="ml-card-badge">✓ Completed</div>}
                  </div>
                  <div className="ml-card-body">
                    <div className="ml-card-meta">
                      {course.level    && <span className="ml-tag">{course.level}</span>}
                      {course.category && <span className="ml-tag ml-tag--cat">{course.category}</span>}
                    </div>
                    <h3 className="ml-card-title">{course.title}</h3>
                    <p className="ml-card-desc">{course.description}</p>
                    <div className="ml-card-progress">
                      <div className="ml-prog-label">
                        <span>{done}/{total} lessons</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="ml-prog-track">
                        <div className="ml-prog-fill" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    <span className="ml-card-cta">
                      {progress === 0 ? 'Start Learning →' : progress === 100 ? 'Review Course →' : 'Continue →'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyLearning;
