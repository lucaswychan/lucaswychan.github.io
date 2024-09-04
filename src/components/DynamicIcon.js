import * as Icons from "react-icons/io";
import React from "react";

const iconMapping = {
    gmail: Icons.IoLogoGoogle,
    github: Icons.IoLogoGithub,
    linkedin: Icons.IoLogoLinkedin,
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
