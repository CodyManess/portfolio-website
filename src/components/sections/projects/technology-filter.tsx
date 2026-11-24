'use client'
import type { Tool } from '@/types/project'
import { cn } from '@/lib/utils'
import { toolIconMap } from '@/lib/tool-icons'
import { toolChipBaseClass, type CssVariableStyle } from './tool-chip'

interface Props {
  tools: Tool[]
  selectedTool: string | null
  onSelectTool: (toolTitle: string | null) => void
  toolCounts: Record<string, number>
  totalCount: number
}

const getCountBadgeClass = (
  isSelected: boolean,
  variant: 'primary' | 'tool' = 'tool'
) =>
  cn(
    'ml-1.5 rounded-full px-1.5 py-0.5 text-2xs leading-none font-medium transition-colors',
    isSelected
      ? variant === 'primary'
        ? 'bg-black/25 font-semibold text-white'
        : 'bg-foreground font-semibold text-background'
      : 'bg-muted text-muted-foreground'
  )

const TechnologyFilter = ({
  tools,
  selectedTool,
  onSelectTool,
  toolCounts,
  totalCount,
}: Props) => {
  return (
    <div
      className="mb-8 flex flex-wrap items-center justify-center gap-2"
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Toolbar of toggle buttons is not a form <fieldset>
      role="group"
      aria-label="Filter projects by technology"
    >
      <button
        type="button"
        onClick={() => onSelectTool(null)}
        aria-pressed={selectedTool === null}
        className={cn(
          toolChipBaseClass,
          'cursor-pointer px-3.5 py-1.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          selectedTool === null
            ? '-translate-y-0.5 border-primary bg-primary text-primary-foreground shadow-sm ring-2 ring-ring/30 hover:border-primary hover:text-primary-foreground motion-reduce:translate-y-0'
            : 'hover:border-brand/40 hover:text-brand'
        )}
      >
        <span>All</span>
        <span className={getCountBadgeClass(selectedTool === null, 'primary')}>
          {totalCount}
        </span>
      </button>

      {tools.map((tool) => {
        const IconComponent = toolIconMap[tool.iconName]
        const isSelected = selectedTool === tool.title
        const count = toolCounts[tool.title] ?? 0
        const toolStyle: CssVariableStyle = {
          '--tool-color': tool.iconColor,
          '--tool-bg': `${tool.iconColor}18`,
          '--hover-border': `${tool.iconColor}50`,
          '--hover-bg': `${tool.iconColor}12`,
        }

        return (
          <button
            key={tool.title}
            type="button"
            onClick={() => onSelectTool(isSelected ? null : tool.title)}
            aria-pressed={isSelected}
            className={cn(
              toolChipBaseClass,
              'cursor-pointer px-3 py-1.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              isSelected
                ? '-translate-y-0.5 border-(--tool-color) bg-(--tool-bg) text-foreground shadow-sm ring-2 ring-(--tool-color)/30 motion-reduce:translate-y-0'
                : 'hover:border-(--hover-border) hover:bg-(--hover-bg) hover:text-foreground'
            )}
            style={toolStyle}
          >
            <IconComponent
              className="mr-1.5 shrink-0"
              size="0.875rem"
              color={tool.iconColor}
              aria-hidden="true"
            />
            <span>{tool.title}</span>
            <span className={getCountBadgeClass(isSelected)}>{count}</span>
          </button>
        )
      })}
    </div>
  )
}

export default TechnologyFilter
