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

    const resumeLink = screen.getByRole('link', {
      name: /printable resume/i,
    })
    expect(resumeLink).toBeInTheDocument()
    expect(resumeLink).toHaveAttribute('href', '/resume')

    const firstRole = roles[0]
    expect(firstRole).toBeDefined()
    if (!firstRole) return
    expect(
      await screen.findByRole('heading', { level: 3, name: firstRole.title })
    ).toBeInTheDocument()
  })

  it('default-expands the latest primary role, toggles roles independently, and supports Expand All / Collapse All', async () => {
    render(<Experience />)

    const firstRole = roles[0]
    const secondRole = roles[1]
    expect(firstRole).toBeDefined()
    expect(secondRole).toBeDefined()
    if (!firstRole || !secondRole) return

    expect(
      await screen.findByRole('heading', { level: 3, name: firstRole.title })
    ).toBeInTheDocument()

    roles.forEach((role) => {
      expect(
        screen.getByRole('heading', { level: 3, name: role.title })
      ).toBeInTheDocument()
    })

    // Latest role starts expanded; older roles start collapsed
    const firstRoleButton = screen.getByRole('button', {
      name: new RegExp(firstRole.title, 'i'),
    })
    const secondRoleButton = screen.getByRole('button', {
      name: new RegExp(secondRole.title, 'i'),
    })
    expect(firstRoleButton).toHaveAttribute('aria-expanded', 'true')
    expect(secondRoleButton).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.getByText(`1 of ${roles.length} roles expanded`)
    ).toBeInTheDocument()

    // Expanding a second role keeps the first expanded
    fireEvent.click(secondRoleButton)
    expect(firstRoleButton).toHaveAttribute('aria-expanded', 'true')
    expect(secondRoleButton).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByText(`2 of ${roles.length} roles expanded`)
    ).toBeInTheDocument()

    // Expand All opens every role and toggles button to Collapse All
    fireEvent.click(screen.getByRole('button', { name: /expand all/i }))
    for (const role of roles) {
      const btn = screen.getByRole('button', {
        name: new RegExp(role.title, 'i'),
      })
      expect(btn).toHaveAttribute('aria-expanded', 'true')
    }
    expect(
      screen.getByText(`${roles.length} of ${roles.length} roles expanded`)
    ).toBeInTheDocument()

    // Collapse All closes every role
    fireEvent.click(screen.getByRole('button', { name: /collapse all/i }))
    for (const role of roles) {
      const btn = screen.getByRole('button', {
        name: new RegExp(role.title, 'i'),
      })
      expect(btn).toHaveAttribute('aria-expanded', 'false')
    }
  })

  it('renders employmentType and location metadata when provided', async () => {
    render(<Experience />)

    expect(await screen.findByText('Internship')).toBeInTheDocument()
    expect(screen.getByText('Murfreesboro, TN')).toBeInTheDocument()
    expect(screen.getByText('Nashville, TN')).toBeInTheDocument()
    expect(screen.getAllByText('Remote')).toHaveLength(3)
  })

  it('renders related project pills inside an expanded role when provided', () => {
    const onSelectProject = jest.fn()
    const firstRole = roles[0]
    expect(firstRole).toBeDefined()
    if (!firstRole) return

    const rolesWithLinks = [
      {
        ...firstRole,
        relatedProjects: [
          { id: 'digital-platform-library', title: 'Digital Platform Library' },
        ],
      },
    ]

    render(<WorkTimeline roles={rolesWithLinks} />)

    const firstRoleButton = screen.getByRole('button', {
      name: new RegExp(firstRole.title, 'i'),
    })
    fireEvent.click(firstRoleButton)

    expect(screen.getByText('Related Projects')).toBeInTheDocument()
    const projectButton = screen.getByRole('button', {
      name: /View Digital Platform Library in Projects section/i,
    })
    expect(projectButton).toBeInTheDocument()
    expect(onSelectProject).not.toHaveBeenCalled()
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
