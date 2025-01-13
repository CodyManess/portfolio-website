import * as React from 'react'
import styles from './roleCard.module.css'
import Role from '@/app/models/role'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '../../Shared/Accordion/accordion'
import { Typography } from '@mui/material'

interface RoleCardProps {
  role: Role
  setExpanded: (index: number | false) => void
  expanded: number | false
  index: number
}

const RoleCard = ({ role, setExpanded, expanded, index }: RoleCardProps) => {
  return (
    <Accordion index={index} expanded={expanded} setExpanded={setExpanded}>
      <AccordionHeader>
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
      </AccordionHeader>

      <AccordionBody>
        {role.description.map((section, index) => (
          <div key={`${role.title}${index}`}>
            {section.heading && (
              <Typography component="h4">{section.heading}</Typography>
            )}
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </AccordionBody>
    </Accordion>
  )
}

export default RoleCard
