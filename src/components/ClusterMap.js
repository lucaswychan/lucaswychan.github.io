// components/ClusterMap.js
import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

function ClusterMap() {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="mb-4 position-relative">
            <div className="position-absolute d-none d-lg-block" style={{
                width: '60px',
                height: '60px',
                background: 'var(--primary)',
                opacity: '0.05',
                borderRadius: 'var(--border-radius-xl)',
                top: '-10px',
                left: '-20px',
                zIndex: '0'
            }}></div>
            
            <Collapse in={expanded}>
                <div 
                    className="rounded overflow-hidden shadow-sm glass-effect mb-3" 
                    style={{ 
                        height: "220px", 
                        margin: "0 -10px 15px -10px",
                        borderRadius: 'var(--border-radius-lg)'
                    }}
                >
                    <div 
                        className="w-100 h-100" 
                        style={{ borderRadius: 'var(--border-radius-lg)' }}
                        dangerouslySetInnerHTML={{
                            __html: `
                            <script type="text/javascript" id="clustrmaps" src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=ZmX7_E7cJacIQRqkX39y89FuFu0rPLMJX97pXCJZm54&co=2d78ad&cmo=3acc3a&cmn=ff5353&ct=ffffff"></script>
                            `,
                        }}
                    />
                </div>
            </Collapse>
            
            <Button 
                onClick={toggleExpanded}
                variant={expanded ? "primary" : "outline-primary"}
                size="sm"
                className="custom-btn w-100 d-flex justify-content-center align-items-center"
                style={{ 
                    borderRadius: 'var(--border-radius-pill)',
                    padding: '0.5rem 1rem',
                    boxShadow: expanded ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                    transition: 'all 0.3s ease'
                }}
            >
                <span className="me-2">{expanded ? "Hide Map" : "Show Map"}</span>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    style={{ transform: expanded ? 'rotate(180deg)' : '', transition: 'transform 0.3s' }}
                >
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </Button>
        </div>
    );
}

export default ClusterMap;
