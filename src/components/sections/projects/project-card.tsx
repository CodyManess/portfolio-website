'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useMemo, useState, type KeyboardEvent } from 'react'
import type { Project } from '@/types/project'
import ProjectModal from './project-modal'
import ToolChip from './tool-chip'
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaStar,
  FaSuitcase,
} from 'react-icons/fa6'
import { cn, getSafeExternalUrl } from '@/lib/utils'
import { HIGHLIGHT_RING_CLASS } from '@/components/shared/portfolio-link-context'

interface ProjectCardProps extends Project {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  isHighlighted?: boolean
}

/**
 * Props for the ProjectCard component.
 * @param props - The project data object and optional modal/cross-link controls.
 */
const ProjectCard = ({
  isOpen,
  onOpenChange,
  isHighlighted = false,
  ...project
}: ProjectCardProps) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const isControlled = isOpen !== undefined
  const open = isControlled ? isOpen : internalOpen
  const safeLink = getSafeExternalUrl(project.link)

  const companyNames = useMemo(() => {
    const roles = project.relatedRoles ?? []
    return Array.from(new Set(roles.map((role) => role.companyName)))
  }, [project.relatedRoles])

  const handleOpen = () => {
    setHasOpened(true)
    if (isControlled) {
      onOpenChange?.(true)
    } else {
      setInternalOpen(true)
    }
  }
  const handleClose = () => {
    if (isControlled) {
      onOpenChange?.(false)
    } else {
      setInternalOpen(false)
    }
  }

  const shouldRenderModal = hasOpened || open

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpen()
    }
  }

  return (
    <>
      <Card
        id={project.id ? `project-${project.id}` : undefined}
        variant="interactive"
        tabIndex={0}
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Card contains block headings/paragraphs invalid inside <button>
        role="button"
        aria-label={`View details for ${project.title}`}
        onKeyDown={handleKeyDown}
        className={cn(
          'scroll-mt-28 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          isHighlighted && HIGHLIGHT_RING_CLASS
        )}
        onClick={handleOpen}
      >
        <CardHeader>
          {/* Top Metadata Row */}
          <div className="mb-2 flex items-center justify-between gap-2">
            {safeLink ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
                Live Project{' '}
                <FaArrowUpRightFromSquare
                  className="size-2.5"
                  aria-hidden="true"
                />
              </span>
            ) : (
              <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Internal Tool
              </span>
            )}
            {project.achievements.length > 0 ? (
              <Badge variant="highlight" className="gap-1">
                <FaStar
                  className="size-2.5 text-amber-600 dark:text-amber-400"
                  aria-hidden="true"
                />
                {project.achievements.length} Highlight
                {project.achievements.length === 1 ? '' : 's'}
              </Badge>
            ) : null}
          </div>

          <h3 className="text-lg/snug font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand">
            {project.title}
          </h3>

          {companyNames.length > 0 ? (
            <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium text-brand">
              <FaSuitcase className="size-3 shrink-0" aria-hidden="true" />
              <span>{companyNames.join(', ')}</span>
            </p>
          ) : null}

          <p className="mt-1 line-clamp-2 text-sm/relaxed text-muted-foreground">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tools.map((tool) => {
              return <ToolChip key={tool.title} tool={tool} />
            })}
          </div>

          {/* Interactive Footer CTA */}
          <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3 text-xs font-medium text-muted-foreground transition-colors group-hover:text-brand">
            <span>View details</span>
            <FaArrowRight
              className="size-3 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              aria-hidden="true"
            />
          </div>
        </CardContent>
      </Card>

      {shouldRenderModal ? (
        <ProjectModal project={project} open={open} handleClose={handleClose} />
      ) : null}
    </>
  )
}

export default ProjectCard
