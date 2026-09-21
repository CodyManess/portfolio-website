import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import DegreeModal from '@/components/credentials/degree-modal'
import { CourseType, Degree } from '@/types/education'

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
  })

  it('calls handleClose when close button is clicked', () => {
    const handleClose = jest.fn()
    render(
      <DegreeModal degree={mockDegree} open={true} handleClose={handleClose} />
    )

    const closeButtons = screen.getAllByRole('button', { name: /close/i })
    expect(closeButtons.length).toBeGreaterThanOrEqual(1)
    fireEvent.click(closeButtons[0])

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
