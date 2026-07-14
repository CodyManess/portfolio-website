'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import ProjectCard from './project-card'
import Project from '@/types/project'

const PROJECTS_PER_PAGE = 9

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE
  const currentProjects = projects.slice(startIndex, endIndex)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {currentProjects.map((project) => {
          return <ProjectCard key={project.title} {...project} />
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 mb-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200/80 dark:border-slate-800/40 bg-slate-50/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:border-[var(--primary-color)]/30 hover:text-[var(--primary-color)] dark:hover:border-[var(--primary-light)]/40 dark:hover:text-[var(--primary-light)] cursor-pointer"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-xl border transition-all duration-300 cursor-pointer ${
                currentPage === page
                  ? 'bg-[var(--primary-color)] border-[var(--primary-color)] text-white shadow-[0_0_15px_rgba(0,122,184,0.3)]'
                  : 'border-slate-200/80 dark:border-slate-800/40 bg-slate-50/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 hover:border-[var(--primary-color)]/30 hover:text-[var(--primary-color)] dark:hover:border-[var(--primary-light)]/40 dark:hover:text-[var(--primary-light)]'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200/80 dark:border-slate-800/40 bg-slate-50/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:border-[var(--primary-color)]/30 hover:text-[var(--primary-color)] dark:hover:border-[var(--primary-light)]/40 dark:hover:text-[var(--primary-light)] cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default ProjectList
