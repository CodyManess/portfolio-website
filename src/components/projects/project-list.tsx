'use client'

import * as React from 'react'
import { useEffect, useState, useMemo } from 'react'
import ProjectCard from './project-card'
import TechnologyFilter from './technology-filter'
import Pagination from '@/components/shared/pagination'
import Project, { Tool } from '@/types/project'
import { Button } from '@/components/ui/button'

const PROJECTS_PER_PAGE = 6

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Project[] = await response.json()
        setProjects(data)
      } catch (err) {
        setError('Failed to load project data.')
        console.error('Error fetching project data:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const availableTools = useMemo(() => {
    const toolMap = new Map<string, Tool>()
    if (Array.isArray(projects)) {
      projects.forEach((project) => {
        project.tools?.forEach((tool) => {
          if (!toolMap.has(tool.title)) {
            toolMap.set(tool.title, tool)
          }
        })
      })
    }
    return Array.from(toolMap.values()).sort((a, b) =>
      a.title.localeCompare(b.title)
    )
  }, [projects])

  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    if (Array.isArray(projects)) {
      projects.forEach((project) => {
        project.tools?.forEach((tool) => {
          counts[tool.title] = (counts[tool.title] || 0) + 1
        })
      })
    }
    return counts
  }, [projects])

  const handleSelectTool = (toolTitle: string | null) => {
    setSelectedTool(toolTitle)
    setCurrentPage(1)
  }

  const filteredProjects = useMemo(() => {
    if (!selectedTool || !Array.isArray(projects)) {
      return projects
    }
    return projects.filter((project) =>
      project.tools?.some((tool) => tool.title === selectedTool)
    )
  }, [projects, selectedTool])

  if (isLoading) {
    return (
      <div className="flex justify-center my-8 w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)]"></div>
      </div>
    )
  }

  if (error) {
    return <div className="my-8 text-center text-red-500">{error}</div>
  }

  const totalPages = Math.ceil(
    (Array.isArray(filteredProjects) ? filteredProjects.length : 0) /
      PROJECTS_PER_PAGE
  )
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE
  const currentProjects = Array.isArray(filteredProjects)
    ? filteredProjects.slice(startIndex, endIndex)
    : []

  return (
    <>
      {availableTools.length > 0 && (
        <TechnologyFilter
          tools={availableTools}
          selectedTool={selectedTool}
          onSelectTool={handleSelectTool}
          toolCounts={toolCounts}
          totalCount={projects.length}
        />
      )}

      {currentProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {currentProjects.map((project) => {
            return <ProjectCard key={project.title} {...project} />
          })}
        </div>
      ) : (
        <div className="text-center py-12 space-y-3">
          <p className="text-muted-foreground text-sm">
            No projects found matching the selected technology.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSelectTool(null)}
          >
            Clear Filter
          </Button>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredProjects.length}
        startIndex={startIndex}
        endIndex={endIndex}
        itemLabel="projects"
      />
    </>
  )
}

export default ProjectList
