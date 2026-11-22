'use client'
import { Card, CardContent } from '@/components/ui/card'
import { useState, type KeyboardEvent } from 'react'
import type { Degree } from '@/types/education'
import DegreeModal from './degree-modal'
import Image from 'next/image'
import { FaAward } from 'react-icons/fa6'

/**
 * Props for the DegreeCard component.
 * @param degree - The degree data object to display.
 */
const DegreeCard = (degree: Degree) => {
  const { schoolName, title, subtitle, date, photo, awards } = degree

  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const handleOpen = () => {
    setHasOpened(true)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpen()
    }
  }

  return (
    <>
      <Card
        variant="interactive"
        tabIndex={0}
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Card contains block headings/paragraphs invalid inside <button>
        role="button"
        aria-label={`View coursework for ${title}`}
        onKeyDown={handleKeyDown}
        className="flex flex-col overflow-hidden py-0 focus-visible:ring-2 focus-visible:ring-(--primary-light) focus-visible:outline-none"
        onClick={handleOpen}
      >
        <div className="relative h-45 w-full">
          <Image
            fill
            quality={75}
            placeholder={typeof photo === 'string' ? 'empty' : 'blur'}
            src={photo}
            alt={`${schoolName} campus`}
            sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 2rem), 384px"
            className="object-cover"
          />
        </div>
        <CardContent className="flex flex-1 flex-col px-4 pb-4">
          <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              {schoolName}
            </p>
            {date ? (
              <span className="font-mono text-[11px] font-medium text-(--primary-color) dark:text-(--primary-light)">
                {date}
              </span>
            ) : null}
          </div>
          <h3 className="my-1 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-(--primary-color) dark:group-hover:text-(--primary-light)">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          ) : null}
          {awards.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {awards.map((award) => (
                <span
                  key={award}
                  className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-800 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300"
                >
                  <FaAward
                    className="size-2.5 shrink-0 text-amber-600 dark:text-amber-400"
                    aria-hidden="true"
                  />
                  <span>{award}</span>
                </span>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {hasOpened ? (
        <DegreeModal degree={degree} open={open} handleClose={handleClose} />
      ) : null}
    </>
  )
}

export default DegreeCard
