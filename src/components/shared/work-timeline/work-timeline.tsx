'use client'
import RoleItem from './role-item'
import React from 'react'
import Role from '@/types/role'

interface WorkTimelineProps {
  roles: Role[]
}

export default function WorkTimeline({ roles }: WorkTimelineProps) {
  const [expanded, setExpanded] = React.useState<number | false>(false)

  return (
    <div className="flex flex-col max-w-screen-lg mx-auto w-full py-8 overflow-hidden">
      {roles.map((role, index) => (
        <RoleItem
          key={index}
          index={index}
          role={role}
          expanded={expanded}
          setExpanded={setExpanded}
          isLast={index === roles.length - 1}
        />
      ))}
    </div>
  )
}
