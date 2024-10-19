import React from 'react';
import './Toggle.css';
import { useTheme } from '../../context/ThemeContext';

const Toggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className='toggle-wrapper'>
            <label data-testid="theme-toggle" className="theme-switch">
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    aria-label="Toggle theme"
                />
                <span className="slider" />
            </label>
            <label data-testid="theme-label" className='toggle-label'>
                {theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            </label>
        </div>
    );
};

export default Toggle;
