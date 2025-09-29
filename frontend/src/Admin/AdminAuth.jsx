import React, { useState } from 'react';
import '../Styles/AdminStyle/AdminAuth.css';

const AdminAuth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup
      ? 'https://backend-iz8p.onrender.com/api/admin/register'
      : 'https://backend-iz8p.onrender.com/api/admin/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || data.error || 'Something went wrong');
      } else {
        if (!isSignup) {
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminInfo', JSON.stringify(data.admin));
          window.location.href = '/admin/dashboard'; // or your route
        } else {
          alert('Signup successful. You can now log in.');
          setIsSignup(false);
          setFormData({ name: '', email: '', password: '' });
        }
      }
    } catch (err) {
      console.error('❌ Error:', err);
      alert('Request failed');
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-box">
        <h2>{isSignup ? 'Admin Signup' : 'Admin Login'}</h2>
        <form onSubmit={handleSubmit} className="admin-auth-form">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="admin-auth-button">
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <p className="admin-auth-toggle">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={toggleMode}>
            {isSignup ? ' Login' : ' Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminAuth;
