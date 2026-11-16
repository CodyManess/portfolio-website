'use client'
import { Card, CardContent } from '@/components/ui/card'
import * as React from 'react'
import type { Degree } from '@/types/education'
import DegreeModal from './degree-modal'
import Image from 'next/image'

/**
 * Props for the DegreeCard component.
 * @param degree - The degree data object to display.
 */
const DegreeCard = (degree: Degree) => {
  const { schoolName, title, subtitle, photo } = degree

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
        variant="interactive"
        tabIndex={0}
        role="button"
        aria-label={`View coursework for ${title}`}
        onKeyDown={handleKeyDown}
        className="flex flex-col overflow-hidden py-0 focus-visible:ring-2 focus-visible:ring-(--primary-light) focus-visible:outline-none"
        onClick={handleOpen}
      >
        <div className="relative h-45 w-full">
          <Image
            fill
            placeholder={typeof photo === 'string' ? 'empty' : 'blur'}
            src={photo}
            alt={schoolName}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="aspect-video object-cover"
          />
        </div>
        <CardContent className="mr-auto flex flex-1 flex-col p-4">
          <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            {schoolName}
          </p>
          <h3 className="my-1 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-(--primary-color) dark:group-hover:text-(--primary-light)">
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
