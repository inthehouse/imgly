import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from '../../../context/ThemeContext'; 
import Toggle from '../Toggle';

jest.mock('../../../context/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

describe('Toggle', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display "Switch to Dark Theme" when the theme is light', () => {
        (useTheme as jest.Mock).mockReturnValue({
            theme: 'light',
            toggleTheme: jest.fn(),
        });

        render(<Toggle />);

        expect(screen.getByText('Switch to Dark Theme')).toBeInTheDocument();
    });

    it('should display "Switch to Light Theme" when the theme is dark', () => {
        (useTheme as jest.Mock).mockReturnValue({
            theme: 'dark',
            toggleTheme: jest.fn(),
        });

        render(<Toggle />);

        expect(screen.getByText('Switch to Light Theme')).toBeInTheDocument();
    });
});
