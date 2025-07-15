// PagesCard.jsx
import React from 'react';
import '../Styles/ComponentsStyle/PagesCard.css';

function PagesCard({ heading, description, backgroundImage }) {
  return (
    <div 
      className="pages-card"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="pages-card-overlay">
        <h2 className="pages-card-heading">{heading}</h2>
        <p className="pages-card-description">{description}</p>
      </div>
    </div>
  );
}

export default PagesCard;