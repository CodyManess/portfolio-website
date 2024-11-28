import mtsuPhoto from "../assets/education/mtsucampus.jpg";
import mtsuPhoto2 from "../assets/education/mtsucampus2.jpg"
import lsusPhoto from "../assets/education/lsuscampus.jpg";
import { Degree, CourseType } from "../components/Education/school";

export const schools: Degree[] = [
    {
        schoolName: "Middle Tennessee State University",
        schoolPhoto: mtsuPhoto.src,
        title: "Bachelor of Science in Computer Science",
        subtitle: "Minoring in Communications and Mathematics",
        awards: [
            "Summa Cum Laude", 
            "University Honors with Distinction",
            "Accelerated Bachelors to Masters (ABM) Program"
        ],
        courses: [
            // Core Courses
            {
                courseType: CourseType.Core,
                courseNum: "CSCI 1010",
                title: "Computer Science Colloquium"
            },
            {
                courseType: CourseType.Core,
                courseNum: "CSCI 2170",
                title: "Computer Science I"
            },
            {
                courseType: CourseType.Core,
                courseNum: "CSCI 2170",
                title: "Computer Science II"
            },
            {
                courseType: CourseType.Core,
                courseNum: "CSCI 3080",
                title: "Discrete Structures"
            },
            {
                courseType: CourseType.Core,
                courseNum: "CSCI 3110",
                title: "Algorithms and Data Structures"
            },
            {
                courseType: CourseType.Core,
                courseNum: "CSCI 3130",
                title: "Assembly and Computer Organization"
            },
            {
                courseType: CourseType.Core,
                courseNum: "CSCI 3240",
                title: "Introduction to Computer Systems"
            },
            {
                courseType: CourseType.Core,
                courseNum: "CSCI 4700",
                title: "Software Engineering"
            },

            // Concentration Courses
            {
                courseType: CourseType.Concentration,
                courseNum: "CSCI 3210",
                title: "Theory of Programming Languages"
            },
            {
                courseType: CourseType.Concentration,
                courseNum: "CSCI 4160",
                title: "Computer Design and Software Development"
            },
            {
                courseType: CourseType.Concentration,
                courseNum: "CSCI 3033",
                title: "Computer Languages Java"
            },
            {
                courseType: CourseType.Concentration,
                courseNum: "CSCI 5350",
                title: "Intro to Artificial Intelligence"
            },
            {
                courseType: CourseType.Concentration,
                courseNum: "CSCI 5410",
                title: "Web Technologies"
            },
            {
                courseType: CourseType.Concentration,
                courseNum: "CSCI 5560",
                title: "Database Management Systems"
            },
            {
                courseType: CourseType.Concentration,
                courseNum: "CSCI 5700",
                title: "Software Engineering"
            },

            // Supporting Courses
            {
                courseType: CourseType.SupportCourses,
                courseNum: "MATH 1910",
                title: "Calculus I"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "MATH 1920",
                title: "Calculus II"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "MATH 1930",
                title: "Calculus III"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "MATH 1920",
                title: "Probability and Statistics"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "MATH 3460",
                title: "Foundation of Higher Mathematics"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "PHIL 3170",
                title: "Ethics and Computer Technology"
            },
        ]
    },
    {
        schoolName: "Middle Tennessee State University",
        schoolPhoto: mtsuPhoto2.src,
        title: "Master of Science in Computer Science",
        subtitle: "",
        awards: ["Accelerated Bachelors to Masters Program"],
        courses: [
            {
                courseType: CourseType.Core,
                courseNum: "CSCI 5560",
                title: "Database Management Systems"
            },
            {
                courseType: CourseType.Core,
                courseNum: "CSCI 5700",
                title: "Software Engineering"
            },
            {
                courseType: CourseType.Core,
                courseNum: "CSCI 6620",
                title: "Research Methods in Computer Science"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "CSCI 5350",
                title: "Intro to Artificial Intelligence"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "CSCI 5410",
                title: "Web Technologies"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "CSCI 6100",
                title: "Analysis of Algorithms"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "CSCI 6330",
                title: "Parallel Processing Concepts"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "CSCI 6350",
                title: "Selected Topics in Artificial Intelligence"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "CSCI 6600",
                title: "Selected Topics in Computer Science: Cyber Security"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "CSCI 6600",
                title: "Selected Topics in Computer Science: Cloud Computing for Data Analysis"
            },
            {
                courseType: CourseType.SupportCourses,
                courseNum: "CSCI 7850",
                title: "Deep Learning"
            },
        ]
    },
    {
        schoolName: "Louisiana State University - Shreveport",
        schoolPhoto: lsusPhoto.src,
        title: "Master of Business Administration",
        subtitle: "Concentrating in Finance",
        awards: [],
        courses: [
            // Core
            {
                courseType: CourseType.Core,
                courseNum: "MBA 700",
                title: "Managerial Use of Accounting Data"
            },
            {
                courseType: CourseType.Core,
                courseNum: "MBA 701",
                title: "Economic Analysis for Management"
            },
            {
                courseType: CourseType.Core,
                courseNum: "MBA 702",
                title: "Financial Management"
            },
            {
                courseType: CourseType.Core,
                courseNum: "MBA 703",
                title: "Management Information Systems"
            },
            {
                courseType: CourseType.Core,
                courseNum: "MBA 704",
                title: "Organizational Behavior"
            },
            {
                courseType: CourseType.Core,
                courseNum: "MBA 705",
                title: "Organizational Strategy and Policies"
            },
            {
                courseType: CourseType.Core,
                courseNum: "MBA 706",
                title: "Marketing Strategy"
            },

            // Concentration
            {
                courseType: CourseType.Concentration,
                courseNum: "MBA 725",
                title: "Contemporary Investment"
            },
            {
                courseType: CourseType.Concentration,
                courseNum: "MBA 726",
                title: "Contemporary Issues in Finance"
            },
            {
                courseType: CourseType.Concentration,
                courseNum: "MBA 727",
                title: "Financial Markets and Institutions"
            },
            {
                courseType: CourseType.Concentration,
                courseNum: "MBA 728",
                title: "Financial Analytics"
            },
        ]
    },
]