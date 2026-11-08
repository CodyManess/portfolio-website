import Role from '@/types/role'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/shared/accordion'
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
        <div className="flex flex-col gap-1">
          <h3 className="text-base sm:text-xl font-semibold tracking-tight leading-snug text-[var(--foreground)] group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-light)] group-data-[active=true]:text-[var(--primary-color)] dark:group-data-[active=true]:text-[var(--primary-light)] transition-colors duration-300">
            {role.title}
          </h3>
          <div className="flex flex-col items-start gap-1.5 mt-0.5">
            <p className="text-xs sm:text-[0.95rem] font-semibold text-slate-600 dark:text-slate-300">
              {role.companyName}
            </p>
            <p className="md:hidden text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/90 text-[var(--primary-color)] dark:text-[var(--primary-light)] border border-slate-200/80 dark:border-slate-700/70">
              {role.date}
            </p>
          </div>
        </div>
      </AccordionHeader>

      <AccordionBody>
        <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-4 space-y-4">
          {role.description.map((section, sectionIndex) => (
            <div key={`${role.title}${sectionIndex}`} className="space-y-2">
              {section.heading && (
                <h4 className="text-sm sm:text-[0.95rem] font-semibold text-slate-800 dark:text-slate-100 pl-3 border-l-2 border-[var(--primary-color)] dark:border-[var(--primary-light)] leading-snug">
                  {section.heading}
                </h4>
              )}
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-[0.925rem] leading-relaxed text-slate-600 dark:text-slate-300 marker:text-[var(--primary-color)] dark:marker:text-[var(--primary-light)]">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </AccordionBody>
    </Accordion>
  )
}

export default RoleCard
