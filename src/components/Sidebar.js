// components/Sidebar.js
import React from "react";
import Footer from "./Footer";
import DynamicIcon from "./DynamicIcon";
import ClusterMap from "./ClusterMap";

function Sidebar({ skills, links, photoUrl }) {
    return (
        <aside className="sidebar p-4">
            <div className="sidebar-content">
                <div className="profile-photo mb-4 text-center">
                    <img src={photoUrl} alt="Profile" className="img-fluid" />
                </div>
                <div className="skills mb-4">
                    <h3 className="h5 mb-3">Skills</h3>
                    {skills.skills.map((skillCategory, categoryIndex) => (
                        <div
                            key={categoryIndex}
                            className="skill-category mb-3"
                        >
                            <h4 className="h6 mb-2">
                                {skillCategory.category}
                            </h4>
                            <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-2">
                                {skillCategory.items.map(
                                    (skill, skillIndex) => (
                                        <li key={skillIndex} className="badge">
                                            {skill}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="links">
                    <hr className="my-4" />
                    <ul className="list-unstyled d-flex justify-content-center">
                        {links.map((link, index) => (
                            <li key={index} className="mx-2">
                                <a
                                    href={link.url}
                                    className="link-item"
                                    title={link.name}
                                >
                                    <DynamicIcon name={link.name} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cluster-map mb-4">
                    <ClusterMap />
                </div>
            </div>
            <Footer />
        </aside>
    );
}

export default Sidebar;
