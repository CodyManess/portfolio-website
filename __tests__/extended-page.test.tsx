import { render, screen } from '@testing-library/react'
import ExtendedPage, { metadata } from '@/app/extended/page'
import { extendedRoles } from '@/data/experience'

describe('Extended Work History Page', () => {
  it('renders a main landmark, heading hierarchy, back link, and all extended roles without client fetch calls', () => {
    render(<ExtendedPage />)

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: /extended job history/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /past roles/i })
    ).toBeInTheDocument()

    const backLink = screen.getByRole('link', { name: /back to portfolio/i })
    expect(backLink).toHaveAttribute('href', '/#experience')

    extendedRoles.forEach((role) => {
      expect(
        screen.getByRole('heading', { level: 3, name: role.title })
      ).toBeInTheDocument()
    })
    expect(global.fetch).not.toHaveBeenCalled()
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
