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
                borderRadius: '50%',
                top: '-10px',
                left: '-20px',
                zIndex: '0'
            }}></div>
            
            <h3 className="h5 mb-4 pb-2 text-center" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--secondary)' }}>
                <span style={{ position: 'relative' }}>
                    Visitor Map
                    <span 
                        style={{ 
                            position: 'absolute',
                            bottom: '-10px',
                            left: 'calc(50% - 25px)',
                            width: '50px',
                            height: '2px',
                            background: 'var(--accent-gradient)',
                            borderRadius: '1px'
                        }}
                    />
                </span>
            </h3>
            
            <Collapse in={expanded}>
                <div 
                    className="rounded overflow-hidden shadow-sm glass-effect" 
                    style={{ height: "220px", margin: "0 -10px 15px -10px" }}
                >
                    <div 
                        className="w-100 h-100" 
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
                style={{ borderRadius: "30px" }}
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
