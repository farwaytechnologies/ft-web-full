import React, { useEffect, useState } from 'react';
import '../Styles/AdminStyle/AdminManageJobs.css';
import AdminSidebar from '../components/AdminSidebar';

const AdminManageJobs = () => {
  const [admin, setAdmin] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    experience: '',
    description: '',
    requirements: ''
  });

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      window.location.href = '/admin/auth';
    }

    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/jobroles');
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      requirements: formData.requirements.split(',').map(req => req.trim())
    };
    try {
      const res = await fetch('http://localhost:8000/api/jobroles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      if (res.ok) {
        setFormData({
          title: '',
          department: '',
          location: '',
          type: '',
          experience: '',
          description: '',
          requirements: ''
        });
        fetchJobs();
      }
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/jobroles/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchJobs();
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar admin={admin} />

      <div className="admin-dashboard-main">
        <div className="admin-jobs-container">
          <h2 className="admin-jobs-title">Manage Job Roles</h2>

          <form className="job-form" onSubmit={handleAddJob}>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
            <input name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input
              name="requirements"
              placeholder="Requirements (comma separated)"
              value={formData.requirements}
              onChange={handleChange}
              required
            />
            <button type="submit" className="add-btn">Add Job</button>
          </form>

          <div className="jobs-list">
            {jobs.length === 0 ? (
              <p>No job roles available.</p>
            ) : (
              <table className="jobs-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Dept</th>
                    <th>Type</th>
                    <th>Exp</th>
                    <th>Location</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job._id}>
                      <td>{job.title}</td>
                      <td>{job.department}</td>
                      <td>{job.type}</td>
                      <td>{job.experience}</td>
                      <td>{job.location}</td>
                      <td>
                        <button onClick={() => handleDelete(job._id)} className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageJobs;
