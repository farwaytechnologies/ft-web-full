import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';

import '../Styles/AdminStyle/AdminDashboard.css';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      navigate('/admin/auth');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar admin={admin} />
      <main className="admin-dashboard-main">
        <h1>Welcome, {admin?.name}</h1>
        <p>Use the sidebar to manage different sections of your website.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
