// src/pages/Dashboard/DashboardHome.jsx
import React from 'react';
import './dashboardHome.css'; // CSS for styling
import image from '../../assets/bssitm.png' // Make sure the image exists in this path

const DashboardHome = () => {
  return (
    <div className="dashboard-home-container">
      <div className="image-container">
        <img src={image} alt="College" className="college-image" />
        <div className="centered-text">Babu SUnder SIngh Institute Of Technology & Management Lucknow</div>
      </div>
    </div>
  );
};

export default DashboardHome;
