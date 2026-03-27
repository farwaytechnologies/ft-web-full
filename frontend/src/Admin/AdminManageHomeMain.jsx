import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';
import '../Styles/AdminStyle/AdminManageHomeMain.css';
import AdminSidebar from '../Components/AdminSidebar';

const AdminManageHomeMain = () => {
  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    videoUrl: '',
    buttonText: '',
    buttonLink: ''
  });

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      window.location.href = '/admin/auth';
    }

    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/home`);
      const data = await res.json();
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching home content:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/home`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Home section updated successfully!');
        fetchHomeContent();
      }
    } catch (error) {
      console.error('Error updating home section:', error);
    }
  };

  return (
    <div className="admin-home-main-page">
      <AdminSidebar admin={admin} />
      <main className="admin-home-main-content">
        <h2 className="admin-home-main-heading">Manage Home Main Section</h2>
        <form className="admin-home-main-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="heading"
            placeholder="Main Heading"
            value={formData.heading}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="text"
            name="videoUrl"
            placeholder="Video URL"
            value={formData.videoUrl}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="buttonText"
            placeholder="Button Text"
            value={formData.buttonText}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="buttonLink"
            placeholder="Button Link"
            value={formData.buttonLink}
            onChange={handleChange}
            required
          />
          <button type="submit">Save</button>
        </form>
      </main>
    </div>
  );
};

export default AdminManageHomeMain;
