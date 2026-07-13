import Role from '@/types/role'
import { Accordion, AccordionBody, AccordionHeader } from '../accordion'
import { CARD_CLASSNAME } from '@/lib/utils'

interface RoleCardProps {
  role: Role
  setExpanded: (index: number | false) => void
  expanded: number | false
  index: number
}

const RoleCard = ({ role, setExpanded, expanded, index }: RoleCardProps) => {
  return (
    <Accordion
      className={CARD_CLASSNAME}
      index={index}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <AccordionHeader>
        <h3 className="mb-[0.4rem] text-[var(--foreground)] group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-light)] transition-colors duration-300">
          {role.title}
        </h3>
        <p className="subtitle1">{role.companyName}</p>
        <p className="subtitle2 mt-1 md:hidden">{role.date}</p>
      </AccordionHeader>

      <AccordionBody>
        {role.description.map((section, index) => (
          <div key={`${role.title}${index}`}>
            {section.heading && (
              <h4 className="subtitle2">{section.heading}</h4>
            )}
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-300">
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
