import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import SignUpForm from './SignUpForm'

describe('SignUpForm', () => {
  it('submits the typed values when valid', async () => {
    const onSubmit = vi.fn()
    render(<SignUpForm onSubmit={onSubmit} />, { wrapper: MemoryRouter })

    await userEvent.type(screen.getByLabelText('Nome'), 'Maria Silva')
    await userEvent.type(screen.getByLabelText('Email'), 'maria@exemplo.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo123')
    await userEvent.click(screen.getByLabelText('Lembrar-me'))
    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Maria Silva',
      email: 'maria@exemplo.com',
      password: 'segredo123',
      remember: true,
    })
  })

  it('shows validation errors and does not submit when fields are empty', async () => {
    const onSubmit = vi.fn()
    render(<SignUpForm onSubmit={onSubmit} />, { wrapper: MemoryRouter })

    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    expect(screen.getByText('Informe seu nome')).toBeInTheDocument()
    expect(screen.getByText('Informe seu email')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('rejects a malformed email', async () => {
    const onSubmit = vi.fn()
    render(<SignUpForm onSubmit={onSubmit} />, { wrapper: MemoryRouter })

    await userEvent.type(screen.getByLabelText('Nome'), 'Maria Silva')
    await userEvent.type(screen.getByLabelText('Email'), 'maria@')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo123')
    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    expect(screen.getByText('Informe um email válido')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('reports which social provider was chosen', async () => {
    const onSocialLogin = vi.fn()
    render(<SignUpForm onSocialLogin={onSocialLogin} />, { wrapper: MemoryRouter })

    await userEvent.click(screen.getByRole('button', { name: 'Github' }))
    await userEvent.click(screen.getByRole('button', { name: 'Gmail' }))

    expect(onSocialLogin).toHaveBeenNthCalledWith(1, 'github')
    expect(onSocialLogin).toHaveBeenNthCalledWith(2, 'gmail')
  })

  it('links back to the login page', () => {
    render(<SignUpForm />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toBeInTheDocument()
  })
})
