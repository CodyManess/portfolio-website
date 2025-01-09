import { Tool } from '@/app/models/project'
import {
  SiReact,
  SiSwift,
  SiNodedotjs,
  SiAngular,
  SiKotlin,
  SiFirebase,
  SiPhp,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'

const Tools: { [key: string]: Tool } = {
  React: {
    title: 'React',
    icon: SiReact,
    iconColor: '#61DBFB',
  },
  Swift: {
    title: 'Swift',
    icon: SiSwift,
    iconColor: '#FFAC45',
  },
  Java: {
    title: 'Java',
    icon: FaJava,
    iconColor: '#007396',
  },
  NodeJS: {
    title: 'NodeJS',
    icon: SiNodedotjs,
    iconColor: '#68A063',
  },
  Angular: {
    title: 'Angular',
    icon: SiAngular,
    iconColor: '#ff0000',
  },
  Kotlin: {
    title: 'Kotlin',
    icon: SiKotlin,
    iconColor: '#0095D5',
  },
  Firebase: {
    title: 'Firebase',
    icon: SiFirebase,
    iconColor: '#FF9100',
  },
  PHP: {
    title: 'PHP',
    icon: SiPhp,
    iconColor: '#474a8a',
  },
}

export default Tools
