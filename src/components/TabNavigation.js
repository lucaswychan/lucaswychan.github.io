// components/TabNavigation.js
import React from "react";

function TabNavigation({ tabs, activeTab, setActiveTab }) {
    return (
        <nav className="mb-4">
            <ul className="nav nav-tabs">
                {tabs.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                        <button
                            className={`nav-link ${
                                activeTab === tab.id ? "active" : ""
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default TabNavigation;
