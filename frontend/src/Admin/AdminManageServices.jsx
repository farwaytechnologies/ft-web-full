import React, { useEffect, useState } from 'react';
import '../Styles/AdminStyle/AdminManageServices.css';

function AdminManageServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '', // ✅ NEW
    features: '',             // ✅ NEW (comma-separated string input)
    image: '',
    video: ''                 // ✅ NEW
  });
  const [editId, setEditId] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      features: formData.features
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '') // ✅ convert string to array
    };

    const url = editId
      ? `http://localhost:8000/api/services/${editId}`
      : 'http://localhost:8000/api/services';
    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save service');

      setFormData({
        title: '',
        description: '',
        detailedDescription: '',
        features: '',
        image: '',
  
        video: ''
      });
      setEditId(null);
      fetchServices();
    } catch (err) {
      console.error('Error saving service:', err);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      ...service,
      features: service.features ? service.features.join(', ') : ''
    });
    setEditId(service._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await fetch(`http://localhost:8000/api/services/${id}`, {
        method: 'DELETE',
      });
      fetchServices();
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  return (
    <div className="admin-service-page">
      <div className="admin-service-container">
        <h2 className="admin-service-heading">Manage Services</h2>

        <form className="admin-service-form" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <input type="text" name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} required />
          <textarea name="detailedDescription" placeholder="Detailed Description" value={formData.detailedDescription} onChange={handleChange} rows="4" required /> {/* ✅ NEW */}
          <input type="text" name="features" placeholder="Features (comma-separated)" value={formData.features} onChange={handleChange} /> {/* ✅ NEW */}
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
          <input type="text" name="video" placeholder="Video URL (optional)" value={formData.video} onChange={handleChange} /> {/* ✅ NEW */}

          <button type="submit">
            {editId ? 'Update Service' : 'Add Service'}
          </button>
        </form>

        <div className="admin-service-list">
          {services.map(service => (
            <div key={service._id} className="admin-service-card">
              <img src={service.image} alt={service.title} />
              <div className="admin-service-info">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
             
                <div className="admin-service-actions">
                  <button onClick={() => handleEdit(service)}>Edit</button>
                  <button onClick={() => handleDelete(service._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminManageServices;
