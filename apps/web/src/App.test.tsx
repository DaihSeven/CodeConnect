import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routes', () => {
  it('redirects / to the login page', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })

  it('renders the login page at /login', () => {
    renderAt('/login')
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })

  it('renders the sign-up page at /cadastro', () => {
    renderAt('/cadastro')
    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
  })

  it('navigates from login to sign-up and back', async () => {
    renderAt('/login')

    await userEvent.click(screen.getByRole('link', { name: 'Crie seu cadastro!' }))
    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('link', { name: 'Faça seu login!' }))
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })
})
