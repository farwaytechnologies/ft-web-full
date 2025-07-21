import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeStyle/HomeBlogSection.css';

const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="home-blog-section">
      <div className="home-blog-overlay">
        <h2 className="home-blog-heading">Latest Insights</h2>
        <p className="home-blog-subheading">Stay updated with our latest blog posts and articles</p>

        <div className="home-blog-cards-container">
          {blogs.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            blogs.map((blog) => (
              <Link to={`/blog/${blog._id}`} key={blog._id} className="home-blog-card" style={{ backgroundImage: `url(${blog.image})` }}>
                <div className="home-blog-card-content">
                  <h2>{blog.title}</h2>
                  <p>{blog.shortDescription}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;
