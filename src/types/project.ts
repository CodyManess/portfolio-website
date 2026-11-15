import type { ToolIconName } from '@/lib/tool-icons'

export interface Project {
  title: string
  description: string
  link?: string
  achievements: string[]
  tools: Tool[]
}

export interface Tool {
  title: string
  iconName: ToolIconName
  iconColor: string
}
