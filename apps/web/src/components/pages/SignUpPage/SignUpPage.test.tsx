import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import SignUpPage from './SignUpPage'

describe('SignUpPage', () => {
  it('shows the sign-up form inside the auth layout', () => {
    render(<SignUpPage />, { wrapper: MemoryRouter })
    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
    expect(screen.getByText('Olá! Preencha seus dados.')).toBeInTheDocument()
  })

  it('uses the img2 banner', () => {
    const { container } = render(<SignUpPage />, { wrapper: MemoryRouter })
    expect(container.querySelector('source[srcset="/imagens-gerais/img2-desktop.png"]')).not.toBeNull()
  })

  it('forwards valid submissions to onSubmit', async () => {
    const onSubmit = vi.fn()
    render(<SignUpPage onSubmit={onSubmit} />, { wrapper: MemoryRouter })
    await userEvent.type(screen.getByLabelText('Nome'), 'Maria Silva')
    await userEvent.type(screen.getByLabelText('Email'), 'maria@exemplo.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo123')
    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))
    expect(onSubmit).toHaveBeenCalledOnce()
  })
})
