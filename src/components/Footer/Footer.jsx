import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footerParentDiv">
      <div className="content">
        <nav>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <ul className="list">
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </nav>
        <nav>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <ul className="list">
            <li>About OLX Group</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>OLXPeople</li>
          </ul>
        </nav>
        <nav>
          <div className="heading">
            <p>OLX</p>
          </div>
          <ul className="list">
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy information</li>
          </ul>
        </nav>
      </div>
      <div className="footer">
        <p>Other Countries: Pakistan - South Africa - Indonesia</p>
        <p>Free Classifieds in India. © 2006-2021 OLX</p>
      </div>
    </footer>
  );
};

export default Footer;
