import type { StaticImageData } from 'next/image'
import type { ToolIconName } from '@/lib/tool-icons'

export interface ProjectPhoto {
  src: StaticImageData | string
  alt: string
  caption?: string
}

export interface Project {
  title: string
  description: string
  link?: string
  photos?: ProjectPhoto[]
  achievements: string[]
  tools: Tool[]
}

export interface Tool {
  title: string
  iconName: ToolIconName
  iconColor: string
}
