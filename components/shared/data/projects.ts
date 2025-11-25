import Project from '../models/project'
import Tools from './tools'

const projects: Project[] = [
  {
    title: 'Leaf Design System',
    description:
      'As a developer on myCigna Web Portal, I also worked to lay the groundwork for a smoother adoption of a new enterprise web component library called the Leaf Design System.  I meet with various stakeholders within the Leaf Design System to address potential concerns regarding each component and its features to ensure we covered as many use cases as possible and gain as much benefit as we could from the new library.',
    achievements: [],
    tools: [Tools.Angular, Tools.React],
  },
  {
    title: 'myCigna Web Portal',
    description:
      'As a Developer at Cigna, I spent two rotations working on the myCigna Web Portal, an Angular web app that helped users can access their digital ID cards, manage their health information, update their profile, and more.  During my first rotation, I worked with the Dashboard team assisting with development on a UI redesign, added and updated Analytics tracking, and assisted with an onboarding redesign.  During my second rotation, I worked on the myCigna Coverages Team where I worked to improve accessibility within the overall site, documented components for a future redesign, added new features for users to more easily share their ID Cards, and increased test coverage.',
    link: 'https://my.cigna.com/',
    achievements: [],
    tools: [Tools.Angular, Tools.Kotlin, Tools.NodeJS],
  },
  {
    title: 'myCigna Mobile App',
    description:
      'During my time with the Cigna Digital Mobile Team, I worked as an Android and then iOS developer on the myCigna Mobile App, an app that gives Cigna members an easy way to access plan information and features through their mobile device.  As a developer, I worked to connect Native parts of the app to the emerging React Native pages, improve code quality, increase analytics tracking, fix past bugs, and improve the app’s interaction with it’s Web and React Native portions.',
    link: 'https://my.cigna.com/',
    achievements: [],
    tools: [Tools.Swift, Tools.Kotlin],
  },
  {
    title: 'Evernorth Mobile App',
    description:
      'During my time with the Cigna Digital Mobile Team, I worked as an Android and then iOS developer on the Evernorth Mobile App, an app that gives Evernorth members an easy way to access plan information and features through their mobile device.  As a developer, I worked to update chat features, improve code quality, increase analytics tracking, and fix past bugs.',
    link: 'https://www.evernorth.com/app',
    achievements: [],
    tools: [Tools.Swift, Tools.Kotlin],
  },
  {
    title: 'TECDPortal',
    description:
      'As part of the Technology Early Career Development Program (TECDP) at the Cigna Group, I worked as an Angular developer on the TECDPortal, an internal portal for the program.  It’s main purpose was to provide a one stop location that connects TECDPs with commonly used resources and program specific tools.\n\nThese tools included a page for applying and posting internal TECDP positions, an internal ticket/request portal, a dashboard that displayed weekly news, and a page that shows personalized information regarding the buddy program.',
    achievements: [
      'Cleaned up of over 2000 lines of code by reducing copied code through components and functions, removing unused/deprecated code, and reducing project scope through the removal of unpopular features.',
      'Led Migration of the Job Board page from Angularjs to Angular 8',
      'Worked with a team of frontend Devs to utilize Figma to create a redesigned mockup of the Dashboard page',
    ],
    tools: [Tools.Angular],
  },
  {
    title: 'Military Treatment Facility (MTF) Portal',
    description:
      'The Military Treatment Facility (MTF) or Military Provider Portal (MPP), now known as Militaryrx, is a secure React web portal used to renew prescriptions currently filled at the Tricare mail order pharmacy, reduce fax volume to renew prescriptions, and respond to beneficiary requests for prescriptions to be transferred from MTF/retail pharmacy to Home Delivery.',
    link: 'https://militaryrx.express-scripts.com/',
    achievements: [
      'Updated styling, unit tests, and over 15 component types to finish integrating a new enterprise component library',
      'Helped deliver a major new feature that added the ability to submit and process a new prescriptions via the Express-Scripts MTF site, instead of having to use a paper form',
    ],
    tools: [Tools.React],
  },
  {
    title: 'MTSU Mobile App',
    description:
      'As a student developer on the MTSU Mobile App, I led the maintenance and improvements for the Android version of MTSU’s campus application, which helped students more easily access campus information like their email, schedule, campus buses, and events.\n\nDuring my time, I pushed to improve code quality by migrating features from Java and XML to Kotlin and Jetpack Compose and I championed more event features to allow students to become more connected to campus life.  I also worked on the PHP backend to update and improve code quality as well as added new endpoints.',
    link: 'https://mtsu.edu/mobile/',
    achievements: [],
    tools: [Tools.Kotlin, Tools.Swift, Tools.PHP],
  },
  {
    title: 'Dynamic Physical Therapy Website',
    description:
      'During college, I worked with a team of developers from a small startup called Bandilla on the development of a React website for a small business called Dynamic Physical Therapy advertising its contact information and various services.\n\nFor backend services, we used Firebase, utilizing its Node.js Cloud Functions and Cloud Firestore’s NoSQL Database to process the contact form and manage some content.',
    link: 'https://www.dynamicptsite.com/',
    achievements: [],
    tools: [Tools.React, Tools.Firebase],
  },
  {
    title: 'Keystone Adult Daycare Donation Database',
    description:
      'During my time as a student at MTSU, I worked on this web application with a colleague after recently finishing a Java class.  This application was a donation tracking tool for an Adult Daycare he was connected to.  This tool made it easier for the Daycare staff to log donations and donation contact information, organize donation data, and set reminders to thank donors.\n\nTo create this tool, we utilized the Full-Stack Java framework Vaadin, Spring Boot, and mySQL.',
    achievements: [],
    tools: [Tools.Java, Tools.Firebase],
  },
]

export default projects
