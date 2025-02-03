// components/TabContent.js
import React from "react";

function TabContent({
    activeTab,
    projectsData,
    experiencesData,
    educationData,
}) {
    const renderContent = () => {
        switch (activeTab) {
            case "biography":
                return (
                    <div className="about-tab mb-4">
                        <p>
                            I'm Lucas Chan, and I'm currently working on my
                            MPhil at <a href="https://hkust.edu.hk">HKUST</a>.
                            I'm absolutely fascinated by <b>machine learning</b>{" "}
                            and its potential. My research, under the guidance
                            of{" "}
                            <a href="https://www.cse.ust.hk/~yqsong/">
                                Professor Yangqiu Song,
                            </a>{" "}
                            focuses on multimodal learning, knowledge graphs,
                            and large vision language models (LVLMs).
                        </p>
                        <p>
                            Before embarking on my MPhil journey, I completed my
                            Bachelor's degree at HKUST with a double major in
                            Computer Science and Electronic Engineering,
                            graduating with <b>First Class Honours</b>. This
                            strong foundation has propelled me into cutting-edge
                            machine learning research, where I'm currently
                            developing high-quality question generation systems
                            using Multimodal LVLMs agents.
                        </p>
                        <p>
                            I'm also working on some exciting{" "}
                            <a href="https://github.com/lucaswychan">
                                side projects
                            </a>{" "}
                            alongside my studies to dive deeper into machine
                            learning. My main project right now is{" "}
                            <a href="https://github.com/lucaswychan/neuralnet-cpp">
                                NeuralNet CPP{" "}
                            </a>
                            - I'm basically building a neural network framework
                            from the ground up in C++, similar to PyTorch, using
                            only pure C++ STL. It is a great way to challenge
                            myself and demonstrate that I can work with
                            different programming languages and frameworks.
                            Plus, it's helping me understand what's really
                            happening under the hood of these ML tools.
                        </p>
                        <p>
                            Beyond my academic research, I'm particularly drawn
                            to the intersection of <b>machine learning</b> and{" "}
                            <b>quantitative finance</b>. I've been exploring how
                            ML can transform traditional financial practices -
                            from developing more sophisticated financial models
                            to enhancing risk assessment and market analysis
                            techniques. One of my key projects in this space is{" "}
                            <a href="https://github.com/lucaswychan/neural-stock-prophet">
                                Neural Stock Prophet
                            </a>
                            , where I'm developing advanced algorithmic systems
                            to create more robust market predictions. I find it
                            fascinating how machine learning can bring a new
                            level of precision and insight to financial
                            forecasting.
                        </p>
                    </div>
                );
            case "project":
                return projectsData.map((project, index) => (
                    <div key={index} className="mb-4 pb-4 border-bottom">
                        <h3 className="h5 mb-2">{project.name}</h3>
                        <div className="mb-3">
                            <i className="text-muted">
                                Tools :{" "}
                                {project.tools.map(
                                    (tool, i) =>
                                        tool +
                                        (i < project.tools.length - 1
                                            ? ", "
                                            : "")
                                )}
                            </i>
                        </div>
                        <p>{project.description}</p>
                        <p>
                            {" "}
                            Link :{" "}
                            {Object.entries(project.links).map(
                                ([name, url], i) => (
                                    <React.Fragment key={i}>
                                        <a
                                            href={url}
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
            case "experience":
                return experiencesData.map((exp, index) => (
                    <div key={index} className="mb-4 pb-4 border-bottom">
                        <h2 className="h5 mb-2">{exp.position}</h2>
                        <div>
                            <p
                                className="text-muted mb-3"
                                style={{ float: "left" }}
                            >
                                {exp.company}
                            </p>
                            <p
                                className="text-muted mb-3"
                                style={{ float: "right" }}
                            >
                                {exp.duration}
                            </p>
                            <div className="clear"></div>
                        </div>
                        <ul>
                            {exp.descriptions.map((responsibility, i) => (
                                <li key={i}>{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                ));
            case "education":
                return educationData.map((edu, index) => (
                    <div key={index} className="mb-4 pb-4 border-bottom">
                        <h3 className="h5 mb-2">{edu.degree}</h3>
                        <div>
                            <p className="mb-2" style={{ float: "left" }}>
                                {edu.school}
                            </p>
                            <p
                                className="text-muted mb-2"
                                style={{ float: "right" }}
                            >
                                {edu.year}
                            </p>
                            <div className="clear"></div>
                        </div>
                        <p>{edu.description}</p>
                        <p>
                            Grade : <b>{edu.grade}</b>
                        </p>
                        <p className="mb-1 education-activities">
                            Activities : <p></p>
                            <ul>
                                {Object.entries(edu.activities).map(
                                    ([name, url], i) => (
                                        <li key={i}>
                                            <a
                                                href={url}
                                                rel="noreferrer"
                                                className="me-2"
                                            >
                                                {name}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
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
