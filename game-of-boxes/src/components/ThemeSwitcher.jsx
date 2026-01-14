import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Button from 'react-bootstrap/Button';
import { FaPalette } from 'react-icons/fa';

const themes = ["light", "dark", "blue", "purple", "neon"];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // Dynamic colors for the button based on the theme
  const getBtnStyle = () => {
    switch(theme) {
      case 'dark': return { bg: '#1a202c', text: '#fff' };
      case 'blue': return { bg: '#3182ce', text: '#fff' };
      case 'purple': return { bg: '#805ad5', text: '#fff' };
      case 'neon': return { bg: '#00ff41', text: '#000' };
      default: return { bg: '#f8f9fa', text: '#333' };
    }
  };

  const style = getBtnStyle();

  return (
    <Button 
      onClick={toggleTheme}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: '1px solid #ddd',
        borderRadius: '50px',
        padding: '8px 20px',
        transition: 'all 0.3s ease'
      }}
      className="shadow-sm "
    >
      <FaPalette className="me-2" />
      Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
    </Button>
  );
};

export default ThemeSwitcher;