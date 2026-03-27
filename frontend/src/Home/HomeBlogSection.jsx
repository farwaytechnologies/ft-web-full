import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';
import { Link } from 'react-router-dom';
import '../Styles/HomeStyle/HomeBlogSection.css';

const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/blogs`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="blog-section">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading latest insights...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="blog-section">
        <div className="container">
          <div className="error-state">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="retry-btn"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-section">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Latest Insights</h2>
          <p className="section-subtitle">
            Stay updated with our latest blog posts and articles
          </p>
        </header>

        <div className="blog-grid">
          {blogs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No blogs available yet</h3>
              <p>Check back soon for our latest insights and articles.</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ blog }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  return (
    <Link to={`/blog/${blog._id}`} className="blog-card">
      <div className="blog-card-image">
        {!imageError ? (
          <img
            src={blog.image}
            alt={blog.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`card-image ${imageLoaded ? 'loaded' : ''}`}
          />
        ) : (
          <div className="image-fallback">
            <span className="fallback-icon">📸</span>
          </div>
        )}
        <div className="image-overlay"></div>
      </div>

      <div className="blog-card-content">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-description">{blog.shortDescription}</p>

        <div className="card-footer">
          <span className="read-more">
            Read More
            <svg
              className="arrow-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HomeBlogSection;
