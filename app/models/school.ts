import { StaticImageData } from "next/image"

export interface Degree {
    schoolName: string,
    schoolPhoto: StaticImageData,
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