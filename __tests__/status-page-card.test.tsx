import { render, screen } from '@testing-library/react'
import Link from 'next/link'
import StatusPageCard from '@/components/shared/status-page-card'

describe('StatusPageCard', () => {
  it('renders optional eyebrow, title, description, and actions inside main', () => {
    render(
      <StatusPageCard
        eyebrow="404"
        title="Page Not Found"
        description="The requested page could not be found."
        actions={<Link href="/">Return Home</Link>}
      />
    )

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Page Not Found' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('The requested page could not be found.')
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Return Home' })).toHaveAttribute(
      'href',
      '/'
    )
  })
})
