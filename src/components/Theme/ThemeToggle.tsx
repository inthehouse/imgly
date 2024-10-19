import React from 'react';
import './Toggle.css';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className='toggle-wrapper'>
            <label data-testid="theme-toggle" className="theme-switch">
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />
                <span className="slider" />
            </label>
            <label data-testid="theme-label" className='toggle-label'>
                {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
            </label>
        </div>

    );
};

export default ThemeToggle;
