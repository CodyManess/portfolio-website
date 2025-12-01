import {
  TimelineOppositeContent,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineDot,
  TimelineSeparator,
} from '@mui/lab'
import Image from 'next/image'
import Role from '../../../models/role'
import RoleCard from '../RoleCard/roleCard'
import styles from './roleItem.module.css'
import { Roboto_Mono } from 'next/font/google'

const robotoMono = Roboto_Mono({
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

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
        className={`${styles.timelineSeparator} p-0 flex-none`}
      >
        <p className={`${robotoMono.className} ${styles.date}`}>{role.date}</p>
      </TimelineOppositeContent>
      <TimelineSeparator className="pr-[10px]">
        <TimelineDot
          className="m-[0.5rem_auto] w-[4em] h-[4em] bg-white relative p-[0.5em]"
          variant="outlined"
          color="primary"
        >
          {role.companyLogo && (
            <Image
              className="m-auto max-w-full h-auto"
              src={role.companyLogo}
              alt={`${role.companyName} Logo`}
            />
          )}
        </TimelineDot>
        <TimelineConnector className="min-h-[0.5em]" />
      </TimelineSeparator>
      <TimelineContent className="content-center py-1 px-0">
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
