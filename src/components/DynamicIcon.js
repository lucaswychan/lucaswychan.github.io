import * as Icons from "react-icons/fa6";
import React from "react";

const iconMapping = {
    gmail: Icons.FaEnvelope,
    github: Icons.FaGithub,
    linkedin: Icons.FaLinkedin,
    "x.com": Icons.FaXTwitter,
    // Add other icons here
};

const DynamicIcon = ({ name }) => {
    const IconComponent = iconMapping[name.toLowerCase()];

    if (!IconComponent) {
        console.warn(`Icon not found: ${name}`);
        return null;
    }

    return <IconComponent />;
};

export default DynamicIcon;
