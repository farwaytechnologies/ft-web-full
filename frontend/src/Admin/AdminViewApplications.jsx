import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Components/AdminSidebar';
import '../Styles/AdminStyle/AdminDashboard.css';
import '../Styles/AdminStyle/AdminViewApplications.css';

const AdminViewApplications = () => {
  const [admin, setAdmin] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      window.location.href = '/admin/auth';
    }

    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch('https://backend-iz8p.onrender.com/api/applications');
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this application?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://backend-iz8p.onrender.com/api/applications/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
        alert('Application deleted successfully.');
      } else {
        alert('Failed to delete application.');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('An error occurred while deleting.');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar admin={admin} />
      <main className="admin-dashboard-main">
        <div className="admin-view-apps-container">
          <h2 className="admin-view-apps-title">View Applications</h2>
          {loading ? (
            <p className="admin-view-apps-loading">Loading applications...</p>
          ) : applications.length === 0 ? (
            <p className="admin-view-apps-empty">No applications found.</p>
          ) : (
            <div className="admin-view-apps-table-wrapper">
              <table className="admin-view-apps-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email / Phone</th>
                    <th>Position / Experience</th>
                    <th>Links</th>
                    <th>Salary</th>
                    <th>Availability</th>
                    <th>Cover Letter</th>
                    <th>Resume</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id}>
                      <td>{app.fullName}</td>
                      <td>
                        <div>{app.email}</div>
                        <div>{app.phone}</div>
                      </td>
                      <td>
                        <div>{app.position}</div>
                        <div>{app.experience}</div>
                      </td>
                      <td>
                        <div>
                          <a href={app.portfolio} target="_blank" rel="noopener noreferrer">
                            Portfolio
                          </a>
                        </div>
                        <div>
                          <a href={app.linkedinProfile} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                          </a>
                        </div>
                      </td>
                      <td>
                        <div><strong>Current:</strong> {app.currentSalary}</div>
                        <div><strong>Expected:</strong> {app.expectedSalary}</div>
                      </td>
                      <td>{app.availableDate}<br />{app.workPreference}</td>
                      <td className="admin-view-apps-cover-cell">{app.coverLetter}</td>
                      <td>
                        {app.resumeUrl ? (
                          <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">Download</a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td>
                        <button
                          className="admin-view-apps-delete-btn"
                          onClick={() => handleDelete(app._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminViewApplications;
