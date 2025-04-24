import React from "react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaTwitter, 
  FaInstagram,
  FaMedium,
  FaResearchgate,
  FaGraduationCap,
  FaMusic,
  FaPython,
  FaJs,
  FaReact,
  FaNode,
  FaDatabase,
  FaAws,
  FaDocker,
  FaCode,
  FaCss3,
  FaHtml5,
  FaBootstrap,
  FaServer,
  FaLaptopCode,
  FaMobileAlt,
  FaRobot,
  FaBrain,
  FaDesktop,
  FaChartBar,
  FaFlask,
  FaCog,
  FaFileCode,
  FaTerminal,
  FaJava
} from "react-icons/fa";
import * as Icons from "react-icons/fa6";
import { SiTensorflow, SiPytorch, SiKeras, SiCplusplus, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiTypescript, SiOpencv, SiRabbitmq, SiNginx } from "react-icons/si";

function DynamicIcon({ name, size = 18 }) {
    const iconSize = size;
    const iconStyle = { transition: 'transform 0.3s ease' };
    
    // Convert name to lowercase for case-insensitive matching
    const iconName = name.toLowerCase();
    
    // Social icons
    switch (iconName) {
        case "github":
            return <FaGithub size={iconSize} style={iconStyle} />;
        case "linkedin":
            return <FaLinkedin size={iconSize} style={iconStyle} />;
        case "gmail":
            return <FaEnvelope size={iconSize} style={iconStyle} />;
        case "x.com":
            return <Icons.FaXTwitter size={iconSize} style={iconStyle} />;
        case "google scholar":
        case "google":
            return <FaGraduationCap size={iconSize} style={iconStyle} />;
        case "email":
            return <FaEnvelope size={iconSize} style={iconStyle} />;
        case "twitter":
            return <FaTwitter size={iconSize} style={iconStyle} />;
        case "instagram":
            return <FaInstagram size={iconSize} style={iconStyle} />;
        case "medium":
            return <FaMedium size={iconSize} style={iconStyle} />;
        case "researchgate":
            return <FaResearchgate size={iconSize} style={iconStyle} />;
        case "music":
            return <FaMusic size={iconSize} style={iconStyle} />;
            
        // Programming Languages
        case "python":
            return <FaPython size={iconSize} style={iconStyle} />;
        case "javascript":
        case "js":
            return <FaJs size={iconSize} style={iconStyle} />;
        case "typescript":
        case "ts":
            return <SiTypescript size={iconSize} style={iconStyle} />;
        case "c++":
        case "cpp":
            return <SiCplusplus size={iconSize} style={iconStyle} />;
        case "java":
            return <FaJava size={iconSize} style={iconStyle} />;
        
        // Frameworks & Libraries
        case "react":
        case "react.js":
            return <FaReact size={iconSize} style={iconStyle} />;
        case "node":
        case "node.js":
            return <FaNode size={iconSize} style={iconStyle} />;
        case "bootstrap":
            return <FaBootstrap size={iconSize} style={iconStyle} />;
        case "tensorflow":
        case "tf":
            return <SiTensorflow size={iconSize} style={iconStyle} />;
        case "pytorch":
            return <SiPytorch size={iconSize} style={iconStyle} />;
        case "keras":
            return <SiKeras size={iconSize} style={iconStyle} />;
        case "opencv":
            return <SiOpencv size={iconSize} style={iconStyle} />;
            
        // Databases
        case "database":
        case "sql":
            return <FaDatabase size={iconSize} style={iconStyle} />;
        case "mongodb":
            return <SiMongodb size={iconSize} style={iconStyle} />;
        case "postgresql":
            return <SiPostgresql size={iconSize} style={iconStyle} />;
        case "mysql":
            return <SiMysql size={iconSize} style={iconStyle} />;
        case "redis":
            return <SiRedis size={iconSize} style={iconStyle} />;
            
        // Infrastructure
        case "aws":
        case "amazon":
            return <FaAws size={iconSize} style={iconStyle} />;
        case "docker":
            return <FaDocker size={iconSize} style={iconStyle} />;
        case "nginx":
            return <SiNginx size={iconSize} style={iconStyle} />;
        case "rabbitmq":
        case "amqp":
            return <SiRabbitmq size={iconSize} style={iconStyle} />;
            
        // Web Technologies
        case "css":
        case "css3":
            return <FaCss3 size={iconSize} style={iconStyle} />;
        case "html":
        case "html5":
            return <FaHtml5 size={iconSize} style={iconStyle} />;
            
        // General categories
        case "server":
        case "backend":
            return <FaServer size={iconSize} style={iconStyle} />;
        case "frontend":
        case "ui":
            return <FaDesktop size={iconSize} style={iconStyle} />;
        case "mobile":
        case "app":
            return <FaMobileAlt size={iconSize} style={iconStyle} />;
        case "ai":
        case "ml":
        case "machine learning":
            return <FaBrain size={iconSize} style={iconStyle} />;
        case "data":
        case "analytics":
            return <FaChartBar size={iconSize} style={iconStyle} />;
        case "code":
        case "programming":
            return <FaCode size={iconSize} style={iconStyle} />;
        case "devops":
        case "cicd":
            return <FaCog size={iconSize} style={iconStyle} />;
        case "research":
        case "experiment":
            return <FaFlask size={iconSize} style={iconStyle} />;
        case "robotics":
            return <FaRobot size={iconSize} style={iconStyle} />;
        case "fullstack":
        case "full-stack":
            return <FaLaptopCode size={iconSize} style={iconStyle} />;
        case "script":
        case "shell":
            return <FaTerminal size={iconSize} style={iconStyle} />;
        case "file":
        case "document":
            return <FaFileCode size={iconSize} style={iconStyle} />;
            
        default:
            // For tools without a specific icon, return the first letter of the tool name
            return <span className="small">{name.charAt(0).toUpperCase()}</span>;
    }
}

export default DynamicIcon;
