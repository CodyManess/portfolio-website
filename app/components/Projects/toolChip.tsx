import React from 'react'
import { Tool } from '@/app/models/project'

interface ToolChipProps {
  tool: Tool
}

const ToolChip: React.FC<ToolChipProps> = ({ tool }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.5em 1em',
        backgroundColor: 'var(--surface-background)',
        color: 'var(--foreground)',
        borderRadius: '1em',
        margin: '0.5em',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <tool.icon
        style={{ marginRight: '0.5em' }}
        size="1.25em"
        color={tool.iconColor}
      />
      <span style={{ fontSize: '1em' }}>{tool.title}</span>
    </div>
  )
}

export default ToolChip
