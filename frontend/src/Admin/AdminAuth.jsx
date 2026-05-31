import { useState } from 'react';
import '../Styles/AdminStyle/AdminAuth.css';
import { API_BASE_URL } from '../api';

const AdminAuth = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || data.error || 'Invalid credentials');
        return;
      }
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminInfo', JSON.stringify(data.admin));
      window.location.href = '/admin/dashboard';
    } catch {
      setError('Request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className="admin-auth-form">
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
          {error && <p className="admin-auth-error">{error}</p>}
          <button type="submit" className="admin-auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
