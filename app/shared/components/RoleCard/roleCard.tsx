import * as React from 'react'
import styles from './roleCard.module.css'
import Role from '@/shared/models/role'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '../Accordion/accordion'

interface RoleCardProps {
  role: Role
  setExpanded: (index: number | false) => void
  expanded: number | false
  index: number
}

const RoleCard = ({ role, setExpanded, expanded, index }: RoleCardProps) => {
  return (
    <Accordion
      className="card"
      index={index}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <AccordionHeader>
        <h3 style={{ marginBottom: '0.4rem' }}>{role.title}</h3>
        <p className="subtitle1">{role.companyName}</p>
        <p className={`subtitle2 ${styles.companyDateMobile}`}>{role.date}</p>
      </AccordionHeader>

      <AccordionBody>
        {role.description.map((section, index) => (
          <div key={`${role.title}${index}`}>
            {section.heading && (
              <h4 className="subtitle2">{section.heading}</h4>
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
