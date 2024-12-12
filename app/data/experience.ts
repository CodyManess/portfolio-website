import Role from '../models/role'
import cignaLogo from '@/public/work-icons/cigna.webp'
import mtsuLogo from '@/public/work-icons/mtsu.webp'

export const roles: Array<Role> = [
  {
    date: 'June 2024',
    title: 'Software Engineering Advisor',
    companyName: 'The Cigna Group',
    companyLogo: cignaLogo,
    description:
      'I work as a Full-Stack Developer on the myCigna Coverages team.',
  },
  {
    date: 'June 2023',
    title: 'TECDP Lead Advisor',
    companyName: 'The Cigna Group',
    companyLogo: cignaLogo,
    description:
      '2023 - 2024: iOS Developer for the MyCigna and Evernorth Mobile Apps and Web Developer for myCigna Coverages \n - Maintained the MyCigna and Evernorth mobile apps through the timely correction of bugs \n - Assisted with the addition of new features \n - Migrated multiple feature modules to MVVM SwiftUI',
  },
  {
    date: 'June 2023',
    title: 'TECDP Senior Advisor',
    companyName: 'The Cigna Group',
    companyLogo: cignaLogo,
    description:
      '2022 - 2023: Android Developer for the MyCigna and Evernorth Mobile Apps \n - Ensured proper analytics tracking for over 50 actions throughout the app \n - Maintained the MyCigna and Evernorth mobile apps through the timely correction of bugs \n - Assisted with the addition of new features \n\n 2021 - 2022: Angular Frontend Engineer on the MyCigna Dashboard Team \n - Assisted with the Dashboard Redesign Release \n  - Maintained various portions of the myCigna web app through the timely correction of bugs \n - Added new features through communication with product owners and following proper release guidelines to ensure thorough testing.',
  },
  {
    date: 'June 2023',
    title: 'Android Student Developer',
    companyName: 'Middle Tennessee State University',
    companyLogo: mtsuLogo,
    description:
      '- Assisted with the development and maintenance of the Android version of the MTSU Mobile Application. \n - Advocated for the use of current Android Development practices by updating past code to reduce technical debt. \n - Developed and tested new features planned for release including access to information for Events on Campus, widgets for the dashboard page, and integration with Microsoft Azure. \n - Helped maintain a backlog of stories for various planned features for developers to pick up.',
  },
  {
    date: 'June 2023',
    title: 'TECDP Intern',
    companyName: 'The Cigna Group',
    companyLogo: cignaLogo,
    description:
      '- Worked on a scrum-based team to maintain and develop new features for a React web application called the Military Treatment Facility (MTF) Provider Portal, a secure web portal for Department of Defense prescribers. \n - Assisted with the development of two major releases to update the user-interface and add new features to meet business needs.',
  },
]
