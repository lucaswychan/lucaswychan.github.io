// App.js
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowUp } from 'react-icons/fa';

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
    
    // Use useMemo to create the object with the refs
    const sectionRefs = useMemo(() => ({
        biography: biographyRef,
        project: projectRef,
        experience: experienceRef,
        education: educationRef
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
                    <Col lg={3} className="p-0 position-lg-fixed h-lg-100 overflow-auto sidebar-container">
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
                        <div className="position-absolute d-none d-lg-block" style={{
                            width: '300px',
                            height: '300px',
                            background: 'var(--primary)',
                            borderRadius: '50%',
                            top: '10%',
                            right: '-150px',
                            opacity: '0.02',
                            zIndex: '0'
                        }}></div>
                        
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
                            style={{ top: '0', zIndex: 1020, backdropFilter: 'blur(8px)' }}
                        >
                            {['biography', 'project', 'experience', 'education'].map((section) => (
                                <Nav.Item key={section}>
                                    <Nav.Link 
                                        onClick={() => scrollToSection(section)}
                                        active={activeSection === section}
                                        className="text-decoration-none position-relative nav-link-custom"
                                    >
                                        {section.charAt(0).toUpperCase() + section.slice(1)}
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
                            <div className="mb-4">
                                <p>
                                    I'm Lucas Chan, an MPhil student at{" "}
                                    <a href="https://hkust.edu.hk" className="underline-effect">HKUST</a>, working
                                    under the guidance of{" "}
                                    <a href="https://www.cse.ust.hk/~yqsong/" className="underline-effect">
                                        Professor Yangqiu Song
                                    </a>.
                                    I'm absolutely fascinated by <span className="fw-semibold">machine learning</span>{" "}
                                    and its potential. My research focuses on embedding model and LLM reasoning.
                                </p>
                                <p>
                                    I completed my
                                    Bachelor's degree at HKUST with a double major in
                                    Computer Science and Electronic Engineering,
                                    graduating with <span className="fw-semibold">First Class Honours</span>. This
                                    strong foundation has propelled me into cutting-edge
                                    machine learning research, where I'm currently
                                    developing high-quality question generation systems
                                    using Multimodal LVLMs agents.
                                </p>
                                <p>
                                    I'm also working on some exciting{" "}
                                    <a href="https://github.com/lucaswychan" className="underline-effect">
                                        side projects
                                    </a>{" "}
                                    alongside my studies to dive deeper into machine
                                    learning. My main project right now is{" "}
                                    <a href="https://github.com/lucaswychan/neuralnet-cpp" className="underline-effect">
                                        NeuralNet CPP
                                    </a>
                                    - I'm basically building a neural network framework
                                    from the ground up in C++, similar to PyTorch, using
                                    only pure C++ STL.
                                </p>
                                <p>
                                    Beyond my academic research, I'm particularly drawn
                                    to the intersection of <span className="fw-semibold">machine learning</span> and{" "}
                                    <span className="fw-semibold">quantitative finance</span>. I've been exploring how
                                    ML can transform traditional financial practices.
                                </p>
                            </div>
                        </Section>
                        
                        {/* Projects Section */}
                        <Section 
                            id="project"
                            title="Projects"
                            reference={sectionRefs.project}
                        >
                            {projectsData.map((project, index) => (
                                <div key={index} className="card">
                                    <div className="card-body">
                                        <h3 className="h5 mb-3">{project.name}</h3>
                                        <div className="mb-3 text-muted small">
                                            <span className="fw-medium">Tools:</span>{" "}
                                            {project.tools.join(", ")}
                                        </div>
                                        <p className="mb-4">{project.description}</p>
                                        <div className="d-flex flex-wrap gap-2">
                                            {Object.entries(project.links).map(([name, url], i) => (
                                                <a
                                                    key={i}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="custom-btn btn-sm"
                                                >
                                                    {name}
                                                </a>
                                            ))}
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
                            {experiencesData.map((exp, index) => (
                                <div key={index} className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-wrap justify-content-between mb-2">
                                            <h3 className="h5 mb-0">{exp.position}</h3>
                                            <span className="badge py-1 px-2" style={{ 
                                                backgroundColor: 'rgba(26, 110, 160, 0.1)',
                                                color: 'var(--primary)'
                                            }}>{exp.duration}</span>
                                        </div>
                                        <p className="text-muted mb-3">{exp.company}</p>
                                        <ul className="custom-list mb-0">
                                            {exp.descriptions.map((responsibility, i) => (
                                                <li key={i}>{responsibility}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </Section>
                        
                        {/* Education Section */}
                        <Section 
                            id="education"
                            title="Education"
                            reference={sectionRefs.education}
                        >
                            {educationData.map((edu, index) => (
                                <div key={index} className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-wrap justify-content-between mb-2">
                                            <h3 className="h5 mb-0">{edu.degree}</h3>
                                            <span className="badge py-1 px-2" style={{ 
                                                backgroundColor: 'rgba(248, 169, 120, 0.15)',
                                                color: 'var(--accent)' 
                                            }}>{edu.year}</span>
                                        </div>
                                        <p className="text-muted mb-3">{edu.school}</p>
                                        <p className="mb-3">{edu.description}</p>
                                        <p className="mb-4">
                                            Grade: <span className="fw-semibold">{edu.grade}</span>
                                        </p>
                                        <div className="mt-3">
                                            <h4 className="h6 mb-3 title-underline">Activities</h4>
                                            <ul className="custom-list mb-0">
                                                {Object.entries(edu.activities).map(([name, url], i) => (
                                                    <li key={i}>
                                                        <a
                                                            href={url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="underline-effect"
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
                    </Col>
                </Row>
            </Container>
            
            {/* Music Player - Positioned in upper right corner */}
            <div className={`music-player-container ${showMusicPlayer ? 'visible' : 'hidden'}`}>
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
                    className={`scroll-to-top ${showButton ? 'visible' : ''}`} 
                    onClick={scrollToTop}
                    style={{ bottom: '2rem', right: '2rem' }}
                >
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
}

export default App;
