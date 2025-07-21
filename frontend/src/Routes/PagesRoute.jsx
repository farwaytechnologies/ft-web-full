import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import About from '../Pages/About';
import Portfolio from '../Pages/Portfolio';
import Contact from '../Pages/Contact';
import Courses from '../Pages/Courses';
import Services from '../Pages/Services';
import Careers from '../Pages/Careers';
import Blog from '../Pages/blog';
import ApplicationForm from '../Pages/ApplicationForm';
import AdminAuth from '../Admin/AdminAuth';
import AdminDashboard from '../Admin/AdminDashboard';
import AdminViewMessages from '../Admin/AdminViewMessages';
import AdminManageServices from '../Admin/AdminManageServices';
import ServiceDetails from '../Pages/ServiceDetails';
import AdminManageCourses from '../Admin/AdminManageCourses';
import PortfolioDetails from '../Pages/PortfolioDetails';
import AdminManagePortfolio from '../Admin/AdminManagePortfolio';
import AdminManageBlog from '../Admin/AdminManageBlog';

function PagesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/services" element={<Services />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/apply" element={<ApplicationForm />} />

      <Route path="/services/:id" element={<ServiceDetails />} />
      <Route path="/admin/login" element={<AdminAuth />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/messages" element={<AdminViewMessages />} />
      <Route path="/admin/services" element={<AdminManageServices />} />
      <Route path="/admin/courses" element={<AdminManageCourses />} />
      <Route path="/admin/portfolio" element={<AdminManagePortfolio />} />
      <Route path="/admin/blog" element={<AdminManageBlog/>} />


      <Route path="/portfolio-details/:id" element={<PortfolioDetails/>} />

    </Routes>
  );
}

export default PagesRoutes;
