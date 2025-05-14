// components/Header.js
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function Header({ isExpanded, setIsExpanded, activeSection, scrollToSection, visible }) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <header className={`mb-5 pb-2`}>
            <div className="position-relative">
                <h1 className="display-4 fw-bold mb-3">
                    <span className="position-relative">
                        <span style={{ color: 'var(--primary)' }}>Lucas</span>
                        <span style={{ color: 'var(--accent)' }}> Chan</span>
                        <span className="position-absolute" style={{
                            width: '50px',
                            height: '50px',
                            background: 'var(--accent)',
                            opacity: isDark ? '0.2' : '0.1',
                            borderRadius: 'var(--border-radius-xl)',
                            top: '-10px',
                            left: '-15px',
                            zIndex: '-1'
                        }}></span>
                    </span>
                </h1>
                <div className="position-absolute d-none d-md-block" style={{
                    width: '120px',
                    height: '120px',
                    background: 'var(--primary)',
                    opacity: isDark ? '0.1' : '0.05',
                    borderRadius: 'var(--border-radius-xl)',
                    bottom: '-30px',
                    right: '10%',
                    zIndex: '-1'
                }}></div>
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
                            borderRadius: 'var(--border-radius-sm)'
                        }} 
                    />
                </span>
                <span className="ms-2 badge" style={{
                    backgroundColor: isDark ? 'rgba(58, 148, 197, 0.2)' : 'rgba(26, 110, 160, 0.1)', 
                    color: 'var(--primary)',
                    fontWeight: '400',
                    paddingTop: '0.15rem',
                    paddingBottom: '0.15rem',
                    borderRadius: 'var(--border-radius-pill)'
                }}>
                    HKUST
                </span>
            </p>
        </header>
    );
}

export default Header;
