// App.js
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ScrollNavigation from "./components/ScrollNavigation";
import TabContent from "./components/TabContent";
import Sidebar from "./components/Sidebar";
import "./App.css";

import aboutData from "./data/about.json";
import educationData from "./data/education.json";
import experiencesData from "./data/experiences.json";
import skillsData from "./data/skills.json";
import projectsData from "./data/projects.json";
import linksData from "./data/links.json";

function App() {
    const [activeTab, setActiveTab] = useState("about");
    const photoUrl = "self_photo.jpg";

    const tabs = [
        { id: "about", label: "About" },
        { id: "experiences", label: "Experiences" },
        { id: "projects", label: "Projects" },
        { id: "education", label: "Education" },
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-100px 0px -100px 0px",
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id.replace("-header", ""));
                }
            });
        };

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );

        tabs.forEach((tab) => {
            const element = document.getElementById(`${tab.id}-header`);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [tabs]);

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 p-0">
                        <Sidebar
                            skills={skillsData}
                            links={linksData}
                            photoUrl={photoUrl}
                        />
                    </div>
                    <main className="col-md-8 p-5 p-lg-5 main-content">
                        <Header />
                        <ScrollNavigation
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        <TabContent
                            activeTab={activeTab}
                            aboutData={aboutData}
                            experiencesData={experiencesData}
                            educationData={educationData}
                            projectsData={projectsData}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
