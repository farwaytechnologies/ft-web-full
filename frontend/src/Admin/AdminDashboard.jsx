import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome, FaTools, FaBook, FaImages, FaBlog,
  FaInfoCircle, FaBriefcase, FaEnvelope, FaSignOutAlt, FaUserCircle
} from 'react-icons/fa';
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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard-container">
      <aside className="admin-dashboard-sidebar">
        <div className="admin-dashboard-profile">
          <div className="admin-dashboard-avatar"><FaUserCircle size={32} /></div>
          <div>
            <p className="admin-dashboard-name">{admin?.name}</p>
            <p className="admin-dashboard-email">{admin?.email}</p>
          </div>
        </div>

        <nav className="admin-dashboard-nav">
          <Link to="/admin/manage-home"><FaHome /> Home</Link>
          <Link to="/admin/manage-services"><FaTools /> Services</Link>
          <Link to="/admin/manage-courses"><FaBook /> Courses</Link>
          <Link to="/admin/manage-portfolio"><FaImages /> Portfolio</Link>
          <Link to="/admin/manage-blog"><FaBlog /> Blog</Link>
          <Link to="/admin/manage-about"><FaInfoCircle /> About</Link>
          <Link to="/admin/manage-careers"><FaBriefcase /> Careers</Link>
          <Link to="/admin/messages"><FaEnvelope /> Contact</Link>
        </nav>

        <button onClick={handleLogout} className="admin-dashboard-logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="admin-dashboard-main">
        <h1>Welcome, {admin?.name}</h1>
        <p>Use the sidebar to manage different sections of your website.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
