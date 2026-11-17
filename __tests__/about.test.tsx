import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import About from '@/components/sections/about'
import {
  mediaLinks,
  personalInterests,
  skillGroups,
  techInterests,
} from '@/data/about'

describe('About component', () => {
  it('defaults to the professional view with core mission, tech interests, and technical skills', () => {
    render(<About />)

    expect(
      screen.getByRole('heading', { level: 2, name: /about me/i })
    ).toBeInTheDocument()

    const profButton = screen.getByRole('button', { name: 'Professional' })
    const personalButton = screen.getByRole('button', { name: 'Personal' })
    expect(profButton).toHaveAttribute('aria-pressed', 'true')
    expect(personalButton).toHaveAttribute('aria-pressed', 'false')

    expect(
      screen.getByText(
        /building accessible, scalable web and mobile applications/i
      )
    ).toBeInTheDocument()

    techInterests.forEach((interest) => {
      expect(screen.getByText(interest.name)).toBeInTheDocument()
    })

    expect(
      screen.getByRole('heading', { level: 3, name: /technical skills/i })
    ).toBeInTheDocument()

    skillGroups.forEach((group) => {
      expect(
        screen.getByRole('heading', { level: 4, name: group.category })
      ).toBeInTheDocument()
      group.skills.forEach((skill) => {
        expect(screen.getByText(skill)).toBeInTheDocument()
      })
    })
  })

  it('flips to the personal view to show story, personal interests, and cultural shelf links', () => {
    render(<About />)

    fireEvent.click(screen.getByRole('button', { name: 'Personal' }))

    expect(screen.getByRole('button', { name: 'Personal' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(
      screen.getByRole('button', { name: 'Professional' })
    ).toHaveAttribute('aria-pressed', 'false')

    expect(
      screen.getByRole('heading', { level: 3, name: /how i got into tech/i })
    ).toBeInTheDocument()

    personalInterests.forEach((interest) => {
      expect(screen.getByText(interest.name)).toBeInTheDocument()
    })

    mediaLinks.forEach((media) => {
      const link = screen.getByRole('link', {
        name: new RegExp(media.name, 'i'),
      })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', media.url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    // Flip back to professional using the header flip button
    fireEvent.click(
      screen.getByRole('button', { name: /flip to professional side/i })
    )
    expect(
      screen.getByRole('button', { name: 'Professional' })
    ).toHaveAttribute('aria-pressed', 'true')
  })
})
