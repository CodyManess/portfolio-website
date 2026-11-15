'use client'
import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { FaCircleCheck, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import type { Project } from '@/types/project'
import ToolChip from './tool-chip'
import { cn, getSafeExternalUrl } from '@/lib/utils'

interface Props {
  project: Project
  open: boolean
  handleClose: () => void
}

const ProjectModal = ({ project, open, handleClose }: Props) => {
  const safeLink = getSafeExternalUrl(project.link)

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-6 sm:max-w-200">
        {/* Header Section */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pr-8 pb-3">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Project Overview & Technical Details
            </DialogDescription>
          </DialogHeader>

          {safeLink ? (
            <a
              href={safeLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'text-xs font-medium transition-colors hover:border-(--primary-color) hover:text-(--primary-color) focus-visible:outline-none'
              )}
            >
              Visit Project{' '}
              <FaArrowUpRightFromSquare
                className="ml-1.5 size-3"
                aria-hidden="true"
              />
            </a>
          ) : null}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 space-y-6 overflow-y-auto py-4 pr-1">
          {/* Tech Stack Banner */}
          {project.tools.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <ToolChip key={tool.title} tool={tool} />
                ))}
              </div>
            </div>
          ) : null}

          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Overview
            </h3>
            <p className="text-sm/relaxed whitespace-pre-line text-foreground/90">
              {project.description}
            </p>
          </div>

          {/* Key Achievements & Impact Section */}
          {project.achievements.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Key Contributions & Achievements
              </h3>
              <div className="space-y-2.5">
                {project.achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-3 text-sm transition-colors hover:border-(--primary-color)/30 hover:bg-muted/30"
                  >
                    <FaCircleCheck
                      className="mt-0.5 size-4 shrink-0 text-(--primary-color)"
                      aria-hidden="true"
                    />
                    <span className="leading-snug text-foreground">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer Section */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">
            {project.tools.length} Technolog
            {project.tools.length === 1 ? 'y' : 'ies'}
          </span>
          <Button
            variant="ghost"
            onClick={handleClose}
            className="text-xs font-semibold tracking-wider text-(--primary-color) uppercase hover:bg-transparent hover:text-(--primary-dark)"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectModal
