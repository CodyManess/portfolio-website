'use client'
import { Card, CardContent } from '@/components/ui/card'
import * as React from 'react'
import { Degree } from '@/types/education'
import DegreeModal from './degree-modal'
import Image, { StaticImageData } from 'next/image'
import { cn, CARD_CLASSNAME } from '@/lib/utils'

import mtsucampus from '@public/credentials/mtsucampus.webp'
import mtsucampus2 from '@public/credentials/mtsucampus2.webp'
import lsuscampus from '@public/credentials/lsuscampus.webp'

/**
 * Campus photos keyed by degree title. Falls back to `mtsucampus` when a
 * degree has no dedicated photo.
 */
const schoolPhotos: Record<string, StaticImageData> = {
  'Master of Science in Computer Science': mtsucampus,
  'Bachelor of Science in Computer Science': mtsucampus2,
  'Master of Business Administration': lsuscampus,
}

/**
 * Props for the DegreeCard component.
 * @param degree - The degree data object to display.
 */
const DegreeCard = (degree: Degree) => {
  const { schoolName, title, subtitle } = degree

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpen()
    }
  }

  return (
    <>
      <Card
        tabIndex={0}
        role="button"
        aria-label={`View coursework for ${title}`}
        onKeyDown={handleKeyDown}
        className={cn(
          CARD_CLASSNAME,
          'overflow-hidden flex flex-col pt-0 pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-light)]'
        )}
        onClick={handleOpen}
      >
        <div className="h-[180px] w-full relative">
          <Image
            fill
            src={schoolPhotos[title] ?? mtsucampus}
            alt={schoolName}
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover aspect-[16/9]"
          />
        </div>
        <CardContent className="flex flex-col mr-auto flex-1 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            {schoolName}
          </p>
          <h3 className="my-1 text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-light)] transition-colors duration-300">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </CardContent>
      </Card>

      <DegreeModal degree={degree} open={open} handleClose={handleClose} />
    </>
  )
}

export default DegreeCard
