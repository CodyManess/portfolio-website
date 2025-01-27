'use client'
import { Timeline, timelineItemClasses } from '@mui/lab'
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
      style={{
        padding: 0,
        maxWidth: '65em',
        justifySelf: 'center',
      }}
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
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
