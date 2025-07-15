import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeStyle/HomeBlogSection.css';

const blogs = [
  {
    title: '5 Web Design Trends in 2025',
    description: 'Explore the cutting-edge UI/UX trends shaping websites this year.',
    link: '/blog/web-design-trends',
    color: '#1e293b', // dark blue-gray
  },
  {
    title: 'Boosting SEO With React',
    description: 'A guide to improving visibility and SEO with React best practices.',
    link: '/blog/react-seo',
    color: '#334155',
  },
  {
    title: 'Why Full Stack Dev is the Future',
    description: 'Understand the evolving role of full-stack developers in tech.',
    link: '/blog/fullstack-future',
    color: '#0f172a',
  },
  {
    title: 'Optimizing Images in Web Apps',
    description: 'Make your site faster and more efficient with image optimization tips.',
    link: '/blog/image-optimization',
    color: '#1e3a8a',
  },
];

function HomeBlogSection() {
  return (
    <div className="home-blog-section">
      
      <div className="home-blog-overlay">
        <h1 className="home-blog-heading">Latest Blog Posts</h1>
        <p className="home-blog-subheading">Stay updated with our newest articles and insights.</p>

        <div className="home-blog-cards-container">
          {blogs.map((blog, index) => (
            <Link to={blog.link} className="home-blog-card" key={index}>
  <div className="home-blog-card-content">
    <h2>{blog.title}</h2>
    <p>{blog.description}</p>
  </div>
</Link>

          ))}
        </div>

        <Link to="/blog" className="uni-button">View All Blogs</Link>
      </div>
    </div>
  );
}

export default HomeBlogSection;
