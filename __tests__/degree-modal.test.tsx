import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import DegreeModal from '@/components/credentials/degree-modal'
import type { Degree } from '@/types/education'
import { CourseType } from '@/types/education'

describe('DegreeModal', () => {
  const mockDegree: Degree = {
    schoolName: 'Middle Tennessee State University',
    title: 'Master of Science in Computer Science',
    subtitle: 'Accelerated Program',
    schoolLink: 'https://www.mtsu.edu',
    awards: ["Dean's List", 'Summa Cum Laude'],
    courses: [
      {
        courseType: CourseType.Core,
        courseNum: 'CSCI 5560',
        title: 'Database Management Systems',
      },
      {
        courseType: CourseType.SupportCourses,
        courseNum: 'CSCI 5350',
        title: 'Intro to Artificial Intelligence',
      },
    ],
  }

  it('renders degree information, school name, and honors correctly when open', () => {
    render(
      <DegreeModal degree={mockDegree} open={true} handleClose={jest.fn()} />
    )

    expect(
      screen.getByText('Middle Tennessee State University')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Master of Science in Computer Science')
    ).toBeInTheDocument()
    expect(screen.getByText('Accelerated Program')).toBeInTheDocument()
    expect(screen.getByText("Dean's List")).toBeInTheDocument()
    expect(screen.getByText('Summa Cum Laude')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Program Website/i })
    ).toHaveAttribute('href', 'https://www.mtsu.edu')
  })

  it('renders all courses initially and supports filtering by category tab', () => {
    render(
      <DegreeModal degree={mockDegree} open={true} handleClose={jest.fn()} />
    )

    // Initially both courses are visible under All
    expect(screen.getByText('Database Management Systems')).toBeInTheDocument()
    expect(
      screen.getByText('Intro to Artificial Intelligence')
    ).toBeInTheDocument()
    expect(screen.getByText('CSCI 5560')).toBeInTheDocument()
    expect(screen.getByText('CSCI 5350')).toBeInTheDocument()

    // Filter to Core Requirements only
    const coreTab = screen.getByRole('button', { name: /Core Requirements/i })
    fireEvent.click(coreTab)

    expect(screen.getByText('Database Management Systems')).toBeInTheDocument()
    expect(
      screen.queryByText('Intro to Artificial Intelligence')
    ).not.toBeInTheDocument()

    // Switch to Supporting Courses
    const supportTab = screen.getByRole('button', {
      name: /Supporting Courses/i,
    })
    fireEvent.click(supportTab)

    expect(
      screen.queryByText('Database Management Systems')
    ).not.toBeInTheDocument()
    expect(
      screen.getByText('Intro to Artificial Intelligence')
    ).toBeInTheDocument()

    // Switch back to All
    const allTab = screen.getByRole('button', { name: /All \(2\)/i })
    fireEvent.click(allTab)
    expect(allTab).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Database Management Systems')).toBeInTheDocument()
  })

  it('renders empty state and omits optional subtitle, honors, and program link when absent', () => {
    const minimalDegree: Degree = {
      schoolName: '',
      title: 'Certificate Program',
      subtitle: '',
      schoolLink: 'javascript:alert(1)',
      awards: [],
      courses: [],
    }

    render(
      <DegreeModal degree={minimalDegree} open={true} handleClose={jest.fn()} />
    )

    expect(screen.getByText('Certificate Program')).toBeInTheDocument()
    expect(
      screen.getByText(/no coursework details available/i)
    ).toBeInTheDocument()
    expect(screen.getByText('0 Total Courses')).toBeInTheDocument()
    expect(screen.queryByText(/honors:/i)).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /Program Website/i })
    ).not.toBeInTheDocument()
  })

  it('calls handleClose when close button is clicked or Escape is pressed', () => {
    const handleClose = jest.fn()
    render(
      <DegreeModal degree={mockDegree} open={true} handleClose={handleClose} />
    )

    const closeButton = screen.getAllByRole('button', { name: /close/i })[0]
    expect(closeButton).toBeInTheDocument()
    if (!closeButton) return
    fireEvent.click(closeButton)

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })

    expect(handleClose).toHaveBeenCalled()
  })
})
