import { GET as getEducation } from '@/app/api/education/route'
import { GET as getProjects } from '@/app/api/projects/route'
import { certs } from '@/data/education-certs'
import { degrees } from '@/data/education-degrees'
import projects from '@/data/projects'

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

  it('returns projects array payload', async () => {
    const response = getProjects()
    const payload = (await response.json()) as typeof projects

    expect(response.status).toBe(200)
    expect(payload).toEqual(projects)
  })
})
