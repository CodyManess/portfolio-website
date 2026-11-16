import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ExtendedPage, { metadata } from '@/app/extended/page'
import { roles, extendedRoles } from '@/data/experience'

describe('Extended Work History Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            roles,
            extendedRoles,
          }),
      })
    ) as jest.Mock
  })

  it('renders a main landmark, back link, heading, and all extended roles', async () => {
    render(<ExtendedPage />)

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: /extended job history/i })
    ).toBeInTheDocument()

    const backLink = screen.getByRole('link', { name: /back to portfolio/i })
    expect(backLink).toHaveAttribute('href', '/#experience')

    const firstExtended = extendedRoles[0]
    expect(firstExtended).toBeDefined()
    if (!firstExtended) return
    expect(
      await screen.findByRole('heading', {
        level: 3,
        name: firstExtended.title,
      })
    ).toBeInTheDocument()

    extendedRoles.forEach((role) => {
      expect(
        screen.getByRole('heading', { level: 3, name: role.title })
      ).toBeInTheDocument()
    })
  })

  it('exports page-specific OpenGraph, Twitter, and canonical metadata', () => {
    expect(metadata.title).toBe('Cody Maness | Extended Work History')
    expect(metadata.alternates?.canonical).toBe('/extended')
    expect(metadata.openGraph).toMatchObject({
      title: 'Cody Maness | Extended Work History',
      url: 'https://codymaness.com/extended',
    })
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: 'Cody Maness | Extended Work History',
    })
  })
})
