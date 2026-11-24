'use client'
import Image from 'next/image'
import type { Cert } from '@/types/education'
import { IconType } from '@/types/education'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import ExternalActionLink from '@/components/shared/external-action-link'
import { Overline } from '@/components/shared/page-section'
import { FaCalendarCheck, FaCircleCheck, FaIdBadge } from 'react-icons/fa6'
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
                'rounded-full border border-white/20 bg-linear-to-br from-brand-dark to-primary p-2.5 shadow-sm'
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
            {org ? <Overline as="p">{org}</Overline> : null}
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>
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
                  variant="subtle"
                  size="md"
                  className="gap-1.5 text-foreground"
                >
                  <FaCalendarCheck className="text-brand" aria-hidden="true" />
                  Issued: {issueDate}
                </Badge>
              ) : null}
              {expirationDate ? (
                <Badge variant="subtle" size="md" className="text-foreground">
                  Expires: {expirationDate}
                </Badge>
              ) : null}
              {credentialId ? (
                <Badge
                  variant="subtle"
                  size="md"
                  className="gap-1.5 font-mono text-foreground"
                >
                  <FaIdBadge className="text-brand" aria-hidden="true" />
                  ID: {credentialId}
                </Badge>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {safeCredentialUrl ? (
                <ExternalActionLink href={safeCredentialUrl} variant="default">
                  Verify Credential
                </ExternalActionLink>
              ) : null}
              {safeProgramUrl ? (
                <ExternalActionLink href={safeProgramUrl}>
                  Program Website
                </ExternalActionLink>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="border-b border-border pt-3" />
        )}

        {/* Modal Scrollable Body */}
        <DialogBody className="space-y-6">
          {hasBodyContent ? (
            <>
              {description ? (
                <div className="space-y-2">
                  <Overline>Overview</Overline>
                  <p className="text-sm/relaxed whitespace-pre-line text-foreground/90">
                    {description}
                  </p>
                </div>
              ) : null}

              {skills.length > 0 ? (
                <div className="space-y-3">
                  <Overline>Skills &amp; Key Topics</Overline>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        size="md"
                        className="gap-1.5 rounded-lg border-border/70 bg-card"
                      >
                        <FaCircleCheck
                          className="text-brand"
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
        </DialogBody>

        {/* Footer Section */}
        <DialogFooter showCloseButton>
          <span className="text-xs text-muted-foreground">
            {skills.length > 0
              ? `${skills.length} Key Skill${skills.length === 1 ? '' : 's'}`
              : org}
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CertModal
