import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Creds from '@/components/credentials/creds'
import { EducationData, IconType } from '@/types/education'

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
          awards: ["Dean's List"],
          courses: [],
        },
      ],
      certs: [
        {
          name: 'Mock Certified Developer',
          org: 'Mocking Inc.',
          icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          iconType: IconType.Logo,
        },
      ],
    }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEducationData),
      })
    ) as jest.Mock

    render(<Creds />)

    // Wait for the component to render the mocked data
    const degreeElement = await screen.findByText(/University of Mocking/i)
    const certElement = await screen.findByText(/Mock Certified Developer/i)

    expect(degreeElement).toBeInTheDocument()
    expect(certElement).toBeInTheDocument()

    // Degree card should be keyboard-activatable and open the degree modal
    const degreeCard = screen.getByRole('button', {
      name: /View coursework for Bachelor of Science in Computer Science/i,
    })
    fireEvent.keyDown(degreeCard, { key: 'Enter' })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders an error message and supports retry when fetch fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    try {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: () => Promise.resolve({}),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ degrees: [], certs: [] }),
        })

      render(<Creds />)

      const alert = await screen.findByRole('alert')
      expect(alert).toHaveTextContent(/Failed to load education data/i)

      fireEvent.click(screen.getByRole('button', { name: /retry/i }))
      expect(
        await screen.findByRole('heading', { name: /education/i })
      ).toBeInTheDocument()
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    } finally {
      consoleSpy.mockRestore()
    }
  })

  it('shows an error alert when API returns malformed payload', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    try {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ unexpected: true }),
        })
      ) as jest.Mock

      render(<Creds />)

      const alert = await screen.findByRole('alert')
      expect(alert).toHaveTextContent(/Failed to load education data/i)
    } finally {
      consoleSpy.mockRestore()
    }
  })

  it('aborts in-flight fetch on unmount', () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort')
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock

    const { unmount } = render(<Creds />)
    unmount()

    expect(abortSpy).toHaveBeenCalledTimes(1)
    abortSpy.mockRestore()
  })
})
