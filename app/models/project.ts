import { IconType } from 'react-icons'

export default interface Project {
  title: string
  description: string
  link?: string
  achievements: string[]
  tools: Tool[]
}

export interface Tool {
  title: string
  icon: IconType
  iconColor: string
}
