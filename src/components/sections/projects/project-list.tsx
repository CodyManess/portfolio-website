'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ProjectCard from './project-card'
import TechnologyFilter from './technology-filter'
import Pagination from '@/components/shared/pagination'
import type { Project, Tool } from '@/types/project'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import SectionErrorAlert from '@/components/shared/section-error-alert'
import {
  scrollElementIntoView,
  usePortfolioLinks,
  useTemporaryHighlight,
} from '@/components/shared/portfolio-link-context'

const PROJECTS_PER_PAGE = 6

interface PendingScrollTarget {
  elementId: string
  instant: boolean
  block: ScrollLogicalPosition
  focusActiveFilter?: boolean
}

const getProjectKey = (project: Project): string => project.id ?? project.title

const filterProjectsByTool = (
  projects: Project[],
  selectedTool: string | null
): Project[] => {
  if (!selectedTool) return projects
  return projects.filter((project) =>
    project.tools.some((tool) => tool.title === selectedTool)
  )
}

const ProjectListSkeleton = () => (
  <div aria-busy="true" aria-label="Loading project data">
    <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton key={i} className="h-8 w-20 rounded-full" />
      ))}
    </div>
    <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: PROJECTS_PER_PAGE }, (_, i) => (
        <Skeleton key={i} className="h-60 w-full rounded-2xl" />
      ))}
    </div>
    <div className="mt-12 mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <Skeleton className="order-2 h-4 w-44 sm:order-1" />
      <Skeleton className="order-1 h-9 w-48 rounded-xl sm:order-2" />
    </div>
  </div>
)

interface ProjectListProps {
  initialProjects?: Project[]
}

const isValidProject = (item: unknown): item is Project => {
  if (!item || typeof item !== 'object') return false
  return (
    'title' in item &&
    typeof item.title === 'string' &&
    'description' in item &&
    typeof item.description === 'string' &&
    'achievements' in item &&
    Array.isArray(item.achievements) &&
    'tools' in item &&
    Array.isArray(item.tools)
  )
}

const isValidProjectList = (data: unknown): data is Project[] =>
  Array.isArray(data) && data.every(isValidProject)

const fetchProjectsData = async (signal: AbortSignal): Promise<Project[]> => {
  const response = await fetch('/api/projects', { signal })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data: unknown = await response.json()
  if (!isValidProjectList(data)) {
    throw new Error('Invalid project data format')
  }
  return data
}

