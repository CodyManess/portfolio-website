import { fireEvent, render, screen } from '@testing-library/react'
import About from '@/components/sections/about'
import Experience from '@/components/sections/experience'
import Projects from '@/components/sections/projects/projects'
import { PortfolioLinkProvider } from '@/components/shared/portfolio-link-context'
import { roles, extendedRoles } from '@/data/experience'
import projects from '@/data/projects'
import {
  enrichProjectsWithRoles,
  enrichRolesWithProjects,
} from '@/data/cross-links'

describe('Experience & Projects cross-linking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const enrichedRoles = enrichRolesWithProjects(roles, projects)
    const enrichedProjects = enrichProjectsWithRoles(projects, roles)

    global.fetch = jest.fn((input: string | URL | Request) => {
      const url =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.href
            : input.url

      if (url.includes('/api/experience')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              roles: enrichedRoles,
              extendedRoles,
            }),
        })
      }

      if (url.includes('/api/projects')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(enrichedProjects),
        })
      }

      return Promise.reject(new Error(`Unexpected fetch: ${url}`))
    }) as jest.Mock
  })

  it('navigates from a role project pill to the project modal (clearing incompatible filters and paginating) and back to the role', async () => {
    render(
      <PortfolioLinkProvider>
        <Experience />
        <Projects />
      </PortfolioLinkProvider>
    )

    // Wait for both Experience and Projects fetches to resolve
    const advisorButton = await screen.findByRole('button', {
      name: /Software Engineering Advisor/i,
    })
    expect(advisorButton).toHaveAttribute('aria-expanded', 'true')
    const angularFilter = await screen.findByRole('button', {
      name: /Angular \d+/i,
    })

    // Filter projects by Angular (which excludes MTF Portal, a React-only project on page 2)
    fireEvent.click(angularFilter)
    expect(angularFilter).toHaveAttribute('aria-pressed', 'true')

    // Expand Express Scripts Front-end Intern role and click MTF Portal
    const internButton = screen.getByRole('button', {
      name: /Front-end Intern/i,
    })
    expect(internButton).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(internButton)

    const mtfProjectPill = screen.getByRole('button', {
      name: /View Military Treatment Facility \(MTF\) Portal in Projects section/i,
    })
    fireEvent.click(mtfProjectPill)

    // Incompatible Angular filter should be cleared and MTF Portal modal should open
    expect(angularFilter).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Military Treatment Facility \(MTF\) Portal/i,
      })
    ).toBeInTheDocument()

    // Collapse the intern role first so we can verify navigating back re-expands it
    fireEvent.click(internButton)
    expect(internButton).toHaveAttribute('aria-expanded', 'false')

    // Click the associated role link inside the ProjectModal
    const modalRoleButton = screen.getByRole('button', {
      name: /View Front-end Intern at Express Scripts in Experience section/i,
    })
    fireEvent.click(modalRoleButton)

    // Modal should close and the Front-end Intern role should expand
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(internButton).toHaveAttribute('aria-expanded', 'true')
    expect(advisorButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('filters Projects when clicking a tool-linked skill pill in About', async () => {
    render(
      <PortfolioLinkProvider>
        <About />
        <Projects />
      </PortfolioLinkProvider>
    )

    // Wait for Projects fetch to resolve
    const springBootFilter = await screen.findByRole('button', {
      name: /Spring Boot \d+/i,
    })
    expect(springBootFilter).toHaveAttribute('aria-pressed', 'false')

    // Click Spring Boot in About Technical Skills
    fireEvent.click(
      screen.getByRole('button', { name: 'Filter projects by Spring Boot' })
    )

    // Projects filter should activate Spring Boot and display Keystone
    expect(springBootFilter).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByText('Keystone Adult Daycare Donation Database')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Digital Platform Library')
    ).not.toBeInTheDocument()

    // Also verify aliased About labels like "Swift / SwiftUI" filter by "Swift"
    fireEvent.click(
      screen.getByRole('button', { name: 'Filter projects by Swift' })
    )
    const swiftFilter = screen.getByRole('button', { name: /Swift \d+/i })
    expect(swiftFilter).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('myCigna Mobile App')).toBeInTheDocument()
    expect(
      screen.queryByText('Keystone Adult Daycare Donation Database')
    ).not.toBeInTheDocument()
  })
})
