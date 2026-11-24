import type { CSSProperties } from 'react'
import type { Tool } from '@/types/project'
import { toolIconMap } from '@/lib/tool-icons'
import { cn } from '@/lib/utils'

export type CssVariableStyle = CSSProperties & Record<`--${string}`, string>

export const toolChipBaseClass =
  'inline-flex items-center rounded-full border border-border/80 bg-muted/40 text-xs font-semibold text-foreground/85 shadow-xs transition-all duration-300 ease-out hover:-translate-y-0.5 motion-reduce:hover:translate-y-0'

interface ToolChipProps {
  tool: Tool
}

const ToolChip = ({ tool }: ToolChipProps) => {
  const IconComponent = toolIconMap[tool.iconName]
  const chipStyle: CssVariableStyle = {
    '--hover-border': `${tool.iconColor}40`,
    '--hover-bg': `${tool.iconColor}10`,
  }

  return (
    <div
      className={cn(
        toolChipBaseClass,
        'cursor-default px-3 py-1 hover:border-(--hover-border) hover:bg-(--hover-bg) hover:text-foreground'
      )}
      style={chipStyle}
    >
      <IconComponent
        className="mr-1.5 shrink-0"
        size="0.875rem"
        color={tool.iconColor}
        aria-hidden="true"
      />
      <span>{tool.title}</span>
    </div>
  )
}

export default ToolChip
