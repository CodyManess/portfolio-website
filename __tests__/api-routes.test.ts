import { GET as getEducation } from '@/app/api/education/route'
import { GET as getExperience } from '@/app/api/experience/route'
import { GET as getProjects } from '@/app/api/projects/route'
import { certs } from '@/data/education-certs'
import { degrees } from '@/data/education-degrees'
import { roles, extendedRoles } from '@/data/experience'
import projects from '@/data/projects'
import {
  enrichProjectsWithRoles,
  enrichRolesWithProjects,
  roleProjectRelations,
} from '@/data/cross-links'

jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown) => ({
      status: 200,
      json: () => Promise.resolve(body),
    }),
  },
}))

describe('Static API Route Handlers', () => {
  it('returns education certs and degrees payload', async () => {
    const response = getEducation()
    const payload = (await response.json()) as {
      certs: typeof certs
      degrees: typeof degrees
    }

    expect(response.status).toBe(200)
    expect(payload.certs).toEqual(certs)
    expect(payload.degrees).toEqual(degrees)
  })

  it('returns experience roles and extendedRoles payload', async () => {
    const response = getExperience()
    const payload = (await response.json()) as {
      roles: ReturnType<typeof enrichRolesWithProjects>
      extendedRoles: typeof extendedRoles
    }

    expect(response.status).toBe(200)
    expect(payload.roles).toEqual(enrichRolesWithProjects(roles, projects))
    expect(payload.extendedRoles).toEqual(extendedRoles)
  })

  it('returns projects array payload', async () => {
    const response = getProjects()
    const payload = (await response.json()) as ReturnType<
      typeof enrichProjectsWithRoles
    >

    expect(response.status).toBe(200)
    expect(payload).toEqual(enrichProjectsWithRoles(projects, roles))
  })

  it('maintains valid bidirectional cross-link references between roles and projects', () => {
    const roleIds = new Set(roles.map((role) => role.id).filter(Boolean))
    const projectIds = new Set(
      projects.map((project) => project.id).filter(Boolean)
    )

    for (const relation of roleProjectRelations) {
      expect(roleIds.has(relation.roleId)).toBe(true)
      for (const projectId of relation.projectIds) {
        expect(projectIds.has(projectId)).toBe(true)
      }
    }
  })
})
