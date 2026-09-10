import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn((url: string | URL | Request) => {
      const urlStr = url.toString()
      if (urlStr.includes('/api/education')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              degrees: [],
              certs: [],
            }),
        })
      }
      if (urlStr.includes('/api/projects')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    }) as jest.Mock
  })

  it('renders a main landmark and waits for async components', async () => {
    render(<Home />)

    const main = await screen.findByRole('main')
    expect(main).toBeInTheDocument()

    // Wait for the Creds component to finish loading
    const educationHeading = await screen.findByRole('heading', {
      name: /education/i,
    })
    expect(educationHeading).toBeInTheDocument()
  })
})
