// components/ScrollNavigation.js
import React from "react";

function ScrollNavigation({ tabs, activeTab, setActiveTab }) {
    const scrollToTab = (tabId) => {
        const element = document.getElementById(tabId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveTab(tabId);
        }
    };

    return (
        <nav className="scroll-navigation">
            <ul>
                {tabs.map((tab) => (
                    <li key={tab.id}>
                        <button
                            className={`nav-link ${
                                activeTab === tab.id ? "active" : ""
                            }`}
                            onClick={() => scrollToTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default ScrollNavigation;
