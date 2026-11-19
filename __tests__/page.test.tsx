import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { degrees } from '@/data/education-degrees'
import { roles } from '@/data/experience'
import projects from '@/data/projects'

describe('Home', () => {
  it('renders a main landmark with server-provided portfolio content and zero client fetch calls', () => {
    render(<Home />)

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument()
    expect(screen.getByText('Raleigh, NC')).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { level: 2, name: /education/i })
    ).toBeInTheDocument()

    const firstRole = roles[0]
    const firstDegree = degrees[0]
    const firstProject = projects[0]
    expect(firstRole).toBeDefined()
    expect(firstDegree).toBeDefined()
    expect(firstProject).toBeDefined()
    if (!firstRole || !firstDegree || !firstProject) return

    expect(
      screen.getByRole('heading', { level: 3, name: firstRole.title })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: firstDegree.title })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: firstProject.title })
    ).toBeInTheDocument()
    expect(global.fetch).not.toHaveBeenCalled()
  })
})
