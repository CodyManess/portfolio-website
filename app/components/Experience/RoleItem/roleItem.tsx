import {
  TimelineOppositeContent,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineDot,
  TimelineSeparator,
} from '@mui/lab'
import { Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import Role from '../../../models/role'
import RoleCard from '../RoleCard/roleCard'
import styles from './roleItem.module.css'

interface RoleItemProps {
  role: Role
  setExpanded: (index: number | false) => void
  expanded: number | false
  index: number
}

export default function RoleItem({
  role,
  setExpanded,
  expanded,
  index,
}: RoleItemProps) {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        className={styles.timelineSeparator}
        sx={{ padding: 0, flex: 0 }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{
            padding: '1em',
            textWrap: 'nowrap',
            paddingTop: '1.5em',
          }}
        >
          {role.date}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator style={{ paddingRight: '10px' }}>
        <TimelineDot
          style={{
            margin: '0.5rem auto',
            width: '4em',
            height: '4em',
            backgroundColor: 'white',
            position: 'relative',
            padding: '0.5em',
          }}
          variant="outlined"
          color="primary"
        >
          <Image
            style={{
              margin: 'auto',
              maxWidth: '100%',
              height: 'auto',
            }}
            src={role.companyLogo}
            alt={`${role.companyName} Logo`}
          />
        </TimelineDot>
        <TimelineConnector style={{ minHeight: '0.5em' }} />
      </TimelineSeparator>
      <TimelineContent style={{ alignContent: 'center', padding: '4px 0' }}>
        <RoleCard
          role={role}
          setExpanded={setExpanded}
          expanded={expanded}
          index={index}
        />
      </TimelineContent>
    </TimelineItem>
  )
}
