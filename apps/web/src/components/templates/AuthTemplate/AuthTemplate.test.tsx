import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AuthTemplate from './AuthTemplate'

describe('AuthTemplate', () => {
  it('renders the banner slot and the page content', () => {
    render(
      <AuthTemplate banner={<div data-testid="banner" />}>
        <h1>Conteúdo da página</h1>
      </AuthTemplate>,
    )
    expect(screen.getByTestId('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Conteúdo da página' })).toBeInTheDocument()
  })
})
