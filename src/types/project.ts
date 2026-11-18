import type { StaticImageData } from 'next/image'
import type { ToolIconName } from '@/lib/tool-icons'

export interface ProjectPhoto {
  src: StaticImageData | string
  alt: string
  caption?: string
}

export interface ProjectRoleLink {
  id: string
  title: string
  companyName: string
  date: string
}

export interface Project {
  id?: string
  title: string
  description: string
  link?: string
  photos?: ProjectPhoto[]
  achievements: string[]
  tools: Tool[]
  relatedRoles?: ProjectRoleLink[]
}

export interface Tool {
  title: string
  iconName: ToolIconName
  iconColor: string
}
