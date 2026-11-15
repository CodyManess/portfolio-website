import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectModal from '@/components/projects/project-modal'
import type Project from '@/types/project'

describe('ProjectModal', () => {
  const mockProjectWithAchievements: Project = {
    title: 'TECDPortal',
    description: 'First paragraph.\n\nSecond paragraph.',
    link: 'https://example.com/tecdportal',
    achievements: [
      'Cleaned up over 2,000 lines of code.',
      'Led migration of the Job Board page.',
    ],
    tools: [
      {
        title: 'Angular',
        iconName: 'SiAngular',
        iconColor: '#DD0031',
      },
    ],
  }

  const mockProjectWithoutLinkOrAchievements: Project = {
    title: 'Leaf Design System',
    description: 'Component library design.',
    achievements: [],
    tools: [
      {
        title: 'React',
        iconName: 'SiReact',
        iconColor: '#61DAFB',
      },
    ],
  }

  it('renders project title, description, link, tools, and achievements', () => {
    render(
      <ProjectModal
        project={mockProjectWithAchievements}
        open={true}
        handleClose={jest.fn()}
      />
    )

    expect(screen.getByText('TECDPortal')).toBeInTheDocument()
    expect(screen.getByText(/First paragraph/i)).toBeInTheDocument()
    expect(screen.getByText(/Second paragraph/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Visit Project/i })
    ).toHaveAttribute('href', 'https://example.com/tecdportal')
    expect(screen.getByText('Angular')).toBeInTheDocument()
    expect(
      screen.getByText('Cleaned up over 2,000 lines of code.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Led migration of the Job Board page.')
    ).toBeInTheDocument()
  })

  it('does not render link or achievements section when they are empty', () => {
    render(
      <ProjectModal
        project={mockProjectWithoutLinkOrAchievements}
        open={true}
        handleClose={jest.fn()}
      />
    )

    expect(screen.getByText('Leaf Design System')).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /Visit Project/i })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/Key Contributions & Achievements/i)
    ).not.toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('1 Technology')).toBeInTheDocument()
  })

  it('omits Technologies Used section when tools array is empty and closes on Escape', () => {
    const handleClose = jest.fn()
    const emptyToolsProject: Project = {
      title: 'Minimal Project',
      description: 'Short overview.',
      achievements: [],
      tools: [],
    }

    render(
      <ProjectModal
        project={emptyToolsProject}
        open={true}
        handleClose={handleClose}
      />
    )

    expect(screen.queryByText(/Technologies Used/i)).not.toBeInTheDocument()
    expect(screen.getByText('0 Technologies')).toBeInTheDocument()

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls handleClose when close button is clicked', () => {
    const handleClose = jest.fn()
    render(
      <ProjectModal
        project={mockProjectWithAchievements}
        open={true}
        handleClose={handleClose}
      />
    )

    const closeButton = screen.getAllByRole('button', { name: /close/i })[0]
    expect(closeButton).toBeInTheDocument()
    if (!closeButton) return
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
