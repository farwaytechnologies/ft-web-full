import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import '../Styles/AdminStyle/AdminDashboard.css';
import '../Styles/AdminStyle/AdminManageAbout.css';

const AdminManageAbout = () => {
  const [admin, setAdmin] = useState(null);
  const [aboutData, setAboutData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    mission: '',
    vision: '',
    reasons: ['']
  });

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      window.location.href = '/admin/auth';
    }
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch('https://backend-iz8p.onrender.com/api/about');
      const data = await res.json();
      if (data) setAboutData(data);
    } catch (err) {
      console.error('Fetch Error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutData({ ...aboutData, [name]: value });
  };

  const handleReasonChange = (index, value) => {
    const updatedReasons = [...aboutData.reasons];
    updatedReasons[index] = value;
    setAboutData({ ...aboutData, reasons: updatedReasons });
  };

  const addReason = () => {
    setAboutData({ ...aboutData, reasons: [...aboutData.reasons, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://backend-iz8p.onrender.com/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutData)
      });
      await res.json();
      alert('About section updated successfully');
    } catch (err) {
      console.error('Submit Error:', err);
      alert('Failed to update About section');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar admin={admin} />
      <main className="admin-dashboard-main">
        <div className="admin-about-wrapper">
          <div className="admin-about-card">
            <h2 className="admin-about-title">Manage About Page</h2>
            <form className="admin-about-form" onSubmit={handleSubmit}>
              <label>Hero Title</label>
              <input
                type="text"
                name="heroTitle"
                value={aboutData.heroTitle}
                onChange={handleChange}
              />

              <label>Hero Subtitle</label>
              <textarea
                name="heroSubtitle"
                value={aboutData.heroSubtitle}
                onChange={handleChange}
              ></textarea>

              <label>Mission</label>
              <textarea
                name="mission"
                value={aboutData.mission}
                onChange={handleChange}
              ></textarea>

              <label>Vision</label>
              <textarea
                name="vision"
                value={aboutData.vision}
                onChange={handleChange}
              ></textarea>

              <label>Why Choose Us (Reasons)</label>
              {aboutData.reasons.map((reason, index) => (
                <input
                  key={index}
                  type="text"
                  value={reason}
                  onChange={(e) => handleReasonChange(index, e.target.value)}
                />
              ))}

              <button type="button" onClick={addReason} className="admin-about-btn secondary">
                + Add Reason
              </button>

              <button type="submit" className="admin-about-btn">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminManageAbout;
