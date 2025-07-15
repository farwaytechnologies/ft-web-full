import React from 'react';
import { useParams } from 'react-router-dom';
import caseStudies from '../Data/CaseStudy';
import CaseStudyLayout from '../Components/CaseStudyLayout';
import '../Styles/PagesStyle/CaseStudyPage.css';

const CaseStudyPage = () => {
  const { id } = useParams();
  const caseStudy = caseStudies.find((item) => item.id === parseInt(id));

  if (!caseStudy) {
    return (
      <div className="casestudypage-container">
        <div className="casestudypage-error">
          <div className="casestudypage-error-content">
            <div className="casestudypage-error-icon">🚫</div>
            <h2 className="casestudypage-error-title">Case Study Not Found</h2>
            <p className="casestudypage-error-description">
              The case study you're looking for doesn't exist or has been moved.
            </p>
            <button 
              className="casestudypage-error-button"
              onClick={() => window.history.back()}
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="casestudypage-wrapper">
      <CaseStudyLayout data={caseStudy} />
    </div>
  );
};

export default CaseStudyPage;