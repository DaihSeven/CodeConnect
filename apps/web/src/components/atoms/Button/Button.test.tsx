import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Login</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Login
      </Button>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('defaults to type="button" so it does not submit forms by accident', () => {
    render(<Button>Login</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })
})
