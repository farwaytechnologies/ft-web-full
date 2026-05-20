import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api';
import { useStudent } from '../context/StudentContext';
import '../Styles/PagesStyle/CourseDetail.css';

// ── localStorage helpers ──────────────────────────────
const LS_KEY = 'lms_enrollments';

const getAllEnrollments = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
  catch { return {}; }
};

const saveAllEnrollments = (data) =>
  localStorage.setItem(LS_KEY, JSON.stringify(data));

// key: email::courseId
const enrollmentKey = (email, courseId) => `${email}::${courseId}`;

const getEnrollment = (email, courseId) => {
  const all = getAllEnrollments();
  return all[enrollmentKey(email, courseId)] || null;
};

const createEnrollment = (email, name, courseId) => {
  const all = getAllEnrollments();
  const key = enrollmentKey(email, courseId);
  if (all[key]) return all[key]; // already enrolled
  const entry = { email, name, courseId, completedLessons: [], enrolledAt: new Date().toISOString() };
  all[key] = entry;
  saveAllEnrollments(all);
  return entry;
};

const toggleLessonLocal = (email, courseId, lessonId) => {
  const all = getAllEnrollments();
  const key = enrollmentKey(email, courseId);
  if (!all[key]) return null;
  const completed = all[key].completedLessons || [];
  const idx = completed.indexOf(lessonId);
  if (idx === -1) completed.push(lessonId);
  else completed.splice(idx, 1);
  all[key].completedLessons = completed;
  saveAllEnrollments(all);
  return all[key];
};
// ─────────────────────────────────────────────────────

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [showEnroll, setShowEnroll] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [toast, setToast] = useState(null);

  const { student } = useStudent();
  const navigate = useNavigate();

  // Fetch course from backend (courses are still server-managed)
  useEffect(() => {
    fetch(`${API_BASE_URL}/courses/${id}`)
      .then(r => r.json())
      .then(data => {
        setCourse(data);
        if (data.lessons?.length) setActiveLesson(data.lessons[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Load enrollment from localStorage
  useEffect(() => {
    if (student?.email && id) {
      const e = getEnrollment(student.email, id);
      if (e) setEnrollment(e);
    }
  }, [id, student]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEnroll = () => {
    if (!student) { navigate('/student/auth'); return; }
    setEnrolling(true);
    const e = createEnrollment(student.email, student.name, id);
    setEnrollment(e);
    setShowEnroll(false);
    setEnrolling(false);
    showToast('Enrolled successfully! Start learning.');
  };

  const toggleLesson = (lessonId) => {
    if (!enrollment || !student) return;
    const updated = toggleLessonLocal(student.email, id, lessonId);
    if (updated) setEnrollment({ ...updated });
  };

  const isCompleted = (lessonId) =>
    enrollment?.completedLessons?.includes(lessonId);

  const progress = course?.lessons?.length
    ? Math.round(((enrollment?.completedLessons?.length || 0) / course.lessons.length) * 100)
    : 0;

  if (loading) return (
    <div className="cd-state">
      <div className="cd-spinner" />
      <p>Loading course...</p>
    </div>
  );

  if (!course) return (
    <div className="cd-state cd-error">
      <h2>Course not found</h2>
      <Link to="/courses" className="cd-back">← Back to Courses</Link>
    </div>
  );

  return (
    <div className="cd-page">
      {toast && <div className={`cd-toast cd-toast--${toast.type}`}>{toast.msg}</div>}

      {/* Hero */}
      <div className="cd-hero" style={{ backgroundImage: `url(${course.image})` }}>
        <div className="cd-hero-overlay">
          <div className="cd-hero-content">
            <Link to="/courses" className="cd-breadcrumb">← All Courses</Link>
            <div className="cd-hero-badges">
              {course.level    && <span className="cd-badge cd-badge--level">{course.level}</span>}
              {course.category && <span className="cd-badge cd-badge--cat">{course.category}</span>}
              {course.duration && <span className="cd-badge cd-badge--dur">⏱ {course.duration}</span>}
            </div>
            <h1 className="cd-hero-title">{course.title}</h1>
            <p className="cd-hero-desc">{course.description}</p>

            {!enrollment ? (
              <button className="cd-enroll-btn"
                onClick={() => student ? setShowEnroll(true) : navigate('/student/auth')}>
                {student ? 'Enroll for Free' : 'Sign In to Enroll'}
              </button>
            ) : (
              <div className="cd-progress-bar-wrap">
                <div className="cd-progress-label">
                  <span>Your Progress</span><span>{progress}%</span>
                </div>
                <div className="cd-progress-track">
                  <div className="cd-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enroll Modal */}
      {showEnroll && (
        <div className="cd-modal-backdrop" onClick={() => setShowEnroll(false)}>
          <div className="cd-modal" onClick={e => e.stopPropagation()}>
            <h3>Enroll in "{course.title}"</h3>
            <p>Enrolling as <strong style={{ color: '#cbd5e1' }}>{student.name}</strong> ({student.email})</p>
            <div className="cd-modal-actions" style={{ marginTop: '1.25rem' }}>
              <button className="cd-modal-cancel" onClick={() => setShowEnroll(false)}>Cancel</button>
              <button className="cd-modal-submit" disabled={enrolling} onClick={handleEnroll}>
                {enrolling ? 'Enrolling...' : 'Confirm Enrollment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="cd-body">
        {/* Sidebar */}
        <aside className="cd-sidebar">
          <div className="cd-sidebar-header">
            <h3>Course Content</h3>
            <span>{course.lessons?.length || 0} lessons</span>
          </div>
          <ul className="cd-lesson-list">
            {!course.lessons?.length && (
              <li className="cd-no-lessons">No lessons yet.</li>
            )}
            {course.lessons?.map((lesson, i) => {
              const done   = isCompleted(lesson._id);
              const active = activeLesson?._id === lesson._id;
              return (
                <li key={lesson._id}
                  className={`cd-lesson-item ${active ? 'cd-lesson-item--active' : ''} ${done ? 'cd-lesson-item--done' : ''}`}
                  onClick={() => setActiveLesson(lesson)}>
                  <span className="cd-lesson-num">{done ? '✓' : i + 1}</span>
                  <div className="cd-lesson-info">
                    <span className="cd-lesson-title">{lesson.title}</span>
                    {lesson.duration && <span className="cd-lesson-dur">{lesson.duration}</span>}
                  </div>
                  {enrollment && (
                    <button
                      className={`cd-check-btn ${done ? 'cd-check-btn--done' : ''}`}
                      onClick={e => { e.stopPropagation(); toggleLesson(lesson._id); }}
                      title={done ? 'Mark incomplete' : 'Mark complete'}>
                      {done ? '✓' : '○'}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main */}
        <main className="cd-main">
          {activeLesson ? (
            <div className="cd-lesson-view">
              <div className="cd-lesson-header">
                <h2>{activeLesson.title}</h2>
                {enrollment && (
                  <button
                    className={`cd-complete-btn ${isCompleted(activeLesson._id) ? 'cd-complete-btn--done' : ''}`}
                    onClick={() => toggleLesson(activeLesson._id)}>
                    {isCompleted(activeLesson._id) ? '✓ Completed' : 'Mark Complete'}
                  </button>
                )}
              </div>

              {activeLesson.videoUrl && (
                <div className="cd-video-wrap">
                  {activeLesson.videoUrl.includes('youtube.com') || activeLesson.videoUrl.includes('youtu.be') ? (
                    <iframe
                      src={activeLesson.videoUrl.replace('watch?v=', 'embed/')}
                      title={activeLesson.title}
                      allowFullScreen
                      className="cd-video-iframe"
                    />
                  ) : (
                    <video controls className="cd-video">
                      <source src={activeLesson.videoUrl} type="video/mp4" />
                    </video>
                  )}
                </div>
              )}

              {activeLesson.description && (
                <div className="cd-lesson-desc">
                  <h4>About this lesson</h4>
                  <p>{activeLesson.description}</p>
                </div>
              )}

              <div className="cd-lesson-nav">
                {course.lessons.findIndex(l => l._id === activeLesson._id) > 0 && (
                  <button className="cd-nav-btn" onClick={() => {
                    const idx = course.lessons.findIndex(l => l._id === activeLesson._id);
                    setActiveLesson(course.lessons[idx - 1]);
                  }}>← Previous</button>
                )}
                {course.lessons.findIndex(l => l._id === activeLesson._id) < course.lessons.length - 1 && (
                  <button className="cd-nav-btn cd-nav-btn--next" onClick={() => {
                    const idx = course.lessons.findIndex(l => l._id === activeLesson._id);
                    setActiveLesson(course.lessons[idx + 1]);
                  }}>Next →</button>
                )}
              </div>
            </div>
          ) : (
            <div className="cd-about">
              <h2>About This Course</h2>
              <p>{course.detailedDescription || course.description}</p>
              {!enrollment && (
                <button className="cd-enroll-btn"
                  onClick={() => student ? setShowEnroll(true) : navigate('/student/auth')}>
                  {student ? 'Enroll for Free to Start Learning' : 'Sign In to Enroll'}
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CourseDetail;
