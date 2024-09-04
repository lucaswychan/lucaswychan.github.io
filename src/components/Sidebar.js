// components/Sidebar.js
import React from "react";
import Footer from "./Footer";
import DynamicIcon from "./DynamicIcon";

function Sidebar({ skills, links, photoUrl }) {
    return (
        <aside className="sidebar p-4">
            <div className="sidebar-content">
                <div className="profile-photo mb-4 text-center">
                    <img src={photoUrl} alt="Profile" className="img-fluid" />
                </div>
                <div className="skills mb-4">
                    <h3 className="h5 mb-3">Skills</h3>
                    <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-2">
                        {skills.map((skill, index) => (
                            <li key={index} className="badge">
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="links">
                    <h3 className="h5 mb-3">Links</h3>
                    <ul className="list-unstyled text-center">
                        {links.map((link, index) => (
                            <li key={index} className="mb-2">
                                <a href={link.url} className="link-item">
                                    <DynamicIcon name={link.name} />
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </aside>
    );
}

export default Sidebar;
