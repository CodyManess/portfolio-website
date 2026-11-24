'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState, type KeyboardEvent } from 'react'
import type { Degree } from '@/types/education'
import DegreeModal from './degree-modal'
import Image from 'next/image'
import { FaArrowRight, FaAward } from 'react-icons/fa6'

/**
 * Props for the DegreeCard component.
 * @param degree - The degree data object to display.
 */
const DegreeCard = (degree: Degree) => {
  const { schoolName, title, subtitle, date, photo, awards } = degree
  const primaryAward = awards[0]
  const extraAwardsCount = awards.length - 1

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
        className="py-0 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-section focus-visible:outline-none"
        onClick={handleOpen}
      >
        <div className="relative h-45 w-full overflow-hidden border-b border-border/50">
          <Image
            fill
            quality={75}
            placeholder={typeof photo === 'string' ? 'empty' : 'blur'}
            src={photo}
            alt={`${schoolName} campus`}
            sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 2rem), 384px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
        </div>
        <CardContent className="flex flex-1 flex-col pb-4">
          <div className="mb-4">
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {schoolName}
              </p>
              {date ? (
                <span className="font-mono text-xs font-medium text-brand">
                  {date}
                </span>
              ) : null}
            </div>
            <h3 className="my-1 text-lg/snug font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand">
              {title}
            </h3>
            {subtitle ? (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
            {primaryAward ? (
              <div className="mt-3 flex items-center gap-1.5">
                <Badge variant="highlight" className="min-w-0 shrink gap-1">
                  <FaAward
                    className="size-2.5 shrink-0 text-amber-600 dark:text-amber-400"
                    aria-hidden="true"
                  />
                  <span className="truncate">{primaryAward}</span>
                </Badge>
                {extraAwardsCount > 0 ? (
                  <Badge variant="highlight" className="shrink-0">
                    +{extraAwardsCount} more
                  </Badge>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3 text-xs font-medium text-muted-foreground transition-colors group-hover:text-brand">
            <span>View coursework</span>
            <FaArrowRight
              className="size-3 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              aria-hidden="true"
            />
          </div>
        </CardContent>
      </Card>

      {hasOpened ? (
        <DegreeModal degree={degree} open={open} handleClose={handleClose} />
      ) : null}
    </>
  )
}

export default DegreeCard
