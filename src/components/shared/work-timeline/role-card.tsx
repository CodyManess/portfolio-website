import type { Role } from '@/types/role'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/shared/accordion'
import { Badge } from '@/components/ui/badge'
import { interactiveCardVariants } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  HIGHLIGHT_RING_CLASS,
  scrollElementIntoView,
  usePortfolioLinks,
} from '@/components/shared/portfolio-link-context'
import { FaArrowRight, FaDiagramProject, FaLocationDot } from 'react-icons/fa6'

interface RoleCardProps {
  role: Role
  isExpanded: boolean
  onToggle: () => void
  isHighlighted?: boolean
}

const RoleCard = ({
  role,
  isExpanded,
  onToggle,
  isHighlighted = false,
}: RoleCardProps) => {
  const linkContext = usePortfolioLinks()
  const relatedProjects = role.relatedProjects ?? []

  const handleProjectClick = (projectId: string) => {
    if (linkContext) {
      linkContext.navigateToProject(projectId)
      return
    }
    scrollElementIntoView(document.getElementById('projects'), {
      block: 'start',
    })
  }

  return (
    <Accordion
      className={cn(
        interactiveCardVariants(),
        isHighlighted && HIGHLIGHT_RING_CLASS
      )}
      isOpen={isExpanded}
      onToggle={onToggle}
    >
      <AccordionHeader>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base/snug font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-(--primary-color) group-data-[active=true]:text-(--primary-color) sm:text-xl dark:group-hover:text-(--primary-light) dark:group-data-[active=true]:text-(--primary-light)">
              {role.title}
            </h3>
            {role.employmentType ? (
              <Badge
                variant="outline"
                className="bg-muted/60 text-[11px] text-muted-foreground"
              >
                {role.employmentType}
              </Badge>
            ) : null}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <p className="text-xs font-semibold text-slate-600 sm:text-[0.95rem] dark:text-slate-300">
              {role.companyName}
            </p>
            {role.location ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <FaLocationDot
                  className="size-3 shrink-0 text-(--primary-color) dark:text-(--primary-light)"
                  aria-hidden="true"
                />
                <span>{role.location}</span>
              </span>
            ) : null}
            <Badge
              variant="outline"
              className="bg-muted/60 font-mono text-[11px] text-(--primary-dark) md:hidden dark:text-(--primary-light)"
            >
              {role.date}
            </Badge>
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
          {relatedProjects.length > 0 ? (
            <div className="border-t border-slate-200/80 pt-3 dark:border-slate-800/80">
              <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Related Projects
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => handleProjectClick(project.id)}
                    aria-label={`View ${project.title} in Projects section`}
                    className="group/project-link inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-(--primary-color)/25 bg-(--primary-color)/8 px-3 py-1 text-xs font-medium text-(--primary-dark) transition-all duration-200 hover:-translate-y-0.5 hover:border-(--primary-color)/50 hover:bg-(--primary-color)/15 focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none dark:border-(--primary-light)/30 dark:bg-(--primary-light)/10 dark:text-(--primary-light) dark:hover:border-(--primary-light)/60 dark:hover:bg-(--primary-light)/20"
                  >
                    <FaDiagramProject
                      className="size-3 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{project.title}</span>
                    <FaArrowRight
                      className="size-2.5 transition-transform duration-200 group-hover/project-link:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </AccordionBody>
    </Accordion>
  )
}

export default RoleCard
