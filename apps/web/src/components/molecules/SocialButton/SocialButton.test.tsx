import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SocialButton from './SocialButton'

describe('SocialButton', () => {
  it('is named by its label and fires onClick', async () => {
    const onClick = vi.fn()
    render(
      <SocialButton icon="/icones/svg/github.svg" onClick={onClick}>
        Github
      </SocialButton>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Github' }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
