export interface EducationData {
  degrees: Degree[]
  certs: Cert[]
}

export interface Degree {
  schoolName: string
  schoolLink: string
  title: string
  subtitle: string
  awards: string[]
  courses: Course[]
}

interface Course {
  courseType: CourseType
  courseNum: string
  title: string
}

export enum CourseType {
  Core = 'Core Requirements',
  Concentration = 'Concentration',
  SupportCourses = 'Supporting Courses',
}

export enum IconType {
  Badge,
  Logo,
}

export interface Cert {
  icon: string
  iconType: IconType
  name: string
  org: string
}