const ProjectList = ({ initialProjects }: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects ?? [])
  const [isLoading, setIsLoading] = useState(initialProjects === undefined)
  const [error, setError] = useState<string | null>(null)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [openProjectKey, setOpenProjectKey] = useState<string | null>(null)
  const [highlightedProjectId, triggerProjectHighlight] =
    useTemporaryHighlight()
  const [scrollTick, setScrollTick] = useState(0)
  const pendingScrollTargetRef = useRef<PendingScrollTarget | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const linkContext = usePortfolioLinks()
  const registerProjectNavigator = linkContext?.registerProjectNavigator
  const registerToolFilterNavigator = linkContext?.registerToolFilterNavigator
  const consumePendingProject = linkContext?.consumePendingProject
  const consumePendingTool = linkContext?.consumePendingTool

  const safeProjects = useMemo(
    () => (Array.isArray(projects) ? projects : []),
    [projects]
  )

  const filteredProjects = useMemo(
    () => filterProjectsByTool(safeProjects, selectedTool),
    [safeProjects, selectedTool]
  )

  const focusAndOpenProject = useCallback(
    (
      projectId: string,
      sourceProjects: Project[],
      activeTool: string | null
    ) => {
      const targetProject = sourceProjects.find(
        (project) => project.id === projectId
      )
      if (!targetProject) return

      const matchesFilter =
        !activeTool ||
        targetProject.tools.some((tool) => tool.title === activeTool)
      const listForPagination = matchesFilter
        ? filterProjectsByTool(sourceProjects, activeTool)
        : sourceProjects

      if (!matchesFilter) {
        setSelectedTool(null)
      }

      const targetIndex = listForPagination.indexOf(targetProject)
      if (targetIndex !== -1) {
        setCurrentPage(Math.floor(targetIndex / PROJECTS_PER_PAGE) + 1)
      }

      pendingScrollTargetRef.current = {
        elementId: `project-${projectId}`,
        instant: true,
        block: 'center',
      }
      triggerProjectHighlight(projectId)
      setOpenProjectKey(getProjectKey(targetProject))
      setScrollTick((tick) => tick + 1)
    },
    [triggerProjectHighlight]
  )

  const filterByToolAndScroll = useCallback(
    (toolTitle: string, sourceProjects: Project[]) => {
      const hasMatchingProject = sourceProjects.some((project) =>
        project.tools.some((tool) => tool.title === toolTitle)
      )
      setSelectedTool(hasMatchingProject ? toolTitle : null)
      setCurrentPage(1)
      setOpenProjectKey(null)
      pendingScrollTargetRef.current = {
        elementId: 'projects',
        instant: false,
        block: 'start',
        focusActiveFilter: hasMatchingProject,
      }
      setScrollTick((tick) => tick + 1)
    },
    []
  )

  useEffect(() => {
    if (!registerProjectNavigator) return
    return registerProjectNavigator((projectId) => {
      focusAndOpenProject(projectId, safeProjects, selectedTool)
    })
  }, [
    registerProjectNavigator,
    focusAndOpenProject,
    safeProjects,
    selectedTool,
  ])

  useEffect(() => {
    if (!registerToolFilterNavigator) return
    return registerToolFilterNavigator((toolTitle) => {
      filterByToolAndScroll(toolTitle, safeProjects)
    })
  }, [registerToolFilterNavigator, filterByToolAndScroll, safeProjects])

  useEffect(() => {
    if (initialProjects !== undefined) return
    const controller = new AbortController()
    abortControllerRef.current = controller

    fetchProjectsData(controller.signal)
      .then((data) => {
        setProjects(data)
        setError(null)
        const pendingProjectId = consumePendingProject?.()
        const pendingToolTitle = consumePendingTool?.()
        if (pendingProjectId) {
          focusAndOpenProject(pendingProjectId, data, null)
        } else if (pendingToolTitle) {
          filterByToolAndScroll(pendingToolTitle, data)
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError('Failed to load project data.')
        console.error('Error fetching project data:', err)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [
    initialProjects,
    consumePendingProject,
    consumePendingTool,
    focusAndOpenProject,
    filterByToolAndScroll,
  ])

  useEffect(() => {
    const target = pendingScrollTargetRef.current
    if (!target) return

    const element = document.getElementById(target.elementId)
    if (!element) return

    pendingScrollTargetRef.current = null
    scrollElementIntoView(element, {
      instant: target.instant,
      block: target.block,
    })

    if (!target.focusActiveFilter) return
    const rafId = window.requestAnimationFrame(() => {
      const activeButton = element.querySelector<HTMLButtonElement>(
        '[aria-label="Filter projects by technology"] button[aria-pressed="true"]'
      )
      if (activeButton && typeof activeButton.focus === 'function') {
        activeButton.focus({ preventScroll: true })
      }
    })
    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [scrollTick, currentPage, selectedTool, safeProjects])

  const handleRetry = () => {
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller
    setIsLoading(true)
    setError(null)

    fetchProjectsData(controller.signal)
      .then((data) => {
        setProjects(data)
        setError(null)
        const pendingProjectId = consumePendingProject?.()
        const pendingToolTitle = consumePendingTool?.()
        if (pendingProjectId) {
          focusAndOpenProject(pendingProjectId, data, null)
        } else if (pendingToolTitle) {
          filterByToolAndScroll(pendingToolTitle, data)
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError('Failed to load project data.')
        console.error('Error fetching project data:', err)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })
  }

  const { availableTools, toolCounts } = useMemo(() => {
    const toolMap = new Map<string, Tool>()
    const counts: Record<string, number> = {}
    safeProjects.forEach((project) => {
      project.tools.forEach((tool) => {
        if (!toolMap.has(tool.title)) {
          toolMap.set(tool.title, tool)
        }
        counts[tool.title] = (counts[tool.title] || 0) + 1
      })
    })
    return {
      availableTools: Array.from(toolMap.values()).toSorted((a, b) =>
        a.title.localeCompare(b.title)
      ),
      toolCounts: counts,
    }
  }, [safeProjects])

  const handleSelectTool = (toolTitle: string | null) => {
    setSelectedTool(toolTitle)
    setCurrentPage(1)
  }

  if (isLoading) {
    return <ProjectListSkeleton />
  }

  if (error) {
    return <SectionErrorAlert message={error} onRetry={handleRetry} />
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

      <output aria-live="polite" className="sr-only">
        {selectedTool
          ? `Showing ${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'} filtered by ${selectedTool}.`
          : `Showing ${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'}.`}
      </output>

      {currentProjects.length > 0 ? (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map((project) => {
            const projectKey = getProjectKey(project)
            return (
              <ProjectCard
                key={projectKey}
                {...project}
                isOpen={openProjectKey === projectKey}
                onOpenChange={(nextOpen) =>
                  setOpenProjectKey(nextOpen ? projectKey : null)
                }
                isHighlighted={Boolean(
                  project.id && highlightedProjectId === project.id
                )}
              />
            )
          })}
        </div>
      ) : (
        <div className="space-y-3 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            No projects found matching the selected technology.
          </p>
          <Button
            type="button"
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
