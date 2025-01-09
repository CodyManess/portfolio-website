import Role from '@/app/models/role'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import * as React from 'react'
import { FaAngleDown } from 'react-icons/fa'
import Image from 'next/image'
import styles from './roleCard.module.css'

interface RoleCardProps {
  role: Role
  setExpanded: (index: number | false) => void
  expanded: number | false
  index: number
}

const RoleCard = ({ role, setExpanded, expanded, index }: RoleCardProps) => {
  return (
    <Accordion
      expanded={expanded === index}
      onChange={() => setExpanded(index === expanded ? false : index)}
    >
      <AccordionSummary
        aria-controls={'panel' + index + '-content'}
        id={'panel' + index + '-header'}
        expandIcon={
          <FaAngleDown size="1.5em" style={{ color: 'var(--foreground)' }} />
        }
      >
        <div className={styles.companyLogo}>
          <Image
            style={{
              margin: 'auto',
              maxWidth: '100%',
              height: 'auto',
            }}
            src={role.companyLogo}
            alt={`${role.companyName} Logo`}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="h3">
            {role.title}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {role.companyName}
          </Typography>
          <Typography
            variant="subtitle2"
            component="p"
            className={styles.companyDateMobile}
          >
            {role.date}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {role.description.map((section, index) => (
          <div key={`${role.title}${index}`}>
            <Typography component="h5">{section.heading}</Typography>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default RoleCard
