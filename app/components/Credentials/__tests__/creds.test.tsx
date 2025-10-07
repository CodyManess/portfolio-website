// app/components/Credentials/__tests__/creds.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Creds from '../creds'
import { EducationData } from '@/shared/models/education'

describe('Creds', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders education data after successful fetch', async () => {
    const mockEducationData: EducationData = {
      degrees: [
        {
          schoolName: 'University of Mocking',
          title: 'Bachelor of Science in Computer Science',
          subtitle: 'Concentration in Software Engineering',
          schoolLink: 'https://www.mock.edu',
          startYear: '2018',
          endYear: '2022',
          awards: ['Dean\'s List'],
          courses: [],
        },
      ],
      certs: [
        {
          name: 'Mock Certified Developer',
          org: 'Mocking Inc.',
          icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          iconType: 'Fa',
        },
      ],
    }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEducationData),
      })
    )

    render(<Creds />)

    // Wait for the component to render the mocked data
    const degreeElement = await screen.findByText(/University of Mocking/i)
    const certElement = await screen.findByText(/Mock Certified Developer/i)

    expect(degreeElement).toBeInTheDocument()
    expect(certElement).toBeInTheDocument()
  })

  it('renders an error message when fetch fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      })
    )

    render(<Creds />)

    const errorMessage = await screen.findByText(/Failed to load education data/i)
    expect(errorMessage).toBeInTheDocument()
  })
})
