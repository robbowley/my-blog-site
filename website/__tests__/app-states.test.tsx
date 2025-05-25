import React from 'react';
import { render, screen } from '../utils/test-utils';

// Import your app-level components
import NotFound from '../app/not-found';
import ErrorComponent from '../app/error';
import Loading from '../app/loading';

describe('App-level error and fallback states', () => {
  it('renders the Not Found page', () => {
    render(<NotFound />);
    // Adjust the text below to match your actual 404 message
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('renders the Error boundary page', () => {
    render(<ErrorComponent error={new Error('Test error')} reset={() => {}} />);
    // Adjust the text below to match your actual error message
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders the Loading state', () => {
    render(<Loading />);
    // Adjust the text below to match your actual loading message
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
}); 