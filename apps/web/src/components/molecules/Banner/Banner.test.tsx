import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Banner from './Banner'

describe('Banner', () => {
  it('builds the mobile, tablet and desktop sources from the base name', () => {
    const { container } = render(<Banner name="img-1" />)
    const sources = [...container.querySelectorAll('source')].map((s) =>
      s.getAttribute('srcset'),
    )
    expect(sources).toEqual([
      '/imagens-gerais/img-1-desktop.png',
      '/imagens-gerais/img-1-tablet.png',
    ])
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      '/imagens-gerais/img-1-mobile.png',
    )
  })

  it('is decorative (empty alt)', () => {
    const { container } = render(<Banner name="img-1" />)
    expect(container.querySelector('img')).toHaveAttribute('alt', '')
  })
})
