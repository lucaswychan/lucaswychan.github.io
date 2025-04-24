// App.js
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import MusicPlayer from "./components/MusicPlayer";
import DynamicIcon from "./components/DynamicIcon";
import Gallery from "./components/Gallery";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowUp, FaCode, FaGithub, FaExternalLinkAlt, FaFileAlt, FaDesktop, FaBriefcase, FaCalendarAlt, FaBuilding, FaGraduationCap, FaUniversity, FaMedal, FaClipboardList, FaUserAlt, FaFlask, FaLaptopCode, FaBrain, FaChartLine, FaCamera } from 'react-icons/fa';

import "./styles/Biography.css";
import "./styles/Project.css";
import "./styles/Experience.css";
import "./styles/Education.css";
import "./App.css";

import educationData from "./data/education.json";
import experiencesData from "./data/experiences.json";
import skillsData from "./data/skills.json";
import projectsData from "./data/projects.json";
import linksData from "./data/links.json";
import songData from "./data/songData";

function App() {
    const [activeSection, setActiveSection] = useState("home");
    const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [showMusicPlayer, setShowMusicPlayer] = useState(true);
    const [playerMinimized, setPlayerMinimized] = useState(false);
    const [isMounted, setIsMounted] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
    
    // Create refs outside useMemo
    const biographyRef = useRef(null);
    const projectRef = useRef(null);
    const experienceRef = useRef(null);
    const educationRef = useRef(null);
    const galleryRef = useRef(null);
    
    // Use useMemo to create the object with the refs
    const sectionRefs = useMemo(() => ({
        biography: biographyRef,
        project: projectRef,
        experience: experienceRef,
        education: educationRef,
        gallery: galleryRef
    }), []);
    
    const location = useLocation();
    
    // eslint-disable-next-line no-unused-vars
    const isHomePage = location.pathname === "/";

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        setIsScrolling(true);
        
        const section = sectionRefs[sectionId].current;
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Reset scrolling state after animation (approx. 1s)
            setTimeout(() => {
                setIsScrolling(false);
            }, 1000);
        }
    };

    const handleScroll = useCallback(() => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);

        if (isScrolling) return;
        
        // Show/hide scroll-to-top button
        setShowButton(window.scrollY > 100);
        
        // Minimize music player when scrolling down
        if (currentScrollPos > 100) {
            setPlayerMinimized(true);
        } else if (currentScrollPos < 50) {
            // Only un-minimize when near the top of the page
            setPlayerMinimized(false);
        }
        
        // Determine active section based on scroll position
        const scrollPosition = window.scrollY + 100; // offset

        for (const section in sectionRefs) {
            const sectionElement = sectionRefs[section].current;
            if (!sectionElement) continue;
            
            const sectionTop = sectionElement.offsetTop;
            const sectionBottom = sectionTop + sectionElement.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                setActiveSection(section);
                break;
            }
        }
    }, [isScrolling, sectionRefs, prevScrollPos]);

    // Check window size on load and resize
    useEffect(() => {
        const checkWindowSize = () => {
            // Auto-minimize on small screens
            if (window.innerWidth < 768) {
                setPlayerMinimized(true);
            }
        };
        
        // Check initially
        checkWindowSize();
        
        // Also check on resize
        window.addEventListener('resize', checkWindowSize);
        
        return () => window.removeEventListener('resize', checkWindowSize);
    }, []);

    // Handle scroll events and manage visibility
    useEffect(() => {
        setIsMounted(true);
        
        // Always show music player initially
        setShowMusicPlayer(true);
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const photoUrl = "self_photo_2.jpg";
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Function to toggle music player visibility
    const toggleMusicPlayer = () => {
        setShowMusicPlayer(!showMusicPlayer);
    };

    // Function to handle music player minimization
    const handlePlayerMinimize = (isMinimized) => {
        setPlayerMinimized(isMinimized);
    };

    return (
        <div className="min-vh-100 bg-white">
            <Container fluid className="p-0">
                <Row className="m-0">
                    {/* Sidebar */}
                    <Col
                        lg={3}
                        className="p-0 position-lg-fixed h-lg-100 overflow-auto sidebar-container"
                    >
                        <Sidebar
                            skills={skillsData}
                            links={linksData}
                            photoUrl={photoUrl}
                            activeSection={activeSection}
                            handleSectionClick={scrollToSection}
                            toggleMusicPlayer={toggleMusicPlayer}
                            showMusicPlayer={showMusicPlayer}
                        />
                    </Col>

                    {/* Main Content */}
                    <Col lg={9} className="p-4 p-md-5 ms-lg-auto">
                        <div
                            className="position-absolute d-none d-lg-block"
                            style={{
                                width: "300px",
                                height: "300px",
                                background: "var(--primary)",
                                borderRadius: "50%",
                                top: "10%",
                                right: "-150px",
                                opacity: "0.02",
                                zIndex: "0",
                            }}
                        ></div>

                        {/* Header */}
                        <Header
                            isExpanded={isHeaderExpanded}
                            setIsExpanded={setIsHeaderExpanded}
                            activeSection={activeSection}
                            scrollToSection={scrollToSection}
                            visible={visible}
                        />

                        {/* Navigation */}
                        <Nav
                            className="sticky-top py-3 mb-5 bg-white border-bottom overflow-auto no-scrollbar glass-effect"
                            style={{
                                top: "0",
                                zIndex: 1020,
                                backdropFilter: "blur(8px)",
                            }}
                        >
                            {[
                                "biography",
                                "project",
                                "experience",
                                "education",
                                "gallery",
                            ].map((section) => (
                                <Nav.Item key={section}>
                                    <Nav.Link
                                        onClick={() => scrollToSection(section)}
                                        active={activeSection === section}
                                        className="text-decoration-none position-relative nav-link-custom"
                                    >
                                        {section.charAt(0).toUpperCase() +
                                            section.slice(1)}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>

                        {/* Biography Section */}
                        <Section
                            id="biography"
                            title="Biography"
                            reference={sectionRefs.biography}
                        >
                            <div className="biography-container">
                                <p className="biography-intro">
                                    <FaUserAlt
                                        className="me-2"
                                        style={{
                                            fontSize: "0.9em",
                                            opacity: 0.7,
                                        }}
                                    />
                                    I'm Lucas Chan, an MPhil student at HKUST,
                                    working under the guidance of Professor
                                    Yangqiu Song.
                                </p>

                                <div className="biography-bullet-container">
                                    <div className="biography-bullet-connector"></div>

                                    <div className="biography-paragraph">
                                        <div className="biography-bullet"></div>
                                        I'm absolutely fascinated by{" "}
                                        <span className="biography-emphasis">
                                            machine learning
                                        </span>{" "}
                                        and its potential. My research focuses
                                        on embedding models and LLM reasoning,
                                        with a special interest in{" "}
                                        <span className="biography-emphasis">
                                            {" "}
                                            natural language processing
                                        </span>{" "}
                                        applications.
                                    </div>

                                    <div className="biography-paragraph">
                                        <div className="biography-bullet"></div>
                                        I completed my Bachelor's degree at{" "}
                                        <a
                                            href="https://hkust.edu.hk"
                                            className="biography-link"
                                        >
                                            HKUST
                                        </a>{" "}
                                        with a double major in Computer Science
                                        and Electronic Engineering, graduating
                                        with{" "}
                                        <span className="biography-emphasis">
                                            First Class Honours
                                        </span>
                                        . This strong foundation has propelled
                                        me into cutting-edge research.
                                    </div>

                                    <div className="biography-paragraph">
                                        <div className="biography-bullet"></div>
                                        <FaLaptopCode
                                            className="me-2"
                                            style={{
                                                color: "var(--primary)",
                                                opacity: 0.8,
                                            }}
                                        />
                                        I'm also working on some exciting{" "}
                                        <a
                                            href="https://github.com/lucaswychan"
                                            className="biography-link"
                                        >
                                            side projects
                                        </a>{" "}
                                        alongside my studies. My main project
                                        right now is{" "}
                                        <a
                                            href="https://github.com/lucaswychan/neuralnet-cpp"
                                            className="biography-link"
                                        >
                                            NeuralNet CPP
                                        </a>{" "}
                                        - I'm basically building a neural
                                        network framework from the ground up in
                                        C++, similar to PyTorch, using only pure
                                        C++ STL.
                                    </div>

                                    <div className="biography-paragraph">
                                        <div className="biography-bullet"></div>
                                        <FaChartLine
                                            className="me-2"
                                            style={{
                                                color: "var(--accent)",
                                                opacity: 0.8,
                                            }}
                                        />
                                        Beyond my academic research, I'm
                                        particularly drawn to the intersection
                                        of{" "}
                                        <span className="biography-emphasis">
                                            machine learning
                                        </span>{" "}
                                        and{" "}
                                        <span className="biography-emphasis">
                                            quantitative finance
                                        </span>
                                        . I've been exploring how ML can
                                        transform traditional financial
                                        practices and create innovative
                                        solutions for market analysis.
                                    </div>

                                    <div className="biography-paragraph">
                                        <div className="biography-bullet"></div>
                                        <FaBrain
                                            className="me-2"
                                            style={{
                                                color: "var(--primary)",
                                                opacity: 0.8,
                                            }}
                                        />
                                        My research interests include{" "}
                                        <span className="biography-emphasis">
                                            deep learning
                                        </span>
                                        ,{" "}
                                        <span className="biography-emphasis">
                                            natural language processing
                                        </span>
                                        , and{" "}
                                        <span className="biography-emphasis">
                                            multimodal learning
                                        </span>
                                        , with a focus on developing systems
                                        that can understand and generate
                                        human-like text and visual content.
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* Projects Section */}
                        <Section
                            id="project"
                            title="Projects"
                            reference={sectionRefs.project}
                        >
                            {projectsData.map((project, index) => (
                                <div key={index} className="project-card">
                                    <div className="project-card-body">
                                        <h3 className="project-title">
                                            {project.name}
                                        </h3>

                                        {/* Tools Section with Icons */}
                                        <div className="project-tools-container">
                                            {project.tools.map((tool, idx) => (
                                                <div
                                                    key={idx}
                                                    className="project-tool-badge"
                                                >
                                                    <span className="project-tool-icon">
                                                        <DynamicIcon
                                                            name={tool}
                                                            size={14}
                                                        />
                                                    </span>
                                                    {tool}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Project Description */}
                                        <p className="project-description">
                                            {project.description}
                                        </p>

                                        {/* Project Links with Icons */}
                                        <div className="project-links">
                                            {Object.entries(project.links).map(
                                                ([name, url], i) => {
                                                    // Choose appropriate icon based on link type
                                                    let icon;
                                                    if (
                                                        name
                                                            .toLowerCase()
                                                            .includes("github")
                                                    ) {
                                                        icon = (
                                                            <FaGithub className="project-link-icon" />
                                                        );
                                                    } else if (
                                                        name
                                                            .toLowerCase()
                                                            .includes("demo") ||
                                                        name
                                                            .toLowerCase()
                                                            .includes("live")
                                                    ) {
                                                        icon = (
                                                            <FaDesktop className="project-link-icon" />
                                                        );
                                                    } else if (
                                                        name
                                                            .toLowerCase()
                                                            .includes("doc")
                                                    ) {
                                                        icon = (
                                                            <FaFileAlt className="project-link-icon" />
                                                        );
                                                    } else if (
                                                        name
                                                            .toLowerCase()
                                                            .includes("code")
                                                    ) {
                                                        icon = (
                                                            <FaCode className="project-link-icon" />
                                                        );
                                                    } else {
                                                        icon = (
                                                            <FaExternalLinkAlt className="project-link-icon" />
                                                        );
                                                    }

                                                    return (
                                                        <a
                                                            key={i}
                                                            href={url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="project-link-btn"
                                                        >
                                                            {icon}
                                                            {name}
                                                        </a>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Section>

                        {/* Experience Section */}
                        <Section
                            id="experience"
                            title="Experience"
                            reference={sectionRefs.experience}
                        >
                            <div className="experience-timeline-container">
                                <div className="experience-timeline-connector"></div>
                                {experiencesData.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="experience-card"
                                    >
                                        <div className="card-body">
                                            <div className="experience-header">
                                                <h3 className="experience-position">
                                                    <FaBriefcase
                                                        className="me-2"
                                                        style={{
                                                            fontSize: "0.8em",
                                                            opacity: 0.7,
                                                        }}
                                                    />
                                                    {exp.position}
                                                </h3>
                                                <span className="experience-duration">
                                                    <FaCalendarAlt
                                                        className="me-1"
                                                        style={{
                                                            fontSize: "0.9em",
                                                        }}
                                                    />
                                                    {exp.duration}
                                                </span>
                                            </div>
                                            <div className="experience-company">
                                                <FaBuilding className="experience-company-icon" />
                                                {exp.company}
                                            </div>
                                            <ul className="experience-responsibility-list">
                                                {exp.descriptions.map(
                                                    (responsibility, i) => (
                                                        <li key={i}>
                                                            {responsibility}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        {/* Education Section */}
                        <Section
                            id="education"
                            title="Education"
                            reference={sectionRefs.education}
                        >
                            {educationData.map((edu, index) => (
                                <div key={index} className="education-card">
                                    <div className="card-body">
                                        <div className="education-header">
                                            <h3 className="education-degree">
                                                <FaGraduationCap
                                                    className="me-2"
                                                    style={{
                                                        fontSize: "0.8em",
                                                        opacity: 0.7,
                                                    }}
                                                />
                                                {edu.degree}
                                            </h3>
                                            <span className="education-year">
                                                <FaCalendarAlt
                                                    className="me-1"
                                                    style={{
                                                        fontSize: "0.9em",
                                                    }}
                                                />
                                                {edu.year}
                                            </span>
                                        </div>
                                        <div className="education-school">
                                            <FaUniversity className="education-school-icon" />
                                            {edu.school}
                                        </div>
                                        <p className="education-description">
                                            {edu.description}
                                        </p>
                                        <div className="education-grade">
                                            <FaMedal className="education-grade-icon" />
                                            Grade:{" "}
                                            <span className="fw-semibold ms-1">
                                                {edu.grade}
                                            </span>
                                        </div>
                                        <div className="mt-4">
                                            <h4 className="activities-title">
                                                <FaClipboardList
                                                    className="me-2"
                                                    style={{
                                                        fontSize: "0.9em",
                                                    }}
                                                />
                                                Activities
                                            </h4>
                                            <ul className="activities-list">
                                                {Object.entries(
                                                    edu.activities
                                                ).map(([name, url], i) => (
                                                    <li key={i}>
                                                        <a
                                                            href={url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            {name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Section>

                        {/* Gallery Section */}
                        <Section
                            id="gallery"
                            title="Daily Life Gallery"
                            reference={sectionRefs.gallery}
                        >
                            <div className="section-intro mb-4">
                                <p className="lead">
                                    <FaCamera
                                        className="me-2"
                                        style={{
                                            color: "var(--accent)",
                                            opacity: 0.8,
                                        }}
                                    />
                                    A glimpse into my daily life through photos.
                                    These moments capture what inspires me and
                                    keeps me motivated.
                                </p>
                            </div>
                            <Gallery />
                        </Section>
                    </Col>
                </Row>
            </Container>

            {/* Music Player - Positioned in upper right corner */}
            <div
                className={`music-player-container ${
                    showMusicPlayer ? "visible" : "hidden"
                }`}
            >
                <MusicPlayer
                    songData={songData}
                    visible={showMusicPlayer}
                    onClose={() => setShowMusicPlayer(false)}
                    onMinimize={handlePlayerMinimize}
                    isMinimized={playerMinimized}
                />
            </div>

            {isMounted && (
                <button
                    className={`scroll-to-top ${showButton ? "visible" : ""}`}
                    onClick={scrollToTop}
                    style={{ bottom: "2rem", right: "2rem" }}
                >
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
}

export default App;
