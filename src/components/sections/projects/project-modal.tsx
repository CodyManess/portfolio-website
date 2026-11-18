'use client'
import * as React from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaChevronLeft,
  FaChevronRight,
  FaCircleCheck,
  FaSuitcase,
} from 'react-icons/fa6'
import type { Project } from '@/types/project'
import ToolChip from './tool-chip'
import { cn, getSafeExternalUrl } from '@/lib/utils'
import { usePortfolioLinks } from '@/components/shared/portfolio-link-context'

interface Props {
  project: Project
  open: boolean
  handleClose: () => void
  onSelectRole?: (roleId: string) => void
}

const getPhotoKey = (
  src: NonNullable<Project['photos']>[number]['src'],
  alt: string,
  caption?: string
) => {
  const srcKey = typeof src === 'string' ? src : src.src
  return `${srcKey}-${alt}-${caption ?? ''}`
}

const ProjectModal = ({ project, open, handleClose, onSelectRole }: Props) => {
  const linkContext = usePortfolioLinks()
  const safeLink = getSafeExternalUrl(project.link)
  const photos = project.photos ?? []
  const relatedRoles = project.relatedRoles ?? []
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(0)

  const handleRoleSelect = (roleId: string) => {
    handleModalClose()
    const navigate = onSelectRole ?? linkContext?.navigateToRole
    navigate?.(roleId)
  }

  const clampedIndex =
    photos.length > 0 ? Math.min(activePhotoIndex, photos.length - 1) : 0
  const activePhoto = photos[clampedIndex]

  const handleModalClose = () => {
    setActivePhotoIndex(0)
    handleClose()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleModalClose()
    }
  }

  const handlePrevPhoto = () => {
    if (photos.length <= 1) return
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const handleNextPhoto = () => {
    if (photos.length <= 1) return
    setActivePhotoIndex((prev) => (prev + 1) % photos.length)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-6 sm:max-w-200">
        {/* Header Section */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pr-8 pb-3">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Project Overview &amp; Technical Details
            </DialogDescription>
          </DialogHeader>

          {safeLink ? (
            <a
              href={safeLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'text-xs font-medium transition-colors hover:border-(--primary-color) hover:text-(--primary-color) focus-visible:outline-none'
              )}
            >
              Visit Project{' '}
              <FaArrowUpRightFromSquare
                className="ml-1.5 size-3"
                aria-hidden="true"
              />
            </a>
          ) : null}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 space-y-6 overflow-y-auto py-4 pr-1">
          {/* Project Photo Showcase */}
          {activePhoto ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Project Showcase
                </h3>
                {photos.length > 1 ? (
                  <span className="font-mono text-xs text-muted-foreground">
                    {clampedIndex + 1} / {photos.length}
                  </span>
                ) : null}
              </div>

              <div className="relative overflow-hidden rounded-xl border border-border/70 bg-muted/40">
                <div className="relative aspect-video w-full">
                  <Image
                    fill
                    quality={75}
                    placeholder={
                      typeof activePhoto.src === 'string' ? 'empty' : 'blur'
                    }
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    sizes="(max-width: 640px) calc(100vw - 4rem), 736px"
                    className="object-contain"
                  />
                </div>

                {photos.length > 1 ? (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon-sm"
                      aria-label="Previous photo"
                      onClick={handlePrevPhoto}
                      className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full border border-border/60 bg-background/85 text-foreground shadow-sm backdrop-blur-xs hover:bg-background"
                    >
                      <FaChevronLeft className="size-3.5" aria-hidden="true" />
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon-sm"
                      aria-label="Next photo"
                      onClick={handleNextPhoto}
                      className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full border border-border/60 bg-background/85 text-foreground shadow-sm backdrop-blur-xs hover:bg-background"
                    >
                      <FaChevronRight className="size-3.5" aria-hidden="true" />
                    </Button>
                  </>
                ) : null}
              </div>

              {activePhoto.caption ? (
                <p className="text-center text-xs text-muted-foreground">
                  {activePhoto.caption}
                </p>
              ) : null}

              {photos.length > 1 ? (
                <div
                  // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Thumbnail selector bar is a group of buttons
                  role="group"
                  aria-label="Select project photo"
                  className="flex flex-wrap justify-center gap-2"
                >
                  {photos.map((photo, index) => {
                    const isSelected = index === clampedIndex
                    return (
                      <button
                        key={getPhotoKey(photo.src, photo.alt, photo.caption)}
                        type="button"
                        aria-label={`View photo ${index + 1}: ${photo.alt}`}
                        aria-pressed={isSelected}
                        onClick={() => setActivePhotoIndex(index)}
                        className={cn(
                          'relative h-12 w-20 cursor-pointer overflow-hidden rounded-lg border bg-muted/40 transition-all focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none',
                          isSelected
                            ? 'border-(--primary-color) ring-2 ring-(--primary-color)/30'
                            : 'border-border/70 opacity-70 hover:opacity-100'
                        )}
                      >
                        <Image
                          fill
                          quality={50}
                          placeholder={
                            typeof photo.src === 'string' ? 'empty' : 'blur'
                          }
                          src={photo.src}
                          alt=""
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                    )
                  })}
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Associated Roles Cross-Link Section */}
          {relatedRoles.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Associated Role{relatedRoles.length === 1 ? '' : 's'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {relatedRoles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleSelect(role.id)}
                    aria-label={`View ${role.title} at ${role.companyName} in Experience section`}
                    className="group/role inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border/80 bg-card px-3 py-2 text-left text-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-(--primary-color)/50 hover:bg-(--primary-color)/8 focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none dark:hover:border-(--primary-light)/50 dark:hover:bg-(--primary-light)/10"
                  >
                    <FaSuitcase
                      className="size-3.5 shrink-0 text-(--primary-color) dark:text-(--primary-light)"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col">
                      <span className="font-semibold text-foreground transition-colors group-hover/role:text-(--primary-color) dark:group-hover/role:text-(--primary-light)">
                        {role.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {role.companyName} · {role.date}
                      </span>
                    </span>
                    <FaArrowRight
                      className="ml-1 size-2.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover/role:translate-x-0.5 group-hover/role:text-(--primary-color) dark:group-hover/role:text-(--primary-light)"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Tech Stack Banner */}
          {project.tools.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <ToolChip key={tool.title} tool={tool} />
                ))}
              </div>
            </div>
          ) : null}

          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Overview
            </h3>
            <p className="text-sm/relaxed whitespace-pre-line text-foreground/90">
              {project.description}
            </p>
          </div>

          {/* Key Achievements & Impact Section */}
          {project.achievements.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Key Contributions &amp; Achievements
              </h3>
              <div className="space-y-2.5">
                {project.achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-3 text-sm transition-colors hover:border-(--primary-color)/30 hover:bg-muted/30"
                  >
                    <FaCircleCheck
                      className="mt-0.5 size-4 shrink-0 text-(--primary-color)"
                      aria-hidden="true"
                    />
                    <span className="leading-snug text-foreground">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer Section */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">
            {project.tools.length} Technolog
            {project.tools.length === 1 ? 'y' : 'ies'}
          </span>
          <Button
            type="button"
            variant="ghost"
            onClick={handleModalClose}
            className="text-xs font-semibold tracking-wider text-(--primary-color) uppercase hover:bg-transparent hover:text-(--primary-dark)"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectModal
