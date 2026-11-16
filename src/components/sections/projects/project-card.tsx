'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import * as React from 'react'
import type { Project } from '@/types/project'
import ProjectModal from './project-modal'
import ToolChip from './tool-chip'
import { FaArrowRight, FaArrowUpRightFromSquare, FaStar } from 'react-icons/fa6'
import { getSafeExternalUrl } from '@/lib/utils'

/**
 * Props for the ProjectCard component.
 * @param project - The project data object to display.
 */
const ProjectCard = (project: Project) => {
  const [open, setOpen] = React.useState(false)
  const [hasOpened, setHasOpened] = React.useState(false)
  const safeLink = getSafeExternalUrl(project.link)
  const handleOpen = () => {
    setHasOpened(true)
    setOpen(true)
  }
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
        variant="interactive"
        tabIndex={0}
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Card contains block headings/paragraphs invalid inside <button>
        role="button"
        aria-label={`View details for ${project.title}`}
        onKeyDown={handleKeyDown}
        className="pb-3 focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none"
        onClick={handleOpen}
      >
        <CardHeader className="pb-2">
          {/* Top Metadata Row */}
          <div className="mb-2 flex items-center justify-between gap-2">
            {safeLink ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-(--primary-color) dark:text-(--primary-light)">
                Live Project{' '}
                <FaArrowUpRightFromSquare
                  className="size-2.5"
                  aria-hidden="true"
                />
              </span>
            ) : (
              <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                Internal Tool
              </span>
            )}
            {project.achievements.length > 0 ? (
              <Badge
                variant="outline"
                className="gap-1 border-amber-500/30 bg-amber-500/10 px-1.5 py-0 text-[10px] font-medium text-amber-700 dark:text-amber-400"
              >
                <FaStar className="size-2 text-amber-500" aria-hidden="true" />
                {project.achievements.length} Highlight
                {project.achievements.length === 1 ? '' : 's'}
              </Badge>
            ) : null}
          </div>

          <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-(--primary-color) dark:group-hover:text-(--primary-light)">
            {project.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs/relaxed text-muted-foreground">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between pt-2">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tools.map((tool) => {
              return <ToolChip key={tool.title} tool={tool} />
            })}
          </div>

          {/* Interactive Footer CTA */}
          <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3 text-xs font-medium text-muted-foreground transition-colors group-hover:text-(--primary-color) dark:group-hover:text-(--primary-light)">
            <span>View details</span>
            <FaArrowRight
              className="size-3 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </CardContent>
      </Card>

      {hasOpened ? (
        <ProjectModal project={project} open={open} handleClose={handleClose} />
      ) : null}
    </>
  )
}

export default ProjectCard
