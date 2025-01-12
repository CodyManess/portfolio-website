import Role from '../models/role'
import cignaLogo from '@/public/work-icons/cigna.webp'
import mtsuLogo from '@/public/work-icons/mtsu.webp'
import expressScriptsLogo from '@/public/work-icons/express-scripts.png'

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
