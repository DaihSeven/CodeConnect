import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('submits the typed values when valid', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />, { wrapper: MemoryRouter })

    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'usuario123')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo123')
    await userEvent.click(screen.getByLabelText('Lembrar-me'))
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(onSubmit).toHaveBeenCalledWith({
      identifier: 'usuario123',
      password: 'segredo123',
      remember: true,
    })
  })

  it('shows validation errors and does not submit when fields are empty', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />, { wrapper: MemoryRouter })

    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByText('Informe seu email ou usuário')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('reports which social provider was chosen', async () => {
    const onSocialLogin = vi.fn()
    render(<LoginForm onSocialLogin={onSocialLogin} />, { wrapper: MemoryRouter })

    await userEvent.click(screen.getByRole('button', { name: 'Github' }))
    await userEvent.click(screen.getByRole('button', { name: 'Gmail' }))

    expect(onSocialLogin).toHaveBeenNthCalledWith(1, 'github')
    expect(onSocialLogin).toHaveBeenNthCalledWith(2, 'gmail')
  })
})
