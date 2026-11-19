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

type NavigatorHandler = (target: string) => void

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

function useNavigatorChannel() {
  const handlerRef = useRef<NavigatorHandler | null>(null)
  const pendingRef = useRef<string | null>(null)

  const register = useCallback((handler: NavigatorHandler) => {
    handlerRef.current = handler
    return () => {
      if (handlerRef.current === handler) {
        handlerRef.current = null
      }
    }
  }, [])

  const navigate = useCallback((target: string) => {
    if (handlerRef.current) {
      pendingRef.current = null
      handlerRef.current(target)
    } else {
      pendingRef.current = target
    }
  }, [])

  const consumePending = useCallback(() => {
    const target = pendingRef.current
    pendingRef.current = null
    return target
  }, [])

  return { register, navigate, consumePending }
}

interface PortfolioLinkContextValue {
  registerRoleNavigator: (handler: NavigatorHandler) => () => void
  registerProjectNavigator: (handler: NavigatorHandler) => () => void
  registerToolFilterNavigator: (handler: NavigatorHandler) => () => void
  navigateToRole: (roleId: string) => void
  navigateToProject: (projectId: string) => void
  navigateToTool: (toolTitle: string) => void
  consumePendingRole: () => string | null
  consumePendingProject: () => string | null
  consumePendingTool: () => string | null
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
  const roleChannel = useNavigatorChannel()
  const projectChannel = useNavigatorChannel()
  const toolChannel = useNavigatorChannel()

  const value = React.useMemo<PortfolioLinkContextValue>(
    () => ({
      registerRoleNavigator: roleChannel.register,
      registerProjectNavigator: projectChannel.register,
      registerToolFilterNavigator: toolChannel.register,
      navigateToRole: roleChannel.navigate,
      navigateToProject: projectChannel.navigate,
      navigateToTool: toolChannel.navigate,
      consumePendingRole: roleChannel.consumePending,
      consumePendingProject: projectChannel.consumePending,
      consumePendingTool: toolChannel.consumePending,
    }),
    [
      roleChannel.register,
      roleChannel.navigate,
      roleChannel.consumePending,
      projectChannel.register,
      projectChannel.navigate,
      projectChannel.consumePending,
      toolChannel.register,
      toolChannel.navigate,
      toolChannel.consumePending,
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
