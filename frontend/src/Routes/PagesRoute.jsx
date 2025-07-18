// src/routes/AppRoutes.js
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
import CaseStudyPage from '../Pages/CaseStudyPage'; // ✅ new import
import AdminAuth from '../Admin/AdminAuth';
import AdminDashboard from '../Admin/AdminDashboard';
import AdminViewMessages from '../Admin/AdminViewMessages';
import AdminManageServices from '../Admin/AdminManageServices';
import ServiceDetails from '../Pages/ServiceDetails';
import AdminManageCourses from '../Admin/AdminManageCourses';

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
      
      {/* ✅ Dynamic Case Study Route */}
      <Route path="/case-study/:id" element={<CaseStudyPage />} />

       <Route path="/services/:id" element={<ServiceDetails />} />


      <Route path="/admin/login" element={<AdminAuth />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/messages" element={<AdminViewMessages />} />
      <Route path="/admin/services" element={<AdminManageServices />} />
      <Route path="/admin/courses" element={<AdminManageCourses />} />


    </Routes>
  );
}

export default PagesRoutes;
