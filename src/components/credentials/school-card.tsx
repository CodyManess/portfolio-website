'use client'
import { Card, CardContent } from '@/components/ui/card'
import * as React from 'react'
import type { Degree } from '@/types/education'
import DegreeModal from './degree-modal'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
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
      {/* eslint-disable-next-line jsx-a11y/prefer-tag-over-role -- Card contains block headings/paragraphs invalid inside <button> */}
      <Card
        tabIndex={0}
        role="button"
        aria-label={`View coursework for ${title}`}
        onKeyDown={handleKeyDown}
        className={cn(
          CARD_CLASSNAME,
          'flex flex-col overflow-hidden py-0 focus-visible:ring-2 focus-visible:ring-(--primary-light) focus-visible:outline-none'
        )}
        onClick={handleOpen}
      >
        <div className="relative h-45 w-full">
          <Image
            fill
            placeholder="blur"
            src={schoolPhotos[title] ?? mtsucampus}
            alt={schoolName}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="aspect-video object-cover"
          />
        </div>
        <CardContent className="mr-auto flex flex-1 flex-col p-4">
          <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            {schoolName}
          </p>
          <h3 className="my-1 text-lg font-semibold text-(--foreground) transition-colors duration-300 group-hover:text-(--primary-color) dark:group-hover:text-(--primary-light)">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <DegreeModal degree={degree} open={open} handleClose={handleClose} />
    </>
  )
}

export default DegreeCard
