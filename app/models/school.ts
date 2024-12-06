export interface Degree {
    schoolName: string,
    schoolPhoto: string,
    schoolLink: string,
    title: string,
    subtitle: string,
    awards: string[],
    courses: Course[]
}

interface Course {
    courseType: CourseType,
    courseNum: string,
    title: string
}

export enum CourseType {
    Core = "Core Requirements",
    Concentration = "Concentration",
    SupportCourses = "Supporting Courses"
}