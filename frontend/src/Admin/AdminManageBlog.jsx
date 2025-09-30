import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Components/AdminSidebar';
import '../Styles/AdminStyle/AdminDashboard.css';
import '../Styles/AdminStyle/AdminManageBlog.css';

const AdminManageBlog = () => {
  const [admin, setAdmin] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    image: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      window.location.href = '/admin/auth';
    }
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('https://backend-iz8p.onrender.com/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editMode ? 'PUT' : 'POST';
      const url = editMode
        ? `https://backend-iz8p.onrender.com/api/blogs/${editId}`
        : 'https://backend-iz8p.onrender.com/api/blogs';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchBlogs();
        setFormData({ title: '', description: '', detailedDescription: '', image: '' });
        setEditMode(false);
        setEditId(null);
      }
    } catch (error) {
      console.error('Failed to submit blog:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://backend-iz8p.onrender.com/api/blogs/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchBlogs();
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      description: blog.description,
      detailedDescription: blog.detailedDescription,
      image: blog.image,
    });
    setEditMode(true);
    setEditId(blog._id);
  };

  return (
    <div className="admin-dashboard-container admin-blog-layout">
      <AdminSidebar admin={admin} />
      <main className="admin-dashboard-main">
        <div className="admin-blog-container">
          <h1 className="admin-blog-heading">Manage Blogs</h1>

          <form className="admin-blog-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Short Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <textarea
              name="detailedDescription"
              placeholder="Detailed Description"
              value={formData.detailedDescription}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />
            <button type="submit">
              {editMode ? 'Update Blog' : 'Add Blog'}
            </button>
          </form>

          <div className="admin-blog-list">
            {blogs.map((blog) => (
              <div key={blog._id} className="admin-blog-card">
                <img src={blog.image} alt={blog.title} />
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <div className="admin-blog-actions">
                  <button onClick={() => handleEdit(blog)}>Edit</button>
                  <button onClick={() => handleDelete(blog._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminManageBlog;
