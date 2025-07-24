import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import '../Styles/AdminStyle/AdminDashboard.css';
import '../Styles/AdminStyle/AdminManageServices.css';

const AdminManageServices = () => {
  const [admin, setAdmin] = useState(null);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    image: ''
  });

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
      const res = await fetch('http://localhost:8000/api/services');
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService)
      });
      if (res.ok) {
        setNewService({ title: '', description: '', image: '' });
        fetchServices();
      }
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/services/${id}`, {
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
    <div className="admin-dashboard-container">
      <AdminSidebar admin={admin} />
      <main className="admin-dashboard-main">
        <div className="admin-service-container">
          <h2 className="admin-service-heading">Manage Services</h2>

          <form className="admin-service-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newService.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newService.description}
              onChange={handleChange}
              required
            ></textarea>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newService.image}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Service</button>
          </form>

          <div className="admin-service-list">
            {services.map((service) => (
              <div className="admin-service-card" key={service._id}>
                <img src={service.image} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button onClick={() => handleDelete(service._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminManageServices;
