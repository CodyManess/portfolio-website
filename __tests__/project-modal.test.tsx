import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectModal from '@/components/projects/project-modal'
import Project from '@/types/project'

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

    const closeButtons = screen.getAllByRole('button', { name: /close/i })
    expect(closeButtons.length).toBeGreaterThanOrEqual(1)
    fireEvent.click(closeButtons[0])

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
