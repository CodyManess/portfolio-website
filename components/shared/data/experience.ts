import Role from '../models/role'
import cignaLogo from '@public/work-icons/cigna.webp'
import mtsuLogo from '@public/work-icons/mtsu.webp'
import expressScriptsLogo from '@public/work-icons/express-scripts.png'

export const roles: Array<Role> = [
  {
    date: 'Mar 2024',
    title: 'Software Engineering Advisor',
    companyName: 'The Cigna Group',
    companyLogo: cignaLogo,
    description: [
      {
        items: [
          'I worked as a Full-Stack Angular Developer on the myCigna Coverages team.',
          'Assisted with the resolution of various accessibility issues and contributed to guides to help improve accessbility standards within code.',
          'Added new features including enhanced ID Card Sharing options, presentation of Small Group Coverages details, and various bug fixes',
        ],
      },
    ],
  },
  {
    date: 'Jun 2023',
    title: 'TECDP Lead Advisor',
    companyName: 'The Cigna Group',
    companyLogo: cignaLogo,
    description: [
      {
        heading:
          'Rotation 3: iOS Developer for the MyCigna and Evernorth Mobile Apps',
        items: [
          'Maintained the MyCigna and Evernorth mobile apps through the timely correction of bugs',
          'Migrated multiple feature modules to MVVM SwiftUI',
        ],
      },
    ],
  },
  {
    date: 'Jun 2021',
    title: 'TECDP Senior Advisor',
    companyName: 'The Cigna Group',
    companyLogo: cignaLogo,
    description: [
      {
        heading:
          'I started working Full Time at Cigna in the Technology Early Career Development Program (TECDP)',
        items: [
          'This is a three year rotational program that strives to prepare recent graduates for their careers by working in various roles within The Cigna Group.',
          'This role also included responsibilities outside of rotations to improve hard and soft skills including mentorships, trainings, networking, and volunteering.',
        ],
      },
      {
        heading:
          'Rotation 1: Angular Frontend Engineer on the MyCigna Dashboard Team ',
        items: [
          'Assisted with the Dashboard Redesign Release',
          'Maintained various portions of the myCigna web app through the timely correction of bugs',
          'Added new features through communication with product owners and following proper release guidelines to ensure thorough testing.',
        ],
      },
      {
        heading:
          'Rotation 2: Android Developer for the MyCigna and Evernorth Mobile Apps',
        items: [
          'Ensured proper analytics tracking for over 50 actions throughout the app',
          'Maintained the MyCigna and Evernorth mobile apps through the timely correction of bugs',
          'Assisted with the addition of new features',
        ],
      },
    ],
  },
  {
    date: 'Mar 2021',
    title: 'Android Student Developer',
    companyName: 'Middle Tennessee State University',
    companyLogo: mtsuLogo,
    description: [
      {
        items: [
          'Assisted with the development and maintenance of the Android version of the MTSU Mobile Application.',
          'Advocated for the use of current Android Development practices by updating past code to reduce technical debt.',
          'Developed and tested new features planned for release including access to information for Events on Campus, widgets for the dashboard page, and integration with Microsoft Azure.',
          'Helped maintain a backlog of stories for various planned features for developers to pick up.',
        ],
      },
    ],
  },
  {
    date: 'Jun 2020',
    title: 'Front-end Intern',
    companyName: 'Express Scripts',
    companyLogo: expressScriptsLogo,
    description: [
      {
        items: [
          'Worked on a scrum-based team to maintain and develop new features for a React web application called the Military Treatment Facility (MTF) Provider Portal, a secure web portal for Department of Defense prescribers.',
          'Assisted with the development of two major releases to update the user-interface and add new features to meet business needs.',
        ],
      },
    ],
  },
]

export const extendedRoles: Array<Role> = [
  {
    date: 'May 2020 - Mar 2021',
    title: 'Computer Science Tutor',
    companyName: 'Middle Tennessee State University',
    companyLogo: mtsuLogo,
    description: [
      {
        items: [
          'Left my Student Technology Assistant position to become a Computer Science Tutor and help students, as well as myself, become better familiar with algorithms, data structures, and other computer science concepts.',
          'Assisted students with homework and concepts related to Computer Science I, II, and Data Structures and Algorithms.',
        ],
      },
    ],
  },
  {
    date: 'May 2019 - Aug 2019',
    title: 'Seasonal Sales Associate',
    companyName: 'American Eagle Outfitters',
    companyLogo: undefined,
    description: [
      {
        items: [
          'Worked as a second part-time job during my 2019 summer break.',
          'Maintained the sales floor and dressing rooms, assisted customers with finding items, and worked the register.',
        ],
      },
    ],
  },
  {
    date: 'Jan 2019 - Jul 2020',
    title: 'Student Technology Assistant',
    companyName: 'Middle Tennessee State University',
    companyLogo: mtsuLogo,
    description: [
      {
        items: [
          'Worked at MTSU ITD Help Desk as my primary part-time job to gain more work experience with technology',
          'Used Active Directory Domain Services to assist students and faculty with Microsoft 365 account issues like password issues, MFA setup, and account lockouts.',
          'Also assisted students and faculty with broader technology concerns regarding MTSU technology and software as well as operating issues with Mac, Windows, and Linux.',
        ],
      },
    ],
  },
  {
    date: 'Apr 2018 - Jan 2019',
    title: 'Crew Member',
    companyName: "McDonald's",
    companyLogo: undefined,
    description: [
      {
        items: [
          'Worked seasonally through my Summer and Winter breaks of 2018 while back home from MTSU.',
          'Worked as the front counter host helping customers with orders through the register as well as through the new self-service kiosks.',
          'Also, worked the drive-thru window when needed.',
          'Other responsibilities included maintaining the dining room, restocking inventory, serving ice cream and coffee, and cleaning bathrooms.',
        ],
      },
    ],
  },
  {
    date: 'Aug 2017 - Dec 2019',
    title: 'Desk Assistant',
    companyName: 'Middle Tennessee State University',
    companyLogo: mtsuLogo,
    description: [
      {
        items: [
          'Worked as a Desk Assistant at the front desk of a residence hall at MTSU during weeknights.',
          'Assisted students with checking in and out of the building, answering questions about the building and campus, recording evening events, and filing incident reports.',
        ],
      },
    ],
  },
  {
    date: 'Mar 2016 - Apr 2019',
    title: 'Store Associate',
    companyName: "Goody's",
    companyLogo: undefined,
    description: [
      {
        items: [
          "Worked as a store associate at Goody's a small town department store.",
          'Assisted customers with checking out and finding items, reorganized the store at closing, and organized and restocked inventory',
          'After leaving for college, I worked some weekends when visiting family as well as during breaks and holidays.',
        ],
      },
    ],
  },
  {
    date: 'Apr 2015 - Mar 2016',
    title: 'Dishwasher & Waiter',
    companyName: "Patty's Restaurant",
    companyLogo: undefined,
    description: [
      {
        items: [
          'My first job at 16 years old where I primarily worked as a dishwasher, but was given the opportunity to fill in as a waiter once a week.',
          'As dishwasher, I washed dishes, bussed tables, disposed of trash, and cleaned the bathrooms',
          'As waiter, I took orders, served food, handled customer feedback, cleaned the dining room and waiting area, checked out guests, and prepared salads.',
        ],
      },
    ],
  },
]
