import { fireEvent, render, screen } from '@testing-library/react'
import ResumePage, { metadata } from '@/app/resume/page'
import { certs } from '@/data/education-certs'
import { degrees } from '@/data/education-degrees'
import { roles } from '@/data/experience'
import { socialLinks } from '@/data/links'
import projects from '@/data/projects'
import { skillGroups } from '@/data/tools'

const restoreWindowProperty = (
  key: string,
  descriptor: PropertyDescriptor | undefined
) => {
  if (descriptor) {
    Object.defineProperty(window, key, descriptor)
  } else {
    Reflect.deleteProperty(window, key)
  }
}

describe('Resume Page', () => {
  const originalPrint = Object.getOwnPropertyDescriptor(window, 'print')

  afterEach(() => {
    restoreWindowProperty('print', originalPrint)
  })

  it('renders complete resume sections from static data with zero client fetch calls', () => {
    render(<ResumePage />)

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: /cody maness/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument()
    expect(screen.getByText('Raleigh, NC')).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: 'cody.maness@outlook.com' })
    ).toHaveAttribute('href', socialLinks.Email)
    expect(
      screen.getByRole('link', { name: 'linkedin.com/in/cody-maness' })
    ).toHaveAttribute('href', socialLinks.LinkedIn)
    expect(
      screen.getByRole('link', { name: 'github.com/CodyManess' })
    ).toHaveAttribute('href', socialLinks.GitHub)

    const backLink = screen.getByRole('link', { name: /back to portfolio/i })
    expect(backLink).toHaveAttribute('href', '/')

    roles.forEach((role) => {
      expect(
        screen.getByRole('heading', { level: 3, name: role.title })
      ).toBeInTheDocument()
    })
    expect(screen.getAllByText(/· Remote/)).toHaveLength(3)
    expect(screen.getByText(/· Nashville, TN/)).toBeInTheDocument()
    expect(screen.getByText(/· Murfreesboro, TN/)).toBeInTheDocument()

    skillGroups.forEach((group) => {
      expect(
        screen.getByText(new RegExp(`${group.category}:`, 'i'))
      ).toBeInTheDocument()
    })

    degrees.forEach((degree) => {
      expect(
        screen.getByRole('heading', { level: 3, name: degree.title })
      ).toBeInTheDocument()
    })
    expect(screen.getByText(/Summa Cum Laude/)).toBeInTheDocument()

    certs.forEach((cert) => {
      expect(
        screen.getByRole('heading', { level: 3, name: cert.name })
      ).toBeInTheDocument()
    })

    projects
      .filter((project) => project.achievements.length > 0)
      .forEach((project) => {
        expect(
          screen.getByRole('heading', { level: 3, name: project.title })
        ).toBeInTheDocument()
      })

    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('invokes window.print when the Print / Save PDF button is clicked', () => {
    const printMock = jest.fn()
    Object.defineProperty(window, 'print', {
      value: printMock,
      writable: true,
      configurable: true,
    })

    render(<ResumePage />)

    fireEvent.click(screen.getByRole('button', { name: /print \/ save pdf/i }))
    expect(printMock).toHaveBeenCalledTimes(1)
  })

  it('exports page-specific OpenGraph, Twitter, and canonical metadata', () => {
    expect(metadata.title).toBe('Cody Maness | Resume')
    expect(metadata.alternates?.canonical).toBe('/resume')
    expect(metadata.openGraph).toMatchObject({
      title: 'Cody Maness | Resume',
      url: 'https://codymaness.com/resume',
    })
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: 'Cody Maness | Resume',
    })
  })
})
