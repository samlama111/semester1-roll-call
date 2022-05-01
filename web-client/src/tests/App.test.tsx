import { render, screen } from '@testing-library/react'
import React from 'react'

import Login from '../content/Login'

test('renders learn react link', () => {
    render(<Login />) 
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
