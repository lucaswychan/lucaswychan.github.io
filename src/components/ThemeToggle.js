import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  // Check for saved theme preference or use device preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check if prefers-color-scheme is dark
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };

  const [theme, setTheme] = useState('light'); // Default to light, will be updated in useEffect

  useEffect(() => {
    // Set initial theme on component mount
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!localStorage.getItem('theme')) {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('theme-light', 'theme-dark');
    
    // Add new theme class
    root.classList.add(`theme-${newTheme}`);

    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <button 
      className={`theme-toggle ${theme}`} 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-sun"><FaSun /></div>
        <div className="toggle-moon"><FaMoon /></div>
        <div className="toggle-thumb"></div>
      </div>
    </button>
  );
};

export default ThemeToggle; 