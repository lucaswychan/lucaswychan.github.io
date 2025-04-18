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
  FaMusic
} from "react-icons/fa";

function DynamicIcon({ name }) {
    const iconSize = 18;
    const iconStyle = { transition: 'transform 0.3s ease' };
    
    switch (name.toLowerCase()) {
        case "github":
            return <FaGithub size={iconSize} style={iconStyle} />;
        case "linkedin":
            return <FaLinkedin size={iconSize} style={iconStyle} />;
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
        default:
            return <span className="small">{name.charAt(0)}</span>;
    }
}

export default DynamicIcon;
