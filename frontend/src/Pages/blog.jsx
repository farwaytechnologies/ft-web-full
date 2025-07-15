import React from 'react';
import '../Styles/PagesStyle/Blog.css';

import PagesCard from '../Components/PagesCard';

import blogImg1 from '../assets/Image/digital.jpg';
import blogImg2 from '../assets/Image/digital.jpg';
import blogImg3 from '../assets/Image/digital.jpg';
import blogImg4 from '../assets/Image/digital.jpg';

import bg from '../assets/Image/Card-bg.jpg'

const blogs = [
  {
    title: '5 Web Design Trends in 2025',
    description: 'Explore the cutting-edge UI/UX trends shaping websites this year.',
    link: '/blog/web-design-trends',
    image: blogImg1,
  },
  {
    title: 'Boosting SEO With React',
    description: 'A guide to improving visibility and SEO with React best practices.',
    link: '/blog/react-seo',
    image: blogImg2,
  },
  {
    title: 'Why Full Stack Dev is the Future',
    description: 'Understand the evolving role of full-stack developers in tech.',
    link: '/blog/fullstack-future',
    image: blogImg3,
  },
  {
    title: 'Optimizing Images in Web Apps',
    description: 'Make your site faster and more efficient with image optimization tips.',
    link: '/blog/image-optimization',
    image: blogImg4,
  },
];

function Blog() {
  return (
    <>
     <PagesCard
      heading="Tech Insights & Tips" 
      description="Read our latest blog posts on web design, development, SEO, and more.." 
      backgroundImage={bg}/>

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
    </div></>
 
  );
}

export default Blog;
