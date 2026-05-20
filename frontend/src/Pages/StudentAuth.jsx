import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import '../Styles/PagesStyle/StudentAuth.css';

function StudentAuth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, loginStudent } = useStudent();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (form.password !== form.confirm) {
        setError('Passwords do not match.');
        return;
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      setLoading(true);
      const err = register({ name: form.name, email: form.email, password: form.password });
      setLoading(false);
      if (err) { setError(err); return; }
    } else {
      setLoading(true);
      const err = loginStudent({ email: form.email, password: form.password });
      setLoading(false);
      if (err) { setError(err); return; }
    }

    navigate('/my-learning');
  };

  return (
    <div className="sa-page">
      <div className="sa-card">

        <div className="sa-brand">
          <div className="sa-brand-icon">🎓</div>
          <h1 className="sa-brand-title">Student Portal</h1>
          <p className="sa-brand-sub">Farway Technologies LMS</p>
        </div>

        <div className="sa-tabs">
          <button
            className={`sa-tab ${mode === 'login' ? 'sa-tab--active' : ''}`}
            onClick={() => { setMode('login'); setError(''); }}
          >Sign In</button>
          <button
            className={`sa-tab ${mode === 'register' ? 'sa-tab--active' : ''}`}
            onClick={() => { setMode('register'); setError(''); }}
          >Create Account</button>
        </div>

        <form className="sa-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="sa-field">
              <label>Full Name</label>
              <input
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="sa-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sa-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder={mode === 'register' ? 'Min. 6 characters' : 'Your password'}
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {mode === 'register' && (
            <div className="sa-field">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm"
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {error && <div className="sa-error">{error}</div>}

          <button type="submit" className="sa-submit" disabled={loading}>
            {loading
              ? '...'
              : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="sa-footer-link">
          <Link to="/courses">← Browse Courses</Link>
        </p>
      </div>
    </div>
  );
}

export default StudentAuth;
