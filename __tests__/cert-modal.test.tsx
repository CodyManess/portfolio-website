import { render, screen, fireEvent } from '@testing-library/react'
import CertModal from '@/components/sections/credentials/cert-modal'
import type { Cert } from '@/types/education'
import { IconType } from '@/types/education'
import awsBadge from '@public/credentials/aws-developer-badge.webp'

describe('CertModal', () => {
  const fullCert: Cert = {
    icon: awsBadge,
    iconType: IconType.Badge,
    name: 'AWS Certified Developer - Associate Badge',
    org: 'Amazon Web Services',
    description:
      'Validates proficiency in cloud application development on AWS.\n\nCovers serverless and CI/CD.',
    skills: ['AWS Lambda', 'DynamoDB'],
    issueDate: 'Jan 2025',
    expirationDate: 'Jan 2028',
    credentialId: 'AWS-DEV-123',
    credentialUrl: 'https://www.credly.com/badges/example',
    programUrl:
      'https://aws.amazon.com/certification/certified-developer-associate/',
  }

  it('renders certification details, metadata, skills, and safe links when open', () => {
    render(<CertModal cert={fullCert} open={true} handleClose={jest.fn()} />)

    expect(screen.getByText('Amazon Web Services')).toBeInTheDocument()
    expect(
      screen.getByText('AWS Certified Developer - Associate Badge')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Validates proficiency in cloud application development/i
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Covers serverless and CI\/CD/i)
    ).toBeInTheDocument()
    expect(screen.getByText('Issued: Jan 2025')).toBeInTheDocument()
    expect(screen.getByText('Expires: Jan 2028')).toBeInTheDocument()
    expect(screen.getByText('ID: AWS-DEV-123')).toBeInTheDocument()
    expect(screen.getByText('AWS Lambda')).toBeInTheDocument()
    expect(screen.getByText('DynamoDB')).toBeInTheDocument()
    expect(screen.getByText('2 Key Skills')).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /Verify Credential/i })
    ).toHaveAttribute('href', 'https://www.credly.com/badges/example')
    expect(
      screen.getByRole('link', { name: /Program Website/i })
    ).toHaveAttribute(
      'href',
      'https://aws.amazon.com/certification/certified-developer-associate/'
    )
  })

  it('renders empty state and omits unsafe URLs or optional metadata when absent', () => {
    const minimalCert: Cert = {
      icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      iconType: IconType.Logo,
      name: 'Minimal Cert',
      org: 'Example Org',
      credentialUrl: 'javascript:alert(1)',
      programUrl: 'ftp://example.com/cert',
    }

    render(<CertModal cert={minimalCert} open={true} handleClose={jest.fn()} />)

    expect(screen.getByText('Minimal Cert')).toBeInTheDocument()
    expect(
      screen.getByText(/no additional certification details available/i)
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /Verify Credential/i })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /Program Website/i })
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/Issued:/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Expires:/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/ID:/i)).not.toBeInTheDocument()
  })

  it('renders singular skill count when one skill is present', () => {
    const singleSkillCert: Cert = {
      icon: awsBadge,
      iconType: IconType.Badge,
      name: 'Single Skill Cert',
      org: 'Example Org',
      skills: ['Cloud Architecture'],
    }

    render(
      <CertModal cert={singleSkillCert} open={true} handleClose={jest.fn()} />
    )

    expect(screen.getByText('Cloud Architecture')).toBeInTheDocument()
    expect(screen.getByText('1 Key Skill')).toBeInTheDocument()
  })

  it('calls handleClose when close button is clicked or Escape is pressed', () => {
    const handleClose = jest.fn()
    render(<CertModal cert={fullCert} open={true} handleClose={handleClose} />)

    const closeButton = screen.getAllByRole('button', { name: /close/i })[0]
    expect(closeButton).toBeInTheDocument()
    if (!closeButton) return
    fireEvent.click(closeButton)

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })

    expect(handleClose).toHaveBeenCalled()
  })
})
