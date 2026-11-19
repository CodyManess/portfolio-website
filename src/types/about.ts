import type { IconType } from 'react-icons'
import type { Tool } from '@/types/project'

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

export interface Skill {
  label: string
  tool?: Tool
}

export interface SkillGroup {
  category: string
  skills: Skill[]
}
