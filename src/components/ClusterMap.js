// components/ClusterMap.js
import React, { useState, useRef, useEffect } from "react";
import { Button, Collapse } from "react-bootstrap";

function ClusterMap() {
    const [expanded, setExpanded] = useState(false);

    const scriptRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (expanded && !scriptRef.current) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.id = "clustrmaps";
            script.src =
                "//cdn.clustrmaps.com/map_v2.js?cl=080808&w=200&t=tt&d=CLddyvsHpYP9Jl_fQtgbkzTcCDMiYnw5xcjmbONhFrY&co=ffffff&cmo=ff3636&cmn=00f500&ct=808080";
            script.async = true;

            scriptRef.current = script;
            mapContainerRef.current.appendChild(script);
        }

        return () => {
            if (scriptRef.current && mapContainerRef.current) {
                mapContainerRef.current.removeChild(scriptRef.current);
                scriptRef.current = null;
            }
        };
    }, [expanded]);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="mb-4 position-relative">
            <Button
                onClick={toggleExpanded}
                variant={expanded ? "primary" : "outline-primary"}
                size="sm"
                className="custom-btn w-100 d-flex justify-content-center align-items-center"
                style={{
                    borderRadius: "var(--border-radius-pill)",
                    padding: "0.5rem 1rem",
                    boxShadow: expanded
                        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                        : "none",
                    transition: "all 0.3s ease",
                }}
            >
                <span className="me-2">
                    {expanded ? "Hide Map" : "Show Map"}
                </span>
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
                    style={{
                        transform: expanded ? "rotate(180deg)" : "",
                        transition: "transform 0.3s",
                    }}
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </Button>

            <div
                className="position-absolute d-none d-lg-block"
                style={{
                    width: "60px",
                    height: "60px",
                    background: "var(--primary)",
                    opacity: "0.05",
                    borderRadius: "var(--border-radius-xl)",
                    top: "-3px",
                    left: "-20px",
                    zIndex: "0",
                }}
            ></div>

            <Collapse in={expanded}>
                <div
                    className={`cluster-map-widget ${
                        expanded ? "expanded" : ""
                    }`}
                    ref={mapContainerRef}
                >
                    <div id="clustrmaps-widget"></div>
                </div>
            </Collapse>
        </div>
    );
}

export default ClusterMap;
