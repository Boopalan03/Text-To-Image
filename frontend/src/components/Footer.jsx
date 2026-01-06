// frontend/src/components/Footer.jsx - Exact screenshot match [file:60]
import React from "react";

const Footer = () => {
  const socialLinks = [
    {
      icon: "📘",
      href: "https://www.facebook.com/share/1C12JF1B5W/",
      label: "Facebook"
    },
    {
      icon: "📷", 
      href: "https://www.instagram.com/__boopalanx__?igsh=NWNxNXYxMmp0aWpz",
      label: "Instagram"
    },
    {
      icon: "🐦",
      href: "https://twitter.com/your-imagify",
      label: "Twitter"
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-logo">
            <span className="logo-icon"><img src="/src/assets/logo.png" alt="Imagify Logo"  class ="logo-img"/></span>
            Imagify
          </span>
          <span className="footer-text">© 2026 All rights reserved</span>
        </div>
        
        <div className="footer-social">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={social.label}
              title={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
