import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Experience from '@/components/sections/experience'
import WorkTimeline from '@/components/shared/work-timeline/work-timeline'
import { roles, extendedRoles } from '@/data/experience'

describe('Experience section & WorkTimeline', () => {
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

  it('renders the Experience heading and Extended Job History link', async () => {
    render(<Experience />)

    expect(
      screen.getByRole('heading', { level: 2, name: /experience/i })
    ).toBeInTheDocument()

    const extendedLink = screen.getByRole('link', {
      name: /extended job history/i,
    })
    expect(extendedLink).toBeInTheDocument()
    expect(extendedLink).toHaveAttribute('href', '/extended')

    const firstRole = roles[0]
    expect(firstRole).toBeDefined()
    if (!firstRole) return
    expect(
      await screen.findByRole('heading', { level: 3, name: firstRole.title })
    ).toBeInTheDocument()
  })

  it('renders all primary experience roles and expands/collapses accordion items', async () => {
    render(<Experience />)

    const firstRole = roles[0]
    expect(firstRole).toBeDefined()
    if (!firstRole) return

    expect(
      await screen.findByRole('heading', { level: 3, name: firstRole.title })
    ).toBeInTheDocument()

    roles.forEach((role) => {
      expect(
        screen.getByRole('heading', { level: 3, name: role.title })
      ).toBeInTheDocument()
    })

    const firstRoleButton = screen.getByRole('button', {
      name: new RegExp(firstRole.title, 'i'),
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

  it('shows an error alert and supports retry when fetch fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    try {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: () => Promise.resolve({}),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ roles, extendedRoles }),
        })

      render(<Experience />)

      const alert = await screen.findByRole('alert')
      expect(alert).toHaveTextContent(/Failed to load experience data/i)

      fireEvent.click(screen.getByRole('button', { name: /retry/i }))

      const firstRole = roles[0]
      expect(firstRole).toBeDefined()
      if (!firstRole) return
      expect(
        await screen.findByRole('heading', { level: 3, name: firstRole.title })
      ).toBeInTheDocument()
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    } finally {
      consoleSpy.mockRestore()
    }
  })

  it('shows an error alert when API returns malformed payload', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    try {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ unexpected: true }),
        })
      ) as jest.Mock

      render(<Experience />)

      const alert = await screen.findByRole('alert')
      expect(alert).toHaveTextContent(/Failed to load experience data/i)
    } finally {
      consoleSpy.mockRestore()
    }
  })
})
