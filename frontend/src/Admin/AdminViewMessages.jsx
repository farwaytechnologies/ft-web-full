import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Components/adminsidebar';
import '../Styles/AdminStyle/AdminDashboard.css';
import '../Styles/AdminStyle/AdminViewMessages.css';

const AdminViewMessages = () => {
  const [admin, setAdmin] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      window.location.href = '/admin/auth';
    }

    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('https://backend-iz8p.onrender.com/api/contact/all');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`https://backend-iz8p.onrender.com/api/contact/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      alert(data.msg);
      fetchMessages(); // Refresh messages
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('Failed to delete message');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar admin={admin} />
      <main className="admin-dashboard-main">
        <div className="admin-messages-container">
          <h2 className="admin-messages-heading">Contact Form Messages</h2>
          {messages.length === 0 ? (
            <p className="no-messages">No messages found.</p>
          ) : (
            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg._id} className="message-card">
                  <div className="message-header">
                    <h4>{msg.name}</h4>
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <p><strong>Email:</strong> {msg.email}</p>
                  <p><strong>Phone:</strong> {msg.phone}</p>
                  <p><strong>Subject:</strong> {msg.subject}</p>
                  <p><strong>Type:</strong> {msg.type}</p>
                  <p><strong>Message:</strong> {msg.message}</p>
                  <button onClick={() => handleDelete(msg._id)} className="delete-btn">Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminViewMessages;
