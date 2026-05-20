import { useState, useEffect } from 'react';
import AdminSidebar from '../Components/AdminSidebar';
import { API_BASE_URL } from '../api';
import '../Styles/AdminStyle/AdminDashboard.css';
import '../Styles/AdminStyle/AdminLMS.css';

const emptyLesson = { title: '', description: '', videoUrl: '', duration: '', order: 0 };

function AdminLMS() {
  const [admin, setAdmin] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [lessonForm, setLessonForm] = useState(emptyLesson);
  const [editingLesson, setEditingLesson] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [tab, setTab] = useState('lessons'); // 'lessons' | 'enrollments'
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('adminInfo');
    if (stored) setAdmin(JSON.parse(stored));
    else window.location.href = '/admin/auth';
    fetchCourses();
    fetchEnrollments();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCourses = async () => {
    const res = await fetch(`${API_BASE_URL}/courses`);
    const data = await res.json();
    setCourses(data);
  };

  const fetchEnrollments = async () => {
    const res = await fetch(`${API_BASE_URL}/enrollments`);
    const data = await res.json();
    setEnrollments(Array.isArray(data) ? data : []);
  };

  const selectCourse = (course) => {
    setSelectedCourse(course);
    setLessons(course.lessons || []);
    setLessonForm(emptyLesson);
    setEditingLesson(null);
  };

  const handleLessonChange = (e) => setLessonForm({ ...lessonForm, [e.target.name]: e.target.value });

  const saveLesson = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedLessons = editingLesson
        ? lessons.map(l => l._id === editingLesson ? { ...l, ...lessonForm } : l)
        : [...lessons, { ...lessonForm, order: lessons.length }];

      const res = await fetch(`${API_BASE_URL}/courses/${selectedCourse._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...selectedCourse, lessons: updatedLessons }),
      });
      const updated = await res.json();
      setLessons(updated.lessons);
      setSelectedCourse(updated);
      setLessonForm(emptyLesson);
      setEditingLesson(null);
      showToast(editingLesson ? 'Lesson updated' : 'Lesson added');
      fetchCourses();
    } catch {
      showToast('Failed to save lesson', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!window.confirm('Delete this lesson?')) return;
    const updatedLessons = lessons.filter(l => l._id !== lessonId);
    const res = await fetch(`${API_BASE_URL}/courses/${selectedCourse._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...selectedCourse, lessons: updatedLessons }),
    });
    const updated = await res.json();
    setLessons(updated.lessons);
    setSelectedCourse(updated);
    showToast('Lesson deleted');
    fetchCourses();
  };

  const editLesson = (lesson) => {
    setEditingLesson(lesson._id);
    setLessonForm({ title: lesson.title, description: lesson.description || '', videoUrl: lesson.videoUrl || '', duration: lesson.duration || '', order: lesson.order || 0 });
  };

  const deleteEnrollment = async (id) => {
    if (!window.confirm('Remove this enrollment?')) return;
    await fetch(`${API_BASE_URL}/enrollments/${id}`, { method: 'DELETE' });
    fetchEnrollments();
    showToast('Enrollment removed');
  };

  const courseEnrollments = selectedCourse
    ? enrollments.filter(e => e.course?._id === selectedCourse._id || e.course === selectedCourse._id)
    : enrollments;

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar admin={admin} />
      <main className="admin-dashboard-main">
        <div className="alms-wrapper">
          {toast && <div className={`alms-toast alms-toast--${toast.type}`}>{toast.msg}</div>}

          <div className="alms-header">
            <div>
              <h2 className="alms-title">LMS Management</h2>
              <p className="alms-subtitle">Manage course lessons and student enrollments</p>
            </div>
          </div>

          <div className="alms-layout">
            {/* Course List */}
            <aside className="alms-course-list">
              <div className="alms-course-list-header">Courses</div>
              {courses.map(c => (
                <div
                  key={c._id}
                  className={`alms-course-item ${selectedCourse?._id === c._id ? 'alms-course-item--active' : ''}`}
                  onClick={() => selectCourse(c)}
                >
                  <img src={c.image} alt={c.title} className="alms-course-thumb" />
                  <div className="alms-course-item-info">
                    <span className="alms-course-item-title">{c.title}</span>
                    <span className="alms-course-item-meta">{c.lessons?.length || 0} lessons</span>
                  </div>
                </div>
              ))}
            </aside>

            {/* Right Panel */}
            <div className="alms-panel">
              {!selectedCourse ? (
                <div className="alms-empty">Select a course to manage its lessons</div>
              ) : (
                <>
                  <div className="alms-panel-header">
                    <h3>{selectedCourse.title}</h3>
                    <div className="alms-tabs">
                      <button className={`alms-tab ${tab === 'lessons' ? 'alms-tab--active' : ''}`} onClick={() => setTab('lessons')}>
                        Lessons ({lessons.length})
                      </button>
                      <button className={`alms-tab ${tab === 'enrollments' ? 'alms-tab--active' : ''}`} onClick={() => setTab('enrollments')}>
                        Enrollments ({courseEnrollments.length})
                      </button>
                    </div>
                  </div>

                  {tab === 'lessons' && (
                    <div className="alms-lessons-tab">
                      {/* Lesson Form */}
                      <form className="alms-lesson-form" onSubmit={saveLesson}>
                        <h4>{editingLesson ? 'Edit Lesson' : 'Add Lesson'}</h4>
                        <div className="alms-form-row">
                          <div className="alms-field">
                            <label>Title *</label>
                            <input name="title" value={lessonForm.title} onChange={handleLessonChange} placeholder="Lesson title" required />
                          </div>
                          <div className="alms-field">
                            <label>Duration</label>
                            <input name="duration" value={lessonForm.duration} onChange={handleLessonChange} placeholder="e.g. 12:30" />
                          </div>
                        </div>
                        <div className="alms-field">
                          <label>Video URL</label>
                          <input name="videoUrl" value={lessonForm.videoUrl} onChange={handleLessonChange} placeholder="YouTube or direct MP4 URL" />
                        </div>
                        <div className="alms-field">
                          <label>Description</label>
                          <textarea name="description" value={lessonForm.description} onChange={handleLessonChange} rows="3" placeholder="What will students learn?" />
                        </div>
                        <div className="alms-form-actions">
                          {editingLesson && (
                            <button type="button" className="alms-btn-secondary" onClick={() => { setEditingLesson(null); setLessonForm(emptyLesson); }}>Cancel</button>
                          )}
                          <button type="submit" className="alms-btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : editingLesson ? 'Update Lesson' : 'Add Lesson'}
                          </button>
                        </div>
                      </form>

                      {/* Lesson List */}
                      <div className="alms-lesson-list">
                        {lessons.length === 0 && <p className="alms-empty-text">No lessons yet. Add one above.</p>}
                        {lessons.map((lesson, i) => (
                          <div key={lesson._id || i} className="alms-lesson-row">
                            <span className="alms-lesson-num">{i + 1}</span>
                            <div className="alms-lesson-row-info">
                              <span className="alms-lesson-row-title">{lesson.title}</span>
                              <span className="alms-lesson-row-meta">
                                {lesson.duration && `⏱ ${lesson.duration}`}
                                {lesson.videoUrl && ' · 🎬 Video'}
                              </span>
                            </div>
                            <div className="alms-lesson-row-actions">
                              <button className="alms-btn-edit" onClick={() => editLesson(lesson)}>Edit</button>
                              <button className="alms-btn-delete" onClick={() => deleteLesson(lesson._id)}>Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === 'enrollments' && (
                    <div className="alms-enrollments-tab">
                      {courseEnrollments.length === 0 ? (
                        <p className="alms-empty-text">No enrollments for this course yet.</p>
                      ) : (
                        <table className="alms-enroll-table">
                          <thead>
                            <tr>
                              <th>Student</th>
                              <th>Email</th>
                              <th>Progress</th>
                              <th>Enrolled</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courseEnrollments.map(e => {
                              const total = selectedCourse.lessons?.length || 0;
                              const done = e.completedLessons?.length || 0;
                              const pct = total ? Math.round((done / total) * 100) : 0;
                              return (
                                <tr key={e._id}>
                                  <td>{e.studentName}</td>
                                  <td>{e.studentEmail}</td>
                                  <td>
                                    <div className="alms-prog-wrap">
                                      <div className="alms-prog-track">
                                        <div className="alms-prog-fill" style={{ width: `${pct}%` }} />
                                      </div>
                                      <span>{pct}%</span>
                                    </div>
                                  </td>
                                  <td>{new Date(e.enrolledAt).toLocaleDateString()}</td>
                                  <td>
                                    <button className="alms-btn-delete" onClick={() => deleteEnrollment(e._id)}>Remove</button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* All Enrollments Summary */}
          {tab !== 'enrollments' && (
            <div className="alms-summary">
              <h3 className="alms-summary-title">All Enrollments</h3>
              <div className="alms-summary-stats">
                <div className="alms-stat">
                  <span className="alms-stat-num">{enrollments.length}</span>
                  <span className="alms-stat-label">Total Enrollments</span>
                </div>
                <div className="alms-stat">
                  <span className="alms-stat-num">{new Set(enrollments.map(e => e.studentEmail)).size}</span>
                  <span className="alms-stat-label">Unique Students</span>
                </div>
                <div className="alms-stat">
                  <span className="alms-stat-num">{courses.length}</span>
                  <span className="alms-stat-label">Total Courses</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminLMS;
