// App.js
import React, { useState } from "react";
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";
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

    const tabs = [
        { id: "about", label: "About" },
        { id: "experiences", label: "Experiences" },
        { id: "projects", label: "Projects" },
        { id: "education", label: "Education" },
    ];

    const photoUrl = "self_photo.jpg";

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 p-0">
                        <Sidebar
                            skills={skillsData}
                            links={linksData}
                            photoUrl={photoUrl}
                        />
                    </div>
                    <main className="col-md-9 p-5 p-lg-5 main-content">
                        <Header />
                        <TabNavigation
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
