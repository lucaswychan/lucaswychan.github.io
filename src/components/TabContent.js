// components/TabContent.js
import React from "react";

function TabContent({
    activeTab,
    aboutData,
    experiencesData,
    educationData,
    projectsData,
}) {
    const renderContent = () => {
        switch (activeTab) {
            case "about":
                return <p>{aboutData.description}</p>;
            case "experiences":
                return experiencesData.map((exp, index) => (
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
                ));
            case "projects":
                return projectsData.map((project, index) => (
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
                ));
            case "education":
                return educationData.map((edu, index) => (
                    <div key={index} className="mb-4 pb-4 border-bottom">
                        <h3 className="h5 mb-2">{edu.degree}</h3>
                        <p className="mb-1">{edu.school}</p>
                        <p className="text-muted mb-2">{edu.year}</p>
                        <p>{edu.description}</p>
                        <p>
                            Grade : <b>{edu.grade}</b>
                        </p>
                    </div>
                ));
            default:
                return null;
        }
    };

    return (
        <div className="tab-content">
            <h2 className="h3 mb-4">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            {renderContent()}
        </div>
    );
}

export default TabContent;
