import React from 'react'
import type { Tool } from '@/types/project'
import { toolIconMap } from '@/lib/tool-icons'

interface ToolChipProps {
  tool: Tool
}

const ToolChip: React.FC<ToolChipProps> = ({ tool }) => {
  const IconComponent = toolIconMap[tool.iconName]

  return (
    <div
      className="inline-flex cursor-default items-center rounded-full border border-slate-200/80 bg-slate-50/60 px-3 py-1 text-xs font-semibold text-slate-700 shadow-xs transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-(--hover-border) hover:bg-(--hover-bg) hover:text-slate-900 dark:border-slate-800/50 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:text-white"
      style={
        {
          '--hover-border': `${tool.iconColor}40`,
          '--hover-bg': `${tool.iconColor}10`,
        } as React.CSSProperties
      }
    >
      <IconComponent
        className="mr-1.5 transition-transform duration-300"
        size="0.875rem"
        color={tool.iconColor}
        aria-hidden="true"
      />
      <span>{tool.title}</span>
    </div>
  )
}

export default ToolChip
