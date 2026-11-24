import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      shadow: ['surface', 'card-hover', 'brand-sm', 'brand-glow'],
    },
  },
})

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
