import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

describe('Hero', () => {
  it('shows loading state initially', () => {
    render(<Hero />)
    expect(screen.getByText(/loading hero content/i)).toBeInTheDocument()
  })
})