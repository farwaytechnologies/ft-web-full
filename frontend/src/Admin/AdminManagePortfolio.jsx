import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../Components/adminSidebar';
import '../Styles/AdminStyle/AdminDashboard.css';
import '../Styles/AdminStyle/AdminManagePortfolio.css';

function AdminManagePortfolio() {
  const [admin, setAdmin] = useState(null);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    about: '',
    system: '',
    language: '',
    launchDate: '',
    link: '',
    heroImage: '',
    services: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      window.location.href = '/admin/auth';
    }

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('https://backend-iz8p.onrender.com/api/portfolio');
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      services: form.services.split(',').map((s) => s.trim()),
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/portfolio/${editingId}`, payload);
      } else {
        await axios.post('http://localhost:8000/api/portfolio', payload);
      }
      setForm({
        title: '',
        subtitle: '',
        about: '',
        system: '',
        language: '',
        launchDate: '',
        link: '',
        heroImage: '',
        services: '',
      });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      ...project,
      services: project.services?.join(', ') || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/portfolio/${id}`);
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar admin={admin} />
      <main className="admin-dashboard-main">
        <div className="admin-portfolio-container">
          <h2>Manage Portfolio</h2>

          <form className="portfolio-form" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <input type="text" name="subtitle" placeholder="Subtitle" value={form.subtitle} onChange={handleChange} />
            <textarea name="about" placeholder="About" value={form.about} onChange={handleChange} rows="4" />
            <input type="text" name="system" placeholder="Platform / System" value={form.system} onChange={handleChange} />
            <input type="text" name="language" placeholder="Language" value={form.language} onChange={handleChange} />
            <input type="text" name="launchDate" placeholder="Launch Date" value={form.launchDate} onChange={handleChange} />
            <input type="text" name="link" placeholder="Live Link" value={form.link} onChange={handleChange} />
            <input type="text" name="heroImage" placeholder="Hero Image URL" value={form.heroImage} onChange={handleChange} />
            <input type="text" name="services" placeholder="Services (comma separated)" value={form.services} onChange={handleChange} />
            <button type="submit">{editingId ? 'Update Project' : 'Add Project'}</button>
          </form>

          <div className="portfolio-list">
            {projects.map((project) => (
              <div key={project._id} className="portfolio-card">
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
                <p><strong>Launch:</strong> {project.launchDate}</p>
                <div className="portfolio-card-buttons">
                  <button onClick={() => handleEdit(project)}>Edit</button>
                  <button onClick={() => handleDelete(project._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminManagePortfolio;
