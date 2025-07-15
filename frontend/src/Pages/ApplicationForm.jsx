import React, { useState } from 'react';
import '../Styles/PagesStyle/ApplicationForm.css';

function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    portfolio: '',
    coverLetter: '',
    linkedinProfile: '',
    currentSalary: '',
    expectedSalary: '',
    availableDate: '',
    workPreference: '',
    resume: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'resume') {
      if (files[0]?.size > 5 * 1024 * 1024) {
        alert('Resume file size must be less than 5MB');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        resume: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.resume) {
      alert('Please upload your resume before submitting.');
      return;
    }

    console.log('Form submitted:', formData);
    alert('Application submitted successfully! We will get back to you soon.');

    // Optional: Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      portfolio: '',
      coverLetter: '',
      linkedinProfile: '',
      currentSalary: '',
      expectedSalary: '',
      availableDate: '',
      workPreference: '',
      resume: null,
    });
  };

  return (
    <div className="form-section">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">Application Form</h2>
          <p className="form-subtitle">Take the next step in your career journey</p>
        </div>

        <form onSubmit={handleSubmit} className="application-form" encType="multipart/form-data">
          {/* Personal Info */}
          <div className="form-section-card">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn Profile</label>
                <input type="url" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleInputChange} className="form-input" />
              </div>
            </div>
          </div>

          {/* Position Info */}
          <div className="form-section-card">
            <h3 className="section-title">Position Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Position Applying For *</label>
                <select name="position" value={formData.position} onChange={handleInputChange} className="form-select" required>
                  <option value="">Select a position</option>
              
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Years of Experience *</label>
                <select name="experience" value={formData.experience} onChange={handleInputChange} className="form-select" required>
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Work Preference</label>
                <select name="workPreference" value={formData.workPreference} onChange={handleInputChange} className="form-select">
                  <option value="">Select preference</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Available Start Date</label>
                <input type="date" name="availableDate" value={formData.availableDate} onChange={handleInputChange} className="form-input" />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="form-section-card">
            <h3 className="section-title">Additional Information</h3>
            <div className="form-grid mb-4">
              <div className="form-group">
                <label className="form-label">Current Salary (Optional)</label>
                <input type="number" name="currentSalary" value={formData.currentSalary} onChange={handleInputChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Expected Salary</label>
                <input type="number" name="expectedSalary" value={formData.expectedSalary} onChange={handleInputChange} className="form-input" />
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">Portfolio/Website</label>
              <input type="url" name="portfolio" value={formData.portfolio} onChange={handleInputChange} className="form-input" />
            </div>
            <div className="form-group mb-4">
              <label className="form-label">Resume/CV *</label>
              <input type="file" name="resume" onChange={handleInputChange} accept=".pdf,.doc,.docx" className="form-file" required />
              <p className="file-note">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              {formData.resume && (
                <p className="file-note">Uploaded: {formData.resume.name}</p>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Cover Letter *</label>
              <textarea name="coverLetter" value={formData.coverLetter} onChange={handleInputChange} rows="6" className="form-textarea" required></textarea>
            </div>
          </div>

          <div className="form-submit">
            <button type="submit" className="submit-button">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}




export default ApplicationForm;
