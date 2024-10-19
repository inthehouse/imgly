import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from '../../../context/ThemeContext'; 
import ThemeToggle from '../ThemeToggle';

jest.mock('../../../context/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display "Dark Theme" when the theme is light', () => {
        (useTheme as jest.Mock).mockReturnValue({
            theme: 'light',
            toggleTheme: jest.fn(),
        });

        render(<ThemeToggle />);

        expect(screen.getByText('Dark Theme')).toBeInTheDocument();
    });

    it('should display "Light Theme" when the theme is dark', () => {
        (useTheme as jest.Mock).mockReturnValue({
            theme: 'dark',
            toggleTheme: jest.fn(),
        });

        render(<ThemeToggle />);

        expect(screen.getByText('Light Theme')).toBeInTheDocument();
    });
});
