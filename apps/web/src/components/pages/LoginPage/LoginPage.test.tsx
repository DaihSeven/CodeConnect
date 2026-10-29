import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import LoginPage from './LoginPage'

describe('LoginPage', () => {
  it('shows the login form inside the auth layout', () => {
    render(<LoginPage />)
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText('Boas-vindas! Faça seu login.')).toBeInTheDocument()
  })

  it('forwards valid submissions to onSubmit', async () => {
    const onSubmit = vi.fn()
    render(<LoginPage onSubmit={onSubmit} />)
    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'usuario123')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo123')
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(onSubmit).toHaveBeenCalledOnce()
  })
})
