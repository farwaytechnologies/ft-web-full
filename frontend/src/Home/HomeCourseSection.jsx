import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HomeStyle/HomeCoursesSection.css';

function HomeCourseSection() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    students: 0,
    instructors: 0,
    completionRate: 0
  });

  useEffect(() => {
    // Animate numbers on component mount
    const animateNumbers = () => {
      const finalStats = {
        totalCourses: 150,
        students: 25000,
        instructors: 45,
        completionRate: 94
      };

      let current = {
        totalCourses: 0,
        students: 0,
        instructors: 0,
        completionRate: 0
      };

      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = duration / steps;

      const timer = setInterval(() => {
        current.totalCourses = Math.min(current.totalCourses + finalStats.totalCourses / steps, finalStats.totalCourses);
        current.students = Math.min(current.students + finalStats.students / steps, finalStats.students);
        current.instructors = Math.min(current.instructors + finalStats.instructors / steps, finalStats.instructors);
        current.completionRate = Math.min(current.completionRate + finalStats.completionRate / steps, finalStats.completionRate);

        setStats({
          totalCourses: Math.floor(current.totalCourses),
          students: Math.floor(current.students),
          instructors: Math.floor(current.instructors),
          completionRate: Math.floor(current.completionRate)
        });

        if (current.totalCourses >= finalStats.totalCourses) {
          clearInterval(timer);
          setStats(finalStats);
        }
      }, increment);
    };

    const timeout = setTimeout(animateNumbers, 500);
    return () => clearTimeout(timeout);
  }, []);

  const features = [
    {
      icon: "🎯",
      title: "Expert-Led Training",
      description: "Learn from industry professionals with years of real-world experience"
    },
    {
      icon: "🚀",
      title: "Career Advancement",
      description: "Boost your career with in-demand skills and recognized certifications"
    },
    {
      icon: "💡",
      title: "Practical Projects",
      description: "Apply your knowledge through hands-on projects and real case studies"
    },
    {
      icon: "🏆",
      title: "Certification",
      description: "Earn industry-recognized certificates upon successful completion"
    }
  ];

  const categories = [
    "Web Development",
    "Data Science",
    "Mobile Apps",
    "AI & Machine Learning",
    "Cybersecurity",
    "Cloud Computing"
  ];

  return (
    <div className="home-course-section">
      <div className="home-course-container">
        {/* Hero Section */}
        <div className="home-course-hero">
          <div className="hero-badge">
            <span className="badge-text">🎓 Premium Learning Platform</span>
          </div>

          <h1 className="home-course-heading">
            Master New Skills with
            <span className="gradient-text"> Expert-Led Courses</span>
          </h1>

          <p className="home-course-subheading">
            Join thousands of professionals advancing their careers through our comprehensive,
            industry-focused training programs designed by experts for real-world success.
          </p>

          {/* Categories Pills */}
          <div className="categories-container">
            <p className="categories-label">Popular Categories:</p>
            <div className="categories-pills">
              {categories.map((category, index) => (
                <span key={index} className="category-pill">
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <Link to="/courses" className="primary-button">
              <span>Explore All Courses</span>
              <svg className="button-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/free-trial" className="secondary-button">
              Start Free Trial
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">{stats.totalCourses.toLocaleString()}+</div>
            <div className="stat-label">Courses Available</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.students.toLocaleString()}+</div>
            <div className="stat-label">Active Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.instructors}+</div>
            <div className="stat-label">Expert Instructors</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.completionRate}%</div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h3 className="features-title">Why Choose Our Platform?</h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="trust-section">
          <p className="trust-text">Trusted by professionals at</p>
          <div className="company-logos">
            <div className="company-logo">Google</div>
            <div className="company-logo">Microsoft</div>
            <div className="company-logo">Amazon</div>
            <div className="company-logo">Netflix</div>
            <div className="company-logo">Apple</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCourseSection;
