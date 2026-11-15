import type { StaticImageData } from 'next/image'

export interface Role {
  date: string
  title: string
  companyName: string
  companyLogo?: StaticImageData
  description: Array<WorkSection>
}

export interface WorkSection {
  heading?: string
  items: Array<string>
}
