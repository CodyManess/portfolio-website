import Project from '@/types/project'
import Tools from './tools'

const projects: Project[] = [
  {
    title: 'Digital Platform Library',
    description:
      'The Digital Platform Library is an internal package full of utilities and tools shared throughout Digital across our various repositories. It provides shared components, helpers, and standard configurations to ensure consistency and accelerate development across teams.',
    achievements: [],
    tools: [Tools.React, Tools.ReactNative, Tools.TypeScript],
  },
  {
    title: 'Leaf Design System',
    description:
      'As a developer on the myCigna Web Portal, I also worked to lay the groundwork for a smoother adoption of a new enterprise web component library called the Leaf Design System. I met with various stakeholders within the Leaf Design System to address potential concerns regarding each component and its features to ensure we covered as many use cases as possible and maximized the benefit of the new library.',
    achievements: [],
    tools: [Tools.Angular, Tools.React],
  },
  {
    title: 'myCigna Web Portal',
    description:
      'As a Developer at Cigna, I spent two rotations working on the myCigna Web Portal, an Angular web app that helped users access their digital ID cards, manage their health information, update their profiles, and more. During my first rotation, I worked with the Dashboard team assisting with the UI redesign, implemented and updated analytics tracking, and contributed to an onboarding redesign. During my second rotation, I worked on the myCigna Coverages Team where I worked to improve accessibility across the overall site, documented components for a future redesign, added new features for users to more easily share their ID cards, and increased test coverage.',
    link: 'https://my.cigna.com/',
    achievements: [],
    tools: [Tools.Angular, Tools.Kotlin, Tools.NodeJS],
  },
  {
    title: 'myCigna Mobile App',
    description:
      "During my time with the Cigna Digital Mobile Team, I worked as an Android and then iOS developer on the myCigna Mobile App, an app that gives Cigna members an easy way to access plan information and features through their mobile devices. As a developer, I worked to connect native parts of the app to the emerging React Native pages, improve code quality, increase analytics tracking, fix past bugs, and improve the app's interaction with its web and React Native portions.",
    link: 'https://my.cigna.com/',
    achievements: [],
    tools: [Tools.Swift, Tools.Kotlin, Tools.ReactNative],
  },
  {
    title: 'Evernorth Mobile App',
    description:
      'During my time with the Cigna Digital Mobile Team, I worked as an Android and then iOS developer on the Evernorth Mobile App, an app that gives Evernorth members an easy way to access plan information and features through their mobile devices. As a developer, I worked to update chat features, improve code quality, increase analytics tracking, and fix past bugs.',
    link: 'https://www.evernorth.com/app',
    achievements: [],
    tools: [Tools.Swift, Tools.Kotlin],
  },
  {
    title: 'TECDPortal',
    description:
      'As part of the Technology Early Career Development Program (TECDP) at the Cigna Group, I worked as an Angular developer on the TECDPortal, an internal portal for the program. Its main purpose was to provide a one-stop location that connects TECDP participants with commonly used resources and program-specific tools.\n\nThese tools included a page for applying and posting internal TECDP positions, an internal ticket/request portal, a dashboard displaying weekly news, and a page showing personalized information regarding the buddy program.',
    achievements: [
      'Cleaned up over 2,000 lines of code by reducing copied code through components and functions, removing unused/deprecated code, and reducing project scope through the removal of unpopular features.',
      'Led migration of the Job Board page from AngularJS to Angular 8.',
      'Worked with a team of frontend developers to utilize Figma to create a redesigned mockup of the dashboard page.',
    ],
    tools: [Tools.Angular],
  },
  {
    title: 'Military Treatment Facility (MTF) Portal',
    description:
      'The Military Treatment Facility (MTF) or Military Provider Portal (MPP), now known as Militaryrx, is a secure React web portal used to renew prescriptions currently filled at the TRICARE mail-order pharmacy, reduce fax volume to renew prescriptions, and respond to beneficiary requests for prescriptions to be transferred from an MTF or retail pharmacy to Home Delivery.',
    link: 'https://militaryrx.express-scripts.com/',
    achievements: [
      'Updated styling, unit tests, and over 15 component types to finish integrating a new enterprise component library.',
      'Helped deliver a major new feature that added the ability to submit and process new prescriptions via the Express Scripts MTF site, instead of having to use a paper form.',
    ],
    tools: [Tools.React],
  },
  {
    title: 'MTSU Mobile App',
    description:
      "As a student developer on the MTSU Mobile App, I led the maintenance and improvements for the Android version of MTSU's campus application, which helped students more easily access campus information like their email, schedule, campus buses, and events.\n\nDuring my time, I pushed to improve code quality by migrating features from Java and XML to Kotlin and Jetpack Compose and I championed more event features to allow students to become more connected to campus life. I also worked on the PHP backend to update and improve code quality, as well as add new endpoints.",
    link: 'https://mtsu.edu/mobile/',
    achievements: [],
    tools: [Tools.Kotlin, Tools.Swift, Tools.PHP],
  },
  {
    title: 'Dynamic Physical Therapy Website',
    description:
      'During college, I worked with a team of developers from a startup called Bandilla to build a React website for Dynamic Physical Therapy, showcasing its services and contact information.\n\nFor backend services, we used Firebase, utilizing Node.js Cloud Functions and Cloud Firestore to process contact forms and manage content.',
    link: 'https://www.dynamicptsite.com/',
    achievements: [],
    tools: [Tools.React, Tools.Firebase],
  },
  {
    title: 'Keystone Adult Daycare Donation Database',
    description:
      'During my time as a student at MTSU, I worked on this web application with a colleague after recently finishing a Java class. This application was a donation-tracking tool for an adult daycare center he was connected with. The tool made it easier for staff to log donor contact information, track contributions, organize records, and schedule reminders to thank donors.\n\nTo create this tool, we utilized the full-stack Java framework Vaadin, Spring Boot, and MySQL.',
    achievements: [],
    tools: [Tools.Java, Tools.Firebase],
  },
]

export default projects
