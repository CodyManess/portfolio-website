'use client'
import * as React from 'react'
import type { Tool } from '@/types/project'
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
    // eslint-disable-next-line jsx-a11y/prefer-tag-over-role -- Toolbar of toggle buttons is not a form <fieldset>
    <div
      className="mb-8 flex flex-wrap items-center justify-center gap-2"
      role="group"
      aria-label="Filter projects by technology"
    >
      <button
        type="button"
        onClick={() => onSelectTool(null)}
        aria-pressed={selectedTool === null}
        className={cn(
          'inline-flex cursor-pointer items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          selectedTool === null
            ? '-translate-y-0.5 border-(--primary-color) bg-(--primary-color) text-white shadow-sm ring-2 ring-(--primary-color)/30'
            : 'border-slate-200/80 bg-slate-50/60 text-slate-700 hover:-translate-y-0.5 hover:border-(--primary-color)/40 hover:text-(--primary-color) dark:border-slate-800/50 dark:bg-slate-900/40 dark:text-slate-200'
        )}
      >
        <span>All</span>
        <span
          className={cn(
            'ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] leading-none font-medium transition-colors',
            selectedTool === null
              ? 'bg-black/25 font-semibold text-white'
              : 'bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
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
              'inline-flex cursor-pointer items-center rounded-full border px-3 py-1.5 text-xs font-semibold shadow-xs transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              isSelected
                ? '-translate-y-0.5 border-(--tool-color) bg-(--tool-bg) text-slate-900 shadow-sm ring-2 ring-(--tool-color)/30 dark:text-white'
                : 'border-slate-200/80 bg-slate-50/60 text-slate-700 hover:-translate-y-0.5 hover:border-(--hover-border) hover:bg-(--hover-bg) hover:text-slate-900 dark:border-slate-800/50 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:text-white'
            )}
            style={
              {
                '--tool-color': tool.iconColor,
                '--tool-bg': `${tool.iconColor}18`,
                '--hover-border': `${tool.iconColor}50`,
                '--hover-bg': `${tool.iconColor}12`,
              } as React.CSSProperties
            }
          >
            {IconComponent ? (
              <IconComponent
                className="mr-1.5 shrink-0 transition-transform duration-300"
                size="0.875rem"
                color={tool.iconColor}
                aria-hidden="true"
              />
            ) : null}
            <span>{tool.title}</span>
            <span
              className={cn(
                'ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] leading-none font-medium transition-colors',
                isSelected
                  ? 'bg-slate-900 font-semibold text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
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
