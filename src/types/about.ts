import { ComponentType } from 'react'

export interface TechInterest {
  name: string
  emoji: string
}

export interface PersonalInterest {
  name: string
  emoji: string
}

export interface MediaLink {
  name: string
  category: string
  url: string
  icon: ComponentType<{ className?: string }>
}
