import { render, screen } from '@testing-library/react'
import {
  Overline,
  PageSection,
  SectionHeading,
} from '@/components/shared/page-section'

describe('PageSection helpers', () => {
  it('renders default and brand PageSection tones with landmark heading', () => {
    render(
      <>
        <PageSection id="default-sec">
          <SectionHeading>Default Title</SectionHeading>
        </PageSection>
        <PageSection id="brand-sec" tone="brand">
          <SectionHeading as="h1">Brand Title</SectionHeading>
        </PageSection>
      </>
    )

    const defaultHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Default Title',
    })
    const brandHeading = screen.getByRole('heading', {
      level: 1,
      name: 'Brand Title',
    })

    expect(defaultHeading).toBeInTheDocument()
    expect(brandHeading).toBeInTheDocument()
  })

  it('renders Overline with the requested semantic element', () => {
    render(<Overline as="p">Summary Label</Overline>)

    expect(screen.getByText('Summary Label')).toHaveClass(
      'uppercase',
      'tracking-wider'
    )
  })
})
