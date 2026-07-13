'use client'
import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Project from '@/types/project'
import ToolChip from '@/components/shared/tool-chip'
import Link from 'next/link'

interface Props {
  project: Project
  open: boolean
  handleClose: () => void
}

const ProjectModal = ({ project, open, handleClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="!text-2xl font-light text-[var(--foreground)]">
            {project.title} Details
          </DialogTitle>
          <hr className="border-border mt-2" />
        </DialogHeader>

        <div className="py-2">
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              className="inline-flex items-center text-[var(--primary-color)] hover:underline mb-4 font-medium focus-visible:outline-none"
            >
              Public Link <FaExternalLinkAlt className="ml-2 text-sm" />
            </Link>
          )}

          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="mb-8 text-[var(--foreground)]">{project.description}</p>

          {project.achievements.length !== 0 && (
            <>
              <h3 className="text-lg font-semibold mb-2">Achievements</h3>
              <ul className="list-disc pl-5 mb-8 space-y-1 text-[var(--foreground)]">
                {project.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </>
          )}

          <h3 className="text-lg font-semibold mb-2">Tools Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <ToolChip key={tool.title} tool={tool} />
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="uppercase text-[var(--primary-color)] hover:text-[var(--primary-dark)] hover:bg-transparent font-semibold tracking-wider"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectModal
