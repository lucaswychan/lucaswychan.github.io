import React from "react";

// components/TabContent.js

function TabContent({
    activeTab,
    aboutData,
    experiencesData,
    educationData,
    projectsData,
}) {
    return (
        <div className="tab-content">
            <section id="about" className="content-section">
                <h2>About Me</h2>
                <p>{aboutData.description}</p>
            </section>

            <section id="experiences" className="content-section">
                <h2>Experiences</h2>
                {experiencesData.map((exp, index) => (
                    <div key={index} className="mb-4 pb-4 border-bottom">
                        <h2 className="h5 mb-2">{exp.position}</h2>
                        <p className="mb-1">{exp.company}</p>
                        <p className="text-muted mb-2">{exp.duration}</p>
                        <ul>
                            {exp.descriptions.map((responsibility, i) => (
                                <li key={i}>{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <section id="projects" className="content-section">
                <h2>Projects</h2>
                {projectsData.map((project, index) => (
                    <div key={index} className="mb-4 pb-4 border-bottom">
                        <h3 className="h5 mb-2">{project.name}</h3>
                        <p className="text-muted mb-2">{project.date}</p>
                        <p>{project.description}</p>
                        <p>
                            {Object.entries(project.links).map(
                                ([name, url], i) => (
                                    <React.Fragment key={i}>
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="me-2"
                                        >
                                            {name}
                                        </a>
                                        {i <
                                            Object.keys(project.links).length -
                                                1 && "| "}
                                    </React.Fragment>
                                )
                            )}
                        </p>
                    </div>
                ))}
            </section>

            <section id="education" className="content-section">
                <h2>Education</h2>
                {educationData.map((edu, index) => (
                    <div key={index} className="mb-4 pb-4 border-bottom">
                        <h3 className="h5 mb-2">{edu.degree}</h3>
                        <p className="mb-1">{edu.institution}</p>
                        <p className="text-muted mb-2">{edu.duration}</p>
                        <p>
                            Grade : <b>{edu.grade}</b>
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default TabContent;
