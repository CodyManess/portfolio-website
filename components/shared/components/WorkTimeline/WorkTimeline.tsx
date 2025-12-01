'use client'
import { Timeline } from '@mui/lab'
import RoleItem from './RoleItem/roleItem'
import React from 'react'
import Role from '@/shared/models/role'

interface WorkTimelineProps {
  roles: Role[]
}

export default function WorkTimeline({ roles }: WorkTimelineProps) {
  const [expanded, setExpanded] = React.useState<number | false>(false)
  return (
    <Timeline
      position="right"
      className="p-0 max-w-[65em] justify-self-center [&_.MuiTimelineItem-root::before]:flex-none [&_.MuiTimelineItem-root::before]:p-0"
    >
      {roles.map((role, index) => (
        <RoleItem
          key={index}
          index={index}
          role={role}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </Timeline>
  )
}
