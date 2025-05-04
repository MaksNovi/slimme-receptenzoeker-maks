// src/components/Footer.js
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <p>© {currentYear} Slimme receptenzoeker. All rights reserved.</p>
                <div className="footer-links">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                    <Link to="/contact-us">Contact Us</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;