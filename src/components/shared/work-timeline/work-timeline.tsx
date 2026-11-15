'use client'
import RoleItem from './role-item'
import React from 'react'
import type { Role } from '@/types/role'

interface WorkTimelineProps {
  roles: Role[]
}

export default function WorkTimeline({ roles }: WorkTimelineProps) {
  const [expanded, setExpanded] = React.useState<number | false>(false)

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col py-6 md:grid md:grid-cols-[max-content_auto_minmax(0,1fr)]">
      {roles.map((role, index) => (
        <RoleItem
          key={`${role.companyName}-${role.title}-${role.date}`}
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
