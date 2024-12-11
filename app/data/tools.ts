import { Tool } from "@/models/project";

const Tools: {[key: string]: Tool} = {
    React: {
        title: "React",
        icon: "/tool-icons/react.svg"
    },
    Swift: {
        title: "Swift",
        icon: "/tool-icons/language-swift.svg"
    },
    Java: {
        title: "Java",
        icon: "/tool-icons/language-java.svg"
    },
    NodeJS: {
        title: "NodeJS",
        icon: "/tool-icons/nodejs.svg"
    },
    Angular: {
        title: "Angular",
        icon: "/tool-icons/angular.svg"
    },
    Kotlin: {
        title: "Kotlin",
        icon: "/tool-icons/language-kotlin.svg"
    },
    Firebase: {
        title: "Firebase",
        icon: "/tool-icons/firebase.webp"
    },
    PHP: {
        title: "PHP",
        icon: "/tool-icons/php.svg"
    },
}

export default Tools;