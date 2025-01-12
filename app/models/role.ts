import { StaticImageData } from 'next/image'

export default interface Role {
  date: string
  title: string
  companyName: string
  companyLogo: StaticImageData
  description: Array<WorkSection>
}

export interface WorkSection {
  heading?: string
  items: Array<string>
}
