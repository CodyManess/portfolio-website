import type { IconType } from 'react-icons'

export interface Interest {
  name: string
  emoji: string
}

export interface MediaLink {
  name: string
  category: string
  url: string
  icon: IconType
}

export interface SkillGroup {
  category: string
  skills: string[]
}
