'use client'
import * as React from 'react'
import { Tool } from '@/types/project'
import { cn } from '@/lib/utils'
import { toolIconMap } from '@/lib/tool-icons'

interface Props {
  tools: Tool[]
  selectedTool: string | null
  onSelectTool: (toolTitle: string | null) => void
  toolCounts: Record<string, number>
  totalCount: number
}

const TechnologyFilter = ({
  tools,
  selectedTool,
  onSelectTool,
  toolCounts,
  totalCount,
}: Props) => {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 mb-8"
      role="group"
      aria-label="Filter projects by technology"
    >
      <button
        type="button"
        onClick={() => onSelectTool(null)}
        aria-pressed={selectedTool === null}
        className={cn(
          'inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ease-out cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          selectedTool === null
            ? 'bg-[var(--primary-color)] border-[var(--primary-color)] text-white ring-2 ring-[var(--primary-color)]/30 -translate-y-0.5 shadow-sm'
            : 'border-slate-200/80 dark:border-slate-800/50 bg-slate-50/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 hover:-translate-y-0.5 hover:border-[var(--primary-color)]/40 hover:text-[var(--primary-color)]'
        )}
      >
        <span>All</span>
        <span
          className={cn(
            'ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium leading-none transition-colors',
            selectedTool === null
              ? 'bg-white/25 text-white'
              : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          )}
        >
          {totalCount}
        </span>
      </button>

      {tools.map((tool) => {
        const IconComponent = toolIconMap[tool.iconName]
        const isSelected = selectedTool === tool.title
        const count = toolCounts[tool.title] ?? 0

        return (
          <button
            key={tool.title}
            type="button"
            onClick={() => onSelectTool(isSelected ? null : tool.title)}
            aria-pressed={isSelected}
            className={cn(
              'inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ease-out cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isSelected
                ? 'border-[var(--tool-color)] bg-[var(--tool-bg)] text-[var(--tool-text)] ring-2 ring-[var(--tool-color)]/30 -translate-y-0.5 shadow-sm'
                : 'border-slate-200/80 dark:border-slate-800/50 bg-slate-50/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 hover:-translate-y-0.5 hover:border-[var(--hover-border)] hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)]'
            )}
            style={
              {
                '--tool-color': tool.iconColor,
                '--tool-bg': `${tool.iconColor}18`,
                '--tool-text': tool.iconColor,
                '--hover-border': `${tool.iconColor}50`,
                '--hover-bg': `${tool.iconColor}12`,
                '--hover-text': tool.iconColor,
              } as React.CSSProperties
            }
          >
            {IconComponent && (
              <IconComponent
                className="mr-1.5 transition-transform duration-300 shrink-0"
                size="0.875rem"
                color={tool.iconColor}
              />
            )}
            <span>{tool.title}</span>
            <span
              className={cn(
                'ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium leading-none transition-colors',
                isSelected
                  ? 'bg-[var(--tool-color)] text-white'
                  : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              )}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default TechnologyFilter
