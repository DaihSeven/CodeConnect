import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import FormField from './FormField'

describe('FormField', () => {
  it('associates the label with the input', () => {
    render(<FormField label="Email" type="email" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
  })

  it('shows the error and links it to the input', () => {
    render(<FormField label="Email" error="Informe um email válido" />)
    const input = screen.getByLabelText('Email')
    expect(screen.getByRole('alert')).toHaveTextContent('Informe um email válido')
    expect(input).toBeInvalid()
    expect(input).toHaveAccessibleDescription('Informe um email válido')
  })
})
