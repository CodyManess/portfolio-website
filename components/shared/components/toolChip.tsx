import React from 'react'
import { Tool } from '@/shared/models/project'

interface ToolChipProps {
  tool: Tool
}

const ToolChip: React.FC<ToolChipProps> = ({ tool }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--surface-background)',
        color: 'var(--foreground)',
        borderRadius: '2rem',
        margin: '0.25rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <tool.icon
        style={{ marginRight: '0.5rem' }}
        size="1rem"
        color={tool.iconColor}
      />
      <span style={{ fontSize: '1rem' }}>{tool.title}</span>
    </div>
  )
}

export default ToolChip
