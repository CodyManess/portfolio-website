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
import Project from '@/types/project'
import ToolChip from '@/components/shared/tool-chip'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
  project: Project
  open: boolean
  handleClose: () => void
}

const ProjectModal = ({ project, open, handleClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col p-6 gap-0 overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-wrap items-start justify-between gap-3 pr-8 pb-3 border-b border-border">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Project Overview & Technical Details
            </DialogDescription>
          </DialogHeader>

          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'text-xs font-medium hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-colors focus-visible:outline-none'
              )}
            >
              Visit Project{' '}
              <FaArrowUpRightFromSquare className="ml-1.5 size-3" />
            </Link>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-6">
          {/* Tech Stack Banner */}
          {project.tools && project.tools.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <ToolChip key={tool.title} tool={tool} />
                ))}
              </div>
            </div>
          )}

          {/* Description Section */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Overview
            </h4>
            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Key Achievements & Impact Section */}
          {project.achievements && project.achievements.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Key Contributions & Achievements
              </h4>
              <div className="space-y-2.5">
                {project.achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl border border-border/70 bg-card hover:border-[var(--primary-color)]/30 hover:bg-muted/30 transition-colors text-sm"
                  >
                    <FaCircleCheck
                      className="size-4 text-[var(--primary-color)] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-foreground leading-snug">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <span className="text-xs text-muted-foreground">
            {project.tools.length} Technolog
            {project.tools.length === 1 ? 'y' : 'ies'}
          </span>
          <Button
            variant="ghost"
            onClick={handleClose}
            className="uppercase text-[var(--primary-color)] hover:text-[var(--primary-dark)] hover:bg-transparent font-semibold tracking-wider text-xs"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectModal
