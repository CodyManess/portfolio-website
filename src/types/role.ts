import type { StaticImageData } from 'next/image'

export interface ExperienceData {
  roles: Role[]
  extendedRoles: Role[]
}

export interface Role {
  date: string
  title: string
  companyName: string
  companyLogo?: StaticImageData | string
  description: Array<WorkSection>
}

export interface WorkSection {
  heading?: string
  items: Array<string>
}
