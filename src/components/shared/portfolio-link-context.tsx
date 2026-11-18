'use client'
import * as React from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

type NavigatorHandler = (id: string) => void

export const HIGHLIGHT_RING_CLASS =
  'ring-2 ring-(--primary-color) ring-offset-2 ring-offset-background dark:ring-(--primary-light)'

export function useTemporaryHighlight(
  durationMs = 2500
): [string | null, (id: string) => void] {
  const [highlightedId, setHighlightedId] = useState<string | null>(null)

  useEffect(() => {
    if (!highlightedId) return
    const timer = window.setTimeout(() => {
      setHighlightedId(null)
    }, durationMs)
    return () => {
      window.clearTimeout(timer)
    }
  }, [highlightedId, durationMs])

  return [highlightedId, setHighlightedId]
}

interface PortfolioLinkContextValue {
  registerRoleNavigator: (handler: NavigatorHandler) => () => void
  registerProjectNavigator: (handler: NavigatorHandler) => () => void
  navigateToRole: (roleId: string) => void
  navigateToProject: (projectId: string) => void
  consumePendingRole: () => string | null
  consumePendingProject: () => string | null
}

const PortfolioLinkContext = createContext<PortfolioLinkContextValue | null>(
  null
)

export function prefersReducedMotion(): boolean {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return false
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollElementIntoView(
  element: HTMLElement | null,
  options: { instant?: boolean; block?: ScrollLogicalPosition } = {}
): void {
  if (!element || typeof element.scrollIntoView !== 'function') return
  const behavior: ScrollBehavior =
    options.instant || prefersReducedMotion() ? 'auto' : 'smooth'
  element.scrollIntoView({
    behavior,
    block: options.block ?? 'center',
  })
}

export function PortfolioLinkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const roleNavigatorRef = useRef<NavigatorHandler | null>(null)
  const projectNavigatorRef = useRef<NavigatorHandler | null>(null)
  const pendingRoleIdRef = useRef<string | null>(null)
  const pendingProjectIdRef = useRef<string | null>(null)

  const registerRoleNavigator = useCallback((handler: NavigatorHandler) => {
    roleNavigatorRef.current = handler
    return () => {
      if (roleNavigatorRef.current === handler) {
        roleNavigatorRef.current = null
      }
    }
  }, [])

  const registerProjectNavigator = useCallback((handler: NavigatorHandler) => {
    projectNavigatorRef.current = handler
    return () => {
      if (projectNavigatorRef.current === handler) {
        projectNavigatorRef.current = null
      }
    }
  }, [])

  const navigateToRole = useCallback((roleId: string) => {
    if (roleNavigatorRef.current) {
      pendingRoleIdRef.current = null
      roleNavigatorRef.current(roleId)
    } else {
      pendingRoleIdRef.current = roleId
    }
  }, [])

  const navigateToProject = useCallback((projectId: string) => {
    if (projectNavigatorRef.current) {
      pendingProjectIdRef.current = null
      projectNavigatorRef.current(projectId)
    } else {
      pendingProjectIdRef.current = projectId
    }
  }, [])

  const consumePendingRole = useCallback(() => {
    const id = pendingRoleIdRef.current
    pendingRoleIdRef.current = null
    return id
  }, [])

  const consumePendingProject = useCallback(() => {
    const id = pendingProjectIdRef.current
    pendingProjectIdRef.current = null
    return id
  }, [])

  const value = React.useMemo<PortfolioLinkContextValue>(
    () => ({
      registerRoleNavigator,
      registerProjectNavigator,
      navigateToRole,
      navigateToProject,
      consumePendingRole,
      consumePendingProject,
    }),
    [
      registerRoleNavigator,
      registerProjectNavigator,
      navigateToRole,
      navigateToProject,
      consumePendingRole,
      consumePendingProject,
    ]
  )

  return (
    <PortfolioLinkContext.Provider value={value}>
      {children}
    </PortfolioLinkContext.Provider>
  )
}

export function usePortfolioLinks(): PortfolioLinkContextValue | null {
  return useContext(PortfolioLinkContext)
}
