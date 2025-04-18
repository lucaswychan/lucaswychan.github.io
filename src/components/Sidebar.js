// components/Sidebar.js
import React from "react";
import Footer from "./Footer";
import DynamicIcon from "./DynamicIcon";
import ClusterMap from "./ClusterMap";

function Sidebar({ skills, links, photoUrl }) {
    return (
        <aside className="h-100 p-4 p-md-5 d-flex flex-column">
            <div className="flex-grow-1">
                {/* Profile Photo */}
                <div className="text-center mb-5">
                    <div className="mx-auto profile-photo-container" style={{ width: "180px", height: "180px" }}>
                        <img 
                            src={photoUrl} 
                            alt="Profile" 
                            className="img-fluid rounded-circle border border-4 border-white shadow" 
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
                    <div className="mt-3">
                        <span className="badge py-2 px-3" style={{
                            background: 'rgba(248, 169, 120, 0.15)',
                            color: 'var(--accent)',
                            fontWeight: '500',
                            letterSpacing: '0.5px'
                        }}>
                            MPhil Student
                        </span>
                    </div>
                </div>
                
                {/* Social Links */}
                <div className="mt-4 mb-5">
                    <ul className="d-flex justify-content-center gap-3 list-unstyled">
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
                
                {/* Skills */}
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
                    
                    <h3 className="h5 mb-4 pb-2 text-center" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--secondary)' }}>
                        <span style={{ position: 'relative' }}>
                            Skills
                            <span 
                                style={{ 
                                    position: 'absolute',
                                    bottom: '-10px',
                                    left: 'calc(50% - 25px)',
                                    width: '50px',
                                    height: '2px',
                                    backgroundColor: 'var(--accent)',
                                    background: 'var(--accent-gradient)'
                                }}
                            />
                        </span>
                    </h3>
                    
                    <div className="mb-4">
                        {skills.skills.map((skillCategory, categoryIndex) => (
                            <div key={categoryIndex} className="mb-4 pb-2">
                                <h4 className="small fw-medium mb-3 text-center" style={{ color: 'var(--light-text)' }}>
                                    <span className="position-relative px-2">
                                        {skillCategory.category}
                                        <span className="position-absolute" style={{
                                            width: '100%',
                                            height: '5px',
                                            background: 'var(--accent)',
                                            opacity: '0.1',
                                            bottom: '0',
                                            left: '0',
                                            zIndex: '-1'
                                        }}></span>
                                    </span>
                                </h4>
                                <div className="d-flex flex-wrap justify-content-center">
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
                
                {/* Cluster Map */}
                <div className="mt-5">
                    <ClusterMap />
                </div>
            </div>
            
            <Footer />
        </aside>
    );
}

export default Sidebar;
