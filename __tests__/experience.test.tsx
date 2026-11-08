import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Experience from '@/components/experience/experience'
import WorkTimeline from '@/components/shared/work-timeline/work-timeline'
import { roles, extendedRoles } from '@/data/experience'

describe('Experience section & WorkTimeline', () => {
  it('renders the Experience heading and Extended Job History link', () => {
    render(<Experience />)

    expect(
      screen.getByRole('heading', { level: 2, name: /experience/i })
    ).toBeInTheDocument()

    const extendedLink = screen.getByRole('link', {
      name: /extended job history/i,
    })
    expect(extendedLink).toBeInTheDocument()
    expect(extendedLink).toHaveAttribute('href', '/extended')
  })

  it('renders all primary experience roles and expands/collapses accordion items', () => {
    render(<Experience />)

    roles.forEach((role) => {
      expect(
        screen.getByRole('heading', { level: 3, name: role.title })
      ).toBeInTheDocument()
    })

    const firstRoleButton = screen.getByRole('button', {
      name: new RegExp(roles[0].title, 'i'),
    })
    expect(firstRoleButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(firstRoleButton)
    expect(firstRoleButton).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(firstRoleButton)
    expect(firstRoleButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders extended roles including roles without company logos', () => {
    render(<WorkTimeline roles={extendedRoles} />)

    extendedRoles.forEach((role) => {
      expect(
        screen.getByRole('heading', { level: 3, name: role.title })
      ).toBeInTheDocument()
    })
  })
})
