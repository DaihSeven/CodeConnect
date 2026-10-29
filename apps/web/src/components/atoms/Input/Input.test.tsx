import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Input from './Input'

describe('Input', () => {
  it('accepts typed text', async () => {
    render(<Input aria-label="Email" />)
    const input = screen.getByLabelText('Email')
    await userEvent.type(input, 'ana@codeconnect.dev')
    expect(input).toHaveValue('ana@codeconnect.dev')
  })

  it('marks the field as invalid', () => {
    render(<Input aria-label="Email" invalid />)
    expect(screen.getByLabelText('Email')).toBeInvalid()
  })
})
