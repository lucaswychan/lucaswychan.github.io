// components/ClusterMap.js
import React, { useState, useEffect, useRef } from "react";

const ClusterMap = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const scriptRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (isExpanded && !scriptRef.current) {
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
    }, [isExpanded]);

    const toggleMap = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="cluster-map-container">
            <button className="cluster-map-toggle" onClick={toggleMap}>
                {isExpanded ? "Hide map" : "Show map"}
            </button>
            <div
                className={`cluster-map-widget ${isExpanded ? "expanded" : ""}`}
                ref={mapContainerRef}
            >
                <div id="clustrmaps-widget"></div>
            </div>
        </div>
    );
};

export default ClusterMap;
