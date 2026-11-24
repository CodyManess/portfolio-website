import type { Role } from '@/types/role'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/shared/accordion'
import { Overline } from '@/components/shared/page-section'
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
        'hover:translate-y-0',
        isHighlighted && HIGHLIGHT_RING_CLASS
      )}
      isOpen={isExpanded}
      onToggle={onToggle}
    >
      <AccordionHeader>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base/snug font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand group-data-[active=true]:text-brand sm:text-xl">
              {role.title}
            </h3>
            {role.employmentType ? (
              <Badge variant="subtle">{role.employmentType}</Badge>
            ) : null}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <p className="text-sm font-semibold text-foreground/85 sm:text-base">
              {role.companyName}
            </p>
            {role.location ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground sm:text-sm">
                <FaLocationDot
                  className="size-3 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <span>{role.location}</span>
              </span>
            ) : null}
            <Badge variant="brand" className="font-mono md:hidden">
              {role.date}
            </Badge>
          </div>
        </div>
      </AccordionHeader>

      <AccordionBody>
        <div className="space-y-4 border-t border-border/80 pt-4">
          {role.description.map((section) => (
            <div
              key={`${role.title}-${section.heading ?? section.items[0] ?? 'section'}`}
              className="space-y-2"
            >
              {section.heading ? (
                <h4 className="border-l-2 border-brand pl-3 text-sm/snug font-semibold tracking-tight text-foreground">
                  {section.heading}
                </h4>
              ) : null}
              <ul className="list-disc space-y-1.5 pl-5 text-sm/relaxed text-foreground/85 marker:text-brand">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          {relatedProjects.length > 0 ? (
            <div className="border-t border-border/80 pt-3">
              <Overline as="p" className="mb-2">
                Related Projects
              </Overline>
              <div className="flex flex-wrap gap-2">
                {relatedProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => handleProjectClick(project.id)}
                    aria-label={`View ${project.title} in Projects section`}
                    className="group/project-link inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-strong transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-brand/15 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:hover:translate-y-0"
                  >
                    <FaDiagramProject
                      className="size-3 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{project.title}</span>
                    <FaArrowRight
                      className="size-2.5 transition-transform duration-200 group-hover/project-link:translate-x-0.5 motion-reduce:group-hover/project-link:translate-x-0"
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
