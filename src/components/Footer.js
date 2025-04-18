// components/Footer.js
import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="mt-auto pt-4 text-center small position-relative" style={{ color: 'var(--muted)' }}>
            <div className="position-absolute" style={{
                width: '100%',
                height: '1px',
                background: 'linear-gradient(to right, transparent, var(--muted) 20%, var(--muted) 80%, transparent)',
                opacity: '0.2',
                top: '0',
                left: '0'
            }}></div>
            <p className="mb-2">
                © {currentYear} <span style={{ 
                    color: 'var(--primary)',
                    fontWeight: '500',
                    letterSpacing: '0.5px'
                }}>Lucas Chan</span>
                <span className="mx-2" style={{ opacity: '0.5' }}>•</span>
                <span>All rights reserved</span>
            </p>
        </footer>
    );
}

export default Footer;
