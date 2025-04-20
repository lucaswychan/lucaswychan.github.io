// components/Sidebar.js
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import DynamicIcon from "./DynamicIcon";
import ClusterMap from "./ClusterMap";
import { FaMusic } from "react-icons/fa";

function Sidebar({ skills, links, photoUrl, activeSection, handleSectionClick, toggleMusicPlayer, showMusicPlayer }) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    
    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 992);
        };
        
        // Check initially
        checkScreenSize();
        
        // Listen for resize events
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    
    return (
        <aside className="h-100 p-4 p-md-5 d-flex flex-column">
            <div className="flex-grow-1">
                {/* Profile Photo */}
                <div className="text-center mb-5">
                    <div className="mx-auto profile-photo-container" style={{ width: "160px", height: "160px" }}>
                        <img 
                            src={photoUrl} 
                            alt="Profile" 
                            className="img-fluid rounded-circle shadow" 
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        />
                        <div className="position-absolute" style={{
                            width: '35px',
                            height: '35px',
                            background: 'var(--accent)',
                            borderRadius: '50%',
                            right: '5px',
                            bottom: '15px',
                            opacity: '0.2',
                            zIndex: '-1',
                        }}></div>
                    </div>
                    <h3 className="h4 mt-4 mb-1">Lucas Chan</h3>
                    <div className="mt-2">
                        <span className="badge py-2 px-3" style={{
                            background: 'rgba(248, 169, 120, 0.15)',
                            color: 'var(--accent)',
                            fontWeight: '500',
                            letterSpacing: '0.5px',
                            borderRadius: 'var(--border-radius-pill)'
                        }}>
                            MPhil Student
                        </span>
                    </div>
                </div>
                
                {/* Navigation Links */}
                <div className="mb-4 mt-4">
                    <h5 className="text-muted small mb-3 ps-3">NAVIGATION</h5>
                    <ul className="nav flex-column">
                        {['biography', 'project', 'experience', 'education'].map((section) => (
                            <li className="nav-item" key={section}>
                                <a
                                    className={`nav-link cursor-pointer ${activeSection === section ? 'active fw-medium' : ''}`}
                                    onClick={() => handleSectionClick(section)}
                                    style={{ borderRadius: 'var(--border-radius-md)' }}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Social Links */}
                <div className="mt-4 mb-5">
                    <h5 className="text-muted small mb-3 ps-3">CONNECT</h5>
                    <ul className="d-flex justify-content-start ps-3 gap-3 list-unstyled">
                        {links.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="social-icon-btn"
                                    title={link.name}
                                    aria-label={link.name}
                                >
                                    <DynamicIcon name={link.name} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Music Player Toggle */}
                <div className="mb-5 ps-3">
                    <button 
                        className={`btn btn-sm ${showMusicPlayer ? 'btn-outline-primary' : 'custom-btn'}`}
                        onClick={toggleMusicPlayer}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            borderRadius: 'var(--border-radius-pill)',
                            padding: '8px 16px',
                            fontSize: '0.85rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <FaMusic size={14} />
                        {showMusicPlayer ? 'Hide Music Player' : 'Show Music Player'}
                    </button>
                </div>
                
                {/* Skills - Only show on larger screens */}
                {!isSmallScreen && (
                    <div className="mt-5 position-relative">
                        <div className="position-absolute d-none d-lg-block" style={{
                            width: '80px',
                            height: '80px',
                            background: 'var(--primary)',
                            borderRadius: '50%',
                            top: '-20px',
                            right: '-20px',
                            opacity: '0.03',
                            zIndex: '0'
                        }}></div>
                        
                        <h3 className="h5 mb-4 pb-2 ps-3" style={{ 
                            color: 'var(--primary)', 
                            borderBottom: '1px solid var(--secondary)',
                            borderBottomRightRadius: 'var(--border-radius-md)'
                        }}>
                            <span style={{ position: 'relative' }}>
                                Skills
                                <span 
                                    style={{ 
                                        position: 'absolute',
                                        bottom: '-8px',
                                        left: '0',
                                        width: '30px',
                                        height: '2px',
                                        backgroundColor: 'var(--accent)',
                                        background: 'var(--accent-gradient)',
                                        borderRadius: '4px'
                                    }}
                                />
                            </span>
                        </h3>
                        
                        <div className="mb-4">
                            {skills.skills.map((skillCategory, categoryIndex) => (
                                <div key={categoryIndex} className="mb-4 pb-2">
                                    <h4 className="small fw-medium mb-3 ps-3" style={{ color: 'var(--light-text)' }}>
                                        <span className="position-relative px-2">
                                            {skillCategory.category}
                                            <span className="position-absolute" style={{
                                                width: '100%',
                                                height: '5px',
                                                background: 'var(--accent)',
                                                opacity: '0.1',
                                                bottom: '0',
                                                left: '0',
                                                zIndex: '-1',
                                                borderRadius: 'var(--border-radius-sm)'
                                            }}></span>
                                        </span>
                                    </h4>
                                    <div className="d-flex flex-wrap ps-3">
                                        {skillCategory.items.map((skill, skillIndex) => (
                                            <span key={skillIndex} className="skill-badge">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Cluster Map - Only show on larger screens */}
                {!isSmallScreen && (
                    <div className="mt-5">
                        <h3 className="h5 mb-4 pb-2 ps-3" style={{ 
                            color: 'var(--primary)', 
                            borderBottom: '1px solid var(--secondary)',
                            borderBottomRightRadius: 'var(--border-radius-md)'
                        }}>
                            <span style={{ position: 'relative' }}>
                                Visitors
                                <span 
                                    style={{ 
                                        position: 'absolute',
                                        bottom: '-8px',
                                        left: '0',
                                        width: '30px',
                                        height: '2px',
                                        backgroundColor: 'var(--accent)',
                                        background: 'var(--accent-gradient)',
                                        borderRadius: '4px'
                                    }}
                                />
                            </span>
                        </h3>
                        <ClusterMap />
                    </div>
                )}
            </div>
            
            <Footer />
        </aside>
    );
}

export default Sidebar;
