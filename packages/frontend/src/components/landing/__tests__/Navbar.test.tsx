import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../Navbar';

describe('Navbar Component', () => {
    it('renders the brand title', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        expect(screen.getByText(/DevScore/i)).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        expect(screen.getByText(/How It Works/i)).toBeInTheDocument();
        expect(screen.getByText(/Analyzer/i)).toBeInTheDocument();
        expect(screen.getByText(/Architecture/i)).toBeInTheDocument();
    });

    it('renders the source code link', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        const sourceLink = screen.getByText(/Source/i).closest('a');
        expect(sourceLink).toHaveAttribute('href', 'https://github.com/andriimaksymov');
    });
});
