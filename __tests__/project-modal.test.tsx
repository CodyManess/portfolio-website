import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectModal from '@/components/sections/projects/project-modal'
import type { Project } from '@/types/project'

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

  it('renders associated roles and triggers navigation callback on click', () => {
    const handleClose = jest.fn()
    const onSelectRole = jest.fn()
    const projectWithRoles: Project = {
      ...mockProjectWithoutLinkOrAchievements,
      relatedRoles: [
        {
          id: 'cigna-software-engineering-advisor',
          title: 'Software Engineering Advisor',
          companyName: 'The Cigna Group',
          date: 'Mar 2024 - Present',
        },
      ],
    }

    render(
      <ProjectModal
        project={projectWithRoles}
        open={true}
        handleClose={handleClose}
        onSelectRole={onSelectRole}
      />
    )

    expect(screen.getByText('Associated Role')).toBeInTheDocument()
    const roleButton = screen.getByRole('button', {
      name: /View Software Engineering Advisor at The Cigna Group in Experience section/i,
    })
    fireEvent.click(roleButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
    expect(onSelectRole).toHaveBeenCalledWith(
      'cigna-software-engineering-advisor'
    )
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

  it('renders a single project photo with caption and omits gallery controls', () => {
    const projectWithSinglePhoto: Project = {
      ...mockProjectWithoutLinkOrAchievements,
      photos: [
        {
          src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          alt: 'Component documentation view',
          caption: 'Interactive button tokens preview',
        },
      ],
    }

    render(
      <ProjectModal
        project={projectWithSinglePhoto}
        open={true}
        handleClose={jest.fn()}
      />
    )

    expect(screen.getByText('Project Showcase')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Component documentation view' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Interactive button tokens preview')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Next photo/i })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Previous photo/i })
    ).not.toBeInTheDocument()
  })

  it('supports navigating multiple project photos via next, previous, and thumbnails', () => {
    const projectWithGallery: Project = {
      ...mockProjectWithAchievements,
      photos: [
        {
          src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          alt: 'Dashboard overview',
          caption: 'Main dashboard view',
        },
        {
          src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          alt: 'Job board screen',
          caption: 'Internal job listings page',
        },
      ],
    }

    render(
      <ProjectModal
        project={projectWithGallery}
        open={true}
        handleClose={jest.fn()}
      />
    )

    expect(screen.getByText('1 / 2')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Dashboard overview' })
    ).toBeInTheDocument()
    expect(screen.getByText('Main dashboard view')).toBeInTheDocument()

    // Click Next photo
    fireEvent.click(screen.getByRole('button', { name: /Next photo/i }))
    expect(screen.getByText('2 / 2')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Job board screen' })
    ).toBeInTheDocument()
    expect(screen.getByText('Internal job listings page')).toBeInTheDocument()

    // Click Next again to wrap around to first photo
    fireEvent.click(screen.getByRole('button', { name: /Next photo/i }))
    expect(screen.getByText('1 / 2')).toBeInTheDocument()

    // Click Previous to wrap to last photo
    fireEvent.click(screen.getByRole('button', { name: /Previous photo/i }))
    expect(screen.getByText('2 / 2')).toBeInTheDocument()

    // Select first thumbnail directly
    const firstThumb = screen.getByRole('button', {
      name: /View photo 1: Dashboard overview/i,
    })
    fireEvent.click(firstThumb)
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
    expect(firstThumb).toHaveAttribute('aria-pressed', 'true')

    // Arrow key navigation moves forward and backward through the gallery
    fireEvent.keyDown(firstThumb, { key: 'ArrowRight' })
    expect(screen.getByText('2 / 2')).toBeInTheDocument()
    fireEvent.keyDown(firstThumb, { key: 'ArrowLeft' })
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
  })
})
