'use client'

import * as React from 'react'
import { useEffect, useState, useMemo } from 'react'
import ProjectCard from './project-card'
import TechnologyFilter from './technology-filter'
import Pagination from '@/components/shared/pagination'
import Project, { Tool } from '@/types/project'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const PROJECTS_PER_PAGE = 6

const ProjectListSkeleton = () => (
  <div aria-busy="true" aria-label="Loading project data">
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton key={i} className="h-8 w-20 rounded-full" />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {Array.from({ length: PROJECTS_PER_PAGE }, (_, i) => (
        <Skeleton key={i} className="h-60 w-full rounded-2xl" />
      ))}
    </div>
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 mb-6">
      <Skeleton className="h-4 w-44 order-2 sm:order-1" />
      <Skeleton className="h-9 w-48 rounded-xl order-1 sm:order-2" />
    </div>
  </div>
)

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const controller = new AbortController()

    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: unknown = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('Invalid project data format')
        }
        setProjects(data as Project[])
        setError(null)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        setError('Failed to load project data.')
        console.error('Error fetching project data:', err)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void fetchProjects()
    return () => {
      controller.abort()
    }
  }, [retryCount])

  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    setRetryCount((count) => count + 1)
  }

  const safeProjects = useMemo(
    () => (Array.isArray(projects) ? projects : []),
    [projects]
  )

  const { availableTools, toolCounts } = useMemo(() => {
    const toolMap = new Map<string, Tool>()
    const counts: Record<string, number> = {}
    safeProjects.forEach((project) => {
      project.tools?.forEach((tool) => {
        if (!toolMap.has(tool.title)) {
          toolMap.set(tool.title, tool)
        }
        counts[tool.title] = (counts[tool.title] || 0) + 1
      })
    })
    return {
      availableTools: Array.from(toolMap.values()).sort((a, b) =>
        a.title.localeCompare(b.title)
      ),
      toolCounts: counts,
    }
  }, [safeProjects])

  const handleSelectTool = (toolTitle: string | null) => {
    setSelectedTool(toolTitle)
    setCurrentPage(1)
  }

  const filteredProjects = useMemo(() => {
    if (!selectedTool) {
      return safeProjects
    }
    return safeProjects.filter((project) =>
      project.tools?.some((tool) => tool.title === selectedTool)
    )
  }, [safeProjects, selectedTool])

  if (isLoading) {
    return <ProjectListSkeleton />
  }

  if (error) {
    return (
      <div
        role="alert"
        className="my-8 flex flex-col items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center"
      >
        <p className="text-sm sm:text-base font-medium text-destructive">
          {error}
        </p>
        <Button type="button" variant="outline" size="sm" onClick={handleRetry}>
          Retry
        </Button>
      </div>
    )
  }

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  const effectivePage =
    totalPages > 0 ? Math.min(Math.max(currentPage, 1), totalPages) : 1
  const startIndex = (effectivePage - 1) * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  return (
    <>
      {availableTools.length > 0 && (
        <TechnologyFilter
          tools={availableTools}
          selectedTool={selectedTool}
          onSelectTool={handleSelectTool}
          toolCounts={toolCounts}
          totalCount={safeProjects.length}
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
        currentPage={effectivePage}
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
