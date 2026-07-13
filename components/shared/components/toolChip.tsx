import React from 'react'
import { Tool } from '@/shared/models/project'

interface ToolChipProps {
  tool: Tool
}

const ToolChip: React.FC<ToolChipProps> = ({ tool }) => {
  return (
    <div
      className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border border-slate-200/80 dark:border-slate-800/50 bg-slate-50/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 transition-all duration-300 ease-out hover:-translate-y-0.5 cursor-default hover:border-[var(--hover-border)] hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)] shadow-xs"
      style={
        {
          '--hover-border': `${tool.iconColor}40`,
          '--hover-bg': `${tool.iconColor}10`,
          '--hover-text': tool.iconColor,
        } as React.CSSProperties
      }
    >
      <tool.icon
        className="mr-1.5 transition-transform duration-300"
        size="0.875rem"
        color={tool.iconColor}
      />
      <span>{tool.title}</span>
    </div>
  )
}

export default ToolChip
