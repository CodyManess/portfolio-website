import type { Role } from '@/types/role'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/shared/accordion'
import { interactiveCardVariants } from '@/components/ui/card'

interface RoleCardProps {
  role: Role
  setExpanded: (index: number | false) => void
  expanded: number | false
  index: number
}

const RoleCard = ({ role, setExpanded, expanded, index }: RoleCardProps) => {
  return (
    <Accordion
      className={interactiveCardVariants()}
      index={index}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <AccordionHeader>
        <div className="flex flex-col gap-1">
          <h3 className="text-base/snug font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-(--primary-color) group-data-[active=true]:text-(--primary-color) sm:text-xl dark:group-hover:text-(--primary-light) dark:group-data-[active=true]:text-(--primary-light)">
            {role.title}
          </h3>
          <div className="mt-0.5 flex flex-col items-start gap-1.5">
            <p className="text-xs font-semibold text-slate-600 sm:text-[0.95rem] dark:text-slate-300">
              {role.companyName}
            </p>
            <p className="rounded-full border border-slate-200/80 bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] font-medium text-(--primary-dark) md:hidden dark:border-slate-700/70 dark:bg-slate-800/90 dark:text-(--primary-light)">
              {role.date}
            </p>
          </div>
        </div>
      </AccordionHeader>

      <AccordionBody>
        <div className="space-y-4 border-t border-slate-200/80 pt-4 dark:border-slate-800/80">
          {role.description.map((section) => (
            <div
              key={`${role.title}-${section.heading ?? section.items[0] ?? 'section'}`}
              className="space-y-2"
            >
              {section.heading ? (
                <h4 className="border-l-2 border-(--primary-color) pl-3 text-sm/snug font-semibold text-slate-800 sm:text-[0.95rem] dark:border-(--primary-light) dark:text-slate-100">
                  {section.heading}
                </h4>
              ) : null}
              <ul className="list-disc space-y-1.5 pl-5 text-sm/relaxed text-slate-600 marker:text-(--primary-color) sm:text-[0.925rem] dark:text-slate-300 dark:marker:text-(--primary-light)">
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
