'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import * as React from 'react'
import Project from '@/types/project'
import ProjectModal from './project-modal'
import ToolChip from '@/components/shared/tool-chip'
import { FaArrowRight, FaExternalLinkAlt, FaStar } from 'react-icons/fa'
import { cn, CARD_CLASSNAME } from '@/lib/utils'

/**
 * Props for the ProjectCard component.
 * @param project - The project data object to display.
 */
const ProjectCard = (project: Project) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpen()
    }
  }

  return (
    <>
      <Card
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
        onKeyDown={handleKeyDown}
        className={cn(
          CARD_CLASSNAME,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] pb-3'
        )}
        onClick={handleOpen}
      >
        <CardHeader className="pb-2">
          {/* Top Metadata Row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            {project.link ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--primary-color)] dark:text-[var(--primary-light)]">
                Live Project{' '}
                <FaExternalLinkAlt className="size-2.5" aria-hidden="true" />
              </span>
            ) : (
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Internal Tool
              </span>
            )}
            {project.achievements && project.achievements.length > 0 && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-500/10 font-medium gap-1"
              >
                <FaStar className="size-2 text-amber-500" aria-hidden="true" />
                {project.achievements.length} Highlight
                {project.achievements.length === 1 ? '' : 's'}
              </Badge>
            )}
          </div>

          <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-light)] transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-1">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="pt-2 flex flex-col justify-between flex-1">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tools.map((tool) => {
              return <ToolChip key={tool.title} tool={tool} />
            })}
          </div>

          {/* Interactive Footer CTA */}
          <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-light)] transition-colors mt-auto">
            <span>View details</span>
            <FaArrowRight
              className="size-3 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </CardContent>
      </Card>

      <ProjectModal project={project} open={open} handleClose={handleClose} />
    </>
  )
}

export default ProjectCard
