import type { StaticImageData } from 'next/image'

export interface ExperienceData {
  roles: Role[]
  extendedRoles: Role[]
}

export interface RoleProjectLink {
  id: string
  title: string
}

export interface Role {
  id?: string
  date: string
  title: string
  companyName: string
  location?: string
  employmentType?: string
  companyLogo?: StaticImageData | string
  description: Array<WorkSection>
  relatedProjects?: RoleProjectLink[]
}

export interface WorkSection {
  heading?: string
  items: Array<string>
}
