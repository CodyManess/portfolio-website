import reactIcon from "../assets/tool-icons/react.svg";
import swiftIcon from "../assets/tool-icons/language-swift.svg";
import javaIcon from "../assets/tool-icons/language-java.svg";
import nodejsIcon from "../assets/tool-icons/nodejs.svg";
import kotlinIcon from "../assets/tool-icons/language-kotlin.svg";
import angularIcon from "../assets/tool-icons/angular.svg";
import { Tool } from "../models/project";

const Tools: {[key: string]: Tool} = {
    React: {
        title: "React",
        icon: reactIcon
    },
    Swift: {
        title: "Swift",
        icon: swiftIcon
    },
    Java: {
        title: "Java",
        icon: javaIcon
    },
    NodeJS: {
        title: "NodeJS",
        icon: nodejsIcon
    },
    Angular: {
        title: "Angular",
        icon: angularIcon
    },
    Kotlin: {
        title: "Kotlin",
        icon: kotlinIcon
    }
}

export default Tools;