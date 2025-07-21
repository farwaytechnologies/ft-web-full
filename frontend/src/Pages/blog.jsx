import React, { useEffect, useState } from 'react';
import '../Styles/PagesStyle/Blog.css';
import PagesCard from '../Components/PagesCard';
import bg from '../assets/Image/Card-bg.jpg';

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <PagesCard
        heading="Tech Insights & Tips"
        description="Read our latest blog posts on web design, development, SEO, and more.."
        backgroundImage={bg}
      />

      <div className="blog-container">
        <h1 className="blog-heading">Latest Blogs</h1>
        <p className="blog-subheading">Stay updated with our latest articles and insights.</p>

        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <a href={blog.link} className="blog-card" key={index}>
              <div className="blog-card-image">
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="blog-card-content">
                <h2>{blog.title}</h2>
                <p>{blog.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;
