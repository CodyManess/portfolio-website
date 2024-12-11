import Project from "../models/project";
import Tools from "./tools";

const projects: Project[] = [
    {
        title: "Leaf Design System",
        description: "As a developer on myCigna Web Portal, I also worked to lay the groundwork for a smoother adoption of a new enterprise web component library called the Leaf Design System.  I meet with various stakeholders within the Leaf Design System to address potential concerns regarding each component and its features to ensure we covered as many use cases as possible and gain as much benefit as we could from the new library.",
        achievements: [],
        tools: [Tools.Angular]
    },
    {
        title: "myCigna Web Portal",
        description: "As a Developer at Cigna, I spent two rotations working on the myCigna Web Portal, an Angular web app that helped users can access their digital ID cards, manage their health information, update their profile, and more.  During my first rotation, I worked with the Dashboard team assisting with development on a UI redesign, added and updated Analytics tracking, and assisted with an onboarding redesign.  During my second rotation, I worked on the myCigna Coverages Team where I worked to improve accessibility within the overall site, documented components for a future redesign, added new features for users to more easily share their ID Cards, and increased test coverage.",
        achievements: [],
        tools: [Tools.Angular, Tools.Kotlin, Tools.NodeJS]
    },
    {
        title: "myCigna Mobile App",
        description: "During my time with the Cigna Digital Mobile Team, I worked as an Android and then iOS developer on the myCigna Mobile App, an app that gives Cigna members an easy way to access plan information and features through their mobile device.  As a developer, I worked to connect Native parts of the app to the emerging React Native pages, improve code quality, increase analytics tracking, fix past bugs, and improve the app’s interaction with it’s Web and React Native portions.",
        achievements: [],
        tools: [Tools.Swift, Tools.Kotlin]
    }, 
    {
        title: "Evernorth Mobile App",
        description: "During my time with the Cigna Digital Mobile Team, I worked as an Android and then iOS developer on the Evernorth Mobile App, an app that gives Evernorth members an easy way to access plan information and features through their mobile device.  As a developer, I worked to update chat features, improve code quality, increase analytics tracking, and fix past bugs.",
        achievements: [],
        tools: [Tools.Swift, Tools.Kotlin]
    }, 
    {
        title: "TECDPortal",
        description: "An internal portal for the Technology Early Career Development Program (TECDP) at the Cigna Group.  It’s main purpose was to provide a one stop location that connects TECDPs with commonly used resources and program specific tools.  These tools include a page for applying and posting TECDP positions, an internal ticket/request portal, and a page that shows personalized information regarding the buddy program.",
        achievements: [],
        tools: [Tools.Angular]
    },  
    {
        title: "Military Treatment Facility (MTF) Portal",
        description: "The Military Treatment Facility (MTF) or Military Provider Portal (MPP), now known as Militaryrx, is a secure web portal used to renew prescriptions currently filled at the Tricare mail order pharmacy, reduce fax volume to renew prescriptions, and respond to beneficiary requests for prescriptions to be transferred from MTF/retail pharmacy to Home Delivery.",
        achievements: [],
        tools: [Tools.React]
    },
    {
        title: "MTSU Mobile App",
        description: "I worked on the Android version of the MTSU Mobile App as a student developer, where I pushed to improve code quality, combine school event data adding more event features, and refreshed bus tracking app code.",
        achievements: [],
        tools: [Tools.Kotlin, Tools.Swift]
    },
    {
        title: "Dynamic Physical Therapy Website",
        description: "I worked on the development of a React website for a small business called Dynamic Physical Therapy advertising its various services and contact information.",
        achievements: [],
        tools: [Tools.React]
    },
    {
        title: "Keystone Adult Daycare Donation Database",
        description: "During my time as a student at MTSU, I worked on the Java web application with a colleague to help create a portal for an Adult Daycare he was connected to.  This portal created an easy way for the Daycare staff to log donations and donation contact information, organize data, and set reminders to thank donors.",
        achievements: [],
        tools: [Tools.Java]
    },
]

export default projects;