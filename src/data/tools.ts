import { Tool } from '@/types/project'

const Tools: { [key: string]: Tool } = {
  React: {
    title: 'React',
    iconName: 'SiReact',
    iconColor: '#61DBFB',
  },
  Swift: {
    title: 'Swift',
    iconName: 'SiSwift',
    iconColor: '#FFAC45',
  },
  Java: {
    title: 'Java',
    iconName: 'FaJava',
    iconColor: '#007396',
  },
  NodeJS: {
    title: 'NodeJS',
    iconName: 'SiNodedotjs',
    iconColor: '#68A063',
  },
  Angular: {
    title: 'Angular',
    iconName: 'SiAngular',
    iconColor: '#ff0000',
  },
  Kotlin: {
    title: 'Kotlin',
    iconName: 'SiKotlin',
    iconColor: '#0095D5',
  },
  Firebase: {
    title: 'Firebase',
    iconName: 'SiFirebase',
    iconColor: '#FF9100',
  },
  PHP: {
    title: 'PHP',
    iconName: 'SiPhp',
    iconColor: '#474a8a',
  },
}

export default Tools
