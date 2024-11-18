// App.js
import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";
import TabContent from "./components/TabContent";
import Sidebar from "./components/Sidebar";
import LuckyDraw from "./luckydraw/LuckyDraw";
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
        { id: "projects", label: "Projects" },
        { id: "experiences", label: "Experiences" },
        { id: "education", label: "Education" },
    ];

    const photoUrl = "self_photo.jpg";

    const Mainlayout = () => (
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
                            projectsData={projectsData}
                            experiencesData={experiencesData}
                            educationData={educationData}
                        />
                    </main>
                </div>
            </div>
        </div>
    );

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Mainlayout />} />
                <Route path="/luckydraw" element={<LuckyDraw />} />
                {/* Your other existing routes */}
            </Routes>
        </Router>
    );
}

export default App;
