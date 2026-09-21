import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectList from '@/components/projects/project-list'
import Project from '@/types/project'

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
})
