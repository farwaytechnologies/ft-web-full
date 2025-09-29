import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Components/adminSidebar';
import '../Styles/AdminStyle/AdminManageServices.css';

const initialForm = {
  title: '',
  description: '',
  detailedDescription: '',
  features: '',
  image: '',
  video: ''
};

const AdminManageServices = () => {
  const [admin, setAdmin] = useState(null);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      window.location.href = '/admin/auth';
    }
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('https://backend-iz8p.onrender.com/api/services');
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features.split(',').map((f) => f.trim())
    };

    try {
      const url = editingId
        ? `https://backend-iz8p.onrender.com/api/services/${editingId}`
        : 'https://backend-iz8p.onrender.com/api/services';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        fetchServices();
        setFormData(initialForm);
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error submitting service:', error);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      detailedDescription: service.detailedDescription,
      features: service.features.join(', '),
      image: service.image,
      video: service.video || ''
    });
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://backend-iz8p.onrender.com/api/services/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="admin-service-page">
      <AdminSidebar admin={admin} />
      <main className="admin-service-main">
        <div className="admin-service-container">
          <h2 className="admin-service-heading">
            {editingId ? 'Edit Service' : 'Add New Service'}
          </h2>

          <form className="admin-service-form" onSubmit={handleSubmit}>
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
              name="features"
              placeholder="Features (comma-separated)"
              value={formData.features}
              onChange={handleChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="video"
              placeholder="Video URL (optional)"
              value={formData.video}
              onChange={handleChange}
            />
            <button type="submit">
              {editingId ? 'Update Service' : 'Add Service'}
            </button>
          </form>

          <div className="admin-service-list">
            {services.map((service) => (
              <div className="admin-service-card" key={service._id}>
                <img src={service.image} alt={service.title} />
                <div className="admin-service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <small>{service.detailedDescription}</small>
                  <ul>
                    {service.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  {service.video && (
                    <a href={service.video} target="_blank" rel="noopener noreferrer">
                      View Video
                    </a>
                  )}
                  <div className="admin-service-actions">
                    <button onClick={() => handleEdit(service)}>Edit</button>
                    <button onClick={() => handleDelete(service._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminManageServices;
