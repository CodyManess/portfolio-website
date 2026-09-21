import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import About from '@/components/about/about'
import { techInterests, personalInterests, mediaLinks } from '@/data/about'

describe('About component', () => {
  it('renders section heading and story heading', () => {
    render(<About />)

    expect(
      screen.getByRole('heading', { level: 2, name: /about me/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { level: 3, name: /how i got into tech/i })
    ).toBeInTheDocument()
  })

  it('renders core mission statement', () => {
    render(<About />)

    expect(
      screen.getByText(
        /building accessible, scalable web and mobile applications/i
      )
    ).toBeInTheDocument()
  })

  it('renders tech interests and personal interests', () => {
    render(<About />)

    techInterests.forEach((interest) => {
      expect(screen.getByText(interest.name)).toBeInTheDocument()
    })

    personalInterests.forEach((interest) => {
      expect(screen.getByText(interest.name)).toBeInTheDocument()
    })
  })

  it('renders external media links with safe target and rel attributes', () => {
    render(<About />)

    mediaLinks.forEach((media) => {
      const link = screen.getByRole('link', {
        name: new RegExp(media.name, 'i'),
      })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', media.url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
