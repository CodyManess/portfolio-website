import { navLinks, type NavSectionId } from '@/data/links'

const SECTION_IDS: readonly NavSectionId[] = navLinks.map((link) => link.id)

/**
 * Determines the currently active landing-page section based on scroll position.
 * Activates the last present section when scrolled to the bottom of the document
 * (for example, when filtered content makes the final section shorter than the viewport).
 */
export function getActiveSectionId(
  sectionIds: readonly NavSectionId[] = SECTION_IDS
): NavSectionId {
  const defaultSection = sectionIds[0] ?? 'home'
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return defaultSection
  }

  const triggerLine = window.innerHeight * 0.35
  let currentSection: NavSectionId = defaultSection
  let lastExistingSection: NavSectionId | null = null

  for (const id of sectionIds) {
    const element = document.getElementById(id)
    if (element) {
      lastExistingSection = id
      const rect = element.getBoundingClientRect()
      if (rect.top <= triggerLine) {
        currentSection = id
      }
    }
  }

  const docHeight = document.documentElement.scrollHeight
  if (
    lastExistingSection &&
    docHeight > window.innerHeight &&
    window.scrollY > 0 &&
    window.scrollY + window.innerHeight >= docHeight - 2
  ) {
    return lastExistingSection
  }

  return currentSection
}
