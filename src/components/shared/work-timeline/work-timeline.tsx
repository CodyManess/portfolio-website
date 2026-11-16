'use client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import RoleItem from './role-item'
import type { ExperienceData, Role } from '@/types/role'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

interface WorkTimelineProps {
  roles?: Role[]
  variant?: 'primary' | 'extended'
}

const WorkTimelineSkeleton = () => (
  <div
    aria-busy="true"
    aria-label="Loading experience data"
    className="mx-auto flex w-full max-w-4xl flex-col gap-4 py-6"
  >
    {[0, 1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-24 w-full rounded-2xl" />
    ))}
  </div>
)

const isValidExperienceData = (data: unknown): data is ExperienceData => {
  if (!data || typeof data !== 'object') return false
  const record = data as Record<string, unknown>
  return Array.isArray(record.roles) && Array.isArray(record.extendedRoles)
}

export default function WorkTimeline({
  roles: initialRoles,
  variant = 'primary',
}: WorkTimelineProps) {
  const [expanded, setExpanded] = useState<number | false>(false)
  const [fetchedRoles, setFetchedRoles] = useState<Role[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(
    initialRoles === undefined
  )
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState<number>(0)

  useEffect(() => {
    if (initialRoles !== undefined) return

    const controller = new AbortController()

    const fetchExperience = async () => {
      try {
        const response = await fetch('/api/experience', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: unknown = await response.json()
        if (!isValidExperienceData(data)) {
          throw new Error('Invalid experience data format')
        }
        setFetchedRoles(
          variant === 'extended' ? data.extendedRoles : data.roles
        )
        setError(null)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        setError('Failed to load experience data.')
        console.error('Error fetching experience data:', err)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void fetchExperience()
    return () => {
      controller.abort()
    }
  }, [initialRoles, variant, retryCount])

  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    setRetryCount((count) => count + 1)
  }

  if (initialRoles === undefined && isLoading) {
    return <WorkTimelineSkeleton />
  }

  if (initialRoles === undefined && error) {
    return (
      <div
        role="alert"
        className="mx-auto my-8 flex w-full max-w-4xl flex-col items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center"
      >
        <p className="text-sm font-medium text-destructive sm:text-base">
          {error}
        </p>
        <Button type="button" variant="outline" size="sm" onClick={handleRetry}>
          Retry
        </Button>
      </div>
    )
  }

  const roles = initialRoles ?? fetchedRoles

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col py-6 md:grid md:grid-cols-[max-content_auto_minmax(0,1fr)]">
      {roles.map((role, index) => (
        <RoleItem
          key={`${role.companyName}-${role.title}-${role.date}`}
          index={index}
          role={role}
          expanded={expanded}
          setExpanded={setExpanded}
          isLast={index === roles.length - 1}
        />
      ))}
    </div>
  )
}
