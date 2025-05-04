// components/Header.js
import React from "react";
import ThemeToggle from "./ThemeToggle";

function Header({ isExpanded, setIsExpanded, activeSection, scrollToSection, visible }) {
    return (
        <header className={`mb-5 pb-2`}>
            <div className="position-relative d-flex justify-content-between align-items-start">
                <div>
                    <h1 className="display-4 fw-bold mb-3">
                        <span className="position-relative">
                            <span style={{ color: 'var(--primary-500)' }}>Lucas</span>
                            <span style={{ color: 'var(--accent-500)' }}> Chan</span>
                            <span className="position-absolute" style={{
                                width: '50px',
                                height: '50px',
                                background: 'var(--accent-500)',
                                opacity: '0.1',
                                borderRadius: 'var(--radius-xl)',
                                top: '-10px',
                                left: '-15px',
                                zIndex: '-1'
                            }}></span>
                        </span>
                    </h1>
                    <div className="position-absolute d-none d-md-block" style={{
                        width: '120px',
                        height: '120px',
                        background: 'var(--primary-500)',
                        opacity: '0.05',
                        borderRadius: 'var(--radius-xl)',
                        bottom: '-30px',
                        right: '10%',
                        zIndex: '-1'
                    }}></div>
                </div>
                
                {/* Theme Toggle component */}
                <div className="theme-toggle-container mt-2">
                    <ThemeToggle />
                </div>
            </div>
            
            <p className="lead" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                    MPhil in Computer Science
                    <span 
                        style={{ 
                            position: 'absolute', 
                            height: '3px', 
                            width: '100%', 
                            background: 'var(--accent-gradient)', 
                            bottom: '-5px', 
                            left: 0, 
                            opacity: 0.7,
                            borderRadius: 'var(--radius-sm)'
                        }} 
                    />
                </span>
                <span className="ms-2 badge" style={{
                    backgroundColor: 'var(--primary-glass)', 
                    color: 'var(--primary-500)',
                    fontWeight: '400',
                    paddingTop: '0.15rem',
                    paddingBottom: '0.15rem',
                    borderRadius: 'var(--radius-full)'
                }}>
                    HKUST
                </span>
            </p>
        </header>
    );
}

export default Header;
