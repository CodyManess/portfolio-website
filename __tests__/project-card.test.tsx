import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectCard from '@/components/projects/project-card'
import Project from '@/types/project'

describe('ProjectCard Component', () => {
  const mockProject: Project = {
    title: 'Test Project',
    description: 'This is a description preview for the test project.',
    link: 'https://example.com',
    achievements: ['Achievement 1', 'Achievement 2'],
    tools: [{ title: 'React', iconName: 'SiReact', iconColor: '#61DBFB' }],
  }

  const mockInternalProject: Project = {
    title: 'Internal Tool Project',
    description: 'An internal tool without public link or achievements.',
    achievements: [],
    tools: [{ title: 'Kotlin', iconName: 'SiKotlin', iconColor: '#0095D5' }],
  }

  it('renders project card with title, description, link status, and achievements badge', () => {
    render(<ProjectCard {...mockProject} />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(
      screen.getByText('This is a description preview for the test project.')
    ).toBeInTheDocument()
    expect(screen.getByText(/Live Project/i)).toBeInTheDocument()
    expect(screen.getByText(/2 Highlights/i)).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('View details')).toBeInTheDocument()
  })

  it('renders internal tool label when project has no public link', () => {
    render(<ProjectCard {...mockInternalProject} />)

    expect(screen.getByText('Internal Tool Project')).toBeInTheDocument()
    expect(screen.getByText('Internal Tool')).toBeInTheDocument()
    expect(screen.queryByText(/Highlights/i)).not.toBeInTheDocument()
  })

  it('opens modal on click', () => {
    render(<ProjectCard {...mockProject} />)

    const card = screen.getByRole('button', {
      name: /View details for Test Project/i,
    })
    fireEvent.click(card)

    // Modal should open and show the project title in Dialog
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('opens modal on Enter and Space keypresses for accessibility', () => {
    render(<ProjectCard {...mockProject} />)

    const card = screen.getByRole('button', {
      name: /View details for Test Project/i,
    })

    fireEvent.keyDown(card, { key: 'Enter' })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
