import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validates that an external URL uses an explicit `http:` or `https:` scheme.
 * Returns the trimmed URL when safe, or `undefined` otherwise.
 */
export function getSafeExternalUrl(url?: string): string | undefined {
  if (!url) return undefined
  const trimmed = url.trim()
  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return trimmed
    }
    return undefined
  } catch {
    return undefined
  }
}

export const CARD_CLASSNAME =
  'group h-full flex flex-col justify-between cursor-pointer border border-slate-200/80 dark:border-slate-800/40 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900/60 dark:to-slate-950/80 rounded-2xl shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,122,184,0.12)] hover:border-[var(--primary-color)]/30 dark:hover:border-[var(--primary-light)]/40'
