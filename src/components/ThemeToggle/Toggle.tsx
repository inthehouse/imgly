import React from 'react';
import './Toggle.css';
import { useTheme } from '../../context/ThemeContext';

// this file is for the toggle for theme. is pretty basic

const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
};

const Toggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className='toggle-wrapper'>
            <label data-testid="theme-toggle" className="theme-switch">
                <input
                    type="checkbox"
                    checked={theme === THEMES.DARK}
                    onChange={toggleTheme}
                    aria-label="Toggle theme"
                />
                <span className="slider" />
            </label>
            <span data-testid="theme-label" className='toggle-label'>
                {theme === THEMES.DARK ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            </span>
        </div>
    );
};

export default Toggle;
