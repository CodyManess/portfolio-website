// app/__tests__/page.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home', () => {
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
