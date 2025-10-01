'use client';

import { Facebook, Twitter, Instagram, Send, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo and Copyright */}
        <div className="footer-main">
          <div className="footer-logo">
            <div className="logo">
              <img 
                src="http://operativmedia.az/frontend/img/loqo.svg" 
                alt="Operativ Media Logo"
                style={{ height: '32px', width: 'auto' }}
              />
            </div>
          </div>
          <p className="footer-copyright">
            © 2025 Operativ Media. Bütün hüquqlar qorunur.
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="footer-nav">
          <a href="#" className="footer-link">
            Haqqımızda
          </a>
          <a href="#" className="footer-link">
            Bizimlə Əlaqə
          </a>
          <a href="#" className="footer-link">
            Privacy Policy
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="#" className="social-link">
            <Facebook size={20} />
          </a>
          <a href="#" className="social-link">
            <Twitter size={20} />
          </a>
          <a href="#" className="social-link">
            <Instagram size={20} />
          </a>
          <a href="#" className="social-link">
            <Send size={20} />
          </a>
          <a href="#" className="social-link">
            <Youtube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;