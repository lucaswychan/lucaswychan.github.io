// App.js
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import "./App.css";

import educationData from "./data/education.json";
import experiencesData from "./data/experiences.json";
import skillsData from "./data/skills.json";
import projectsData from "./data/projects.json";
import linksData from "./data/links.json";

function App() {
    const [activeSection, setActiveSection] = useState("biography");
    
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
    
    const [isScrolling, setIsScrolling] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    
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

    // Update the active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (isScrolling) return;
            
            // Show/hide scroll-to-top button
            setShowScrollTop(window.scrollY > 300);
            
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
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolling, sectionRefs]);

    const photoUrl = "self_photo_2.jpg";
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        
                        <Header />
                        
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
                                <p className="lead">
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
            
            {/* Scroll to top button */}
            <Button 
                onClick={scrollToTop} 
                className={`scroll-to-top position-fixed ${showScrollTop ? 'visible' : ''}`}
                style={{ 
                    right: '1.5rem', 
                    bottom: '1.5rem',
                    zIndex: 1030
                }}
                aria-label="Scroll to top"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                </svg>
            </Button>
        </div>
    );
}

export default App;
