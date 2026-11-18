'use client'
import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6'
import RoleItem from './role-item'
import type { ExperienceData, Role } from '@/types/role'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  scrollElementIntoView,
  usePortfolioLinks,
  useTemporaryHighlight,
} from '@/components/shared/portfolio-link-context'

interface WorkTimelineProps {
  roles?: Role[]
  variant?: 'primary' | 'extended'
}

const getRoleKey = (role: Role, index: number): string =>
  role.id ?? `${role.companyName}-${role.title}-${role.date}-${index}`

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
  const [expandedKeys, setExpandedKeys] = useState<string[] | null>(null)
  const [fetchedRoles, setFetchedRoles] = useState<Role[]>([])
  const [highlightedRoleId, triggerRoleHighlight] = useTemporaryHighlight()
  const [scrollTick, setScrollTick] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(
    initialRoles === undefined
  )
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState<number>(0)
  const pendingScrollRoleIdRef = useRef<string | null>(null)
  const linkContext = usePortfolioLinks()
  const registerRoleNavigator = linkContext?.registerRoleNavigator
  const consumePendingRole = linkContext?.consumePendingRole

  const roles = initialRoles ?? fetchedRoles

  const focusAndExpandRole = useCallback(
    (roleId: string, sourceRoles: Role[]) => {
      const targetIndex = sourceRoles.findIndex((role) => role.id === roleId)
      if (targetIndex === -1) return
      const targetRole = sourceRoles[targetIndex]
      const nextKey = targetRole ? getRoleKey(targetRole, targetIndex) : roleId

      setExpandedKeys((prev) => {
        if (prev === null) {
          const firstRole = sourceRoles[0]
          const firstKey =
            variant === 'primary' && firstRole ? getRoleKey(firstRole, 0) : null
          if (firstKey && firstKey !== nextKey) {
            return [firstKey, nextKey]
          }
          return [nextKey]
        }
        return prev.includes(nextKey) ? prev : [...prev, nextKey]
      })
      pendingScrollRoleIdRef.current = roleId
      triggerRoleHighlight(roleId)
      setScrollTick((tick) => tick + 1)
    },
    [variant, triggerRoleHighlight]
  )

  useEffect(() => {
    if (variant !== 'primary' || !registerRoleNavigator) return
    return registerRoleNavigator((roleId) => {
      focusAndExpandRole(roleId, roles)
    })
  }, [variant, registerRoleNavigator, focusAndExpandRole, roles])

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
        const loadedRoles =
          variant === 'extended' ? data.extendedRoles : data.roles
        setFetchedRoles(loadedRoles)
        setError(null)
        if (variant === 'primary') {
          const pendingId = consumePendingRole?.()
          if (pendingId) {
            focusAndExpandRole(pendingId, loadedRoles)
          }
        }
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
  }, [
    initialRoles,
    variant,
    retryCount,
    consumePendingRole,
    focusAndExpandRole,
  ])

  useEffect(() => {
    const targetId = pendingScrollRoleIdRef.current
    if (!targetId) return

    const element = document.getElementById(`role-${targetId}`)
    if (!element) return

    pendingScrollRoleIdRef.current = null
    const rafId = window.requestAnimationFrame(() => {
      scrollElementIntoView(element, { block: 'center' })
      const triggerButton = element.querySelector('button')
      if (triggerButton && typeof triggerButton.focus === 'function') {
        triggerButton.focus({ preventScroll: true })
      }
    })
    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [scrollTick, roles])

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

  const allRoleKeys = roles.map((role, index) => getRoleKey(role, index))
  const defaultKeys =
    variant === 'primary' && allRoleKeys[0] ? [allRoleKeys[0]] : []
  const effectiveExpandedKeys = expandedKeys ?? defaultKeys
  const expandedKeySet = new Set(effectiveExpandedKeys)
  const expandedCount = allRoleKeys.filter((key) =>
    expandedKeySet.has(key)
  ).length
  const allExpanded = roles.length > 0 && expandedCount === roles.length

  const handleToggleRole = (roleKey: string) => {
    if (expandedKeySet.has(roleKey)) {
      setExpandedKeys(effectiveExpandedKeys.filter((key) => key !== roleKey))
    } else {
      setExpandedKeys([...effectiveExpandedKeys, roleKey])
    }
  }

  const handleToggleAll = () => {
    setExpandedKeys(allExpanded ? [] : allRoleKeys)
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col">
      {roles.length > 1 ? (
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-muted-foreground">
            {expandedCount} of {roles.length} roles expanded
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleToggleAll}
            className="gap-1.5 rounded-full text-xs font-semibold hover:border-(--primary-color)/50 hover:text-(--primary-color) dark:hover:border-(--primary-light)/50 dark:hover:text-(--primary-light)"
          >
            {allExpanded ? (
              <>
                <FaAnglesUp className="size-3" aria-hidden="true" />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <FaAnglesDown className="size-3" aria-hidden="true" />
                <span>Expand All</span>
              </>
            )}
          </Button>
        </div>
      ) : null}

      <div className="flex w-full flex-col py-6 md:grid md:grid-cols-[max-content_auto_minmax(0,1fr)]">
        {roles.map((role, index) => {
          const roleKey = getRoleKey(role, index)
          return (
            <RoleItem
              key={roleKey}
              index={index}
              role={role}
              isExpanded={expandedKeySet.has(roleKey)}
              onToggle={() => handleToggleRole(roleKey)}
              isLast={index === roles.length - 1}
              isHighlighted={Boolean(role.id && highlightedRoleId === role.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
