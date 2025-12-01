import React from 'react'
import { Tool } from '@/shared/models/project'

interface ToolChipProps {
  tool: Tool
}

const ToolChip: React.FC<ToolChipProps> = ({ tool }) => {
  return (
    <div className="inline-flex items-center px-4 py-2 bg-[var(--surface-background)] text-[var(--foreground)] rounded-[2rem] m-1 shadow-sm">
      <tool.icon className="mr-2" size="1rem" color={tool.iconColor} />
      <span className="text-base">{tool.title}</span>
    </div>
  )
}

export default ToolChip
