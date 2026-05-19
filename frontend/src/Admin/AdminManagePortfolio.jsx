import { useState, useEffect } from 'react';
import AdminSidebar from '../Components/AdminSidebar';
import api from '../api';
import '../Styles/AdminStyle/AdminDashboard.css';
import '../Styles/AdminStyle/AdminManagePortfolio.css';

const emptyForm = {
  title: '',
  subtitle: '',
  about: '',
  system: '',
  language: '',
  launchDate: '',
  link: '',
  heroImage: '',
  services: '',
};

function AdminManagePortfolio() {
  const [admin, setAdmin] = useState(null);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
    else window.location.href = '/admin/auth';
    fetchProjects();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get('/portfolio');
      setProjects(res.data);
    } catch (err) {
      showToast('Failed to load projects', 'error');
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      services: form.services.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await api.put(`/portfolio/${editingId}`, payload);
        showToast('Project updated successfully');
      } else {
        await api.post('/portfolio', payload);
        showToast('Project added successfully');
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      showToast('Error saving project', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({ ...project, services: project.services?.join(', ') || '' });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/portfolio/${id}`);
      showToast('Project deleted');
      fetchProjects();
    } catch (err) {
      showToast('Error deleting project', 'error');
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const filtered = projects.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.subtitle?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar admin={admin} />
      <main className="admin-dashboard-main">
        <div className="apm-wrapper">

          {/* Toast */}
          {toast && (
            <div className={`apm-toast apm-toast--${toast.type}`}>{toast.msg}</div>
          )}

          {/* Header */}
          <div className="apm-header">
            <div>
              <h2 className="apm-title">Portfolio Projects</h2>
              <p className="apm-subtitle">{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
            </div>
            <button className="apm-btn-primary" onClick={() => { setShowForm(!showForm); if (showForm) handleCancel(); }}>
              {showForm ? '✕ Close Form' : '+ Add Project'}
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="apm-form-card">
              <h3 className="apm-form-title">{editingId ? '✏️ Edit Project' : '➕ New Project'}</h3>
              <form onSubmit={handleSubmit} className="apm-form">

                <div className="apm-form-section-label">Basic Info</div>
                <div className="apm-form-row">
                  <div className="apm-field">
                    <label>Title *</label>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Project title" required />
                  </div>
                  <div className="apm-field">
                    <label>Subtitle</label>
                    <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Short tagline" />
                  </div>
                </div>

                <div className="apm-field">
                  <label>About</label>
                  <textarea name="about" value={form.about} onChange={handleChange} placeholder="Project description..." rows="4" />
                </div>

                <div className="apm-form-section-label">Technical Details</div>
                <div className="apm-form-row">
                  <div className="apm-field">
                    <label>Platform / System</label>
                    <input name="system" value={form.system} onChange={handleChange} placeholder="e.g. Web, Mobile" />
                  </div>
                  <div className="apm-field">
                    <label>Language / Stack</label>
                    <input name="language" value={form.language} onChange={handleChange} placeholder="e.g. React, Node.js" />
                  </div>
                  <div className="apm-field">
                    <label>Launch Date</label>
                    <input name="launchDate" value={form.launchDate} onChange={handleChange} placeholder="e.g. Jan 2024" />
                  </div>
                </div>

                <div className="apm-form-section-label">Media & Links</div>
                <div className="apm-form-row">
                  <div className="apm-field">
                    <label>Live Link</label>
                    <input name="link" value={form.link} onChange={handleChange} placeholder="https://..." />
                  </div>
                  <div className="apm-field">
                    <label>Hero Image URL</label>
                    <input name="heroImage" value={form.heroImage} onChange={handleChange} placeholder="https://..." />
                  </div>
                </div>

                {form.heroImage && (
                  <div className="apm-image-preview">
                    <img src={form.heroImage} alt="Hero preview" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}

                <div className="apm-field">
                  <label>Services (comma separated)</label>
                  <input name="services" value={form.services} onChange={handleChange} placeholder="e.g. UI Design, Development, SEO" />
                </div>

                <div className="apm-form-actions">
                  <button type="button" className="apm-btn-secondary" onClick={handleCancel}>Cancel</button>
                  <button type="submit" className="apm-btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search */}
          <div className="apm-search-bar">
            <span className="apm-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <button className="apm-search-clear" onClick={() => setSearch('')}>✕</button>}
          </div>

          {/* Project Grid */}
          {filtered.length === 0 ? (
            <div className="apm-empty">
              <p>No projects found.</p>
            </div>
          ) : (
            <div className="apm-grid">
              {filtered.map((project) => (
                <div key={project._id} className="apm-card">
                  {project.heroImage && (
                    <div className="apm-card-image">
                      <img src={project.heroImage} alt={project.title} />
                    </div>
                  )}
                  <div className="apm-card-body">
                    <h3 className="apm-card-title">{project.title}</h3>
                    {project.subtitle && <p className="apm-card-subtitle">{project.subtitle}</p>}

                    <div className="apm-card-meta">
                      {project.system && <span className="apm-badge apm-badge--blue">{project.system}</span>}
                      {project.language && <span className="apm-badge apm-badge--purple">{project.language}</span>}
                      {project.launchDate && <span className="apm-badge apm-badge--gray">📅 {project.launchDate}</span>}
                    </div>

                    {project.services?.length > 0 && (
                      <div className="apm-card-services">
                        {project.services.map((s, i) => (
                          <span key={i} className="apm-service-tag">{s}</span>
                        ))}
                      </div>
                    )}

                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="apm-card-link">
                        🔗 View Live
                      </a>
                    )}
                  </div>
                  <div className="apm-card-footer">
                    <button className="apm-btn-edit" onClick={() => handleEdit(project)}>✏️ Edit</button>
                    <button className="apm-btn-delete" onClick={() => handleDelete(project._id)}>🗑️ Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminManagePortfolio;
