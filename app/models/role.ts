import { StaticImageData } from 'next/image'
import { WorkSection } from '../data/experience'

export default interface Role {
  date: string
  title: string
  companyName: string
  companyLogo: StaticImageData
  description: Array<WorkSection>
}
