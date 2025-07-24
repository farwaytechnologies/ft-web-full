// components/AdminSidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome, FaTools, FaBook, FaImages, FaBlog,
  FaInfoCircle, FaBriefcase, FaEnvelope, FaSignOutAlt, FaUserCircle
} from 'react-icons/fa';
import '../Styles/AdminStyle/AdminDashboard.css';

const AdminSidebar = ({ admin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  return (
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
        <Link to="/admin/services"><FaTools /> Services</Link>
        <Link to="/admin/courses"><FaBook /> Courses</Link>
        <Link to="/admin/portfolio"><FaImages /> Portfolio</Link>
        <Link to="/admin/blog"><FaBlog /> Blog</Link>
        <Link to="/admin/about"><FaInfoCircle /> About</Link>
        <Link to="/admin/applications"><FaBriefcase /> Careers</Link>
        <Link to="/admin/messages"><FaEnvelope /> Contact</Link>
      </nav>

      <button onClick={handleLogout} className="admin-dashboard-logout-btn">
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
