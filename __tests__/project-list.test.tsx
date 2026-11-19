import { render, screen, fireEvent } from '@testing-library/react'
import ProjectList from '@/components/sections/projects/project-list'
import type { Project } from '@/types/project'

describe('ProjectList with TechnologyFilter', () => {
  const mockProjects: Project[] = [
    {
      title: 'React Project',
      description: 'A project built with React.',
      achievements: [],
      tools: [{ title: 'React', iconName: 'SiReact', iconColor: '#61DBFB' }],
    },
    {
      title: 'Angular Project',
      description: 'A project built with Angular.',
      achievements: [],
      tools: [
        { title: 'Angular', iconName: 'SiAngular', iconColor: '#ff0000' },
      ],
    },
    {
      title: 'Full Stack Project',
      description: 'A project built with React and Kotlin.',
      achievements: [],
      tools: [
        { title: 'React', iconName: 'SiReact', iconColor: '#61DBFB' },
        { title: 'Kotlin', iconName: 'SiKotlin', iconColor: '#0095D5' },
      ],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProjects),
      })
    ) as jest.Mock
  })

  it('renders all projects and technology filter chips', async () => {
    render(<ProjectList />)

    // Wait for projects to load
    expect(await screen.findByText('React Project')).toBeInTheDocument()
    expect(screen.getByText('Angular Project')).toBeInTheDocument()
    expect(screen.getByText('Full Stack Project')).toBeInTheDocument()

    // Filter chips should be present with counts
    expect(screen.getByRole('button', { name: /All 3/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /React 2/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Angular 1/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Kotlin 1/i })
    ).toBeInTheDocument()
  })

  it('filters projects when a technology chip is clicked', async () => {
    render(<ProjectList />)

    expect(await screen.findByText('React Project')).toBeInTheDocument()

    // Click on Angular filter
    const angularChip = screen.getByRole('button', { name: /Angular 1/i })
    fireEvent.click(angularChip)

    // Only Angular project should be displayed
    expect(screen.getByText('Angular Project')).toBeInTheDocument()
    expect(screen.queryByText('React Project')).not.toBeInTheDocument()
    expect(screen.queryByText('Full Stack Project')).not.toBeInTheDocument()

    // Click "All" to reset filter
    const allChip = screen.getByRole('button', { name: /All 3/i })
    fireEvent.click(allChip)

    expect(screen.getByText('React Project')).toBeInTheDocument()
    expect(screen.getByText('Angular Project')).toBeInTheDocument()
    expect(screen.getByText('Full Stack Project')).toBeInTheDocument()
  })

  it('toggles filter off when the same technology chip is clicked again', async () => {
    render(<ProjectList />)

    expect(await screen.findByText('React Project')).toBeInTheDocument()

    // Click React filter
    const reactChip = screen.getByRole('button', { name: /React 2/i })
    fireEvent.click(reactChip)

    expect(screen.getByText('React Project')).toBeInTheDocument()
    expect(screen.getByText('Full Stack Project')).toBeInTheDocument()
    expect(screen.queryByText('Angular Project')).not.toBeInTheDocument()

    // Click React filter again to deselect
    fireEvent.click(reactChip)

    expect(screen.getByText('React Project')).toBeInTheDocument()
    expect(screen.getByText('Angular Project')).toBeInTheDocument()
    expect(screen.getByText('Full Stack Project')).toBeInTheDocument()
  })

  it('shows an error alert and supports retry when fetch fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    try {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: () => Promise.resolve([]),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockProjects),
        })

      render(<ProjectList />)

      const alert = await screen.findByRole('alert')
      expect(alert).toHaveTextContent(/Failed to load project data/i)

      fireEvent.click(screen.getByRole('button', { name: /retry/i }))
      expect(await screen.findByText('React Project')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    } finally {
      consoleSpy.mockRestore()
    }
  })

  it('shows an error alert when API returns a non-array payload', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    try {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ invalid: true }),
        })
      ) as jest.Mock

      render(<ProjectList />)

      const alert = await screen.findByRole('alert')
      expect(alert).toHaveTextContent(/Failed to load project data/i)
    } finally {
      consoleSpy.mockRestore()
    }
  })

  it('aborts in-flight fetch on unmount', () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort')
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock

    const { unmount } = render(<ProjectList />)
    unmount()

    expect(abortSpy).toHaveBeenCalledTimes(1)
    abortSpy.mockRestore()
  })
})
