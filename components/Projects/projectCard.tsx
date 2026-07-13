'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import * as React from 'react'
import Project from '@/shared/models/project'
import ProjectModal from './projectModal'
import ToolChip from '@/shared/components/toolChip'

/**
 * Props for the ProjectCard component.
 * @param project - The project data object to display.
 */
const ProjectCard = (project: Project) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Card
        className="group h-full flex flex-col justify-between cursor-pointer border border-slate-200/80 dark:border-slate-800/40 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900/60 dark:to-slate-950/80 rounded-2xl shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,122,184,0.12)] hover:border-[var(--primary-color)]/30 dark:hover:border-[var(--primary-light)]/40 pb-4"
        onClick={handleOpen}
      >
        <CardHeader className="pb-2">
          <h3 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-light)] transition-colors duration-300">
            {project.title}
          </h3>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => {
              return <ToolChip key={tool.title} tool={tool} />
            })}
          </div>
        </CardContent>
      </Card>

      <ProjectModal project={project} open={open} handleClose={handleClose} />
    </>
  )
}

export default ProjectCard
