import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import FormHeader from './FormHeader'

describe('FormHeader', () => {
  it('renders the title as a heading and the subtitle below it', () => {
    render(<FormHeader title="Login" subtitle="Boas-vindas! Faça seu login." />)
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText('Boas-vindas! Faça seu login.')).toBeInTheDocument()
  })
})
