// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import './footer.css'; // Import custom CSS
import logo from '../assets/logo.jpg'

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <img src={logo} alt="College Logo" className="footer-logo" />
          <h3>Babu Sunder SIngh Institute Of <br></br> Technology & Management Lucknow</h3>
          <p>Empowering Education Through Technology</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/alumni">Alumni Profile</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Connect with us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 College ERP. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
