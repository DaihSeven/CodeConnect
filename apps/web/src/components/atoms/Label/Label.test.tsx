import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Label from './Label'

describe('Label', () => {
  it('renders its text and points to the field via htmlFor', () => {
    render(<Label htmlFor="email">Email</Label>)
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email')
  })
})
