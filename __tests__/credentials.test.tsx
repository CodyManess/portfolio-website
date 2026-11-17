import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Credentials from '@/components/sections/credentials/credentials'
import type { EducationData } from '@/types/education'
import { IconType } from '@/types/education'
import mtsucampus from '@public/credentials/mtsucampus.webp'

describe('Credentials', () => {
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
          date: 'Aug 2017 - May 2021',
          schoolLink: 'https://www.mock.edu',
          photo: mtsucampus,
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
          description: 'Mock certification overview.',
          skills: ['Cloud Testing'],
        },
      ],
    }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEducationData),
      })
    ) as jest.Mock

    render(<Credentials />)

    // Wait for the component to render the mocked data
    const degreeElement = await screen.findByText(/University of Mocking/i)
    const certElement = await screen.findByText(/Mock Certified Developer/i)

    expect(degreeElement).toBeInTheDocument()
    expect(screen.getByText('Aug 2017 - May 2021')).toBeInTheDocument()
    expect(certElement).toBeInTheDocument()

    // Degree card should be keyboard-activatable and open the degree modal
    const degreeCard = screen.getByRole('button', {
      name: /View coursework for Bachelor of Science in Computer Science/i,
    })
    fireEvent.keyDown(degreeCard, { key: 'Enter' })
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Close degree modal
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Cert badge should be clickable and open the certification modal
    const certButton = screen.getByRole('button', {
      name: /View details for Mock Certified Developer from Mocking Inc\./i,
    })
    fireEvent.click(certButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Mock certification overview.')).toBeInTheDocument()
    expect(screen.getByText('Cloud Testing')).toBeInTheDocument()
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

      render(<Credentials />)

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

      render(<Credentials />)

      const alert = await screen.findByRole('alert')
      expect(alert).toHaveTextContent(/Failed to load education data/i)
    } finally {
      consoleSpy.mockRestore()
    }
  })

  it('aborts in-flight fetch on unmount', () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort')
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock

    const { unmount } = render(<Credentials />)
    unmount()

    expect(abortSpy).toHaveBeenCalledTimes(1)
    abortSpy.mockRestore()
  })
})
