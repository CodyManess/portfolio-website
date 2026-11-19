'use client'
import Image from 'next/image'
import type { Cert } from '@/types/education'
import { IconType } from '@/types/education'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  FaArrowUpRightFromSquare,
  FaCalendarCheck,
  FaCircleCheck,
  FaIdBadge,
} from 'react-icons/fa6'
import { cn, getSafeExternalUrl } from '@/lib/utils'

interface Props {
  cert: Cert
  open: boolean
  handleClose: () => void
}

const CertModal = ({ cert, open, handleClose }: Props) => {
  const {
    icon,
    iconType,
    name,
    org,
    description,
    skills = [],
    issueDate,
    expirationDate,
    credentialId,
    credentialUrl,
    programUrl,
  } = cert

  const safeCredentialUrl = getSafeExternalUrl(credentialUrl)
  const safeProgramUrl = getSafeExternalUrl(programUrl)
  const hasMetadataOrLinks = Boolean(
    issueDate ||
    expirationDate ||
    credentialId ||
    safeCredentialUrl ||
    safeProgramUrl
  )
  const hasBodyContent = Boolean(description || skills.length > 0)

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-6 sm:max-w-160">
        {/* Header Section */}
        <div className="flex items-start gap-4 pr-8">
          <div
            className={cn(
              'flex size-14 shrink-0 items-center justify-center overflow-hidden',
              iconType === IconType.Logo &&
                'rounded-full border border-white/20 bg-linear-to-br from-(--primary-dark) to-(--primary-color) p-2.5 shadow-sm'
            )}
          >
            <Image
              src={icon}
              alt=""
              width={56}
              height={56}
              sizes="56px"
              className="size-full object-contain"
            />
          </div>

          <DialogHeader className="space-y-1 text-left">
            {org ? (
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {org}
              </p>
            ) : null}
            <DialogTitle className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {name}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Certification Overview &amp; Key Skills
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Metadata & Action Links Row */}
        {hasMetadataOrLinks ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pt-3 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              {issueDate ? (
                <Badge
                  variant="outline"
                  className="h-auto gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
                >
                  <FaCalendarCheck
                    className="size-3 shrink-0 text-(--primary-color) dark:text-(--primary-light)"
                    aria-hidden="true"
                  />
                  Issued: {issueDate}
                </Badge>
              ) : null}
              {expirationDate ? (
                <Badge
                  variant="outline"
                  className="h-auto gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
                >
                  Expires: {expirationDate}
                </Badge>
              ) : null}
              {credentialId ? (
                <Badge
                  variant="outline"
                  className="h-auto gap-1.5 rounded-full bg-muted/50 px-3 py-1 font-mono text-xs font-medium text-foreground"
                >
                  <FaIdBadge
                    className="size-3 shrink-0 text-(--primary-color) dark:text-(--primary-light)"
                    aria-hidden="true"
                  />
                  ID: {credentialId}
                </Badge>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {safeCredentialUrl ? (
                <a
                  href={safeCredentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'sm' }),
                    'text-xs font-medium focus-visible:outline-none'
                  )}
                >
                  Verify Credential
                  <span className="sr-only"> (opens in new tab)</span>{' '}
                  <FaArrowUpRightFromSquare
                    className="ml-1.5 size-3"
                    aria-hidden="true"
                  />
                </a>
              ) : null}
              {safeProgramUrl ? (
                <a
                  href={safeProgramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'text-xs font-medium transition-colors hover:border-(--primary-color) hover:text-(--primary-color) focus-visible:outline-none dark:hover:border-(--primary-light) dark:hover:text-(--primary-light)'
                  )}
                >
                  Program Website
                  <span className="sr-only"> (opens in new tab)</span>{' '}
                  <FaArrowUpRightFromSquare
                    className="ml-1.5 size-3"
                    aria-hidden="true"
                  />
                </a>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="border-b border-border pt-3" />
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 space-y-6 overflow-y-auto py-4 pr-1">
          {hasBodyContent ? (
            <>
              {description ? (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Overview
                  </h3>
                  <p className="text-sm/relaxed whitespace-pre-line text-foreground/90">
                    {description}
                  </p>
                </div>
              ) : null}

              {skills.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Skills &amp; Key Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="h-auto gap-1.5 rounded-lg border-border/70 bg-card px-3 py-1.5 text-xs font-medium text-foreground"
                      >
                        <FaCircleCheck
                          className="size-3 shrink-0 text-(--primary-color) dark:text-(--primary-light)"
                          aria-hidden="true"
                        />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <p className="py-4 text-sm text-muted-foreground">
              No additional certification details available.
            </p>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">
            {skills.length > 0
              ? `${skills.length} Key Skill${skills.length === 1 ? '' : 's'}`
              : org}
          </span>
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            className="text-xs font-semibold tracking-wider text-(--primary-color) uppercase hover:bg-transparent hover:text-(--primary-dark) dark:text-(--primary-light) dark:hover:text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CertModal
